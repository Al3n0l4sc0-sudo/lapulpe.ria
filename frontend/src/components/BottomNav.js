import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Search, ShoppingCart, User, LayoutDashboard, History, Megaphone, Store, Briefcase } from 'lucide-react';

const BottomNav = ({ user, cartCount = 0, activeTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path, tabName) => {
    if (activeTab) return activeTab === tabName;
    return location.pathname === path;
  };

  const navItems = user?.user_type === 'pulperia' ? [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', testId: 'nav-dashboard', tab: 'dashboard' },
    { icon: Briefcase, label: 'Chamba', path: '/jobs', testId: 'nav-jobs', tab: 'jobs' },
    { icon: History, label: 'Historial', path: '/order-history', testId: 'nav-history', tab: 'historial' },
    { icon: User, label: 'Perfil', path: '/profile', testId: 'nav-profile', tab: 'perfil' },
  ] : [
    { icon: MapPin, label: 'Mapa', path: '/map', testId: 'nav-map', tab: 'mapa' },
    { icon: Search, label: 'Buscar', path: '/search', testId: 'nav-search', tab: 'buscar' },
    { icon: Briefcase, label: 'Chamba', path: '/jobs', testId: 'nav-jobs', tab: 'jobs' },
    { icon: ShoppingCart, label: 'Carrito', path: '/cart', testId: 'nav-cart', tab: 'carrito', badge: cartCount },
    { icon: User, label: 'Perfil', path: '/profile', testId: 'nav-profile', tab: 'perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 safe-area-pb">
      {/* Línea de brillo */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.tab);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              data-testid={item.testId}
              className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 ${
                active 
                  ? 'text-red-400' 
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {/* Glow effect for active */}
              {active && (
                <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-sm" />
              )}
              
              <div className="relative">
                <Icon className={`w-5 h-5 transition-all ${active ? 'scale-110' : ''}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-br from-red-500 to-red-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium relative ${active ? 'text-red-400' : ''}`}>
                {item.label}
              </span>
              
              {/* Active indicator */}
              {active && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
