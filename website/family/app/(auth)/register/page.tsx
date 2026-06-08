"use client";

import { FormField } from "@/components/forms/FormField";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const password = watch("password") ?? "";

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: RegisterInput) => {
    setSubmitError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          displayName: data.displayName,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const responseData = await res.json();
      const email = responseData.data.email;

      // Redirect to verify-email page with email as query parameter
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      setSubmitError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:py-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.1fr] lg:items-center">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 min-h-[500px] flex items-center p-8 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.25)] sm:p-10">
          <Image
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=80"
            alt="Multi-generational family walking"
            fill
            className="absolute inset-0 object-cover opacity-40"
            priority
          />
          <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-xl border border-white/40 backdrop-blur-md sm:p-8">
            <span className="inline-flex rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-700">
              Start your family legacy
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Create your RootLink account
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              Bring your family closer with a secure account that protects your
              stories and keeps your tree connected.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/50 bg-white/40 p-4">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Simple onboarding
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Create your account in a few easy steps and start sharing
                  family stories.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/50 bg-white/40 p-4">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Safe by design
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Your credentials are validated and stored through secure
                  authentication flows.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_40px_100px_-60px_rgba(15,23,42,0.25)] sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Create account
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Welcome to RootLink
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Fill in the details below and choose a password that keeps your
              family stories secure.
            </p>
          </div>

          {submitError ? (
            <div
              role="alert"
              className="mb-6 rounded-3xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {submitError}
            </div>
          ) : null}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              label="Full name"
              htmlFor="displayName"
              helpText="Use the name you’d like your relatives to see."
              error={errors.displayName?.message}
            >
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  {...register("displayName")}
                  id="displayName"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
                />
              </div>
            </FormField>

            <FormField
              label="Username"
              htmlFor="username"
              helpText="Choose a unique username for logging in."
              error={errors.username?.message}
            >
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  {...register("username")}
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Choose a username"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
                />
              </div>
            </FormField>

            <FormField
              label="Email"
              htmlFor="email"
              helpText="We’ll use this email for account recovery and notifications."
              error={errors.email?.message}
            >
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
                />
              </div>
            </FormField>

            <PasswordInput
              id="password"
              label="Create a password"
              register={register("password")}
              error={errors.password?.message}
              helpText="Your password should be strong and easy for you to remember."
            />

            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Password requirements
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {passwordChecks.map((item) => (
                  <li
                    key={item.label}
                    className={item.valid ? "text-emerald-600" : ""}
                  >
                    {item.valid ? "✓" : "○"} {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full rounded-2xl px-4 py-3 text-sm font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-slate-900 hover:text-sky-600"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
