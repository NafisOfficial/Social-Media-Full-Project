'use client';

import { useAuth } from '@/context/AuthContext';
import { useSweetAlert } from '@/hooks/useSweetAlert';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeedPage() {
  const { user } = useAuth();
  const { showInfo } = useSweetAlert();

  const handleCreateStory = async () => {
    await showInfo('Coming Soon!', 'Story creation feature will be available soon');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, {user?.displayName}!</h1>
          <p className="text-gray-600">Share your family stories and connect with relatives</p>
        </div>

        {/* Create Story Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Share a Story</h2>
              <p className="text-gray-600">Tell your family's stories and memories</p>
            </div>
            <button
              onClick={handleCreateStory}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              <BookOpen className="h-5 w-5" />
              New Story
            </button>
          </div>
        </div>

        {/* Empty Feed State */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No stories yet</h3>
          <p className="text-gray-600 mb-6">Be the first to share a story with your family</p>
          <button
            onClick={handleCreateStory}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Create Your First Story
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Link
            href="/tree"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Build Your Family Tree</h3>
            <p className="text-gray-600 text-sm">Add family members and create relationships</p>
          </Link>

          <Link
            href="/connections"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Connect with Family</h3>
            <p className="text-gray-600 text-sm">Send and manage connection requests</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
