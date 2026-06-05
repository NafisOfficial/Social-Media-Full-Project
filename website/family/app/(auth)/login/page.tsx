"use client";

import { FormField } from "@/components/forms/FormField";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LoginInput) => {
    setSubmitError(null);

    try {
      await login(data.email, data.password);
      router.push("/feed");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.";
      setSubmitError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col justify-center gap-8 lg:grid lg:grid-cols-[1.1fr_0.95fr] lg:items-center">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.25)] backdrop-blur-sm sm:p-10">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
              Build the family story you’ll be proud to share
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Welcome back to RootLink
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Sign in quickly and securely to continue growing your family tree,
              sharing stories, and connecting with relatives.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-900">
                  Fast access
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Remembered sessions help you come back to the stories that
                  matter.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-900">
                  Protected data
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Your profile connection is secured with token-based
                  authentication and safe cookies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_40px_100px_-60px_rgba(15,23,42,0.25)] sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Sign in
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Access your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Enter your username and password to continue. If you forgot your
              password, we’ll help get you back in.
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
              label="Email address"
              htmlFor="email"
              helpText="Use the email address you registered with."
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
                  className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </FormField>

            <PasswordInput
              id="password"
              label="Password"
              register={register("password")}
              error={errors.password?.message}
              helpText="Password is case-sensitive."
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-sky-600 transition hover:text-sky-700"
              >
                Forgot password?
              </Link>
              <p className="text-sm text-slate-500">
                New here?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-slate-900 hover:text-sky-600"
                >
                  Create account
                </Link>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full rounded-2xl px-4 py-3 text-sm font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
