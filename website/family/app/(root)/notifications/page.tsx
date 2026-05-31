'use client';

import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Notifications</h1>

        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Notifications</h3>
          <p className="text-gray-600">You're all caught up!</p>
        </div>
      </div>
    </div>
  );
}
