"use client";

import { useState } from "react";

interface StoryComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (story: StoryData) => void;
}

interface StoryData {
  content: string;
  photos?: string[];
  taggedMembers?: string[];
}

export default function StoryComposerModal({
  isOpen,
  onClose,
  onPost,
}: StoryComposerModalProps) {
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [taggedMembers, setTaggedMembers] = useState<string[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotos((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && photos.length === 0) return;

    onPost({
      content,
      photos: photos.length > 0 ? photos : undefined,
      taggedMembers: taggedMembers.length > 0 ? taggedMembers : undefined,
    });

    setContent("");
    setPhotos([]);
    setTaggedMembers([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-bold text-deep-neutral">
              Share a Family Story
            </h2>
            <button
              onClick={onClose}
              className="text-deep-neutral/60 hover:text-deep-neutral transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Story Content */}
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share a family memory, milestone, or update..."
                rows={4}
                className="w-full px-4 py-3 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent resize-none"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-deep-neutral">
                  Add Photos
                </label>
                <label className="cursor-pointer text-terracotta hover:text-terracotta/80 font-medium text-sm">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  Upload Photos
                </label>
              </div>

              {/* Photo Preview */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tag Family Members */}
            <div>
              <label className="block text-sm font-medium text-deep-neutral mb-2">
                Tag Family Members
              </label>
              <input
                type="text"
                placeholder="Search and tag family members..."
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
              />
              {/* Tagged members would show here */}
            </div>

            {/* Preview */}
            {(content.trim() || photos.length > 0) && (
              <div className="border border-deep-neutral/20 rounded-lg p-4 bg-deep-neutral/5">
                <h4 className="text-sm font-medium text-deep-neutral mb-2">
                  Preview:
                </h4>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-deep-neutral/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-deep-neutral/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-deep-neutral">
                          You
                        </span>
                        <span className="text-sm text-deep-neutral/60">
                          now
                        </span>
                      </div>
                      {content && (
                        <p className="text-deep-neutral mb-3">{content}</p>
                      )}
                      {photos.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {photos.slice(0, 4).map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-deep-neutral/10 text-deep-neutral rounded-lg hover:bg-deep-neutral/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content.trim() && photos.length === 0}
                className="flex-1 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Share Story
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
