'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useSweetAlert } from '@/hooks/useSweetAlert';
import { LogOut, Home, Trees, Users, Bell } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const { showToast } = useSweetAlert();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router, mounted]);

  if (!mounted || loading || !user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      await showToast('Logged out successfully', 'success');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">RootLink</h1>
          <p className="text-sm text-gray-600">Family Heritage Platform</p>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          <Link
            href="/feed"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
          >
            <Home className="h-5 w-5" />
            Feed
          </Link>

          <Link
            href="/tree"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
          >
            <Trees className="h-5 w-5" />
            My Tree
          </Link>

          <Link
            href="/connections"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
          >
            <Users className="h-5 w-5" />
            Connections
          </Link>

          <Link
            href="/notifications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
          >
            <Bell className="h-5 w-5" />
            Notifications
          </Link>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 w-64 p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.displayName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{user?.displayName}</p>
              <p className="text-xs text-gray-600 truncate">@{user?.username}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>
    </div>
  );
}
