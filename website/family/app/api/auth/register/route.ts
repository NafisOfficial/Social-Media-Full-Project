import { connectDB } from "@/lib/db";
import { sendOtpEmail } from "@/lib/mail";
import { registerSchema } from "@/lib/validations/auth";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.flatten() },
        { status: 400 },
      );
    }

    const { username, email, password, displayName } = validation.data;
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: normalizedEmail }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user with OTP, not yet verified
    const newUser = await User.create({
      username: username.toLowerCase(),
      email: normalizedEmail,
      passwordHash,
      displayName,
      otp,
      otpExpires,
      isEmailVerified: false,
    });

    await sendOtpEmail(normalizedEmail, otp);

    return NextResponse.json(
      {
        data: {
          message:
            "User created. Please verify your email with the OTP sent to your email.",
          email: newUser.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
