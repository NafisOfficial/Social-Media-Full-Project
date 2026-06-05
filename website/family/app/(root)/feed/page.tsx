"use client";

import { StoryCreateForm } from "@/components/story/StoryCreateForm";
import { StoryFeed } from "@/components/story/StoryFeed";
import { useAuth } from "@/context/AuthContext";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function FeedPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-8xl space-y-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.25)] sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Family feed
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">
                Welcome back, {user?.displayName}!
              </h1>
              <p className="mt-2 text-slate-600">
                Share stories, celebrate family milestones, and keep your
                relatives connected.
              </p>
            </div>
            <a
              href="#story-form"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <BookOpen className="h-5 w-5" />
              New Story
            </a>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-6">
            <StoryFeed />
          </div>

          <section className="space-y-6">
            <StoryCreateForm />

            <Link
              href="/tree"
              className="block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Family tree
              </p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                Build your family tree
              </h3>
              <p className="mt-2 text-slate-600">
                Add family members, connect relatives, and visualize your
                heritage.
              </p>
            </Link>
            <Link
              href="/connections"
              className="block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Connections
              </p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                Invite relatives
              </h3>
              <p className="mt-2 text-slate-600">
                Send connection requests and manage your family network in one
                place.
              </p>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
