import { useState, useEffect } from 'react';
import { AppGlobalProvider, useGlobalContext } from './context/LangContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { CartDrawer } from './drawers/CartDrawer';
import { AuthModal } from './drawers/AuthModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { GurusPage } from './pages/GurusPage';
import { AshramsPage } from './pages/AshramsPage';
import { StorePage } from './pages/StorePage';
import { EventsPage } from './pages/EventsPage';
import { BlogsPage } from './pages/BlogsPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPanel } from './components/AdminPanel';
import { CheckoutModal } from './components/CheckoutModal';
import { AiCompanion } from './components/AiCompanion';
import { Guru, Ashram, Product } from './types';

type ViewType = 'home' | 'gurus' | 'ashrams' | 'store' | 'events' | 'blogs' | 'admin' | 'dashboard' | 'about';

function AppView() {
  const { currentUser } = useGlobalContext();

  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Cross-page entity state
  const [viewedGuru, setViewedGuru] = useState<Guru | null>(null);
  const [viewedAshram, setViewedAshram] = useState<Ashram | null>(null);
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);
  const [storeCategory, setStoreCategory] = useState<string | undefined>(undefined);

  // Redirect admins to admin panel on login
  useEffect(() => {
    if (currentUser?.role === 'Super Admin' || currentUser?.role === 'Content Manager' || currentUser?.role === 'Store Manager') {
      setCurrentView('admin');
    }
  }, [currentUser]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleNavigate = (view: string, extra?: { productCategory?: string }) => {
    setCurrentView(view as ViewType);
    if (extra?.productCategory) {
      setStoreCategory(extra.productCategory);
    }
  };

  const handleClearDetailViews = () => {
    setViewedGuru(null);
    setViewedAshram(null);
    setViewedProduct(null);
  };

  const handleOpenAuth = (registerMode: boolean) => {
    setIsRegisterMode(registerMode);
    setIsAuthOpen(true);
  };

  const handleSelectGuru = (guru: Guru) => {
    setViewedGuru(guru);
    setCurrentView('gurus');
  };

  const handleSelectAshram = (ashram: Ashram) => {
    setViewedAshram(ashram);
    setCurrentView('ashrams');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-amber-900 font-sans flex flex-col justify-between relative selection:bg-amber-100 selection:text-amber-900">

      <Toast message={toastMessage} />

      <Header
        currentView={currentView}
        onNavigate={view => setCurrentView(view as ViewType)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={handleOpenAuth}
        onClearDetailViews={handleClearDetailViews}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 relative">
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onToast={triggerToast}
            onOpenAuth={handleOpenAuth}
            onSelectGuru={handleSelectGuru}
            onSelectAshram={handleSelectAshram}
          />
        )}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'gurus' && (
          <GurusPage
            viewedGuru={viewedGuru}
            setViewedGuru={setViewedGuru}
            onToast={triggerToast}
          />
        )}
        {currentView === 'ashrams' && (
          <AshramsPage
            viewedAshram={viewedAshram}
            setViewedAshram={setViewedAshram}
            onNavigate={handleNavigate}
            onToast={triggerToast}
          />
        )}
        {currentView === 'store' && (
          <StorePage
            viewedProduct={viewedProduct}
            setViewedProduct={setViewedProduct}
            initialCategory={storeCategory}
            onToast={triggerToast}
          />
        )}
        {currentView === 'events' && (
          <EventsPage onToast={triggerToast} onOpenAuth={handleOpenAuth} />
        )}
        {currentView === 'blogs' && (
          <BlogsPage onToast={triggerToast} />
        )}
        {currentView === 'dashboard' && currentUser && <DashboardPage />}
        {currentView === 'admin' && (
          <div className="animate-in fade-in duration-200">
            <AdminPanel />
          </div>
        )}
      </main>

      <Footer onToast={triggerToast} />

      {isCartOpen && (
        <CartDrawer
          onClose={() => setIsCartOpen(false)}
          onToast={triggerToast}
          onNavigateToStore={() => setCurrentView('store')}
          onCheckout={() => { setIsCheckoutOpen(true); setIsCartOpen(false); }}
          onOpenAuth={() => handleOpenAuth(false)}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          isRegisterMode={isRegisterMode}
          onClose={() => setIsAuthOpen(false)}
          onToast={triggerToast}
          onNavigate={view => setCurrentView(view as ViewType)}
          onModeSwitch={setIsRegisterMode}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
          onOrderPlaced={() => {
            setCurrentView('dashboard');
            triggerToast('Auspicious order contribution saved in Goshala records successfully!');
          }}
        />
      )}

      <AiCompanion />
    </div>
  );
}

export default function App() {
  return (
    <AppGlobalProvider>
      <AppView />
    </AppGlobalProvider>
  );
}
