"use client";

import { CommentSection } from "@/components/story/CommentSection";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface StoryDetailProps {
  initialStory: {
    _id: string;
    title: string;
    content: string;
    visibility: string;
    createdAt: string;
    updatedAt?: string;
    upvotesCount: number;
    downvotesCount: number;
    commentsCount: number;
    author: {
      username: string;
      displayName: string;
    };
  };
  initialUserVote?: "up" | "down" | null;
}

export function StoryDetail({
  initialStory,
  initialUserVote = null,
}: StoryDetailProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [userVote, setUserVote] = useState<"up" | "down" | null>(
    initialUserVote,
  );
  const [counts, setCounts] = useState({
    upvotesCount: initialStory.upvotesCount,
    downvotesCount: initialStory.downvotesCount,
  });
  const [isVoting, setIsVoting] = useState(false);

  const storyQuery = useQuery({
    queryKey: ["story", initialStory._id],
    queryFn: async () => {
      const response = await fetch(`/api/stories/${initialStory._id}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to load story");
      }
      const payload = await response.json();
      return payload.data as StoryDetailProps["initialStory"];
    },
    initialData: initialStory,
  });

  const voteMutation = useMutation({
    mutationFn: async (type: "up" | "down") => {
      const response = await fetch(`/api/stories/${initialStory._id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit vote");
      }

      return response.json();
    },
    onSuccess: (result) => {
      setCounts({
        upvotesCount: result.data.upvotesCount,
        downvotesCount: result.data.downvotesCount,
      });
      setUserVote(result.data.userVote);
      queryClient.invalidateQueries({ queryKey: ["story", initialStory._id] });
    },
  });

  const story = storyQuery.data || initialStory;

  const onVote = (type: "up" | "down") => {
    if (!user || isVoting) {
      return;
    }

    setIsVoting(true);
    voteMutation.mutate(type, {
      onSettled: () => {
        setIsVoting(false);
      },
    });
  };

  return (
    <section className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.25)] sm:p-10">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
          {story.visibility === "relatives" ? "Family only" : "Public"}
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">{story.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span>{story.author.displayName}</span>
          <span>@{story.author.username}</span>
          <span>{new Date(story.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700">
        <p>{story.content}</p>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <span>{counts.upvotesCount} upvotes</span>
          <span>{counts.downvotesCount} downvotes</span>
          <span>{story.commentsCount} comments</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onVote("up")}
            disabled={!user || isVoting}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-700"
          >
            {userVote === "up" ? "Remove upvote" : "Upvote"}
          </button>
          <button
            type="button"
            onClick={() => onVote("down")}
            disabled={!user || isVoting}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-400"
          >
            {userVote === "down" ? "Remove downvote" : "Downvote"}
          </button>
        </div>
      </div>

      <CommentSection storyId={story._id} />
    </section>
  );
}
