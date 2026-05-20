"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-warm-beige flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[1.1fr_1.4fr]">
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-linear-to-br from-sage-green/80 via-transparent to-warm-beige/80" />
          <Image
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
            alt="Family gathering"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 flex h-full flex-col justify-end p-10 text-white">
            <span className="text-sm uppercase tracking-[0.3em] text-white/80">
              Family home
            </span>
            <h2 className="mt-4 text-4xl font-playfair font-bold">
              Welcome back
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/85">
              Sign in to continue curating family memories, events, and stories
              in a warm, classic space.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-playfair font-bold text-deep-neutral mb-2">
                Welcome Back
              </h1>
              <p className="text-deep-neutral/70">
                Sign in to your Family account
              </p>
            </div>

            <form className="space-y-6">
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
                  className="w-full rounded-xl border border-deep-neutral/20 bg-warm-beige/50 px-4 py-3 text-deep-neutral shadow-sm transition focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-deep-neutral mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full rounded-xl border border-deep-neutral/20 bg-warm-beige/50 px-4 py-3 pr-28 text-deep-neutral shadow-sm transition focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-3 flex h-11 w-11 items-center justify-center text-deep-neutral transition hover:text-terracotta"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-terracotta px-4 py-3 text-white font-semibold shadow-lg shadow-terracotta/15 transition hover:bg-terracotta/90"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-deep-neutral/70">
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-terracotta hover:text-terracotta/80 font-medium"
                >
                  Sign up
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
