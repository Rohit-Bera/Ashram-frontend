import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, LocalizedString, Guru, Ashram, AshramEvent, Product, BlogArticle, UserProfile, Order, CartItem, HomepageData, AboutUsData } from '../types';

interface AppGlobalContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (localized: LocalizedString | undefined) => string;
  translateUI: (key: string) => string;
  
  // Auth state
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (name: string, email: string, phone?: string, password?: string) => Promise<boolean>;
  logoutUser: () => void;
  updateProfile: (updated: Partial<UserProfile>) => Promise<boolean>;
  
  // Data lists updated from server
  gurus: Guru[];
  ashrams: Ashram[];
  events: AshramEvent[];
  products: Product[];
  blogs: BlogArticle[];
  orders: Order[];
  homepageData: HomepageData | null;
  aboutData: AboutUsData | null;

  // Fetch helpers
  refreshGurus: () => Promise<void>;
  refreshAshrams: () => Promise<void>;
  refreshEvents: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshHomepage: () => Promise<void>;
  updateHomepage: (updated: Partial<HomepageData>) => Promise<boolean>;
  refreshAbout: () => Promise<void>;
  updateAbout: (updated: Partial<AboutUsData>) => Promise<boolean>;
  refreshAllData: () => Promise<void>;
  
  // Order & Cart action state
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => Promise<void>;
  savedEvents: string[];
  registerForEvent: (eventId: string) => Promise<boolean>;
  
  // Checkout calculations
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountRate: number; // e.g. 0.10 for 10%
  applyCoupon: (code: string) => boolean;
  orderTotalQuantity: number;

  // Language config
  enabledLanguages: { code: string; label: string; enabled: boolean }[];
  refreshLanguages: () => Promise<void>;

  // UI Translations (dynamic, managed from admin)
  uiTranslations: Record<string, Record<string, string>>;
  refreshTranslations: () => Promise<void>;
}

const AppGlobalContext = createContext<AppGlobalContextType | undefined>(undefined);

const UI_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  appName: {
    en: 'Sri Divine Heritage',
    hi: 'श्री दिव्य विरासत',
    gu: 'શ્રી દિવ્ય વિરાસત',
    bn: 'শ্রী দিব্য ঐতিহ্য'
  },
  ashramSlogan: {
    en: 'Spiritual Community & Wisdom Portal',
    hi: 'आध्यात्मिक समुदाय और ज्ञान पोर्टल',
    gu: 'આધ્યાત્મિક સમુદાય અને જ્ઞાન પોર્ટલ',
    bn: 'আধ্যাত্মিক সম্প্রদায় ও পরম জ্ঞান প্রচার কেন্দ্র'
  },
  navGurus: {
    en: 'Gurus',
    hi: 'आचार्यगण',
    gu: 'ગુરુઓ',
    bn: 'শ্রীগুরুকুল'
  },
  navAshrams: {
    en: 'Ashrams',
    hi: 'आश्रम',
    gu: 'આશ્રમો',
    bn: 'শ্রীধাম ও আশ্রম'
  },
  navEvents: {
    en: 'Events',
    hi: 'कार्यक्रम',
    gu: 'કાર્યક્રમો',
    bn: 'সব অনুষ্ঠান'
  },
  navStore: {
    en: 'Spiritual Store',
    hi: 'आध्यात्मिक भंडार',
    gu: 'આધ્યાત્મિક ભંડાર',
    bn: 'আধ্যাত্মিক বিপনী'
  },
  navBlogs: {
    en: 'Blogs',
    hi: 'ब्लॉग्स',
    gu: 'બ્લોગ્સ',
    bn: 'সাধু বাণী ব্লগ'
  },
  navAdmin: {
    en: 'Admin Panel',
    hi: 'एडमिन पैनल',
    gu: 'એડમિન પેનલ',
    bn: 'নিয়ন্ত্রণ কক্ষ'
  },
  navDashboard: {
    en: 'My Profile',
    hi: 'मेरी प्रोफाइल',
    gu: 'મારી પ્રોફાઇલ',
    bn: 'আমার তথ্য'
  },
  btnExploreGurus: {
    en: 'Explore Gurus',
    hi: 'आचार्यों को जानें',
    gu: 'ગુરુઓ વિશે જાણો',
    bn: 'শ্রীগুরুকুল দর্শন'
  },
  btnFindAshrams: {
    en: 'Find Ashrams',
    hi: 'आश्रम खोजें',
    gu: 'આશ્રમો શોધો',
    bn: 'আশ্রম পরিক্রমা'
  },
  btnUpcomingEvents: {
    en: 'Upcoming Events',
    hi: 'आगामी कार्यक्रम',
    gu: 'આગામી કાર્યક્રમો',
    bn: 'আসন্ন উৎসব'
  },
  btnVisitStore: {
    en: 'Visit Spiritual Store',
    hi: 'भंडार पर जाएँ',
    gu: 'ભંડારની મુલાકાત લો',
    bn: 'বিপনী পরিক্রমা'
  },
  lblAddToCart: {
    en: 'Add to Cart',
    hi: 'झोली में डालें',
    gu: 'થેલીમાં ઉમેરો',
    bn: 'ঝুলিতে যুক্ত করুন'
  },
  lblBuyNow: {
    en: 'Buy Now',
    hi: 'अभी खरीदें',
    gu: 'અત્યારે ખરીદો',
    bn: 'সরাসরি কিনুন'
  },
  lblWishlist: {
    en: 'Wishlist',
    hi: 'इच्छा सूची',
    gu: 'ઈચ્છા સૂચિ',
    bn: 'প্রিয় তালিকা'
  },
  lblInStock: {
    en: 'In Stock',
    hi: 'उपलब्ध',
    gu: 'ઉપલબ્ધ',
    bn: 'মজুদ আছে'
  },
  lblOutOfStock: {
    en: 'Out of Stock',
    hi: 'अप्राप्य',
    gu: 'અપ્રાપ્ય',
    bn: 'মজুদ শেষ'
  }
};

