import { ArrowRight, CalendarDays, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.25)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
                See RootLink in action
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Discover how your family can stay connected, together.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Explore how RootLink helps families build their trees, share
                stories, and keep every relative in the loop.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-3 text-slate-900">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                    <p className="font-medium">
                      Live preview of family tree features
                    </p>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-3 text-slate-900">
                    <ShieldCheck className="h-5 w-5 text-sky-600" />
                    <p className="font-medium">
                      Secure login and privacy controls
                    </p>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-3 text-slate-900">
                    <CalendarDays className="h-5 w-5 text-violet-600" />
                    <p className="font-medium">
                      Quick startup guidance for your first branch
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Sign in instead
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl shadow-slate-900/10">
              <div className="rounded-3xl bg-slate-900/95 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                  Demo overview
                </p>
                <h2 className="mt-5 text-3xl font-semibold">What you'll see</h2>
                <ul className="mt-8 space-y-4 text-sm text-slate-300">
                  <li>• How to create a secure family account</li>
                  <li>• The easiest way to add relatives and grow your tree</li>
                  <li>• A preview of family story sharing and comments</li>
                  <li>• How privacy is controlled within RootLink</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
