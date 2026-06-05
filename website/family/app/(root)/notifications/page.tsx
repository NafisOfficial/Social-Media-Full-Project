"use client";

import { NotificationItem } from "@/components/notifications/NotificationItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Check, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";

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

async function fetchNotifications() {
  const response = await fetch("/api/notifications?limit=20", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load notifications");
  }

  return response.json() as Promise<NotificationsResponse>;
}

async function markAllNotificationsRead() {
  const response = await fetch("/api/notifications/read", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to mark notifications as read");
  }

  return response.json();
}

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const [isMarkingRead, setIsMarkingRead] = useState(false);

  const notificationsQuery = useQuery<NotificationsResponse>({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const markReadMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onMutate: () => {
      setIsMarkingRead(true);
    },
    onSettled: () => {
      setIsMarkingRead(false);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const unreadCount = useMemo(
    () =>
      notificationsQuery.data?.data.filter(
        (notification) => !notification.isRead,
      ).length ?? 0,
    [notificationsQuery.data],
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
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
                New activity and connection updates will appear here as soon as
                they happen.
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
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ["notifications"] })
                }
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          {notificationsQuery.isLoading ? (
            <div className="text-center py-20 text-slate-500">
              Loading notifications...
            </div>
          ) : notificationsQuery.isError ? (
            <div className="text-center py-20 text-red-600">
              Something went wrong while loading notifications.
            </div>
          ) : !notificationsQuery.data?.data.length ? (
            <div className="text-center py-20">
              <Bell className="mx-auto h-16 w-16 rounded-full border border-slate-200 bg-slate-50 p-3 text-slate-700" />
              <h2 className="mt-6 text-2xl font-semibold text-slate-900">
                No notifications yet
              </h2>
              <p className="mt-3 text-slate-600">
                You’re all caught up. When family members share stories or send
                connection requests, you’ll see them here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
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
