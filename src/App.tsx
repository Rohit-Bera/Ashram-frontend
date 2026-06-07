import React, { useState, useEffect } from 'react';
import { AppGlobalProvider, useGlobalContext } from './components/LangContext';
import { InteractiveGlobe } from './components/InteractiveGlobe';
import { AiCompanion } from './components/AiCompanion';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { GuruLineageTree } from './components/GuruLineageTree';
import {
  BookOpen, Compass, Calendar, ShoppingBag, Heart, User, LogOut, ShieldAlert,
  Search, MapPin, Phone, Mail, Clock, Plus, Minus, Trash, Tag, ArrowRight,
  Sparkles, Star, ChevronLeft, ChevronRight, CheckCircle, Info, Landmark, X
} from 'lucide-react';
import { Product, Ashram, Guru, AshramEvent, BlogArticle } from './types';

// Authentic visual Hero Banner Slides list
const HERO_SLIDES = [
  {
    title: {
      en: 'Welcome to Sri Divine Heritage',
      hi: 'श्री दिव्य विरासत में आपका स्वागत है',
      gu: 'શ્રી દિવ્ય વિરાસતમાં તમારું સ્વાગત છે',
      bn: 'শ্রী দিব্য ঐতিহ্যে আপনাকে স্বাগত'
    },
    sub: {
      en: 'Connecting souls to ancient Gaudiya Vaishnava lineage teachings, world ashrams, and sacred scriptures.',
      hi: 'प्राचीन गौड़ीय वैष्णव संप्रदाय, विश्व के पावन धामों और पवित्र ग्रंथों से आत्माओं का दिव्य जुड़ाव।',
      gu: 'પ્રાચીન ગૌડીય વૈષ્ણવ સંપ્રદાય, વિશ્વના પવિત્ર આશ્રમો અને વેદિક ગ્રંથો સાથે જોડાણ.',
      bn: 'সুপ্রাচীন গৌড়ীয় বৈষ্ণবীয় সাধন-ভজন, বিশ্বব্যাপী বিস্তৃত পবিত্র মন্দির এবং শাস্ত্র গ্রন্থাবলীর সার্থক মেলবন্ধন।'
    },
    action: 'Gurus',
    bg: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: {
      en: 'Discover Auspicious Sacred Spaces',
      hi: 'पावन भारतीय मंदिरों का दर्शन करें',
      gu: 'પવિત્ર ભારતીય મંદિરોના દર્શન કરો',
      bn: 'জগতের পরম পবিত্র ধাম পরিক্রমা'
    },
    sub: {
      en: 'Explore ISKCON Vrindavan, Mayapur Dham, and active communities around the globe through our rotating cosmic globe.',
      hi: 'घूमते हुए ब्रह्मांडीय ग्लोब के माध्यम से इस्कॉन वृंदावन, मायापुर धाम और वैश्विक आध्यात्मिक केंद्रों के दर्शन करें।',
      gu: 'ગ્લોબલ ફરતા મેપ દ્વારા ઇસ્કોન વૃંદાવન, માયાપુર ધામ અને વૈશ્વિક કેન્દ્રોની મુલાકાત લો.',
      bn: 'আমাদের ঘূর্ণায়মান গ্লোবের সাহায্যে মায়াপুর চন্দ্রোদয় মন্দির, শ্রীধাম বৃন্দাবন সহ শাখা মন্দিরসমূহ পরিক্রমা করুন।'
    },
    action: 'Ashrams',
    bg: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: {
      en: 'Acquire Genuine Spiritual Items',
      hi: 'प्रामाणिक आध्यात्मिक भंडार',
      gu: 'અસલી આધ્યાત્મિક ભંડાર',
      bn: 'পারমার্থিক মাঙ্গলিক সামগ্রী সংগ্রহ'
    },
    sub: {
      en: 'Invest in original Vrindavan Tulsi malas, organic sandalwood incense, handloomed attire, and high commentaries books.',
      hi: 'वृंदावन की पावन तुलसी जप माला, प्राकृतिक चंदन धूप, हथकरघा वस्त्र और प्रामाणिक ग्रंथों को प्राप्त करें।',
      gu: 'વૃંદાવનની પવિત્ર તુલસી માળા, પ્રાકૃતિક ચંદનની અગરબત્તી અને શાસ્ત્રોક્ત પુસ્તકો મેળવો.',
      bn: 'বৃন্দাবনের খাঁটি তুলসী জপমালা, চন্দন ধূপ, সুতি বস্ত্র ও শ্রীল প্রভুপাদ প্রণীত পরম বৈদিক ভাষ্য গ্রন্থ পরিক্রমা।'
    },
    action: 'Store',
    bg: 'https://images.unsplash.com/photo-1602166549142-978079a372e8?auto=format&fit=crop&q=80&w=1200'
  }
];

