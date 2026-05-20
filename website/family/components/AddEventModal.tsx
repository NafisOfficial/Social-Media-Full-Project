"use client";

import { useState } from "react";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: EventData) => void;
}

interface EventData {
  title: string;
  type: "birthday" | "anniversary" | "reunion" | "memorial" | "custom";
  date: string;
  description: string;
  location?: string;
  personId?: string; // For birthdays/anniversaries
}

const eventTypes = [
  { value: "birthday", label: "Birthday", icon: "🎂" },
  { value: "anniversary", label: "Anniversary", icon: "💍" },
  { value: "reunion", label: "Family Reunion", icon: "👨‍👩‍👧‍👦" },
  { value: "memorial", label: "Memorial", icon: "🕊️" },
  { value: "custom", label: "Custom Event", icon: "📅" },
];

export default function AddEventModal({
  isOpen,
  onClose,
  onAdd,
}: AddEventModalProps) {
  const [formData, setFormData] = useState<EventData>({
    title: "",
    type: "birthday",
    date: "",
    description: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      title: "",
      type: "birthday",
      date: "",
      description: "",
      location: "",
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

  const handleTypeChange = (type: EventData["type"]) => {
    setFormData({
      ...formData,
      type,
      title:
        type === "custom"
          ? ""
          : eventTypes.find((t) => t.value === type)?.label || "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-bold text-deep-neutral">
              Add New Event
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
            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-deep-neutral mb-3">
                Event Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      handleTypeChange(type.value as EventData["type"])
                    }
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      formData.type === type.value
                        ? "border-terracotta bg-terracotta/5 text-terracotta"
                        : "border-deep-neutral/20 hover:border-deep-neutral/40"
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Event Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-deep-neutral mb-2"
              >
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Emma's Birthday Party"
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-deep-neutral mb-2"
              >
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-deep-neutral mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Grandma's House, Central Park"
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
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
                placeholder="Add details about this event..."
                rows={3}
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent resize-none"
              />
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
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
