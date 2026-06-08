"use client";

import { NotificationItem } from "@/components/notifications/NotificationItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Check, RefreshCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface NotificationData {
  _id: string;
  type:
    | "connection_request"
    | "connection_accepted"
    | "story_upvote"
    | "story_comment"
    | "story_downvote";
  actor: {
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  story: string | null;
  connectionRequest: string | null;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsResponse {
  data: NotificationData[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

async function fetchNotifications(): Promise<NotificationsResponse> {
  const response = await fetch("/api/notifications?limit=20", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to load notifications");
  }
  return response.json();
}

async function markAllNotificationsRead() {
  const response = await fetch("/api/notifications/read", { method: "POST" });
  if (!response.ok) {
    throw new Error("Failed to mark notifications as read");
  }
  return response.json();
}

/** Invalidate both the list and the sidebar badge count. */
function useInvalidateNotifications() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };
}

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateNotifications();
  const [isMarkingRead, setIsMarkingRead] = useState(false);
  const hasAutoMarked = useRef(false);

  const notificationsQuery = useQuery<NotificationsResponse>({
    queryKey: ["notifications", "list"],
    queryFn: fetchNotifications,
  });

  const markReadMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onMutate: () => setIsMarkingRead(true),
    onSettled: () => {
      setIsMarkingRead(false);
      invalidate();
    },
  });

  // Auto-mark-all-read once when the page first loads and data is ready
  useEffect(() => {
    if (
      !hasAutoMarked.current &&
      notificationsQuery.data?.data.some((n) => !n.isRead)
    ) {
      hasAutoMarked.current = true;
      markReadMutation.mutate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationsQuery.data]);

  const unreadCount = useMemo(
    () =>
      notificationsQuery.data?.data.filter((n) => !n.isRead).length ?? 0,
    [notificationsQuery.data],
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6">

        {/* Header card */}
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.25)] sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Notifications
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">
                Stay in the loop
              </h1>
              <p className="mt-2 text-slate-600">
                Activity and connection updates appear here as soon as they happen.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => markReadMutation.mutate()}
                disabled={unreadCount === 0 || isMarkingRead}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check className="h-4 w-4" />
                Mark all read
              </button>

              <button
                type="button"
                onClick={invalidate}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>

          {unreadCount > 0 && (
            <p className="mt-4 text-sm font-medium text-emerald-700">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </section>

        {/* List */}
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {notificationsQuery.isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : notificationsQuery.isError ? (
            <div className="py-20 text-center text-red-600">
              Something went wrong while loading notifications.
            </div>
          ) : !notificationsQuery.data?.data.length ? (
            <div className="py-20 text-center">
              <Bell className="mx-auto h-16 w-16 rounded-full border border-slate-200 bg-slate-50 p-3 text-slate-400" />
              <h2 className="mt-6 text-xl font-semibold text-slate-900">
                No notifications yet
              </h2>
              <p className="mt-3 text-slate-500">
                When family members share stories or send connection requests,
                you&apos;ll see them here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notificationsQuery.data.data.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