function PrimaryAppView() {
  const {
    language,
    setLanguage,
    t,
    translateUI,
    currentUser,
    loginUser,
    registerUser,
    logoutUser,
    gurus,
    ashrams,
    events,
    products,
    blogs,
    orders,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    wishlist,
    toggleWishlist,
    savedEvents,
    registerForEvent,
    couponCode,
    discountRate,
    applyCoupon,
    orderTotalQuantity,
    homepageData,
    aboutData,
    enabledLanguages
  } = useGlobalContext();

  // Active Screen Routings State
  const [currentView, setCurrentView] = useState<'home' | 'gurus' | 'ashrams' | 'store' | 'events' | 'blogs' | 'admin' | 'dashboard' | 'about'>('home');
  
  // Restore admin view on page load if user is an admin role
  useEffect(() => {
    if (currentUser?.role === 'Super Admin' || currentUser?.role === 'Content Manager' || currentUser?.role === 'Store Manager') {
      setCurrentView('admin');
    }
  }, [currentUser]);

  // Immersive Hero Slide controller
  const [currSlide, setCurrSlide] = useState<number>(0);
  useEffect(() => {
    const slidesLen = (homepageData?.heroSlides || HERO_SLIDES).length;
    const timer = setInterval(() => {
      setCurrSlide(prev => (prev + 1) % slidesLen);
    }, 6000);
    return () => clearInterval(timer);
  }, [homepageData]);

  // UI Drawer states
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Computed Slides configuration
  const activeSlides = homepageData?.heroSlides || HERO_SLIDES;

  // Forms hook captures
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authName, setAuthName] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authLoginError, setAuthLoginError] = useState<string>('');

  // Selected Entities detailed view portals
  const [viewedGuru, setViewedGuru] = useState<Guru | null>(null);
  const [viewedAshram, setViewedAshram] = useState<Ashram | null>(null);
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);

  // Filter conditions hooks
  const [productCategory, setProductCategory] = useState<string>('All');
  const [storeSearch, setStoreSearch] = useState<string>('');
  const [guruSearch, setGuruSearch] = useState<string>('');
  const [guruEraFilter, setGuruEraFilter] = useState<string>('All');
  const [ashramSearch, setAshramSearch] = useState<string>('');
  const [couponInput, setCouponInput] = useState<string>('');

  // Toast / Status notify banner
  const [toastMessage, setToastMessage] = useState<string>('');
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Login handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoginError('');
    if (isRegisterMode) {
      if (!authName || !authEmail || !authPassword) return;
      const ok = await registerUser(authName, authEmail, undefined, authPassword);
      if (ok) {
        setIsAuthOpen(false);
        setAuthPassword('');
        triggerToast('Pranams! Account registered. Saffron server synchronized.');
      } else {
        setAuthLoginError('Registration failed. Email may already be in use.');
      }
    } else {
      if (!authEmail || !authPassword) return;
      const ok = await loginUser(authEmail, authPassword);
      if (ok) {
        setIsAuthOpen(false);
        setAuthPassword('');
        triggerToast('Radhe Radhe! Handshake success. Profile synchronized.');
        const stored = localStorage.getItem('ashram_user');
        if (stored) {
          const user = JSON.parse(stored);
          if (user.role === 'Super Admin' || user.role === 'Content Manager' || user.role === 'Store Manager') {
            setCurrentView('admin');
          }
        }
      } else {
        setAuthLoginError('Invalid email or password.');
      }
    }
  };

  // Cart helper aggregates
  const cartWithData = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return { ...item, product: p };
  }).filter(item => item.product !== undefined);

  const subtotal = cartWithData.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  const couponDiscount = Math.round(subtotal * discountRate);
  const shippingCharge = 0; // Free
  const total = subtotal - couponDiscount + shippingCharge;

  const handleApplyCouponBtn = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = applyCoupon(couponInput);
    if (ok) {
      triggerToast('Auspicious coupon code accepted! Discount applied.');
    } else {
      triggerToast('Code is not recognized. Try "KRISHNA10" or "SEVABHAKTI".');
    }
    setCouponInput('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-amber-900 font-sans flex flex-col justify-between relative selection:bg-amber-100 selection:text-amber-900">
      
      {/* Visual top notification banner */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#5C4D3C] text-white rounded-xl px-5 py-3 shadow-2xl border border-[#FAF7F2]/20 text-xs font-medium flex items-center gap-2 animate-in slide-in-from-top-6 duration-200">
          <Sparkles className="w-4 h-4 text-[#FF9933] animate-pulse" />
          {toastMessage}
        </div>
      )}

      {/* HEADER SECTION WITH DETAILED NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/50 backdrop-blur-md border-b border-amber-100 shadow-sm">
        
        {/* Top Ticker: Language selector, active session, Quick contact */}
        <div className="bg-[#5C4D3C] text-[#FAF7F2] px-4 py-1.5 text-[11px] flex justify-between items-center flex-wrap gap-2">
          
          <div className="flex items-center gap-4">
            <span className="opacity-95 font-medium flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5 text-[#FF9933]" />
              ISKCON Centenary Portal
            </span>
            <span className="hidden sm:inline opacity-65 font-mono">2026 spiritual campaign calendar</span>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Language Codes buttons switcher */}
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

            {/* Quick Profile log summary */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="font-bold opacity-90 text-[#FF9933] pointer-events-none italic">
                  {currentUser.name}
                </span>
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
                onClick={() => {
                  setIsRegisterMode(false);
                  setIsAuthOpen(true);
                }}
                className="opacity-95 font-bold hover:text-[#FF9933] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#FF9933]" />
                Devotee Sign In
              </button>
            )}
          </div>
        </div>

        {/* Main Nav menu and Logo row */}
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center gap-4">
          
          {/* Brand Logo & Name */}
          <div
            onClick={() => setCurrentView('home')}
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

          {/* Nav Tab Options list — hidden when admin panel is active */}
          {currentView !== 'admin' && (
            <nav className="hidden md:flex items-center gap-1 text-xs">
              {[
                { id: 'home', label: 'Home / Sanctuary', icon: Compass },
                { id: 'about', label: 'About Us', icon: Info },
                { id: 'gurus', label: translateUI('navGurus'), icon: BookOpen },
                { id: 'ashrams', label: translateUI('navAshrams'), icon: Landmark },
                { id: 'events', label: translateUI('navEvents'), icon: Calendar },
                { id: 'store', label: translateUI('navStore'), icon: ShoppingBag },
                { id: 'blogs', label: translateUI('navBlogs'), icon: BookOpen }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentView(tab.id as any);
                    setViewedGuru(null);
                    setViewedAshram(null);
                    setViewedProduct(null);
                  }}
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

              {/* Admin Panel button accessor */}
              {currentUser && (currentUser.role === 'Super Admin' || currentUser.role === 'Store Manager' || currentUser.role === 'Content Manager') && (
                <button
                  onClick={() => setCurrentView('admin')}
                  className="ml-2 px-3 py-1.5 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 bg-white text-amber-900 border-amber-200 hover:bg-amber-50"
                >
                  ⚙️ {translateUI('navAdmin')}
                </button>
              )}
            </nav>
          )}

          {/* Back to site button shown only in admin view */}
          {currentView === 'admin' && (
            <button
              onClick={() => setCurrentView('home')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-800 border border-amber-200 rounded-xl hover:bg-amber-50 transition-colors"
            >
              ← Back to Site
            </button>
          )}

          {/* Action trigger: Shopping Cart basket icon */}
          <div className="flex items-center gap-2">
            
            {/* Quick Profile Tab shortcut */}
            {currentUser && (
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`p-2.5 rounded-xl transition-all border shrink-0 flex items-center gap-1.5 ${
                  currentView === 'dashboard'
                    ? 'bg-amber-100 border-amber-300 text-amber-950 font-bold'
                    : 'bg-white border-amber-200 text-amber-800 hover:bg-amber-50'
                }`}
                title="My Profile Dashboard"
              >
                <User className="w-4 h-4 text-[#FF9933]" />
                <span className="hidden lg:inline text-xs">Dashboard</span>
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#FF9933] hover:bg-[#E68019] text-white rounded-xl shadow transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0 animate-pulse duration-1000"
              title="Open Seva Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold font-serif hidden sm:inline">My Cart</span>
              <span className="bg-[#5C4D3C] text-white text-[10px] font-bold w-5 h-5 rounded-full flex justify-center items-center shadow-inner">
                {orderTotalQuantity}
              </span>
            </button>
          </div>

        </div>

        {/* Small screen navigation strip — hidden when admin panel is active */}
        {currentView !== 'admin' && (
          <div className="md:hidden bg-amber-50/70 border-t border-amber-100/50 px-2.5 py-1.5 overflow-x-auto flex gap-1.5 scrollbar-none text-xs">
            {[
              { id: 'home', label: 'Home', icon: Compass },
              { id: 'about', label: 'About', icon: Info },
              { id: 'gurus', label: translateUI('navGurus'), icon: BookOpen },
              { id: 'ashrams', label: translateUI('navAshrams'), icon: Landmark },
              { id: 'events', label: translateUI('navEvents'), icon: Calendar },
              { id: 'store', label: translateUI('navStore'), icon: ShoppingBag },
              { id: 'blogs', label: translateUI('navBlogs'), icon: BookOpen }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentView(tab.id as any);
                  setViewedGuru(null);
                  setViewedAshram(null);
                  setViewedProduct(null);
                }}
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
            {currentUser && (currentUser.role === 'Super Admin' || currentUser.role === 'Store Manager' || currentUser.role === 'Content Manager') && (
              <button
                onClick={() => setCurrentView('admin')}
                className="px-3 py-1.5 rounded-lg transition-all shrink-0 font-bold border bg-white text-amber-900"
              >
                ⚙️ Admin
              </button>
            )}
          </div>
        )}

      </header>

      {/* MAIN VIEW CONTENT COMPONENT DECODER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 relative">
        
        {/* VIEW 1: IMMERSIVE LANDING HOME SCREEN */}
        {currentView === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            
            {/* Full Width Dynamic autoplay Hero Slider */}
            <div className="relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg border border-amber-100 bg-amber-950">
              
              {/* background cover */}
              <img
                src={(activeSlides[currSlide] || activeSlides[0])?.bg}
                alt="Sacred Sanctuary scenery background"
                className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-overlay transition-all duration-1000 transform scale-102"
                referrerPolicy="no-referrer"
              />

              {/* gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-950/40 to-transparent" />

              {/* Slide specs metadata */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white max-w-2xl space-y-4">
                <div className="flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-amber-300">
                  <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
                  Explore the Divine Heritage
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-white drop-shadow-sm">
                  {t((activeSlides[currSlide] || activeSlides[0])?.title)}
                </h2>
                <p className="text-xs md:text-sm text-amber-50/90 leading-relaxed font-serif tracking-wide">
                  {t((activeSlides[currSlide] || activeSlides[0])?.sub)}
                </p>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setCurrentView((activeSlides[currSlide] || activeSlides[0])?.action as any)}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-950 font-bold text-xs rounded-xl transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    Enter Sanctuary {(activeSlides[currSlide] || activeSlides[0])?.action}
                  </button>
                  <button
                    onClick={() => {
                      setIsRegisterMode(true);
                      setIsAuthOpen(true);
                    }}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium border border-white/20 transition-all font-serif"
                  >
                    Initiate Devotee Account
                  </button>
                </div>
              </div>

              {/* Slider dot controllers */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                {activeSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrSlide(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currSlide === i ? 'bg-amber-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Elegant Glassmorphic About Us Section with Ashram Image Background */}
            <section 
              className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-100 min-h-[460px] flex items-center bg-amber-950"
              style={{
                backgroundImage: `url(${aboutData?.aboutUsBgUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark overlay with dynamic visual gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-950/80 via-amber-950/60 to-transparent z-0" />

              {/* Glassmorphic card */}
              <div className="relative z-10 max-w-3xl m-6 md:m-12 p-6 md:p-8 rounded-3xl backdrop-blur-md bg-white/40 border border-white/30 shadow-2xl text-amber-950 space-y-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] bg-amber-900 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  {t(aboutData?.aboutUsSub) || 'Our Sacred Purpose & Ashram Heritage'}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight text-amber-950 drop-shadow-sm">
                  {t(aboutData?.aboutUsTitle) || 'An Oasis of Devotion & Vedic Wisdom'}
                </h3>
                <p className="text-xs md:text-sm text-amber-900 leading-relaxed font-serif">
                  {t(aboutData?.aboutUsDescription) || 'Welcome to Sri Divine Heritage Ashram, a sacred sanctuary dedicated to keeping the flame of ancient Gaudiya Vaishnava teachings alive. Rooted in the pure line of the Brahma-Madhva-Gaudiya lineage passed down through centuries, we strive to offer an ambient haven for self-realization, devotional chanting (Sankirtana), and continuous selfless service (Seva). Under the supreme guidance of Srila Prabhupada and our revered acharyas, we cultivate spiritual education, organize global festivals, protect sacred cows, and distribute sanctified vegetarian meals (Prasadam) to seekers from all walks of life. Our ultimate purpose is simple yet sublime: to awaken the dormant love of Godhead in every heart, spreading peace, compassion, and divine harmony across the universe.'}
                </p>

                {/* Grid of Key Activities / Core Values */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-950/20">
                  <div className="flex gap-2.5 items-start">
                    <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs">🧘‍♂️</span>
                    <div>
                      <h4 className="text-xs font-bold font-serif text-amber-950">Spiritual Contemplation</h4>
                      <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">Consecrated traditional worship and daily discourses from timeless scriptures.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs text-center font-bold">🍲</span>
                    <div>
                      <h4 className="text-xs font-bold font-serif text-amber-950">Grand Prasadam Seva</h4>
                      <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">Distributing delicious, sanctified vegetarian meals daily to all spiritual pilgrims.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs text-center font-bold">🐄</span>
                    <div>
                      <h4 className="text-xs font-bold font-serif text-amber-950">Holy Cow Protection</h4>
                      <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">Nurturing indigenous native breeds with veterinary care in our lush green Goshala.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs text-center font-bold">📖</span>
                    <div>
                      <h4 className="text-xs font-bold font-serif text-amber-950">Knowledge Distribution</h4>
                      <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">Providing authentic spiritual hand-guided books for absolute self-realization.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Gurus circular grids */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Historical Acharyas</span>
                <h3 className="text-2xl md:text-3xl font-serif text-amber-950 mt-2 font-medium">Meet the Gurus & Spiritual Lineage</h3>
                <p className="text-xs text-amber-700/80 mt-1.5 max-w-xl mx-auto">
                  Learn from the brilliant pure devotees whose elaborate script commentary and dynamic lifestyles spread ancient Indian wisdom globalwide.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {gurus.map(guru => (
                  <div
                    key={guru.id}
                    onClick={() => {
                      setViewedGuru(guru);
                      setCurrentView('gurus');
                    }}
                    className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer flex flex-col sm:flex-row gap-5"
                  >
                    <img
                      src={guru.photoUrl}
                      alt={t(guru.name)}
                      className="w-24 h-24 rounded-full object-cover border-4 border-amber-100 self-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 text-center sm:text-left flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-amber-600 font-bold">{guru.era}</span>
                        <h4 className="text-base font-serif font-bold text-amber-950 leading-tight mt-0.5">{t(guru.name)}</h4>
                        <p className="text-[11px] text-amber-700 mt-1 font-mono">Lineage: {t(guru.lineage)}</p>
                        <p className="text-xs text-amber-850/80 mt-2 line-clamp-3 leading-relaxed">{t(guru.summary)}</p>
                      </div>
                      <span className="text-[10px] text-amber-600 font-bold flex items-center justify-center sm:justify-start gap-1 mt-3">
                        Read Biography & Teachings
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Full viewport Google Earth immersive map section */}
            <section className="relative w-screen left-[50%] -translate-x-1/2 pt-4">
              <InteractiveGlobe
                onSelectAshram={(id) => {
                  const found = ashrams.find(a => a.id === id);
                  if (found) {
                    setViewedAshram(found);
                    setCurrentView('ashrams');
                  }
                }}
              />
            </section>

            {/* Active Calendar section - Next 3 upcoming events */}
            <section className="bg-gradient-to-tr from-[#FAF7F2] to-amber-50 rounded-3xl p-6 md:p-8 border border-amber-100 text-center space-y-6">
              <div>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Auspicious Calendar</span>
                <h3 className="text-2xl md:text-3xl font-serif text-amber-950 font-medium mt-2">Upcoming Spiritual Festivals</h3>
                <p className="text-xs text-amber-800 mt-1.5 max-w-md mx-auto">
                  Experience dynamic Vedic cultural celebrations, kirtan retreats, fire sacrifices, and grand mahaprasad feasts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.slice(0, 3).map(ev => (
                  <div
                    key={ev.id}
                    onClick={() => setCurrentView('events')}
                    className="bg-white rounded-2xl border border-amber-100/60 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-44">
                      <img
                        src={ev.imageUrl}
                        alt={t(ev.name)}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* date marker pin */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-amber-950 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono shadow-sm">
                        {ev.date}
                      </div>

                      {/* Display Active status flag */}
                      <div className={`absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded font-bold text-white shadow ${
                        ev.isActive ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}>
                        {ev.isActive ? 'Active Schedule' : 'Hold Status'}
                      </div>
                    </div>

                    <div className="p-4 text-left flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-serif font-bold text-amber-950 line-clamp-1">{t(ev.name)}</h4>
                        <p className="text-[10px] text-amber-700 flex items-center gap-0.5 mt-1 font-mono">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          {t(ev.location)}
                        </p>
                        <p className="text-xs text-amber-800/80 mt-2 line-clamp-2 leading-relaxed">{t(ev.description)}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-amber-50 flex justify-between items-center text-[10px] font-bold">
                        <span className="text-amber-600 uppercase tracking-widest flex items-center gap-1">
                          Register Seva Slot
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-mono text-amber-700/60">Registered: {ev.registrationsCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials and Experience Journals */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Devotee Experiences</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-amber-950 mt-2 font-medium">Sacred Journey Journals</h3>
                  <p className="text-xs text-amber-850/80 mt-1.5 leading-relaxed">
                    Read the moving transformations of seekers around the world who visited our ashrams and aligned with pure devotional mantra lifestyles.
                  </p>
                </div>

                {/* Testimonial slider card mockup */}
                <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
                      alt="Priyanka Patel avatar profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-100"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-amber-950">Priyanka Patel</h4>
                      <p className="text-[10px] text-amber-600">Surat, Gujarat, India</p>
                    </div>
                    <div className="ml-auto flex gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-xs text-amber-900 italic font-serif leading-relaxed">
                    "I am profoundly satisfied with the Bhagavad Gita commented book quality and original sandalwood incense sticks. The aromatic warmth elevates my home temple, filling it with Vrindavan serenity. Daily Japa counting has resolved my mental noise!"
                  </p>
                </div>
              </div>

              {/* Devotional wisdom blogs list */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Spiritual Blogs</span>
                    <h3 className="text-2xl font-serif text-amber-950 mt-1 font-medium">Latest Teachings</h3>
                  </div>
                  <button onClick={() => setCurrentView('blogs')} className="text-xs text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1">
                    See All Articles
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {blogs.slice(0, 2).map(art => (
                    <div
                      key={art.id}
                      onClick={() => setCurrentView('blogs')}
                      className="bg-white rounded-2xl border border-amber-100 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4"
                    >
                      <img
                        src={art.imageUrl}
                        alt={t(art.title)}
                        className="w-20 h-20 rounded-xl object-cover shrink-0 self-center"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] text-amber-600 font-bold uppercase tracking-wider">{art.author}</span>
                          <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-950 line-clamp-1 mt-0.5">{t(art.title)}</h4>
                          <p className="text-[11px] text-amber-830/80 mt-1 line-clamp-2 leading-relaxed">{t(art.summary)}</p>
                        </div>
                        <span className="text-[9px] text-amber-500 font-mono mt-2 block">{art.publishDate} · {art.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </section>

          </div>
        )}

        {/* VIEW 1.5: ABOUT US FULL PAGE */}
        {currentView === 'about' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                Sanctuary Heritage
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-amber-950 font-medium">
                About Our Spiritual Organization
              </h3>
              <p className="text-xs text-amber-800 font-serif leading-relaxed">
                Discover the pure lineage, sacred purpose, and daily activities that guide our worldwide ashram community in loving service.
              </p>
            </div>

            {/* Reusing the beautiful about section layout */}
            <section 
              className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-100 min-h-[500px] flex items-center bg-amber-950"
              style={{
                backgroundImage: `url(${aboutData?.aboutUsBgUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-950/80 via-amber-950/60 to-transparent z-0" />

              <div className="relative z-10 max-w-3xl m-6 md:m-12 p-6 md:p-10 rounded-2xl backdrop-blur-md bg-white/40 border border-white/20 shadow-2xl text-amber-950 space-y-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] bg-amber-900 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  {t(aboutData?.aboutUsSub) || 'Our Sacred Purpose & Ashram Heritage'}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight text-amber-950 drop-shadow-sm">
                  {t(aboutData?.aboutUsTitle) || 'An Oasis of Devotion & Vedic Wisdom'}
                </h3>
                <p className="text-xs md:text-sm text-amber-900 leading-relaxed font-serif">
                  {t(aboutData?.aboutUsDescription) || 'Welcome to Sri Divine Heritage Ashram, a sacred sanctuary dedicated to keeping the flame of ancient Gaudiya Vaishnava teachings alive. Rooted in the pure line of the Brahma-Madhva-Gaudiya lineage passed down through centuries, we strive to offer an ambient haven for self-realization, devotional chanting (Sankirtana), and continuous selfless service (Seva). Under the supreme guidance of Srila Prabhupada and our revered acharyas, we cultivate spiritual education, organize global festivals, protect sacred cows, and distribute sanctified vegetarian meals (Prasadam) to seekers from all walks of life. Our ultimate purpose is simple yet sublime: to awaken the dormant love of Godhead in every heart, spreading peace, compassion, and divine harmony across the universe.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-950/20">
                  <div className="flex gap-2.5 items-start">
                    <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs">🧘‍♂️</span>
                    <div>
                      <h4 className="text-xs font-bold font-serif text-amber-950">Spiritual Contemplation</h4>
                      <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">Consecrated traditional temple worship and daily discourses from timeless scriptures.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs text-center font-bold">🍲</span>
                    <div>
                      <h4 className="text-xs font-bold font-serif text-amber-950">Grand Prasadam Seva</h4>
                      <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">Distributing delicious, sanctified vegetarian meals daily to all spiritual pilgrims.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs text-center font-bold">🐄</span>
                    <div>
                      <h4 className="text-xs font-bold font-serif text-amber-950">Holy Cow Protection</h4>
                      <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">Nurturing indigenous native breeds with veterinary care in our lush green Goshala.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs text-center font-bold">📖</span>
                    <div>
                      <h4 className="text-xs font-bold font-serif text-amber-950">Knowledge Distribution</h4>
                      <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">Providing authentic spiritual hand-guided books for absolute self-realization.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: GURUS MODULE */}
        {currentView === 'gurus' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Gurus Search / Header block */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Lineage Archaryas</span>
              <h3 className="text-3xl font-serif text-amber-950 font-medium">Teachings & Life Roadmaps</h3>
              <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
                Dive deep into the life occurrences, deep realizations, and elaborate sanskrit text translations of our guiding spiritual teachers.
              </p>

              {/* Filter controls tab */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-amber-600" />
                  <input
                    type="text"
                    placeholder="Search gurus by name..."
                    value={guruSearch}
                    onChange={e => setGuruSearch(e.target.value)}
                    className="w-full text-xs bg-white border border-amber-200 rounded-lg pl-9 pr-4 py-2 focus:outline-none"
                  />
                </div>
                <select
                  value={guruEraFilter}
                  onChange={e => setGuruEraFilter(e.target.value)}
                  className="bg-white border border-amber-200 rounded-lg text-xs px-3 py-2 text-amber-950"
                >
                  <option value="All">All Eras</option>
                  <option value="Modern">Modern Era</option>
                  <option value="Medieval">Medieval Era</option>
                </select>
              </div>
            </div>

            {/* DETAILED GURU OVERVIEW PORTAL */}
            {viewedGuru ? (
              <div className="bg-white rounded-3xl border border-amber-100 p-6 md:p-8 shadow-sm space-y-8 animate-in zoom-in-95 duration-150">
                <button
                  onClick={() => setViewedGuru(null)}
                  className="text-xs text-amber-900 border border-amber-200 rounded-lg px-3 py-1.5 hover:bg-amber-50 transition-colors"
                >
                  ← Back to Acharyas Grid
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                  <img
                    src={viewedGuru.photoUrl}
                    alt={t(viewedGuru.name)}
                    className="w-full md:w-80 h-80 object-cover rounded-2xl border border-amber-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="text-xs text-amber-600 font-bold">{viewedGuru.era}</span>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-950 leading-tight mt-1">{t(viewedGuru.name)}</h2>
                      <p className="text-xs text-amber-700 mt-1 font-mono">Spiritual Lineage: <span className="font-sans font-bold text-amber-950">{t(viewedGuru.lineage)}</span></p>
                      <p className="text-xs text-amber-700 mt-1 font-mono">Disciple Of: <span className="font-sans font-bold text-amber-950">{t(viewedGuru.discipleOf)}</span></p>
                    </div>

                    <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100 space-y-2 text-xs">
                      <div className="flex justify-between border-b border-amber-100/40 pb-2">
                        <span className="font-bold text-amber-900 font-serif">Birth Date:</span>
                        <span className="text-amber-950">{viewedGuru.birthDate}</span>
                      </div>
                      <div className="flex justify-between border-b border-amber-100/40 pb-2">
                        <span className="font-bold text-[#FF9933] font-serif">Auspicious Departure:</span>
                        <span className="text-amber-950 font-medium">{viewedGuru.deathDate}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="font-bold text-amber-900 font-serif">Prabhu birth Place:</span>
                        <span className="text-amber-950">{t(viewedGuru.birthPlace)}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-serif font-bold text-amber-950 uppercase tracking-widest pt-2">Full Biography</h4>
                    <p className="text-xs text-amber-900 leading-relaxed font-serif whitespace-pre-line bg-amber-50/10 p-4 border border-amber-100 rounded-xl">
                      {t(viewedGuru.biography)}
                    </p>
                  </div>
                </div>

                {/* Major Contributions list */}
                <div className="border-t border-amber-100 pt-6">
                  <h3 className="text-lg font-serif font-bold text-amber-950 mb-4">Major Contributions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {viewedGuru.majorContributions.map((con, idx) => (
                      <div key={idx} className="bg-amber-50/20 rounded-xl p-4 border border-amber-100 flex gap-2">
                        <span className="text-amber-600 font-bold font-mono">{(idx + 1).toString().padStart(2, '0')}.</span>
                        <p className="text-xs text-amber-900 leading-relaxed font-serif">{t(con)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Life timeline visual roadmap */}
                <div className="border-t border-amber-100 pt-6 space-y-4">
                  <h3 className="text-lg font-serif font-bold text-amber-1000 mb-2">Life Event Timeline</h3>
                  <div className="relative border-l-2 border-amber-200 ml-4 pl-6 space-y-6">
                    {viewedGuru.timeline.map((time, idx) => (
                      <div key={idx} className="relative">
                        {/* timeline visual node circle */}
                        <span className="absolute -left-9.5 top-0.5 bg-amber-600 text-white font-bold font-mono text-[9px] w-6 h-6 rounded-full border-2 border-white flex justify-center items-center">
                          {time.year.slice(-2)}
                        </span>
                        <div>
                          <span className="text-xs text-amber-600 font-bold font-mono">{time.year}</span>
                          <h4 className="text-sm font-serif font-bold text-amber-950 mt-0.5">{t(time.title)}</h4>
                          <p className="text-xs text-amber-800 leading-relaxed mt-1 font-serif">{t(time.description)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Scriptures Teachings */}
                <div className="border-t border-amber-100 pt-6 space-y-4">
                  <h3 className="text-lg font-serif font-bold text-amber-950">Lineage Wisdom & Quotes</h3>
                  <div className="space-y-4">
                    {viewedGuru.teachings.map(teach => (
                      <div key={teach.id} className="bg-amber-50 border-l-4 border-[#FF9933]/80 rounded-r-xl p-4 md:p-5 space-y-2">
                        <span className="bg-amber-100 text-amber-800 font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                          Vedic Quote Highlight
                        </span>
                        <h4 className="text-sm font-serif font-bold text-amber-950">{t(teach.title)}</h4>
                        <blockquote className="text-xs sm:text-sm italic font-serif text-amber-900 leading-relaxed pl-3 border-l border-amber-200">
                          {t(teach.content)}
                        </blockquote>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* Guru Grids Listing with Big Cards & Succession Lineage Tree */
              <div className="space-y-12 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {gurus
                    .filter(g => {
                      if (guruSearch && !t(g.name).toLowerCase().includes(guruSearch.toLowerCase())) return false;
                      if (guruEraFilter !== 'All' && !g.era.includes(guruEraFilter)) return false;
                      return true;
                    })
                    .map(guru => (
                      <div
                        key={guru.id}
                        onClick={() => setViewedGuru(guru)}
                        className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1.5 cursor-pointer flex flex-col group"
                      >
                        {/* Big Image Cover Header and Era tag overlay */}
                        <div className="relative h-64 w-full bg-amber-950 overflow-hidden">
                          <img
                            src={guru.photoUrl}
                            alt={t(guru.name)}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="text-[10px] bg-amber-500 text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{guru.era}</span>
                            <h4 className="text-xl font-serif font-bold text-white leading-tight mt-1.5 drop-shadow">
                              {t(guru.name)}
                            </h4>
                          </div>
                        </div>

                        {/* Summary & Meta specs */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex flex-col gap-1 text-[11px] text-amber-700 font-mono">
                              <div>📿 LINEAGE: <span className="font-sans font-bold text-amber-950">{t(guru.lineage)}</span></div>
                              <div>🙌 DISCIPLE OF: <span className="font-sans font-bold text-amber-950">{t(guru.discipleOf)}</span></div>
                            </div>
                            <p className="text-xs text-amber-850/90 leading-relaxed font-serif line-clamp-4">
                              {t(guru.summary)}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-amber-50 flex items-center justify-between text-xs text-[#FF9933] font-bold group-hover:text-[#E68019] transition-colors">
                            <span>Read Enlightening Biography</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Highly requested knowledge inheritance branch succession tree */}
                <div className="pt-8 border-t border-amber-100">
                  <GuruLineageTree 
                    onSelectGuruById={(id) => {
                      const matched = gurus.find(g => g.id === id);
                      if (matched) {
                        setViewedGuru(matched);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }
                    }} 
                    activeGuruId={viewedGuru?.id}
                  />
                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW 3: ASHRAMS MODULE */}
        {currentView === 'ashrams' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Headers search blocks */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Divine Sanctuaries</span>
              <h3 className="text-3xl font-serif text-amber-950 font-medium">Explore world Ashrams</h3>
              <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
                Gain spiritual shelter at ISKCON farm communities and ancient holy city templates. Read daily arati schedules and request guest room bookings.
              </p>

              {/* Dynamic Search inputs */}
              <div className="relative max-w-sm mx-auto mt-4">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-amber-500" />
                <input
                  type="text"
                  placeholder="Search ashrams by title or location..."
                  value={ashramSearch}
                  onChange={e => setAshramSearch(e.target.value)}
                  className="w-full text-xs bg-white border border-amber-200 rounded-lg pl-9 pr-4 py-2 focus:outline-none"
                />
              </div>
            </div>

            {/* DETAILED VIEW FOR SINGLE SELECTED ASHRAM */}
            {viewedAshram ? (
              <div className="bg-white rounded-3xl border border-amber-100 p-6 md:p-8 shadow-sm space-y-8 animate-in zoom-in-95 duration-150">
                <button
                  onClick={() => setViewedAshram(null)}
                  className="text-xs text-amber-900 border border-amber-200 rounded-lg px-3 py-1.5 hover:bg-amber-50 transition-colors"
                >
                  ← Back to Sanctuaries Card Grid
                </button>

                <div className="relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow">
                  <img
                    src={viewedAshram.coverUrl}
                    alt={t(viewedAshram.name)}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white text-left">
                    <span className="text-xs text-amber-300 font-mono font-bold uppercase tracking-wider">{viewedAshram.country}</span>
                    <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-white mt-1 drop-shadow-sm">{t(viewedAshram.name)}</h2>
                    <p className="text-xs text-amber-50/90 flex items-center gap-1 mt-1 pb-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {viewedAshram.city}, {viewedAshram.state}, {viewedAshram.country}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* description details */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div>
                      <h4 className="text-base font-serif font-bold text-amber-950 mb-2">Temple Vision & Purpose</h4>
                      <p className="text-xs text-amber-850 leading-relaxed font-serif bg-amber-550/5 p-4 border border-amber-50 rounded-xl italic">
                        " {t(viewedAshram.purpose)} "
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-serif font-bold text-amber-950 mb-2">Overview biography</h4>
                      <p className="text-xs text-amber-900 leading-relaxed font-serif">
                        {t(viewedAshram.description)}
                      </p>
                    </div>

                    {/* facilities grids */}
                    <div>
                      <h4 className="text-base font-serif font-bold text-amber-950 mb-3">Ashram Facilities & Seva works</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {viewedAshram.facilities.map((fac, idx) => (
                          <div key={idx} className="bg-amber-50/30 rounded-lg p-3 border border-amber-100 flex items-center gap-2 text-xs">
                            <span className="text-emerald-600 text-sm">✔</span>
                            <span className="text-amber-900 font-medium font-serif">{t(fac)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact specifications */}
                    <div className="bg-amber-100/30 rounded-xl p-4 border border-amber-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs leading-none">
                      <div className="space-y-1 text-amber-950 font-medium">
                        <span className="font-bold underline text-amber-900 mr-2 uppercase text-[9px] block mb-1 tracking-wider">Inquiries Desk</span>
                        <p className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-amber-600" /> {viewedAshram.contactEmail}</p>
                        <p className="flex items-center gap-1 pt-1"><Phone className="w-3.5 h-3.5 text-amber-600" /> {viewedAshram.contactPhone}</p>
                      </div>
                      <button
                        onClick={() => triggerToast('Pilgrimage Guest house slot requested! Confirm details via email.')}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow"
                      >
                        Request Room booking
                      </button>
                    </div>
                  </div>

                  {/* Operational Daily schedule list */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-amber-50 to-amber-100/20 rounded-2xl border border-amber-150 p-5 divide-y divide-amber-200/50 space-y-4">
                    <div className="pb-2 text-left">
                      <h4 className="text-base font-serif font-bold text-amber-950 flex items-center gap-1.5 leading-none">
                        <Clock className="w-4.5 h-4.5 text-amber-600" />
                        Daily arati Schedule
                      </h4>
                      <p className="text-[10px] text-amber-700/80 mt-1 uppercase tracking-wide">Standard temple operational timetables</p>
                    </div>

                    <div className="space-y-2.5 pt-3">
                      {viewedAshram.dailySchedule.map((sch, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs text-amber-950 py-1">
                          <span className="font-bold font-mono text-amber-700 bg-white px-2 py-0.5 rounded shadow-sm border border-amber-50">{sch.time}</span>
                          <span className="font-serif font-medium">{t(sch.activity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Donation Sponsorships banner trigger */}
                    <div className="pt-4 text-center space-y-2">
                      <h5 className="text-[11px] font-bold text-amber-950 uppercase tracking-widest">Sponsor Goshala & Prasadam</h5>
                      <p className="text-[10px] text-amber-800 leading-relaxed"> Sponsor wholesome sacred vegetarian meals and happy milch cow care directly here at Goshala</p>
                      <button
                        onClick={() => {
                          setCurrentView('store');
                          setProductCategory('Donations');
                        }}
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 text-white text-[11px] font-bold py-2 rounded-lg shadow-md transition-all"
                      >
                        Sponsor Now (Annadan)
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              /* Ashram list grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ashrams
                  .filter(a => {
                    if (ashramSearch && !t(a.name).toLowerCase().includes(ashramSearch.toLowerCase())) return false;
                    return true;
                  })
                  .map(ash => (
                    <div
                      key={ash.id}
                      onClick={() => setViewedAshram(ash)}
                      className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative h-48 bg-amber-50">
                        <img
                          src={ash.coverUrl}
                          alt={t(ash.name)}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 right-3 bg-amber-600 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow">
                          {ash.country}
                        </div>
                      </div>

                      <div className="p-4 flex-1 text-left flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-serif font-bold text-amber-950 leading-snug line-clamp-2">{t(ash.name)}</h4>
                          <p className="text-[10px] text-amber-700 flex items-center gap-0.5 mt-1 font-mono">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            {ash.city}, {ash.state}
                          </p>
                          <p className="text-xs text-amber-800/80 mt-2 line-clamp-3 leading-relaxed">{t(ash.purpose)}</p>
                        </div>
                        
                        <span className="text-[10px] text-amber-600 font-bold block border-t border-amber-50 pt-3 mt-4 text-center">
                          Open Temple schedules & room bookings
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}

          </div>
        )}

        {/* VIEW 4: DIGITAL E-STORE MODULE */}
        {currentView === 'store' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Store title & Headers */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Divine E-Store</span>
              <h3 className="text-3xl font-serif text-amber-950 mt-2 font-medium">Sacred Seva Marketplace</h3>
              <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
                Support our farm ashrams and cow care centers by purchasing authentic translation commentaries, original tulsi malas, organic incense incense, and clothing.
              </p>
            </div>

            {/* PRODUCT SPECIFICATION VIEW PANE */}
            {viewedProduct ? (
              <div className="bg-white rounded-3xl border border-amber-100 p-6 md:p-8 shadow-sm animate-in zoom-in-95 duration-150 text-left">
                <button
                  onClick={() => setViewedProduct(null)}
                  className="text-xs text-amber-900 border border-amber-200 rounded-lg px-3 py-1.5 hover:bg-amber-50 transition-colors mb-6"
                >
                  ← Back to Store listings
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Photo area */}
                  <div className="relative group overflow-hidden rounded-2xl border border-amber-100 shadow bg-amber-50">
                    <img
                      src={viewedProduct.imageUrl}
                      alt={t(viewedProduct.name)}
                      className="w-full h-96 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-amber-600 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full shadow">
                      {viewedProduct.category}
                    </span>
                  </div>

                  {/* details summary columns */}
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-amber-1000 leading-tight">{t(viewedProduct.name)}</h2>
                      
                      {/* stars ratings */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex text-amber-500 gap-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(viewedProduct.rating) ? 'fill-current' : ''}`} />)}
                        </div>
                        <span className="text-[11px] font-mono text-amber-800 font-bold">{viewedProduct.rating} score</span>
                      </div>
                    </div>

                    <div className="text-3xl font-bold font-mono text-amber-950 flex items-baseline gap-1">
                      ₹{viewedProduct.price}
                      <span className="text-[10px] text-amber-600/70 font-sans tracking-wide">Donation inclusions</span>
                    </div>

                    <div className="text-xs text-amber-900 leading-relaxed font-serif bg-amber-50 p-4 border border-amber-100 rounded-xl">
                      <span className="font-bold text-amber-950 uppercase tracking-widest text-[9px] block mb-1">Wisdom specifications</span>
                      {t(viewedProduct.description)}
                    </div>

                    {/* Stock pool and Add actions */}
                    <div className="pt-3 flex gap-3 items-center">
                      <div className="text-xs">
                        <span className="text-amber-800 block">Inventory metrics:</span>
                        <span className={`font-bold font-mono ${viewedProduct.stock > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {viewedProduct.stock > 0 ? `In Stock (${viewedProduct.stock} items)` : 'SOLD OUT'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(viewedProduct.id);
                          triggerToast('Product added to Seva Cart! Open cart to check details.');
                        }}
                        disabled={viewedProduct.stock <= 0}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add item to Seva Cart
                      </button>
                    </div>

                    <div className="flex justify-between items-center bg-amber-50 p-3 rounded-xl border border-amber-100 text-[10px] text-amber-800">
                      <span>✓ Dispatch from Goshala directly</span>
                      <span>✓ Sanctified Prasadam items</span>
                    </div>
                  </div>
                </div>

                {/* Submitting product Review sections */}
                <div className="border-t border-amber-100 mt-10 pt-6 space-y-4">
                  <h3 className="text-base font-serif font-bold text-amber-950">Devotee Reviews & Experience logs</h3>
                  
                  {viewedProduct.reviews.length === 0 ? (
                    <p className="text-xs text-amber-700 italic">No reviews registered for this item yet. Be the first to express experiences!</p>
                  ) : (
                    <div className="space-y-4 max-w-xl">
                      {viewedProduct.reviews.map(rev => (
                        <div key={rev.id} className="bg-amber-50/10 border border-amber-50 rounded-xl p-4 space-y-1.5 text-xs text-left">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-amber-950">{rev.userName}</span>
                            <span className="text-[10px] text-amber-600 font-mono">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-500 gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : ''}`} />)}
                          </div>
                          <p className="text-amber-850 font-serif leading-relaxed italic">" {rev.comment} "</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              /* Traditional grids listing catalog */
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Category filters list Column */}
                <div className="md:col-span-3 bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-4 text-xs text-left">
                  <div>
                    <h4 className="font-bold text-amber-950 uppercase text-[10px] tracking-wider mb-2.5">Category category</h4>
                    <div className="flex flex-col gap-1">
                      {['All', 'Books', 'Clothing', 'Accessories', 'Spiritual Items', 'Donations'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setProductCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
                            productCategory === cat
                              ? 'bg-amber-50 text-amber-950 font-bold border-l-4 border-amber-600 pl-2'
                              : 'text-amber-800 hover:bg-amber-50/50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-amber-100 pt-3">
                    <h4 className="font-bold text-amber-950 uppercase text-[10px] tracking-wider mb-2">Search items</h4>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-amber-500" />
                      <input
                        type="text"
                        placeholder="Type scriptures title..."
                        value={storeSearch}
                        onChange={e => setStoreSearch(e.target.value)}
                        className="w-full text-xs max-w-full bg-[#fcf9f4] border border-amber-200 rounded p-1.5 pl-7 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-3 text-[10px] text-amber-800 border border-amber-100/50 leading-relaxed font-serif">
                    🏵️ Support Vedic cow farms and Gurukul educations direct with every transaction.
                  </div>
                </div>

                {/* Products catalogs lists gridded */}
                <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter(p => {
                      if (productCategory !== 'All' && p.category !== productCategory) return false;
                      if (storeSearch && !t(p.name).toLowerCase().includes(storeSearch.toLowerCase())) return false;
                      return true;
                    })
                    .map(item => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between"
                      >
                        <div
                          onClick={() => setViewedProduct(item)}
                          className="relative h-48 bg-amber-50 cursor-pointer overflow-hidden group"
                        >
                          <img
                            src={item.imageUrl}
                            alt={t(item.name)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-3 left-3 bg-amber-950/80 backdrop-blur-md text-amber-100 text-[9px] font-bold font-mono px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                        </div>

                        <div className="p-4 flex-1 text-left flex flex-col justify-between space-y-4">
                          <div onClick={() => setViewedProduct(item)} className="cursor-pointer">
                            <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-1000 line-clamp-2 leading-tight">{t(item.name)}</h4>
                            <p className="text-[11px] text-amber-700/80 mt-1 line-clamp-2 leading-relaxed">{t(item.description)}</p>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <div className="font-mono font-bold text-sm text-amber-950">₹{item.price}</div>
                            
                            <button
                              onClick={() => {
                                addToCart(item.id);
                                triggerToast('List added to Seva Cart!');
                              }}
                              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold shadow transition-colors"
                            >
                              Add to Basket
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

              </div>
            )}

          </div>
        )}

        {/* VIEW 5: CALENDAR EVENTS TAB */}
        {currentView === 'events' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Calendar header block */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Divine gatherings</span>
              <h3 className="text-3xl font-serif text-amber-950 font-medium">Auspicious festivals & schedules</h3>
              <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
                Be a part of world cultural assemblies, holy pilgrimages and active kirtan weeks configured at Vrindavan and other centers.
              </p>
            </div>

            {/* list elements */}
            <div className="max-w-3xl mx-auto space-y-6">
              {events
                .filter(e => e.isActive) // Admin toggle active filters
                .map(ev => {
                  const isSaved = savedEvents.includes(ev.id);
                  return (
                    <div
                      key={ev.id}
                      className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 flex flex-col md:flex-row gap-5 text-left"
                    >
                      <img
                        src={ev.imageUrl}
                        alt={t(ev.name)}
                        className="w-full md:w-48 h-44 object-cover rounded-xl shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start gap-2 flex-wrap">
                            <span className="text-xs text-amber-600 font-bold font-mono">{ev.date}</span>
                            <span className="text-[10px] text-amber-500 font-mono">{ev.time}</span>
                          </div>
                          <h4 className="text-base font-serif font-bold text-amber-950 leading-tight">{t(ev.name)}</h4>
                          <p className="text-[10px] text-amber-700 font-mono flex items-center gap-0.5 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            {t(ev.location)}
                          </p>
                          <p className="text-xs text-amber-800/85 pt-1.5 leading-relaxed font-serif">{t(ev.description)}</p>
                        </div>

                        {/* Event register buttons trigger */}
                        <div className="mt-4 pt-3 border-t border-amber-50 flex justify-between items-center gap-3">
                          <button
                            onClick={async () => {
                              if (!currentUser) {
                                triggerToast('Please Devotee Sign In first before event registration.');
                                return;
                              }
                              const ok = await registerForEvent(ev.id);
                              if (ok) {
                                triggerToast('Auspicious slot book completed! Track in profile.');
                              } else {
                                triggerToast('Slot registration failure. Verify capacity limits.');
                              }
                            }}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow ${
                              isSaved
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                                : 'bg-amber-600 hover:bg-amber-700 text-white'
                            }`}
                          >
                            {isSaved ? '✓ Seva Slot Registered' : 'Claim Seva Slot (Free Ticket)'}
                          </button>
                          
                          <span className="text-[10px] text-amber-700 font-mono">
                            Available capacity pools: {ev.availableTickets} items left
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

          </div>
        )}

        {/* VIEW 6: WISDOM BLOGS */}
        {currentView === 'blogs' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Scriptural commentary</span>
              <h3 className="text-3xl font-serif text-amber-950 font-medium font-serif">Daily wisdom blog</h3>
              <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
                Access simplified scientific essays on Japa meditation techniques, law of karma reactions, and active Bhagavad Gita chapter studies.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-8 text-left">
              {blogs.map(art => (
                <div key={art.id} className="bg-white rounded-3xl border border-amber-100 p-6 shadow-sm space-y-4">
                  <img
                    src={art.imageUrl}
                    alt={t(art.title)}
                    className="w-full h-64 object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 tracking-wider block uppercase">{art.author}</span>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-950 leading-tight mt-1">{t(art.title)}</h2>
                    <p className="text-[10px] text-amber-700 font-mono mt-0.5">{art.publishDate} · {art.readTime}</p>
                  </div>
                  <p className="text-xs text-amber-900 font-serif leading-relaxed italic bg-amber-50 p-4 border border-amber-100 rounded-xl">
                    "{t(art.summary)}"
                  </p>
                  <p className="text-xs text-amber-950 font-serif leading-relaxed whitespace-pre-line pt-2">
                    {t(art.content)}
                  </p>
                  
                  <div className="border-t border-amber-100 pt-3 flex justify-between items-center text-[10px]">
                    <span className="font-bold text-amber-700">Topic: Sound Vibration Philosophy</span>
                    <button
                      onClick={() => triggerToast('Article bookmark saved in your heart! chant Hari Bol.')}
                      className="text-amber-600 font-bold hover:underline"
                    >
                      Love Article
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* VIEW 7: USER PORTAL PERSONAL DASHBOARD */}
        {currentView === 'dashboard' && currentUser && (
          <div className="space-y-8 animate-in fade-in duration-200 text-left">
            
            <div className="bg-white p-6 rounded-2xl border border-amber-100/80 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-amber-950">Devotee Profile Portfolio</h2>
              <p className="text-xs text-amber-800/80 mt-1">Configure shipping parameters and read physical product transit history logs</p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-amber-950 leading-none divide-y md:divide-y-0 md:divide-x divide-amber-100">
                <div className="space-y-3.5 pr-2">
                  <span className="font-bold text-amber-900 uppercase text-[9px] block mb-2 tracking-wider">Account Credentials</span>
                  <div>
                    <span className="font-bold block text-[10px] text-amber-800">Spiritual Name:</span>
                    <span className="text-sm font-serif font-bold block mt-1">{currentUser.name}</span>
                  </div>
                  <div>
                    <span className="font-bold block text-[10px] text-amber-800">Assigned email identifier:</span>
                    <span className="block mt-1 font-mono">{currentUser.email}</span>
                  </div>
                  <div>
                    <span className="font-bold block text-[10px] text-amber-800">Registered phone coordinate:</span>
                    <span className="block mt-1 font-mono">{currentUser.phone || 'No phone registered yet'}</span>
                  </div>
                </div>

                <div className="space-y-3.5 pt-4 md:pt-0 md:pl-6">
                  <span className="font-bold text-amber-900 uppercase text-[9px] block mb-2 tracking-wider">Mailing Address Details</span>
                  {currentUser.shippingAddress ? (
                    <p className="font-serif leading-relaxed text-amber-900">
                      {currentUser.shippingAddress.fullName}<br />
                      {currentUser.shippingAddress.addressLines}<br />
                      {currentUser.shippingAddress.city}, {currentUser.shippingAddress.state} - {currentUser.shippingAddress.postalCode}<br />
                      {currentUser.shippingAddress.country}
                    </p>
                  ) : (
                    <p className="text-amber-800/50 italic">No delivery address saved yet. Configure one during cart checkout.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Saved registrations calendars list */}
            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm space-y-4">
              <h3 className="text-base font-serif font-bold text-amber-950">Booked Seva Slots Calendar</h3>
              {savedEvents.length === 0 ? (
                <p className="text-xs text-amber-800/60 italic">No booked seats currently active. Tap on upcoming events to claim free passes.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedEvents.map(evId => {
                    const e = events.find(item => item.id === evId);
                    if (!e) return null;
                    return (
                      <div key={e.id} className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-150 flex gap-3">
                        <img src={e.imageUrl} alt={t(e.name)} className="w-12 h-12 rounded object-cover shrink-0" />
                        <div>
                          <span className="text-[9px] text-amber-600 font-mono block font-bold">{e.date}</span>
                          <h4 className="text-xs font-serif font-bold text-amber-1000 line-clamp-1">{t(e.name)}</h4>
                          <p className="text-[10px] text-amber-750 line-clamp-1">{t(e.location)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Core Historical Orders tracking */}
            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm space-y-4">
              <h3 className="text-base font-serif font-bold text-amber-950">Seva Orders history</h3>
              {orders.length === 0 ? (
                <p className="text-xs text-amber-800/60 italic">No previous product purchases registered inside session cache.</p>
              ) : (
                <div className="space-y-4 font-serif">
                  {orders.map((o, idx) => (
                    <div key={idx} className="border border-amber-100 rounded-xl p-4 divide-y divide-amber-100 text-xs">
                      <div className="pb-2.5 flex justify-between gap-3 flex-wrap">
                        <div>
                          <span className="font-bold text-amber-950 block">Invoice identifier: {o.id}</span>
                          <span className="text-amber-800 font-mono text-[10px]">Registered date: {o.orderDate.split('T')[0]}</span>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            o.orderStatus === 'Delivered' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-850'
                          }`}>
                            Transit: {o.orderStatus}
                          </span>
                        </div>
                      </div>

                      <div className="py-2.5 space-y-1.5 leading-relaxed text-amber-900">
                        <span className="font-bold text-amber-950 uppercase text-[9px] font-sans tracking-wide block">Listings</span>
                        {o.items.map((item, id) => (
                          <div key={id} className="flex justify-between">
                            <span>{item.quantity}x {t(item.productName)}</span>
                            <span className="font-mono">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2.5 flex justify-between items-center">
                        <span className="text-[10px] text-amber-700 font-mono">Tracking Coordinate: {o.trackingNumber || 'TRK-VRN-REGISTERED'}</span>
                        <span className="font-bold text-amber-950 font-mono text-sm leading-none pt-0.5">Total Paid: ₹{o.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* VIEW 8: ADMINISTRATION CONTROL PANEL PORTAL */}
        {currentView === 'admin' && (
          <div className="animate-in fade-in duration-200">
            <AdminPanel />
          </div>
        )}

      </main>

      {/* CORE FOOTER SECTION */}
      <footer className="bg-amber-950 text-amber-100/90 py-12 border-t-4 border-amber-600/80 text-xs text-left">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 leading-snug">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-amber-600 text-white p-1.5 rounded-lg border border-amber-500">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-bold text-amber-50 tracking-tight leading-none">
                {translateUI('appName')}
              </h4>
            </div>
            <p className="text-amber-200/70 font-serif leading-relaxed">
              Dedicated to promoting peace, daily meditation practices, and simple living through authentic Vedic scripts commented commentaries. Support holy cow care today.
            </p>
            <p className="text-[10px] text-amber-400 font-mono block">
              Centenary Campaign. Brahma Gaudiya Chaitanya Sampradaya.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-amber-50 uppercase text-[10px] tracking-widest border-b border-amber-900 pb-2">Sacred Coordinates</h5>
            <p className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-amber-500" /> Raman Reti, Vrindavan Dham, India</p>
            <p className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-amber-500" /> centenary@iskcon.org</p>
            <p className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-amber-500" /> +91-565-2540021</p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h5 className="font-bold text-amber-50 uppercase text-[10px] tracking-widest border-b border-amber-900 pb-2">Newsletter list signing</h5>
            <p className="text-amber-200/70 leading-relaxed font-serif">Sign up your email coordinates to receive weekly sanskrit slokas and kirtan dates notifications.</p>
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="consignee@gmail.com"
                className="bg-amber-1000/70 border border-amber-900 rounded p-1.5 text-white text-[11px] focus:outline-none flex-1 max-w-full"
              />
              <button
                onClick={() => triggerToast('Pranams! Email coordinator subscribed.')}
                className="px-3 py-1.5 bg-amber-600 text-white font-bold rounded"
              >
                Sign Up
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-amber-900 mt-8 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-center text-amber-200/45 text-[10px]">
          <span>© 2026 Sri Divine Heritage Mandir. All rights reserved. simple living high thinking philosophy</span>
          <span>Crafted for deep internal serenity and multi-language script grounding.</span>
        </div>
      </footer>

      {/* SHOPPING CART SIDEBAR SLIDE OUT DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-amber-950/30 backdrop-blur-sm flex justify-end">
          <div className="bg-amber-50 w-full max-w-md h-full shadow-2xl border-l border-amber-100 flex flex-col justify-between overflow-hidden text-left animate-in slide-in-from-right duration-200">
            
            {/* Header drawer */}
            <div className="bg-[#5C4D3C] text-white p-4 flex justify-between items-center border-b border-amber-100/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-serif font-bold tracking-wide">My Sacred Seva Cart</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-amber-100 hover:text-white bg-amber-900 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* items scrolling lists */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {cartWithData.length === 0 ? (
                <div className="text-center py-16 text-amber-800/50 italic space-y-3 font-serif">
                  <ShoppingBag className="w-12 h-12 mx-auto text-amber-200" />
                  <p>Your Seva Cart is empty currently.</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('store');
                    }}
                    className="not-italic text-xs text-amber-600 underline font-bold mt-2"
                  >
                    Go browse spiritual store
                  </button>
                </div>
              ) : (
                cartWithData.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-white rounded-xl p-3 border border-amber-100/60 shadow-sm text-xs leading-snug">
                    <img
                      src={item.product!.imageUrl}
                      alt={t(item.product!.name)}
                      className="w-16 h-16 object-cover rounded-lg bg-amber-50"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-amber-950 leading-tight truncate">{t(item.product!.name)}</h4>
                      <p className="text-[10px] text-amber-600 mt-1 uppercase font-bold">{item.product!.category}</p>
                      <p className="text-xs font-bold font-mono mt-1 text-amber-950">₹{item.product!.price}</p>
                      
                      {/* units adjustments */}
                      <div className="flex items-center gap-3 mt-2.5">
                        <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden bg-amber-50/50">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className="p-1 hover:bg-amber-100"
                          >
                            <Minus className="w-3 h-3 text-amber-850" />
                          </button>
                          <span className="px-3 font-bold font-mono text-[11px]">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-amber-100"
                          >
                            <Plus className="w-3 h-3 text-amber-850" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-rose-600 hover:text-rose-700 text-[10px] font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Coupons and checkout footer summaries */}
            {cartWithData.length > 0 && (
              <div className="bg-amber-50 p-4 border-t border-amber-200 space-y-3.5">
                
                {/* coupon applies form */}
                <form onSubmit={handleApplyCouponBtn} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. KRISHNA10)"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    className="bg-white border border-amber-200 p-2 rounded-lg text-xs flex-1 max-w-full focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-amber-950 hover:bg-black text-white px-3.5 py-1.5 rounded-lg text-xs font-bold"
                  >
                    Apply
                  </button>
                </form>

                <div className="space-y-2 border-t border-amber-100/50 pt-3 text-xs leading-none">
                  <div className="flex justify-between text-amber-800">
                    <span>Subtotal listings:</span>
                    <span className="font-mono">₹{subtotal}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Applied discount ({couponCode}):</span>
                      <span className="font-mono">-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-amber-800">
                    <span>Spiritual delivery:</span>
                    <span className="text-emerald-700 font-bold">FREE (Annadan)</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-amber-950 border-t border-amber-200/50 pt-2.5">
                    <span>Contributing Total:</span>
                    <span className="font-mono text-base">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!currentUser) {
                      triggerToast('Please Devotee Sign In first to checkout securely.');
                      setIsCartOpen(false);
                      setIsRegisterMode(false);
                      setIsAuthOpen(true);
                      return;
                    }
                    setIsCheckoutOpen(true);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-3 text-xs font-bold shadow transition-all transform active:scale-97 text-center block"
                >
                  Proceed to Secure Checkout
                </button>
              </div>
            )}

            {/* bottom decorative slider border accent */}
            <div className="h-1 bg-gradient-to-r from-amber-600 to-amber-500" />
          </div>
        </div>
      )}

      {/* DEVOTEE AUTH REGISTER / SIGN IN DIALOG PORTALS */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-amber-950/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-amber-50 border border-amber-100 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden text-left animate-in zoom-in-95 duration-150">
            <div className="bg-[#5C4D3C] p-4 text-white flex justify-between items-center border-b border-amber-100/10">
              <span className="font-serif font-bold text-sm text-amber-100">
                {isRegisterMode ? 'Vedic Devotee Registration' : 'Auspicious Devotee Sign In'}
              </span>
              <button onClick={() => setIsAuthOpen(false)} className="text-amber-100"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAuthSubmit} className="p-5 space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="text-[10px] font-bold block mb-1 text-amber-900 uppercase">Spiritual Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sri Chaitanya Das"
                    value={authName}
                    onChange={e => setAuthName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-amber-200 rounded-lg"
                  />
                </div>
              )}
              <div>
                <label className="text-[10px] font-bold block mb-1 text-amber-900 uppercase">Email Coordinates *</label>
                <input
                  type="email"
                  required
                  placeholder="seeker@gmail.com"
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-amber-200 rounded-lg"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold block mb-1 text-amber-900 uppercase">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-amber-200 rounded-lg"
                />
              </div>
              {authLoginError && (
                <p className="text-[10px] text-red-600 font-bold">{authLoginError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg py-2.5 text-xs font-bold shadow transition-colors"
              >
                {isRegisterMode ? 'Claim Account Initiation' : 'Decrypt Profile Portal'}
              </button>

              <div className="text-center pt-3 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(!isRegisterMode); setAuthLoginError(''); setAuthPassword(''); }}
                  className="text-amber-600 text-xs font-bold hover:underline bg-transparent"
                >
                  {isRegisterMode ? 'Back to standard Sign In logs' : 'Create new Seva Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL WINDOW ENTIRE BLOCK */}
      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
          onOrderPlaced={() => {
            setCurrentView('dashboard');
            triggerToast('Auspicious order contribution saved in Goshala records successfully!');
          }}
        />
      )}

      {/* FLOAT AI GURU ASSISTANT COMPONENT */}
      <AiCompanion />

    </div>
  );
}

export default function App() {
  return (
    <AppGlobalProvider>
      <PrimaryAppView />
    </AppGlobalProvider>
  );
}
