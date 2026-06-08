import Link from "next/link";
import Image from "next/image";
import { MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";

interface StoryCardProps {
  story: {
    _id: string;
    title: string;
    content: string;
    visibility: string;
    createdAt: string;
    upvotesCount: number;
    downvotesCount: number;
    commentsCount: number;
    author: {
      username: string;
      displayName: string;
      avatarUrl?: string;
    };
  };
}

export function StoryCard({ story }: StoryCardProps) {
  const excerpt =
    story.content.length > 220
      ? `${story.content.slice(0, 220)}...`
      : story.content;

  const initial = story.author.displayName?.charAt(0).toUpperCase() ?? "U";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            story.visibility === "relatives" 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
              : "bg-blue-50 text-blue-700 border border-blue-100"
          }`}>
            {story.visibility === "relatives" ? "Relatives Only" : "Public"}
          </span>
          <h2 className="mt-3 text-xl font-bold text-slate-900 hover:text-emerald-600 transition">
            <Link href={`/story/${story._id}`}>{story.title}</Link>
          </h2>
        </div>
        <time className="text-xs text-slate-400 font-medium">
          {new Date(story.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">{excerpt}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
        {/* Author Avatar & Username */}
        <div className="flex items-center gap-3">
          {story.author.avatarUrl ? (
            <div className="relative w-9 h-9 rounded-2xl overflow-hidden shrink-0 border border-slate-150 bg-slate-100 shadow-2xs">
              <Image
                src={story.author.avatarUrl}
                alt={story.author.displayName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-xs font-bold text-white shadow-2xs">
              {initial}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-none">
              {story.author.displayName}
            </p>
            <p className="text-xs text-slate-400 mt-1">@{story.author.username}</p>
          </div>
        </div>

        {/* Action Counts */}
        <div className="flex items-center gap-3 text-slate-500">
          <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium border border-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{story.upvotesCount}</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium border border-slate-100 hover:bg-rose-50 hover:text-rose-600 transition">
            <ThumbsDown className="h-3.5 w-3.5" />
            <span>{story.downvotesCount}</span>
          </span>
          <Link href={`/story/${story._id}#comments`} className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium border border-slate-100 hover:bg-blue-50 hover:text-blue-600 transition">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{story.commentsCount}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