export const AppGlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [uiTranslations, setUiTranslations] = useState<Record<string, Record<string, string>>>(UI_TRANSLATIONS);
  const [enabledLanguages, setEnabledLanguages] = useState<{ code: string; label: string; enabled: boolean }[]>([
    { code: 'en', label: 'English', enabled: true },
    { code: 'hi', label: 'हिन्दी', enabled: true },
    { code: 'gu', label: 'ગુજરાતી', enabled: true },
    { code: 'bn', label: 'বাংলা', enabled: true }
  ]);
  
  // Data hooks loaded from back-end server
  const [gurus, setGurus] = useState<Guru[]>([]);
  const [ashrams, setAshrams] = useState<Ashram[]>([]);
  const [events, setEvents] = useState<AshramEvent[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null);
  
  // Interactive shopping aggregates
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ashram_cart_v1');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);

  // Synchronise localStorage triggered on cart mutations
  useEffect(() => {
    localStorage.setItem('ashram_cart_v1', JSON.stringify(cart));
  }, [cart]);

  // Read language and profile settings from local session
  useEffect(() => {
    const savedLang = localStorage.getItem('ashram_lang');
    if (savedLang) {
      setLanguage(savedLang as LanguageCode);
    }
    const savedProfile = localStorage.getItem('ashram_user');
    if (savedProfile) {
      setCurrentUser(JSON.parse(savedProfile));
    }
    
    // Core data loader
    refreshAllData();
  }, []);

  const refreshGurus = async () => {
    try {
      const res = await fetch('/api/gurus');
      const data = await res.json();
      if (data.success) setGurus(data.data);
    } catch (e) { console.error('Error fetching gurus:', e); }
  };

  const refreshAshrams = async () => {
    try {
      const res = await fetch('/api/ashrams');
      const data = await res.json();
      if (data.success) setAshrams(data.data);
    } catch (e) { console.error('Error fetching ashrams:', e); }
  };

  const refreshEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      if (data.success) setEvents(data.data);
    } catch (e) { console.error('Error fetching events:', e); }
  };

  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (e) { console.error('Error fetching products:', e); }
  };

  const refreshOrders = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/orders?userId=${currentUser.id}`);
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch (e) { console.error('Error fetching orders:', e); }
  };

  const refreshHomepage = async () => {
    try {
      const res = await fetch('/api/homepage');
      const data = await res.json();
      if (data.success) setHomepageData(data.data);
    } catch (e) { console.error('Error fetching homepage:', e); }
  };

  const updateHomepage = async (updated: Partial<HomepageData>): Promise<boolean> => {
    try {
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        setHomepageData(data.data);
        return true;
      }
    } catch (e) { console.error('Error updating homepage:', e); }
    return false;
  };

  const refreshAbout = async () => {
    try {
      const res = await fetch('/api/about');
      const data = await res.json();
      if (data.success) setAboutData(data.data);
    } catch (e) { console.error('Error fetching about:', e); }
  };

  const updateAbout = async (updated: Partial<AboutUsData>): Promise<boolean> => {
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        setAboutData(data.data);
        return true;
      }
    } catch (e) { console.error('Error updating about:', e); }
    return false;
  };

  const refreshTranslations = async () => {
    try {
      const res = await fetch('/api/translations');
      const data = await res.json();
      if (data.success) setUiTranslations({ ...UI_TRANSLATIONS, ...data.data });
    } catch (e) { console.error('Error fetching translations:', e); }
  };

  const refreshLanguages = async () => {
    try {
      const res = await fetch('/api/languages');
      const data = await res.json();
      if (data.success) {
        setEnabledLanguages(data.data);
        // If current lang got disabled, fall back to en
        const stillEnabled = data.data.find((l: { code: string; enabled: boolean }) => l.code === language && l.enabled);
        if (!stillEnabled) setLanguage('en');
      }
    } catch (e) { console.error('Error fetching languages:', e); }
  };

  const refreshAllData = async () => {
    await Promise.all([
      refreshGurus(),
      refreshAshrams(),
      refreshEvents(),
      refreshProducts(),
      refreshHomepage(),
      refreshAbout(),
      refreshLanguages(),
      refreshTranslations(),
      fetch('/api/blogs').then(r => r.json()).then(d => d.success && setBlogs(d.data)).catch(e => console.error(e))
    ]);
  };

  // Sync orders whenever currentUser loads
  useEffect(() => {
    if (currentUser) {
      refreshOrders();
    } else {
      setOrders([]);
    }
  }, [currentUser]);

  // Multilingual dynamic string parser
  const t = (localized: LocalizedString | undefined): string => {
    if (!localized) return '';
    return localized[language] || localized['en'] || '';
  };

  const translateUI = (key: string): string => {
    const translation = uiTranslations[key];
    if (!translation) return key;
    return translation[language] || translation['en'] || key;
  };

  const setLanguageAndSave = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem('ashram_lang', lang);
  };

  // Auth Operations
  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.data);
        localStorage.setItem('ashram_user', JSON.stringify(data.data));
        return true;
      }
    } catch (e) {
      console.error('Login error:', e);
    }
    return false;
  };

  const registerUser = async (name: string, email: string, phone?: string, password?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.data);
        localStorage.setItem('ashram_user', JSON.stringify(data.data));
        return true;
      }
    } catch (e) {
      console.error('Registration error:', e);
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('ashram_user');
  };

  const updateProfile = async (updated: Partial<UserProfile>): Promise<boolean> => {
    if (!currentUser) return false;
    try {
      const res = await fetch(`/api/auth/profile/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.data);
        localStorage.setItem('ashram_user', JSON.stringify(data.data));
        return true;
      }
    } catch (e) {
      console.error('Update profile error:', e);
    }
    return false;
  };

  // Cart Interactions
  const addToCart = (productId: string, quantity = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.productId === productId);
      if (existingIdx !== -1) {
        const item = prev[existingIdx];
        const updated = [...prev];
        updated[existingIdx] = { ...item, quantity: item.quantity + quantity };
        return updated;
      }
      return [...prev, { productId, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountRate(0);
  };

  const wishlist = currentUser?.wishlistProductIds || [];
  
  const toggleWishlist = async (productId: string) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/users/${currentUser.id}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      const data = await res.json();
      if (data.success) {
        updateProfile({ wishlistProductIds: data.wishlist });
      }
    } catch (e) {
      console.error('Toggle wishlist error:', e);
    }
  };

  const savedEvents = currentUser?.savedEventIds || [];

  const registerForEvent = async (eventId: string): Promise<boolean> => {
    if (!currentUser) return false;
    try {
      const isSaved = savedEvents.includes(eventId);
      
      // Call registration incremental counter only if not already registered
      if (!isSaved) {
        const regRes = await fetch(`/api/events/${eventId}/register`, { method: 'POST' });
        const regData = await regRes.json();
        if (!regData.success) {
          return false;
        }
      }

      // Save to user array
      const res = await fetch(`/api/users/${currentUser.id}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      });
      const data = await res.json();
      if (data.success) {
        updateProfile({ savedEventIds: data.savedEvents });
        await refreshEvents();
        return true;
      }
    } catch (e) {
      console.error('Register for event error:', e);
    }
    return false;
  };

  // Coupons
  const applyCoupon = (code: string): boolean => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'KRIYA10') {
      setCouponCode(formatted);
      setDiscountRate(0.10);
      return true;
    }
    if (formatted === 'YOGA10') {
      setCouponCode(formatted);
      setDiscountRate(0.15);
      return true;
    }
    return false;
  };

  const orderTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppGlobalContext.Provider
      value={{
        language,
        setLanguage: setLanguageAndSave,
        t,
        translateUI,
        
        currentUser,
        setCurrentUser,
        loginUser,
        registerUser,
        logoutUser,
        updateProfile,
        
        gurus,
        ashrams,
        events,
        products,
        blogs,
        orders,
        homepageData,
        aboutData,

        refreshGurus,
        refreshAshrams,
        refreshEvents,
        refreshProducts,
        refreshOrders,
        refreshHomepage,
        updateHomepage,
        refreshAbout,
        updateAbout,
        refreshAllData,
        
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        savedEvents,
        registerForEvent,
        
        couponCode,
        setCouponCode,
        discountRate,
        applyCoupon,
        orderTotalQuantity,

        enabledLanguages,
        refreshLanguages,

        uiTranslations,
        refreshTranslations
      }}
    >
      {children}
    </AppGlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppGlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppGlobalProvider');
  }
  return context;
};
