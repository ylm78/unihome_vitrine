import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  MessageSquare,
  Users,
  Settings,
  X,
  Home
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Inventaire', href: '/admin/inventaire', icon: Package },
  { name: 'Commandes', href: '/admin/commandes', icon: ShoppingCart },
  { name: 'Demandes de contact', href: '/admin/demandes-contact', icon: MessageSquare },
  { name: 'Demandes de devis', href: '/admin/demandes-devis', icon: FileText },
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Paramètres', href: '/admin/parametres', icon: Settings },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center gap-3">
            <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">UNIHOME</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administration</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/admin' && location.pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-colors
                        ${isActive
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Retour au site */}
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/"
                className="group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
              >
                <Home className="h-5 w-5 shrink-0" />
                Retour au site
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <aside
        className={`
          fixed inset-y-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 px-6 pb-4">
          {/* Header avec bouton fermer */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">UNIHOME</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administration</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/admin' && location.pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={`
                        group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-colors
                        ${isActive
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Retour au site */}
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/"
                onClick={onClose}
                className="group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
              >
                <Home className="h-5 w-5 shrink-0" />
                Retour au site
              </Link>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}


