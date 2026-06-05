import Link from "next/link";

interface NotificationItemProps {
  notification: {
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
  };
}

const notificationLabels: Record<
  NotificationItemProps["notification"]["type"],
  { message: string; href: string | null }
> = {
  connection_request: {
    message: "sent you a connection request.",
    href: "/connections",
  },
  connection_accepted: {
    message: "accepted your connection request.",
    href: "/connections",
  },
  story_upvote: {
    message: "upvoted your story.",
    href: "/story/",
  },
  story_comment: {
    message: "commented on your story.",
    href: "/story/",
  },
  story_downvote: {
    message: "downvoted your story.",
    href: "/story/",
  },
};

export function NotificationItem({ notification }: NotificationItemProps) {
  const label = notificationLabels[notification.type];
  const href = notification.story
    ? `${label.href}${notification.story}`
    : label.href;

  return (
    <div
      className={`rounded-3xl border p-6 shadow-sm transition ${
        notification.isRead
          ? "border-slate-200 bg-white"
          : "border-emerald-200 bg-emerald-50"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">
              {notification.actor.displayName}
            </span>{" "}
            {label.message}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
        {href ? (
          <Link
            href={href}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
          >
            View
          </Link>
        ) : null}
      </div>
    </div>
  );
}
