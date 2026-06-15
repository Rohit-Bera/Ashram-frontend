import { BookOpen, Compass, Calendar, ShoppingBag, User, LogOut, Info, Landmark } from 'lucide-react';
import { useGlobalContext } from '../../context/LangContext';

type ViewType = 'home' | 'gurus' | 'ashrams' | 'store' | 'events' | 'blogs' | 'admin' | 'dashboard' | 'about';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenCart: () => void;
  onOpenAuth: (registerMode: boolean) => void;
  onClearDetailViews: () => void;
}

export function Header({ currentView, onNavigate, onOpenCart, onOpenAuth, onClearDetailViews }: HeaderProps) {
  const { language, setLanguage, translateUI, currentUser, logoutUser, orderTotalQuantity, enabledLanguages } = useGlobalContext();

  const NAV_TABS = [
    { id: 'home' as ViewType, label: 'Home / Sanctuary', icon: Compass },
    { id: 'about' as ViewType, label: 'About Us', icon: Info },
    { id: 'gurus' as ViewType, label: translateUI('navGurus'), icon: BookOpen },
    { id: 'ashrams' as ViewType, label: translateUI('navAshrams'), icon: Landmark },
    { id: 'events' as ViewType, label: translateUI('navEvents'), icon: Calendar },
    { id: 'store' as ViewType, label: translateUI('navStore'), icon: ShoppingBag },
    { id: 'blogs' as ViewType, label: translateUI('navBlogs'), icon: BookOpen },
  ];

  const isAdmin = currentUser?.role === 'Super Admin' || currentUser?.role === 'Content Manager' || currentUser?.role === 'Store Manager';

  return (
    <header className="sticky top-0 z-40 bg-white/50 backdrop-blur-md border-b border-amber-100 shadow-sm">

      {/* Top ticker */}
      <div className="bg-[#5C4D3C] text-[#FAF7F2] px-4 py-1.5 text-[11px] flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <span className="opacity-95 font-medium flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5 text-[#FF9933]" />
            Kriya Yoga Portal
          </span>
          <span className="hidden sm:inline opacity-65 font-mono">2026 spiritual calendar</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 pr-4 border-r border-[#FAF7F2]/10 select-none">
            {enabledLanguages.filter(l => l.enabled).map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as any)}
                className={`px-1.5 py-0.5 rounded transition-all text-[10px] font-bold uppercase ${
                  language === lang.code
                    ? 'bg-[#FF9933] text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100 hover:bg-[#FAF7F2]/10'
                }`}
              >
                {lang.code}
              </button>
            ))}
          </div>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="font-bold opacity-90 text-[#FF9933] pointer-events-none italic">{currentUser.name}</span>
              <button
                onClick={logoutUser}
                className="opacity-75 hover:opacity-100 hover:text-rose-400 transition-colors flex items-center gap-0.5 font-bold cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth(false)}
              className="opacity-95 font-bold hover:text-[#FF9933] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#FF9933]" />
              Devotee Sign In
            </button>
          )}
        </div>
      </div>

      {/* Main nav row */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center gap-4">
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 bg-[#FF9933] rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-inner group-hover:bg-[#E68019] transition-colors">
            <Compass className="w-5.5 h-5.5 animate-spin" style={{ animationDuration: '60s' }} />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#5C4D3C] tracking-tight leading-none">
              {translateUI('appName')}
            </h1>
            <p className="text-[10px] text-amber-700 font-bold tracking-widest mt-0.5 uppercase">
              {translateUI('ashramSlogan')}
            </p>
          </div>
        </div>

        {currentView !== 'admin' && (
          <nav className="hidden md:flex items-center gap-1 text-xs">
            {NAV_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { onNavigate(tab.id); onClearDetailViews(); }}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                  currentView === tab.id
                    ? 'bg-amber-100 text-amber-950 font-bold shadow-sm'
                    : 'text-amber-850 hover:bg-amber-50 hover:text-amber-950'
                }`}
              >
                <tab.icon className="w-4 h-4 text-[#FF9933]" />
                {tab.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                className="ml-2 px-3 py-1.5 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 bg-white text-amber-900 border-amber-200 hover:bg-amber-50"
              >
                ⚙️ {translateUI('navAdmin')}
              </button>
            )}
          </nav>
        )}

        {currentView === 'admin' && (
          <button
            onClick={() => onNavigate('home')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-800 border border-amber-200 rounded-xl hover:bg-amber-50 transition-colors"
          >
            ← Back to Site
          </button>
        )}

        <div className="flex items-center gap-2">
          {currentUser && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`p-2.5 rounded-xl transition-all border shrink-0 flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-amber-100 border-amber-300 text-amber-950 font-bold'
                  : 'bg-white border-amber-200 text-amber-800 hover:bg-amber-50'
              }`}
            >
              <User className="w-4 h-4 text-[#FF9933]" />
              <span className="hidden lg:inline text-xs">Dashboard</span>
            </button>
          )}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-[#FF9933] hover:bg-[#E68019] text-white rounded-xl shadow transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0 animate-pulse duration-1000"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold font-serif hidden sm:inline">My Cart</span>
            <span className="bg-[#5C4D3C] text-white text-[10px] font-bold w-5 h-5 rounded-full flex justify-center items-center shadow-inner">
              {orderTotalQuantity}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav strip */}
      {currentView !== 'admin' && (
        <div className="md:hidden bg-amber-50/70 border-t border-amber-100/50 px-2.5 py-1.5 overflow-x-auto flex gap-1.5 scrollbar-none text-xs">
          {NAV_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { onNavigate(tab.id); onClearDetailViews(); }}
              className={`px-3 py-1.5 rounded-lg transition-all shrink-0 flex items-center gap-1 ${
                currentView === tab.id
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-white text-amber-800 border border-amber-100/70'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
          {isAdmin && (
            <button
              onClick={() => onNavigate('admin')}
              className="px-3 py-1.5 rounded-lg transition-all shrink-0 font-bold border bg-white text-amber-900"
            >
              ⚙️ Admin
            </button>
          )}
        </div>
      )}
    </header>
  );
}
