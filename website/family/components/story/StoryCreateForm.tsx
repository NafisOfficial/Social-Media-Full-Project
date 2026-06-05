"use client";

import { FormField } from "@/components/forms/FormField";
import { useAuth } from "@/context/AuthContext";
import { useSweetAlert } from "@/hooks/useSweetAlert";
import {
  createStorySchema,
  type CreateStoryInput,
} from "@/lib/validations/story";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function StoryCreateForm() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { showSuccess, showError, showLoading, hideLoading } = useSweetAlert();
  const [isSaving, setIsSaving] = useState(false);
  const [createdTitle, setCreatedTitle] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateStoryInput>({
    resolver: zodResolver(createStorySchema),
    defaultValues: {
      title: "",
      content: "",
      mediaUrls: [],
      visibility: "public",
    },
  });

  const onSubmit = async (data: CreateStoryInput) => {
    if (!user) {
      await showError(
        "Sign in required",
        "Please sign in before posting a story.",
      );
      return;
    }

    setIsSaving(true);
    await showLoading("Posting your story...");

    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to publish story");
      }

      setCreatedTitle(result.data.title);
      reset();
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      await showSuccess(
        "Story published",
        "Your family can now read your story.",
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to publish story.";
      await showError("Publish failed", message);
    } finally {
      hideLoading();
      setIsSaving(false);
    }
  };

  return (
    <form
      id="story-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            New family story
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            Share a memory or update with your relatives.
          </h2>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Posting..." : "Post story"}
        </button>
      </div>

      <FormField
        label="Title"
        htmlFor="title"
        error={errors.title?.message?.toString()}
      >
        <input
          id="title"
          type="text"
          {...register("title")}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          placeholder="A special moment from today"
        />
      </FormField>

      <FormField
        label="Story"
        htmlFor="content"
        error={errors.content?.message?.toString()}
      >
        <textarea
          id="content"
          rows={6}
          {...register("content")}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          placeholder="Tell your family what happened..."
        />
      </FormField>

      <FormField label="Visibility" htmlFor="visibility">
        <select
          id="visibility"
          {...register("visibility")}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="public">Public</option>
          <option value="relatives">Relatives only</option>
        </select>
      </FormField>

      {createdTitle ? (
        <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Your story “{createdTitle}” was successfully posted.
        </div>
      ) : null}
    </form>
  );
}
