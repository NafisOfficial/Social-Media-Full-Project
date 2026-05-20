"use client";

import AddFamilyMemberModal from "@/components/AddFamilyMemberModal";
import FamilyTree from "@/components/FamilyTree";
import MobileBottomNavigation from "@/components/MobileBottomNavigation";
import TopNavigation from "@/components/TopNavigation";
import { useState } from "react";

export default function FamilyTreePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddFamilyMember = (member: any) => {
    console.log("Adding family member:", member);
    // TODO: Add member to tree data
  };
  return (
    <div className="min-h-screen bg-warm-beige">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-playfair font-bold text-deep-neutral">
              My Family Tree
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors"
              >
                Add Family Member
              </button>
            </div>
          </div>

          {/* View Toggles */}
          <div className="flex space-x-4 mb-6">
            <button className="px-4 py-2 bg-terracotta text-white rounded-lg">
              Full Tree
            </button>
            <button className="px-4 py-2 bg-deep-neutral/10 text-deep-neutral rounded-lg hover:bg-deep-neutral/20 transition-colors">
              Ancestors
            </button>
            <button className="px-4 py-2 bg-deep-neutral/10 text-deep-neutral rounded-lg hover:bg-deep-neutral/20 transition-colors">
              Descendants
            </button>
            <button className="px-4 py-2 bg-deep-neutral/10 text-deep-neutral rounded-lg hover:bg-deep-neutral/20 transition-colors">
              Compact
            </button>
          </div>

          {/* Family Tree Visualization */}
          <FamilyTree />
        </div>
      </div>

      <MobileBottomNavigation />

      <AddFamilyMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddFamilyMember}
      />
    </div>
  );
}
