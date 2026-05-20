"use client";

import CreateAlbumModal from "@/components/CreateAlbumModal";
import MobileBottomNavigation from "@/components/MobileBottomNavigation";
import TopNavigation from "@/components/TopNavigation";
import { useState } from "react";

const albums = [
  {
    title: "Summer Vacation 2024",
    description: "Sunset memories by the lake with cousins and grandparents.",
    count: 34,
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Grandma's Birthday",
    description: "A cozy family celebration with cake, stories, and laughter.",
    count: 18,
    cover:
      "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Easter Brunch",
    description:
      "A bright morning feast with cousins and handmade decorations.",
    count: 26,
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Family Reunion",
    description: "The whole clan together in a warm backyard celebration.",
    count: 42,
    cover:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Albums() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateAlbum = (album: any) => {
    console.log("Creating album:", album);
    // TODO: Create album
  };

  return (
    <div className="min-h-screen bg-warm-beige">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-playfair font-bold text-deep-neutral">
            Family Albums
          </h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-3 bg-terracotta text-white rounded-full hover:bg-terracotta/90 transition-colors"
          >
            Create New Album
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {albums.map((album) => (
            <div
              key={album.title}
              className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-deep-neutral mb-2">
                  {album.title}
                </h3>
                <p className="text-sm text-deep-neutral/60 mb-4">
                  {album.description}
                </p>
                <div className="flex items-center justify-between text-sm text-deep-neutral/70">
                  <span>{album.count} photos</span>
                  <span className="text-terracotta font-semibold">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileBottomNavigation />

      <CreateAlbumModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateAlbum}
      />
    </div>
  );
}
