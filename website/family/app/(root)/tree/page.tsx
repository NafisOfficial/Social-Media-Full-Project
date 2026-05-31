'use client';

import { useSweetAlert } from '@/hooks/useSweetAlert';
import { Trees } from 'lucide-react';

export default function TreePage() {
  const { showInfo } = useSweetAlert();

  const handleAddMember = async () => {
    await showInfo('Coming Soon!', 'Family tree visualization and member management coming soon');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Family Tree</h1>

        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Trees className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Family Tree</h3>
          <p className="text-gray-600 mb-6">Build and visualize your family tree here</p>
          <button
            onClick={handleAddMember}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Add Family Member
          </button>
        </div>
      </div>
    </div>
  );
}
