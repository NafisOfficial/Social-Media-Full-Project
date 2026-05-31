'use client';

import { useSweetAlert } from '@/hooks/useSweetAlert';
import { Users } from 'lucide-react';

export default function ConnectionsPage() {
  const { showInfo } = useSweetAlert();

  const handleSendRequest = async () => {
    await showInfo('Coming Soon!', 'Connection requests feature coming soon');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Connections</h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Requests</h2>
            <p className="text-gray-600 text-center py-8">No pending requests</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">My Connections</h2>
            <p className="text-gray-600 text-center py-8">No connections yet</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-12 text-center mt-6">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect with Family</h3>
          <p className="text-gray-600 mb-6">Send connection requests to family members</p>
          <button
            onClick={handleSendRequest}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Send Connection Request
          </button>
        </div>
      </div>
    </div>
  );
}
