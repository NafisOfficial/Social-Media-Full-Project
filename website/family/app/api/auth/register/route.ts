import { connectDB } from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';
import { registerSchema } from '@/lib/validations/auth';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { username, email, password, displayName } = validation.data;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      passwordHash,
      displayName,
    });

    // Create token
    const token = signToken({
      userId: newUser._id.toString(),
      username: newUser.username,
    });

    const response = NextResponse.json(
      {
        data: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          displayName: newUser.displayName,
        },
      },
      { status: 201 }
    );

    return await setAuthCookie(response, token);
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
