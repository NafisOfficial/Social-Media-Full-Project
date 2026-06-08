"use client";

import { StoryCreateForm } from "@/components/story/StoryCreateForm";
import { StoryFeed } from "@/components/story/StoryFeed";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Trees, Users2 } from "lucide-react";
import Link from "next/link";

export default function FeedPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-slate-50/50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        
        {/* Welcome Header */}
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_15px_50px_-30px_rgba(15,23,42,0.15)] sm:p-10">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-50 opacity-40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-teal-50 opacity-40 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                Family feed
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back, {user?.displayName}!
              </h1>
              <p className="text-sm text-slate-600 max-w-xl">
                Share stories, celebrate family milestones, and keep your relatives connected across generations.
              </p>
            </div>
            <a
              href="#story-form"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700 shadow-md shadow-emerald-600/10 active:scale-98"
            >
              <BookOpen className="h-4 w-4" />
              New Story
            </a>
          </div>
        </section>

        {/* 2-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.95fr] items-start">
          {/* Main Feed */}
          <div className="space-y-6">
            <StoryFeed />
          </div>

          {/* Sidebar Widgets */}
          <aside className="space-y-6 lg:sticky lg:top-8">
            <StoryCreateForm />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Link
                href="/tree"
                className="group block rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition duration-200">
                    <Trees className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Family tree
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Explore and build your tree
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link
                href="/connections"
                className="group block rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-200">
                    <Users2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Connections
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Manage requests & relatives
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}
