"use client";

import MobileBottomNavigation from "@/components/MobileBottomNavigation";
import StoryComposerModal from "@/components/StoryComposerModal";
import TopNavigation from "@/components/TopNavigation";
import { useState } from "react";

const stories = [
  {
    author: "Sarah Johnson",
    time: "2 hours ago",
    text: "Remembering the time we all went camping in the mountains last summer. The kids had so much fun exploring and we made so many memories!",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    author: "David Lee",
    time: "Yesterday",
    text: "We finally finished scanning Grandma's old photo albums — every picture feels like a time capsule. So grateful to share them with everyone.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

export default function Stories() {
  const [isComposerModalOpen, setIsComposerModalOpen] = useState(false);

  const handlePostStory = (story: any) => {
    console.log("Posting story:", story);
    // TODO: Post story
  };

  return (
    <div className="min-h-screen bg-warm-beige">
      <TopNavigation />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-playfair font-bold text-deep-neutral">
            Family Stories
          </h1>
          <button
            onClick={() => setIsComposerModalOpen(true)}
            className="px-5 py-3 bg-terracotta text-white rounded-full hover:bg-terracotta/90 transition-colors"
          >
            Share a Story
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
                alt="Your avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Share a family memory..."
                className="w-full p-4 border border-deep-neutral/20 rounded-3xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent resize-none"
                rows={4}
              ></textarea>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button className="inline-flex items-center gap-2 text-deep-neutral/60 hover:text-terracotta transition-colors">
                  <span>📷</span>
                  <span>Attach photos</span>
                </button>
                <button className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {stories.map((story) => (
            <div
              key={story.author}
              className="bg-white rounded-3xl shadow-sm p-6"
            >
              <div className="flex items-start gap-4">
                <img
                  src={story.avatar}
                  alt={story.author}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-deep-neutral">
                        {story.author}
                      </h3>
                      <p className="text-sm text-deep-neutral/60">
                        {story.time}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-deep-neutral/80">{story.text}</p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {story.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`${story.author} story ${index + 1}`}
                        className="h-40 w-full rounded-3xl object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileBottomNavigation />

      <StoryComposerModal
        isOpen={isComposerModalOpen}
        onClose={() => setIsComposerModalOpen(false)}
        onPost={handlePostStory}
      />
    </div>
  );
}
