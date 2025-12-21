import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAdminEmail } from '../utils/adminUtils';
import { User, LogOut, ChevronDown, Settings, Shield } from 'lucide-react';

export function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = isAdminEmail(user?.email);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
        >
          Connexion
        </Link>
        <Link
          to="/register"
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-green-500/30 text-sm"
        >
          Inscription
        </Link>
      </div>
    );
  }

  const userInitials = user.first_name && user.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.first_name || user.email}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-sm">
            {userInitials}
          </div>
        )}
        <span className="hidden md:inline text-sm font-medium text-gray-700">
          {user.first_name || user.email.split('@')[0]}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">
                {user.first_name && user.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user.email}
              </p>
              <p className="text-xs text-gray-500 mt-1">{user.email}</p>
            </div>

            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="w-4 h-4" />
              Mon profil
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Paramètres
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 transition-colors border-l-2 border-purple-600"
              >
                <Shield className="w-4 h-4" />
                Administration
              </Link>
            )}

            <div className="border-t border-gray-200 my-2"></div>

            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </>
      )}
    </div>
  );
}

