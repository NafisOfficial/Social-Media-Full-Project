"use client";

import { useAuth } from "@/context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";

interface CommentData {
  _id: string;
  content: string;
  createdAt: string;
  author: {
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
}

interface CommentSectionProps {
  storyId: string;
}

export function CommentSection({ storyId }: CommentSectionProps) {
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const commentsQuery = useQuery<CommentData[]>({
    queryKey: ["storyComments", storyId],
    queryFn: async () => {
      const response = await fetch(`/api/stories/${storyId}/comments`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Unable to load comments");
      }
      const payload = await response.json();
      return payload.data as CommentData[];
    },
  });

  const submitComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || !content.trim()) {
      return;
    }

    const response = await fetch(`/api/stories/${storyId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content.trim() }),
    });

    if (!response.ok) {
      return;
    }

    setContent("");
    await queryClient.invalidateQueries({
      queryKey: ["storyComments", storyId],
    });
    await queryClient.invalidateQueries({ queryKey: ["story", storyId] });
  };

  const deleteComment = async (commentId: string) => {
    const response = await fetch(
      `/api/stories/${storyId}/comments/${commentId}`,
      { method: "DELETE" },
    );

    if (!response.ok) {
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["storyComments", storyId],
    });
    await queryClient.invalidateQueries({ queryKey: ["story", storyId] });
  };

  return (
    <div id="comments" className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Comments</h2>
          <p className="text-xs text-slate-500">
            Share feedback, memories, or thoughtful replies.
          </p>
        </div>
      </div>

      {user ? (
        <form onSubmit={submitComment} className="space-y-3">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="Write a comment..."
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!content.trim() || commentsQuery.isFetching}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-700"
            >
              Post comment
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
          {loading
            ? "Checking authentication..."
            : "Sign in to post comments and join the conversation."}
        </div>
      )}

      {commentsQuery.isLoading ? (
        <p className="text-sm text-slate-400">Loading comments…</p>
      ) : commentsQuery.error ? (
        <p className="text-sm text-rose-600">Unable to load comments.</p>
      ) : commentsQuery.data?.length ? (
        <div className="space-y-4">
          {commentsQuery.data.map((comment) => {
            const initial = comment.author.displayName?.charAt(0).toUpperCase() ?? "?";
            return (
              <div
                key={comment._id}
                className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 hover:bg-slate-50 transition duration-150"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {comment.author.avatarUrl ? (
                      <div className="relative w-8 h-8 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                        <Image
                          src={comment.author.avatarUrl}
                          alt={comment.author.displayName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-[10px] font-bold text-white">
                        {initial}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 leading-none">
                        {comment.author.displayName}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        @{comment.author.username}
                      </p>
                    </div>
                  </div>
                  <time className="text-[10px] text-slate-400 font-medium">
                    {new Date(comment.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 pl-1">
                  {comment.content}
                </p>
                {user?.username === comment.author.username && (
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      onClick={() => deleteComment(comment._id)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-xs text-slate-500">
          No comments yet. Start the conversation with the first reply.
        </div>
      )}
    </div>
  );
}
