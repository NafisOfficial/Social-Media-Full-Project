"use client";

import { useAuth } from "@/context/AuthContext";
import { Bell, Home, LogOut, Menu, Trees, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/tree", label: "My Tree", icon: Trees },
  { href: "/connections", label: "Connections", icon: Users },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading || !user) {
    return null;
  }

  const initial = user.displayName?.charAt(0).toUpperCase() ?? "R";
  const displayName = user.displayName || "RootLink";
  const username = user.username ? `@${user.username}` : "";

  return (
    <>
      {/* Mobile topbar toggle */}
      <div className="lg:hidden border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-emerald-600">RootLink</p>
            <p className="text-sm text-slate-600">Family heritage</p>
          </div>
          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-xl transition-all duration-300 lg:static lg:translate-x-0 lg:shadow-none lg:w-48 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        aria-hidden={
          !open && typeof window !== "undefined" && window.innerWidth < 1024
        }
        style={{ overflow: "hidden" }}
      >
        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <div className="mb-6">
              <div className="rounded-2xl bg-linear-to-b from-emerald-50 to-transparent p-3">
                <p className="text-2xl font-bold text-emerald-600">RootLink</p>
                <p className="text-xs text-slate-600">
                  Family Heritage Platform
                </p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon as any;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-emerald-600 ${active ? "bg-emerald-50 text-emerald-600" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                  {initial}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-slate-600 truncate">{username}</p>
                </div>
              </div>
            </div>

            <button
              onClick={async () => {
                await logout();
                // navigation away handled by parent app
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {open ? (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
        />
      ) : null}
    </>
  );
}
