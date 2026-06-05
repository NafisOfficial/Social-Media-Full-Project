import Link from "next/link";

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
    };
  };
}

export function StoryCard({ story }: StoryCardProps) {
  const excerpt =
    story.content.length > 220
      ? `${story.content.slice(0, 220)}...`
      : story.content;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            {story.visibility === "relatives" ? "Family" : "Public"}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            {story.title}
          </h2>
        </div>
        <time className="text-sm text-slate-500">
          {new Date(story.createdAt).toLocaleDateString()}
        </time>
      </div>

      <p className="mt-4 text-base leading-7 text-slate-600">{excerpt}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4 text-sm text-slate-500">
        <div className="space-x-3">
          <span className="font-semibold text-slate-900">
            {story.author.displayName}
          </span>
          <span>@{story.author.username}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{story.upvotesCount} 👍</span>
          <span>{story.downvotesCount} 👎</span>
          <span>{story.commentsCount} comments</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end">
        <Link
          href={`/story/${story._id}`}
          className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Read story
        </Link>
      </div>
    </article>
  );
}
