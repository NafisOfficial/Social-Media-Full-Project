"use client";

import AddEventModal from "@/components/AddEventModal";
import MobileBottomNavigation from "@/components/MobileBottomNavigation";
import TopNavigation from "@/components/TopNavigation";
import { useState } from "react";

const events = [
  {
    title: "Emma's Birthday",
    date: "March 15, 2024",
    description:
      "A cozy afternoon celebration with cake, cards, and family stories.",
    badge: "Birthday",
    accent: "bg-peach/20 text-peach",
  },
  {
    title: "Family Picnic",
    date: "March 22, 2024",
    description: "A backyard potluck with games, photos, and spring sunshine.",
    badge: "Gathering",
    accent: "bg-sage-green/20 text-sage-green",
  },
  {
    title: "Mother's Day Brunch",
    date: "May 12, 2024",
    description:
      "Brunch at Grandma's house with handwritten cards and flowers.",
    badge: "Special",
    accent: "bg-terracotta/20 text-terracotta",
  },
];

export default function Events() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddEvent = (event: any) => {
    console.log("Adding event:", event);
    // TODO: Add event
  };

  return (
    <div className="min-h-screen bg-warm-beige">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-playfair font-bold text-deep-neutral">
            Family Events
          </h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 bg-terracotta text-white rounded-full hover:bg-terracotta/90 transition-colors"
          >
            Add New Event
          </button>
        </div>

        <div className="space-y-5">
          {events.map((event) => (
            <div
              key={event.title}
              className="bg-white rounded-3xl shadow-sm p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${event.accent}`}
                    >
                      {event.badge}
                    </span>
                    <p className="text-sm text-deep-neutral/60">{event.date}</p>
                  </div>
                  <h3 className="text-xl font-semibold text-deep-neutral">
                    {event.title}
                  </h3>
                  <p className="text-deep-neutral/70 mt-2">
                    {event.description}
                  </p>
                </div>
                <button className="inline-flex items-center justify-center rounded-full bg-sage-green px-5 py-3 text-sm font-semibold text-white hover:bg-sage-green/90 transition-colors">
                  RSVP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileBottomNavigation />

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEvent}
      />
    </div>
  );
}
