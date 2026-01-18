'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">/-\ |</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              SourceCraft AI
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors px-4 py-2 rounded-md hover:bg-indigo-50"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}