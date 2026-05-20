"use client";

import { useState } from "react";

interface CreateAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (album: AlbumData) => void;
}

interface AlbumData {
  name: string;
  description: string;
  privacy: "family" | "branch" | "selected";
  selectedMembers?: string[];
}

export default function CreateAlbumModal({
  isOpen,
  onClose,
  onCreate,
}: CreateAlbumModalProps) {
  const [formData, setFormData] = useState<AlbumData>({
    name: "",
    description: "",
    privacy: "family",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      name: "",
      description: "",
      privacy: "family",
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-bold text-deep-neutral">
              Create New Album
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
            {/* Album Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-deep-neutral mb-2"
              >
                Album Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Summer Vacation 2024"
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-deep-neutral mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell the story behind this album..."
                rows={3}
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent resize-none"
              />
            </div>

            {/* Privacy Settings */}
            <div>
              <label className="block text-sm font-medium text-deep-neutral mb-3">
                Who can see this album?
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="privacy"
                    value="family"
                    checked={formData.privacy === "family"}
                    onChange={handleChange}
                    className="text-terracotta focus:ring-terracotta"
                  />
                  <span className="ml-3 text-deep-neutral">
                    <strong>Whole Family</strong> - Everyone in the family tree
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="privacy"
                    value="branch"
                    checked={formData.privacy === "branch"}
                    onChange={handleChange}
                    className="text-terracotta focus:ring-terracotta"
                  />
                  <span className="ml-3 text-deep-neutral">
                    <strong>Specific Branch</strong> - Only certain family
                    branches
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="privacy"
                    value="selected"
                    checked={formData.privacy === "selected"}
                    onChange={handleChange}
                    className="text-terracotta focus:ring-terracotta"
                  />
                  <span className="ml-3 text-deep-neutral">
                    <strong>Selected Members</strong> - Only specific people
                  </span>
                </label>
              </div>
            </div>

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
                className="flex-1 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors"
              >
                Create Album
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
