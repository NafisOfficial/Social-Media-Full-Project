"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { z } from "zod";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name is required and must be at least 2 characters"),
    lastName: z
      .string()
      .min(2, "Last name is required and must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const nextErrors: Partial<Record<keyof SignupFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof SignupFormData | undefined;
        if (field) {
          nextErrors[field] = issue.message;
        }
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    console.log("Signup data:", result.data);
    router.push("/setup");
  };

  return (
    <div className="min-h-screen bg-warm-beige flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[1.1fr_1.4fr]">
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-linear-to-br from-sage-green/80 via-transparent to-warm-beige/80" />
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
            alt="Family celebration"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 flex h-full flex-col justify-end p-10 text-white">
            <span className="text-sm uppercase tracking-[0.3em] text-white/80">
              Start together
            </span>
            <h2 className="mt-4 text-4xl font-playfair font-bold">
              Create your account
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/85">
              Join your family story with a warm signup experience, built for
              memories, milestones, and heirloom moments.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-playfair font-bold text-deep-neutral mb-2">
                Join Family
              </h1>
              <p className="text-deep-neutral/70">
                Create your account to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-deep-neutral mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-deep-neutral/20 bg-warm-beige/50 px-4 py-3 text-deep-neutral shadow-sm transition focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                    placeholder="First name"
                    required
                  />
                  {errors.firstName ? (
                    <p className="mt-2 text-sm text-rose-600">
                      {errors.firstName}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-deep-neutral mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-deep-neutral/20 bg-warm-beige/50 px-4 py-3 text-deep-neutral shadow-sm transition focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                    placeholder="Last name"
                    required
                  />
                  {errors.lastName ? (
                    <p className="mt-2 text-sm text-rose-600">
                      {errors.lastName}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-deep-neutral mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-deep-neutral/20 bg-warm-beige/50 px-4 py-3 text-deep-neutral shadow-sm transition focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                  placeholder="Enter your email"
                  required
                />
                {errors.email ? (
                  <p className="mt-2 text-sm text-rose-600">{errors.email}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-deep-neutral mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-deep-neutral/20 bg-warm-beige/50 px-4 py-3 text-deep-neutral shadow-sm transition focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                  placeholder="Create a password"
                  required
                />
                {errors.password ? (
                  <p className="mt-2 text-sm text-rose-600">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-deep-neutral mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-deep-neutral/20 bg-warm-beige/50 px-4 py-3 text-deep-neutral shadow-sm transition focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword ? (
                  <p className="mt-2 text-sm text-rose-600">
                    {errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-terracotta px-4 py-3 text-white font-semibold shadow-lg shadow-terracotta/15 transition hover:bg-terracotta/90"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-deep-neutral/70">
              <p>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-terracotta hover:text-terracotta/80 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center text-sm">
              <Link
                href="/"
                className="text-sage-green hover:text-sage-green/80 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
