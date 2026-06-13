import React, { useState, useRef } from 'react';
import { useGlobalContext } from '../context/LangContext';
import { Plus, Edit2, Trash2, Check, X, Shield, Settings, TrendingUp, ShoppingBag, Calendar, Users, RefreshCw, BookOpen, Compass, Globe, ChevronLeft, ChevronRight, Languages } from 'lucide-react';
import { Guru, Ashram, AshramEvent, Product, ProductCategory, LocalizedString, LanguageCode } from '../types';
import { ImageUploader } from './ImageUploader';
import { TranslationDrawer } from './TranslationDrawer';

export const AdminPanel: React.FC = () => {
  const {
    language,
    t,
    currentUser,
    gurus,
    ashrams,
    events,
    products,
    blogs,
    orders,
    homepageData,
    aboutData,
    refreshAllData,
    refreshOrders,
    updateHomepage,
    updateAbout,
    uiTranslations,
    refreshTranslations
  } = useGlobalContext();

  const [activeTab, setActiveTab] = useState<'analytics' | 'gurus' | 'ashrams' | 'events' | 'products' | 'orders' | 'homepage' | 'blogs' | 'languages' | 'translations'>('analytics');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (dir: 'left' | 'right') => {
    if (tabsRef.current) tabsRef.current.scrollBy({ left: dir === 'right' ? 160 : -160, behavior: 'smooth' });
  };

  // Language manager state
  type LangEntry = { code: string; label: string; enabled: boolean };
  const [langConfig, setLangConfig] = useState<LangEntry[]>([]);
  const [langSaving, setLangSaving] = useState(false);
  const [langMsg, setLangMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [newLangCode, setNewLangCode] = useState('');
  const [newLangLabel, setNewLangLabel] = useState('');

  // Translation manager state
  type TranslationMap = Record<string, { en: string; hi: string; gu: string; bn: string }>;
  const BUILTIN_KEYS = new Set(['appName','ashramSlogan','navGurus','navAshrams','navEvents','navStore','navBlogs','navAdmin','navDashboard','btnExploreGurus','btnFindAshrams','btnUpcomingEvents','btnVisitStore','lblAddToCart','lblBuyNow','lblWishlist','lblInStock','lblOutOfStock']);
  const [translationDraft, setTranslationDraft] = useState<TranslationMap>({});
  const [translationSaving, setTranslationSaving] = useState(false);
  const [translationMsg, setTranslationMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Drawer language selector state (shared across all entity drawers)
  const [drawerLang, setDrawerLang] = useState<LanguageCode>('en');

  const LANG_LABELS: Record<LanguageCode, string> = {
    en: 'English', hi: 'हिन्दी', gu: 'ગુજરાતી', bn: 'বাংলা'
  };

  React.useEffect(() => {
    if (uiTranslations && Object.keys(uiTranslations).length > 0) {
      setTranslationDraft(uiTranslations as TranslationMap);
    }
  }, [uiTranslations]);

  const handleSaveTranslations = async () => {
    setTranslationSaving(true);
    setTranslationMsg(null);
    try {
      const res = await fetch('/api/translations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(translationDraft)
      });
      const d = await res.json();
      if (d.success) {
        await refreshTranslations();
        setTranslationMsg({ ok: true, text: 'Translations saved. Site text updated.' });
      } else {
        setTranslationMsg({ ok: false, text: 'Save failed.' });
      }
    } catch {
      setTranslationMsg({ ok: false, text: 'Network error.' });
    }
    setTranslationSaving(false);
  };

  React.useEffect(() => {
    fetch('/api/languages')
      .then(r => r.json())
      .then(d => { if (d.success) setLangConfig(d.data); })
      .catch(() => {});
  }, []);

  const handleSaveLangs = async () => {
    setLangSaving(true);
    setLangMsg(null);
    try {
      const res = await fetch('/api/languages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(langConfig)
      });
      const d = await res.json();
      if (d.success) {
        setLangConfig(d.data);
        setLangMsg({ ok: true, text: 'Language settings saved.' });
      } else {
        setLangMsg({ ok: false, text: 'Save failed.' });
      }
    } catch {
      setLangMsg({ ok: false, text: 'Network error.' });
    }
    setLangSaving(false);
  };

  // Modal / Form state editors
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Forms states
  const [guruForm, setGuruForm] = useState<{
    name_en: string; name_hi: string; name_gu: string; name_bn: string;
    era: string; country: string;
    lineage_en: string; lineage_hi: string; lineage_gu: string; lineage_bn: string;
    discipleOf_en: string; discipleOf_hi: string; discipleOf_gu: string; discipleOf_bn: string;
    photoUrl: string;
    summary_en: string; summary_hi: string; summary_gu: string; summary_bn: string;
    biography_en: string; biography_hi: string; biography_gu: string; biography_bn: string;
    birthDate: string; deathDate: string;
    birthPlace_en: string; birthPlace_hi: string; birthPlace_gu: string; birthPlace_bn: string;
  }>({
    name_en: '', name_hi: '', name_gu: '', name_bn: '',
    era: 'Modern Era', country: 'India',
    lineage_en: '', lineage_hi: '', lineage_gu: '', lineage_bn: '',
    discipleOf_en: '', discipleOf_hi: '', discipleOf_gu: '', discipleOf_bn: '',
    photoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400',
    summary_en: '', summary_hi: '', summary_gu: '', summary_bn: '',
    biography_en: '', biography_hi: '', biography_gu: '', biography_bn: '',
    birthDate: '', deathDate: '',
    birthPlace_en: '', birthPlace_hi: '', birthPlace_gu: '', birthPlace_bn: ''
  });

  const [productForm, setProductForm] = useState<{
    name_en: string; name_hi: string; name_gu: string; name_bn: string;
    description_en: string; description_hi: string; description_gu: string; description_bn: string;
    category: ProductCategory; price: number; stock: number; isAvailable: boolean;
    imageUrl: string;
  }>({
    name_en: '', name_hi: '', name_gu: '', name_bn: '',
    description_en: '', description_hi: '', description_gu: '', description_bn: '',
    category: 'Books', price: 100, stock: 50, isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
  });

  const [eventForm, setEventForm] = useState<{
    name_en: string; name_hi: string; name_gu: string; name_bn: string;
    description_en: string; description_hi: string; description_gu: string; description_bn: string;
    date: string; time: string;
    location_en: string; location_hi: string; location_gu: string; location_bn: string;
    imageUrl: string; ticketPrice: number; availableTickets: number; isActive: boolean;
  }>({
    name_en: '', name_hi: '', name_gu: '', name_bn: '',
    description_en: '', description_hi: '', description_gu: '', description_bn: '',
    date: '', time: '',
    location_en: '', location_hi: '', location_gu: '', location_bn: '',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800',
    ticketPrice: 0, availableTickets: 500, isActive: true
  });

  const [ashramForm, setAshramForm] = useState<{
    name_en: string; name_hi: string; name_gu: string; name_bn: string;
    city: string; state: string; country: string;
    latitude: number; longitude: number;
    coverUrl: string;
    purpose_en: string; purpose_hi: string; purpose_gu: string; purpose_bn: string;
    establishedDate: string;
  }>({
    name_en: '', name_hi: '', name_gu: '', name_bn: '',
    city: '', state: '', country: 'India',
    latitude: 20.5937, longitude: 78.9629,
    coverUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
    purpose_en: '', purpose_hi: '', purpose_gu: '', purpose_bn: '',
    establishedDate: 'Established, 1975'
  });

  const [blogForm, setBlogForm] = useState<{
    title_en: string; title_hi: string; title_gu: string; title_bn: string;
    content_en: string; content_hi: string; content_gu: string; content_bn: string;
    category: string; author: string; coverUrl: string;
  }>({
    title_en: '', title_hi: '', title_gu: '', title_bn: '',
    content_en: '', content_hi: '', content_gu: '', content_bn: '',
    category: 'Veda Philosophy', author: 'Ashram Editorial Team',
    coverUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600'
  });

  const [homepageForm, setHomepageForm] = useState<{
    aboutUsTitle_en: string; aboutUsTitle_hi: string; aboutUsTitle_gu: string; aboutUsTitle_bn: string;
    aboutUsSub_en: string; aboutUsSub_hi: string; aboutUsSub_gu: string; aboutUsSub_bn: string;
    aboutUsDescription_en: string; aboutUsDescription_hi: string; aboutUsDescription_gu: string; aboutUsDescription_bn: string;
    aboutUsBgUrl: string;
  }>({
    aboutUsTitle_en: '', aboutUsTitle_hi: '', aboutUsTitle_gu: '', aboutUsTitle_bn: '',
    aboutUsSub_en: '', aboutUsSub_hi: '', aboutUsSub_gu: '', aboutUsSub_bn: '',
    aboutUsDescription_en: '', aboutUsDescription_hi: '', aboutUsDescription_gu: '', aboutUsDescription_bn: '',
    aboutUsBgUrl: ''
  });

  React.useEffect(() => {
    if (aboutData) {
      setHomepageForm({
        aboutUsTitle_en: aboutData.aboutUsTitle?.en || '',
        aboutUsTitle_hi: aboutData.aboutUsTitle?.hi || '',
        aboutUsTitle_gu: aboutData.aboutUsTitle?.gu || '',
        aboutUsTitle_bn: aboutData.aboutUsTitle?.bn || '',
        aboutUsSub_en: aboutData.aboutUsSub?.en || '',
        aboutUsSub_hi: aboutData.aboutUsSub?.hi || '',
        aboutUsSub_gu: aboutData.aboutUsSub?.gu || '',
        aboutUsSub_bn: aboutData.aboutUsSub?.bn || '',
        aboutUsDescription_en: aboutData.aboutUsDescription?.en || '',
        aboutUsDescription_hi: aboutData.aboutUsDescription?.hi || '',
        aboutUsDescription_gu: aboutData.aboutUsDescription?.gu || '',
        aboutUsDescription_bn: aboutData.aboutUsDescription?.bn || '',
        aboutUsBgUrl: aboutData.aboutUsBgUrl || ''
      });
    }
  }, [aboutData]);

  // Check roles permissions
  const isAdmin = currentUser?.role === 'Super Admin';
  const isContentManager = currentUser?.role === 'Content Manager' || isAdmin;
  const isStoreManager = currentUser?.role === 'Store Manager' || isAdmin;

  // Global Sync Helpers
  const handleSyncData = async () => {
    setIsSyncing(true);
    await Promise.all([refreshAllData(), refreshOrders()]);
    setTimeout(() => setIsSyncing(false), 800);
  };

  // Events status mark active/inactive toggle
  const handleToggleEventStatus = async (event: AshramEvent) => {
    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !event.isActive })
      });
      const data = await res.json();
      if (data.success) {
        handleSyncData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Orders Log status updating
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        handleSyncData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Products Submit handler
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: { en: productForm.name_en, hi: productForm.name_hi, gu: productForm.name_gu, bn: productForm.name_bn },
      description: { en: productForm.description_en, hi: productForm.description_hi, gu: productForm.description_gu, bn: productForm.description_bn },
      category: productForm.category,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      isAvailable: productForm.stock > 0,
      imageUrl: productForm.imageUrl
    };

    try {
      let url = '/api/products';
      let method = 'POST';
      if (editingEntityId) {
        url = `/api/products/${editingEntityId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowAddForm(false);
        setEditingEntityId(null);
        setDrawerLang('en');
        handleSyncData();
        setProductForm({
          name_en: '', name_hi: '', name_gu: '', name_bn: '',
          description_en: '', description_hi: '', description_gu: '', description_bn: '',
          category: 'Books', price: 100, stock: 50, isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete entity trigger
  const handleDeleteEntity = async (type: 'gurus' | 'ashrams' | 'events' | 'products' | 'blogs', id: string) => {
    if (!window.confirm(`Are you absolutely sure you want to delete this ${type.slice(0, -1)}? This is irreversible.`)) return;
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        handleSyncData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Guru Submit handler
  const handleGuruSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: { en: guruForm.name_en, hi: guruForm.name_hi, gu: guruForm.name_gu, bn: guruForm.name_bn },
      era: guruForm.era,
      country: guruForm.country,
      lineage: { en: guruForm.lineage_en, hi: guruForm.lineage_hi, gu: guruForm.lineage_gu, bn: guruForm.lineage_bn },
      discipleOf: { en: guruForm.discipleOf_en, hi: guruForm.discipleOf_hi, gu: guruForm.discipleOf_gu, bn: guruForm.discipleOf_bn },
      photoUrl: guruForm.photoUrl,
      summary: { en: guruForm.summary_en, hi: guruForm.summary_hi, gu: guruForm.summary_gu, bn: guruForm.summary_bn },
      biography: { en: guruForm.biography_en, hi: guruForm.biography_hi, gu: guruForm.biography_gu, bn: guruForm.biography_bn },
      birthDate: guruForm.birthDate,
      deathDate: guruForm.deathDate,
      birthPlace: { en: guruForm.birthPlace_en, hi: guruForm.birthPlace_hi, gu: guruForm.birthPlace_gu, bn: guruForm.birthPlace_bn },
      majorContributions: [
        { en: "Vedic Translation & Chanting Dissemination", hi: "वैदिक अनुवाद और संकीर्तन प्रचार", gu: "વેદિક અનુવાદ અને સંકીર્તન પ્રચાર", bn: "বৈদিক অনুবাদ ও সংকীর্তন প্রচার" }
      ],
      timeline: [
        { year: guruForm.birthDate.slice(-4) || '1975', title: { en: "Auspicious Appearance", hi: "शुभ प्राकट्य", gu: "શુભ પ્રાગટ્ય", bn: "শুভ আবির্ভাব" }, description: { en: "Began spiritual journey", hi: "आध्यात्मिक यात्रा शुरू की", gu: "આધ્યાત્મિક યાત્રા શરૂ કરી", bn: "আধ্যাত্মিক যাত্রা শুরু করলেন" } }
      ],
      teachings: []
    };

    try {
      let url = '/api/gurus';
      let method = 'POST';
      if (editingEntityId) {
        url = `/api/gurus/${editingEntityId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowAddForm(false);
        setEditingEntityId(null);
        setDrawerLang('en');
        handleSyncData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Ashram Submit handler
  const handleAshramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: { en: ashramForm.name_en, hi: ashramForm.name_hi, gu: ashramForm.name_gu, bn: ashramForm.name_bn },
      city: ashramForm.city,
      state: ashramForm.state,
      country: ashramForm.country,
      latitude: Number(ashramForm.latitude),
      longitude: Number(ashramForm.longitude),
      coverUrl: ashramForm.coverUrl,
      purpose: { en: ashramForm.purpose_en, hi: ashramForm.purpose_hi, gu: ashramForm.purpose_gu, bn: ashramForm.purpose_bn },
      establishedDate: ashramForm.establishedDate
    };

    try {
      let url = '/api/ashrams';
      let method = 'POST';
      if (editingEntityId) {
        url = `/api/ashrams/${editingEntityId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowAddForm(false);
        setEditingEntityId(null);
        setDrawerLang('en');
        handleSyncData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Event Submit handler
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: { en: eventForm.name_en, hi: eventForm.name_hi, gu: eventForm.name_gu, bn: eventForm.name_bn },
      description: { en: eventForm.description_en, hi: eventForm.description_hi, gu: eventForm.description_gu, bn: eventForm.description_bn },
      date: eventForm.date,
      time: eventForm.time,
      location: { en: eventForm.location_en, hi: eventForm.location_hi, gu: eventForm.location_gu, bn: eventForm.location_bn },
      imageUrl: eventForm.imageUrl,
      ticketPrice: Number(eventForm.ticketPrice),
      availableTickets: Number(eventForm.availableTickets),
      isActive: eventForm.isActive
    };

    try {
      let url = '/api/events';
      let method = 'POST';
      if (editingEntityId) {
        url = `/api/events/${editingEntityId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowAddForm(false);
        setEditingEntityId(null);
        setDrawerLang('en');
        handleSyncData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Blog Submit handler
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: { en: blogForm.title_en, hi: blogForm.title_hi, gu: blogForm.title_gu, bn: blogForm.title_bn },
      content: { en: blogForm.content_en, hi: blogForm.content_hi, gu: blogForm.content_gu, bn: blogForm.content_bn },
      category: blogForm.category,
      author: blogForm.author,
      coverUrl: blogForm.coverUrl,
      publishedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: '6 min read'
    };

    try {
      let url = '/api/blogs';
      let method = 'POST';
      if (editingEntityId) {
        url = `/api/blogs/${editingEntityId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowAddForm(false);
        setEditingEntityId(null);
        setDrawerLang('en');
        handleSyncData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Homepage Submit handler
  const handleHomepageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const aboutPayload = {
      aboutUsTitle: {
        en: homepageForm.aboutUsTitle_en,
        hi: homepageForm.aboutUsTitle_hi,
        gu: homepageForm.aboutUsTitle_gu,
        bn: homepageForm.aboutUsTitle_bn
      },
      aboutUsSub: {
        en: homepageForm.aboutUsSub_en,
        hi: homepageForm.aboutUsSub_hi,
        gu: homepageForm.aboutUsSub_gu,
        bn: homepageForm.aboutUsSub_bn
      },
      aboutUsDescription: {
        en: homepageForm.aboutUsDescription_en,
        hi: homepageForm.aboutUsDescription_hi,
        gu: homepageForm.aboutUsDescription_gu,
        bn: homepageForm.aboutUsDescription_bn
      },
      aboutUsBgUrl: homepageForm.aboutUsBgUrl
    };

    const success = await updateAbout(aboutPayload);
    if (success) {
      alert('About Us configuration updated successfully!');
      handleSyncData();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Profile role status banner */}
      <div className="bg-amber-950 text-amber-150 p-6 rounded-2xl border border-amber-900 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        
        {/* Abstract background motif */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center justify-end pointer-events-none">
          <Shield className="w-48 h-48 text-amber-500 scale-125 translate-x-12 translate-y-6" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-amber-950 font-bold font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Role: {currentUser?.role || 'Guest Admin'}
            </span>
            <span className="text-[10px] text-amber-300 font-mono">Platform Environment Active</span>
          </div>
          <h2 className="text-2xl font-serif text-amber-50 font-medium tracking-tight mt-1">
            {t({
              en: 'Auspicious Administrative Workspace',
              hi: 'दिव्य प्रशासन कार्यालय',
              gu: 'દિવ્ય પ્રશાસન કાર્યાલય',
              bn: 'পরম প্রশাসনিক কার্যালয়'
            })}
          </h2>
          <p className="text-xs text-amber-200/70 mt-1">
            Authorize new temple details, edit e-commerce listings, register blogs and manage orders database.
          </p>
        </div>

        <button
          onClick={handleSyncData}
          disabled={isSyncing}
          className="flex-shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-amber-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing...' : 'Sync Database'}
        </button>
      </div>

      {/* Admin Modules Navigation Drawer tabs */}
      <div className="relative flex items-end">
        <button
          onClick={() => scrollTabs('left')}
          className="shrink-0 p-1.5 text-amber-600 hover:text-amber-950 hover:bg-amber-50 rounded transition-colors mb-0.5"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div ref={tabsRef} className="flex border-b border-amber-200/80 overflow-x-auto scrollbar-none gap-0 flex-1">
          {[
            { id: 'analytics', label: 'Overview Analytics', icon: TrendingUp, allow: true },
            { id: 'orders', label: 'Orders & Logistics', icon: ShoppingBag, allow: isStoreManager },
            { id: 'products', label: 'E-Store CRUD', icon: ShoppingBag, allow: isStoreManager },
            { id: 'events', label: 'Events Manager', icon: Calendar, allow: isContentManager },
            { id: 'gurus', label: 'Gurus Registry', icon: Users, allow: isContentManager },
            { id: 'ashrams', label: 'Ashram Map & List', icon: Globe, allow: isContentManager },
            { id: 'blogs', label: 'Blogs Manager', icon: BookOpen, allow: isContentManager },
            { id: 'homepage', label: 'Homepage Control', icon: Settings, allow: isContentManager },
            { id: 'languages', label: 'Language Manager', icon: Globe, allow: isAdmin },
            { id: 'translations', label: 'UI Translations', icon: Languages, allow: isAdmin }
          ]
            .filter(tab => tab.allow)
            .map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setShowAddForm(false);
                  setEditingEntityId(null);
                }}
                className={`px-4 py-3 text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-amber-600 text-amber-950 font-bold'
                    : 'border-transparent text-amber-800 hover:text-amber-950'
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}
        </div>
        <button
          onClick={() => scrollTabs('right')}
          className="shrink-0 p-1.5 text-amber-600 hover:text-amber-950 hover:bg-amber-50 rounded transition-colors mb-0.5"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* RENDER ANALYTICS TAB DEFAULT */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Bento aggregate cards layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-850/60 block">Total Revenue</span>
              <p className="text-2xl font-bold text-amber-950 font-mono mt-1">
                ₹{orders.reduce((sum, o) => o.paymentStatus === 'Paid' ? sum + o.total : sum, 0)}
              </p>
              <span className="text-[9px] text-emerald-600 font-bold font-mono mt-1 block">▲ +12% Growth</span>
            </div>

            <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-850/60 block">E-Store Orders</span>
              <p className="text-2xl font-bold text-amber-950 font-mono mt-1">{orders.length}</p>
              <span className="text-[9px] text-amber-700 font-mono mt-1 block">{orders.filter(o => o.orderStatus === 'Processing').length} Pending clearances</span>
            </div>

            <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-850/60 block">Active Calendars</span>
              <p className="text-2xl font-bold text-amber-950 font-mono mt-1">{events.filter(e => e.isActive).length}</p>
              <span className="text-[9px] text-amber-700 font-mono mt-1 block">{events.reduce((sum, e) => sum + e.registrationsCount, 0)} Registrations</span>
            </div>

            <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-850/60 block">Gurus & Ashrams</span>
              <p className="text-2xl font-bold text-amber-950 font-mono mt-1">{gurus.length + ashrams.length}</p>
              <span className="text-[9px] text-emerald-600 font-bold font-mono mt-1 block">Fully Scaled</span>
            </div>

          </div>

          {/* Quick Orders Dashboard Tracker log */}
          <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
            <h3 className="text-base font-serif font-medium text-amber-950 mb-4">Auspicious Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-amber-950">
                <thead>
                  <tr className="border-b border-amber-50 uppercase text-[9px] tracking-wider text-amber-850/60">
                    <th className="pb-3 text-left">Order ID</th>
                    <th className="pb-3 text-left">Date</th>
                    <th className="pb-3 text-left">User ID</th>
                    <th className="pb-3 text-left">Items Sum</th>
                    <th className="pb-3 text-left">Total Cash</th>
                    <th className="pb-3 text-center">Payment</th>
                    <th className="pb-3 text-center">Tracking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {orders.map((o, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20">
                      <td className="py-3 font-bold font-mono">{o.id}</td>
                      <td className="py-3 text-amber-700 font-mono">{o.orderDate.split('T')[0]}</td>
                      <td className="py-3 text-amber-700 font-mono font-medium truncate max-w-[80px]" title={o.userId}>{o.userId}</td>
                      <td className="py-3 max-w-[120px] truncate">
                        {o.items.map(item => `${item.quantity}x ${t(item.productName)}`).join(', ')}
                      </td>
                      <td className="py-3 font-mono font-bold">₹{o.total}</td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.orderStatus === 'Delivered' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {o.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER PRODUCTS CRUD TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
            <div>
              <h3 className="text-base font-serif font-medium text-amber-950">E-Store Products</h3>
              <p className="text-[11px] text-amber-800/70 mt-0.5">Edit store cards and update stockpiles</p>
            </div>
            
            <button
              onClick={() => {
                setEditingEntityId(null);
                setDrawerLang('en');
                setProductForm({
                  name_en: '', name_hi: '', name_gu: '', name_bn: '',
                  description_en: '', description_hi: '', description_gu: '', description_bn: '',
                  category: 'Books', price: 100, stock: 50, isAvailable: true,
                  imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
                });
                setShowAddForm(true);
              }}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </button>
          </div>

          <TranslationDrawer
            open={showAddForm}
            title={editingEntityId ? 'Edit Product' : 'Add New Product'}
            selectedLang={drawerLang}
            onLangChange={setDrawerLang}
            onClose={() => { setShowAddForm(false); setDrawerLang('en'); }}
            onSave={handleProductSubmit}
          >
            {/* Translation fields */}
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-100 pb-2">
                Content · {LANG_LABELS[drawerLang]}
              </p>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">
                  Product Name{drawerLang === 'en' ? ' *' : ''}
                </label>
                <input
                  type="text"
                  required={drawerLang === 'en'}
                  value={(productForm as any)[`name_${drawerLang}`]}
                  onChange={e => setProductForm({ ...productForm, [`name_${drawerLang}`]: e.target.value })}
                  placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''}
                  className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5"
                />
                {drawerLang !== 'en' && (
                  <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {productForm.name_en || '—'}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">
                  Description{drawerLang === 'en' ? ' *' : ''}
                </label>
                <textarea
                  required={drawerLang === 'en'}
                  value={(productForm as any)[`description_${drawerLang}`]}
                  onChange={e => setProductForm({ ...productForm, [`description_${drawerLang}`]: e.target.value })}
                  placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''}
                  className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 h-20"
                />
                {drawerLang !== 'en' && (
                  <p className="text-[10px] text-amber-400 mt-0.5 italic line-clamp-2">EN: {productForm.description_en || '—'}</p>
                )}
              </div>
            </div>

            {/* Product details */}
            <div className="space-y-4 pt-4 border-t border-amber-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 pb-1">Product Details</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5"
                  >
                    <option>Books</option>
                    <option>Clothing</option>
                    <option>Accessories</option>
                    <option>Spiritual Items</option>
                    <option>Donations</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price || ''}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Inventory Stock Level *</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock || ''}
                    onChange={e => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <ImageUploader
                    label="Product Image"
                    defaultUrl={productForm.imageUrl}
                    imageType="thumbnail"
                    entity="products"
                    onUploadSuccess={url => setProductForm({ ...productForm, imageUrl: url })}
                  />
                  <div className="mt-1">
                    <label className="text-[9px] font-mono text-amber-700/70 block mb-0.5">Or paste direct image URL</label>
                    <input
                      type="text"
                      required
                      value={productForm.imageUrl}
                      onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                      className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TranslationDrawer>

          {/* Table list */}
          <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-amber-50 uppercase text-[9px] tracking-wider text-amber-800/60 pb-3">
                    <th className="pb-3">Product Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Stock Pool</th>
                    <th className="pb-3 text-center">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {products.map((p, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20">
                      <td className="py-3 font-medium text-amber-950 flex items-center gap-2.5">
                        <img src={p.imageUrl} alt={t(p.name)} className="w-8 h-8 rounded object-cover" />
                        <span>{t(p.name)}</span>
                      </td>
                      <td className="py-3 text-amber-800">{p.category}</td>
                      <td className="py-3 font-mono font-bold">₹{p.price}</td>
                      <td className="py-3 font-mono">{p.stock} units</td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          p.stock > 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {p.stock > 0 ? 'Available' : 'Sold Out'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              setProductForm({
                                name_en: p.name.en, name_hi: p.name.hi, name_gu: p.name.gu, name_bn: p.name.bn,
                                description_en: p.description.en, description_hi: p.description.hi, description_gu: p.description.gu, description_bn: p.description.bn,
                                category: p.category, price: p.price, stock: p.stock, isAvailable: p.isAvailable,
                                imageUrl: p.imageUrl
                              });
                              setEditingEntityId(p.id);
                              setDrawerLang('en');
                              setShowAddForm(true);
                            }}
                            className="p-1.5 hover:bg-amber-100 rounded text-amber-850"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEntity('products', p.id)}
                            className="p-1.5 hover:bg-rose-100 rounded text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER EVENTS CRUD TAB */}
      {activeTab === 'events' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-base font-serif font-medium text-amber-950">Auspicious Ashram Calendars</h3>
              <p className="text-[11px] text-amber-800/70 mt-0.5">Toggle Event Status Active/Inactive and monitor registrations count</p>
            </div>
            <button
              onClick={() => {
                setEditingEntityId(null);
                setDrawerLang('en');
                setEventForm({
                  name_en: '', name_hi: '', name_gu: '', name_bn: '',
                  description_en: '', description_hi: '', description_gu: '', description_bn: '',
                  date: '', time: '',
                  location_en: '', location_hi: '', location_gu: '', location_bn: '',
                  imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800',
                  ticketPrice: 0, availableTickets: 500, isActive: true
                });
                setShowAddForm(true);
              }}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add New Event
            </button>
          </div>

          <TranslationDrawer
            open={showAddForm}
            title={editingEntityId ? 'Edit Event' : 'Add New Event'}
            selectedLang={drawerLang}
            onLangChange={setDrawerLang}
            onClose={() => { setShowAddForm(false); setDrawerLang('en'); }}
            onSave={handleEventSubmit}
          >
            {/* Translation fields */}
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-100 pb-2">
                Content · {LANG_LABELS[drawerLang]}
              </p>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Event Name{drawerLang === 'en' ? ' *' : ''}</label>
                <input
                  type="text"
                  required={drawerLang === 'en'}
                  value={(eventForm as any)[`name_${drawerLang}`]}
                  onChange={e => setEventForm({ ...eventForm, [`name_${drawerLang}`]: e.target.value })}
                  placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''}
                  className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5"
                />
                {drawerLang !== 'en' && (
                  <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {eventForm.name_en || '—'}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Location{drawerLang === 'en' ? ' *' : ''}</label>
                <input
                  type="text"
                  required={drawerLang === 'en'}
                  value={(eventForm as any)[`location_${drawerLang}`]}
                  onChange={e => setEventForm({ ...eventForm, [`location_${drawerLang}`]: e.target.value })}
                  placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''}
                  className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5"
                />
                {drawerLang !== 'en' && (
                  <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {eventForm.location_en || '—'}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Description{drawerLang === 'en' ? ' *' : ''}</label>
                <textarea
                  required={drawerLang === 'en'}
                  value={(eventForm as any)[`description_${drawerLang}`]}
                  onChange={e => setEventForm({ ...eventForm, [`description_${drawerLang}`]: e.target.value })}
                  placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''}
                  className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 h-20"
                />
                {drawerLang !== 'en' && (
                  <p className="text-[10px] text-amber-400 mt-0.5 italic line-clamp-2">EN: {eventForm.description_en || '—'}</p>
                )}
              </div>
            </div>

            {/* Event details */}
            <div className="space-y-4 pt-4 border-t border-amber-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 pb-1">Event Details</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Date (YYYY-MM-DD) *</label>
                  <input type="date" required value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Time *</label>
                  <input type="text" required value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" placeholder="18:00" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Ticket Price (₹) *</label>
                  <input type="number" required value={eventForm.ticketPrice} onChange={e => setEventForm({...eventForm, ticketPrice: Number(e.target.value)})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Available Tickets</label>
                  <input type="number" value={eventForm.availableTickets} onChange={e => setEventForm({...eventForm, availableTickets: Number(e.target.value)})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
              </div>
              <div>
                <ImageUploader label="Event Banner Image" defaultUrl={eventForm.imageUrl} imageType="hero" entity="events" onUploadSuccess={url => setEventForm({...eventForm, imageUrl: url})} />
                <div className="mt-1">
                  <label className="text-[9px] font-mono text-amber-700/70 block mb-0.5">Or paste direct image URL</label>
                  <input type="text" required value={eventForm.imageUrl} onChange={e => setEventForm({...eventForm, imageUrl: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2 font-mono" />
                </div>
              </div>
            </div>
          </TranslationDrawer>

          <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-amber-50 uppercase text-[9px] tracking-wider text-amber-800/60 pb-3">
                    <th className="pb-3 text-left">Event Title</th>
                    <th className="pb-3 text-left">Auspicious Date</th>
                    <th className="pb-3 text-left">Location Coord.</th>
                    <th className="pb-3 text-center">Registrations</th>
                    <th className="pb-3 text-center">Display Active</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {events.map((e, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20">
                      <td className="py-3 font-bold text-amber-950 flex items-center gap-2.5">
                        <img src={e.imageUrl} alt={t(e.name)} className="w-9 h-9 object-cover rounded" />
                        <span>{t(e.name)}</span>
                      </td>
                      <td className="py-3 text-amber-800 font-mono">{e.date}</td>
                      <td className="py-3 text-amber-900">{t(e.location)}</td>
                      <td className="py-3 text-center font-bold font-mono text-emerald-800 bg-emerald-50/20">{e.registrationsCount}</td>
                      <td className="py-3 text-center">
                        <button
                          onClick={() => handleToggleEventStatus(e)}
                          className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-colors border ${
                            e.isActive
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-250'
                              : 'bg-rose-100 text-rose-800 border-rose-250'
                          }`}
                        >
                          {e.isActive ? '● Active' : '○ Inactive'}
                        </button>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              setEventForm({
                                name_en: e.name.en || '', name_hi: e.name.hi || '', name_gu: e.name.gu || '', name_bn: e.name.bn || '',
                                description_en: e.description.en || '', description_hi: e.description.hi || '', description_gu: e.description.gu || '', description_bn: e.description.bn || '',
                                date: e.date || '', time: e.time || '',
                                location_en: e.location.en || '', location_hi: e.location.hi || '', location_gu: e.location.gu || '', location_bn: e.location.bn || '',
                                imageUrl: e.imageUrl || '',
                                ticketPrice: e.ticketPrice || 0,
                                availableTickets: e.availableTickets || 500,
                                isActive: e.isActive
                              });
                              setEditingEntityId(e.id);
                              setDrawerLang('en');
                              setShowAddForm(true);
                            }}
                            className="p-1.5 hover:bg-amber-100 rounded text-amber-850"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEntity('events', e.id)}
                            className="p-1.5 hover:bg-rose-100 rounded text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER LOGISTICS WORKFLOW TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
            <h3 className="text-base font-serif font-medium text-amber-950">Store Logistics & Dispatch control</h3>
            <p className="text-[11px] text-amber-850/60 mt-0.5">Transition order dispatch statuses and configure tracking codes</p>
          </div>

          <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm space-y-4">
            {orders.map((o, idx) => (
              <div key={idx} className="border border-amber-100 rounded-xl p-4 bg-amber-50/10 space-y-3">
                <div className="flex flex-col sm:flex-row justify-between border-b border-amber-100/50 pb-2 gap-2 text-xs">
                  <div>
                    <span className="font-bold text-amber-950">Order Code: {o.id}</span>
                    <span className="text-amber-800 font-mono ml-2">({o.orderDate.split('T')[0]})</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-amber-800">Assign transit status:</span>
                    <select
                      value={o.orderStatus}
                      onChange={e => handleUpdateOrderStatus(o.id, e.target.value)}
                      className="text-[10px] font-bold bg-white border border-amber-200 rounded p-1"
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <h5 className="font-bold text-amber-950 uppercase text-[9px] tracking-wider mb-1">Recipient Address</h5>
                    <p className="text-amber-800 leading-relaxed font-serif">
                      {o.shippingAddress.fullName}<br />
                      {o.shippingAddress.addressLines}<br />
                      {o.shippingAddress.city}, {o.shippingAddress.state} - {o.shippingAddress.postalCode}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-amber-950 uppercase text-[9px] tracking-wider mb-1">Purchased Seva Listings</h5>
                    <ul className="space-y-1 list-disc list-inside text-amber-850">
                      {o.items.map((item, i) => (
                        <li key={i}>
                          {item.quantity}x {t(item.productName)} (₹{item.price})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-amber-950 uppercase text-[9px] tracking-wider mb-1">Financial Receipt</h5>
                    <p className="text-amber-700">Subtotal: ₹{o.subtotal}</p>
                    <p className="text-emerald-700">Discount: -₹{o.discount}</p>
                    <p className="text-base font-bold text-amber-950 font-mono mt-1">Total: ₹{o.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RENDER GURUS REGISTRY TAB */}
      {activeTab === 'gurus' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
            <div>
              <h3 className="text-base font-serif font-medium text-amber-950">Gurus lineage details</h3>
              <p className="text-[11px] text-amber-800/70 mt-0.5">Edit guru profile grids and biography</p>
            </div>
            <button
              onClick={() => {
                setEditingEntityId(null);
                setDrawerLang('en');
                setGuruForm({
                  name_en: '', name_hi: '', name_gu: '', name_bn: '',
                  era: 'Modern Era', country: 'India',
                  lineage_en: '', lineage_hi: '', lineage_gu: '', lineage_bn: '',
                  discipleOf_en: '', discipleOf_hi: '', discipleOf_gu: '', discipleOf_bn: '',
                  photoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400',
                  summary_en: '', summary_hi: '', summary_gu: '', summary_bn: '',
                  biography_en: '', biography_hi: '', biography_gu: '', biography_bn: '',
                  birthDate: '', deathDate: '',
                  birthPlace_en: '', birthPlace_hi: '', birthPlace_gu: '', birthPlace_bn: ''
                });
                setShowAddForm(true);
              }}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add New Guru
            </button>
          </div>

          <TranslationDrawer
            open={showAddForm}
            title={editingEntityId ? 'Edit Guru Profile' : 'Add New Guru'}
            selectedLang={drawerLang}
            onLangChange={setDrawerLang}
            onClose={() => { setShowAddForm(false); setDrawerLang('en'); }}
            onSave={handleGuruSubmit}
          >
            {/* Translation fields */}
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-100 pb-2">
                Content · {LANG_LABELS[drawerLang]}
              </p>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Guru Name{drawerLang === 'en' ? ' *' : ''}</label>
                <input type="text" required={drawerLang === 'en'} value={(guruForm as any)[`name_${drawerLang}`]} onChange={e => setGuruForm({...guruForm, [`name_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {guruForm.name_en || '—'}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Knowledge Lineage{drawerLang === 'en' ? ' *' : ''}</label>
                <input type="text" required={drawerLang === 'en'} value={(guruForm as any)[`lineage_${drawerLang}`]} onChange={e => setGuruForm({...guruForm, [`lineage_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {guruForm.lineage_en || '—'}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Direct Disciple of</label>
                <input type="text" value={(guruForm as any)[`discipleOf_${drawerLang}`]} onChange={e => setGuruForm({...guruForm, [`discipleOf_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {guruForm.discipleOf_en || '—'}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Summary{drawerLang === 'en' ? ' *' : ''}</label>
                <input type="text" required={drawerLang === 'en'} value={(guruForm as any)[`summary_${drawerLang}`]} onChange={e => setGuruForm({...guruForm, [`summary_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {guruForm.summary_en || '—'}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Biography{drawerLang === 'en' ? ' *' : ''}</label>
                <textarea required={drawerLang === 'en'} value={(guruForm as any)[`biography_${drawerLang}`]} onChange={e => setGuruForm({...guruForm, [`biography_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 h-20" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic line-clamp-2">EN: {guruForm.biography_en || '—'}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Birth Place</label>
                <input type="text" value={(guruForm as any)[`birthPlace_${drawerLang}`]} onChange={e => setGuruForm({...guruForm, [`birthPlace_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {guruForm.birthPlace_en || '—'}</p>}
              </div>
            </div>

            {/* Guru details */}
            <div className="space-y-4 pt-4 border-t border-amber-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 pb-1">Guru Details</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Era *</label>
                  <input type="text" required value={guruForm.era} onChange={e => setGuruForm({...guruForm, era: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Country *</label>
                  <input type="text" required value={guruForm.country} onChange={e => setGuruForm({...guruForm, country: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Birth Date</label>
                  <input type="text" value={guruForm.birthDate} onChange={e => setGuruForm({...guruForm, birthDate: e.target.value})} placeholder="Oct 31, 1896" className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Ascension / Death Date</label>
                  <input type="text" value={guruForm.deathDate} onChange={e => setGuruForm({...guruForm, deathDate: e.target.value})} placeholder="Nov 14, 1977" className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
              </div>
              <div>
                <ImageUploader label="Guru Portrait Photo" defaultUrl={guruForm.photoUrl} imageType="thumbnail" entity="gurus" onUploadSuccess={url => setGuruForm({...guruForm, photoUrl: url})} />
                <div className="mt-1">
                  <label className="text-[9px] font-mono text-amber-700/70 block mb-0.5">Or paste direct image URL</label>
                  <input type="text" required value={guruForm.photoUrl} onChange={e => setGuruForm({...guruForm, photoUrl: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2 font-mono" />
                </div>
              </div>
            </div>
          </TranslationDrawer>

          <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-amber-50 uppercase text-[9px] tracking-wider text-amber-805/60 pb-3">
                    <th className="pb-3 text-left">Guru Image</th>
                    <th className="pb-3 text-left">Name</th>
                    <th className="pb-3 text-left">Era</th>
                    <th className="pb-3 text-left">Lineage</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {gurus.map((g, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20">
                      <td className="py-3">
                        <img src={g.photoUrl} alt={t(g.name)} className="w-10 h-10 object-cover rounded-full" />
                      </td>
                      <td className="py-3 font-bold text-amber-950">{t(g.name)}</td>
                      <td className="py-3 text-amber-800 italic">{g.era}</td>
                      <td className="py-3 text-amber-900 font-serif">{t(g.lineage)}</td>
                      <td className="py-3 text-right">
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              setGuruForm({
                                name_en: g.name.en || '', name_hi: g.name.hi || '', name_gu: g.name.gu || '', name_bn: g.name.bn || '',
                                era: g.era || '', country: g.country || '',
                                lineage_en: g.lineage?.en || '', lineage_hi: g.lineage?.hi || '', lineage_gu: g.lineage?.gu || '', lineage_bn: g.lineage?.bn || '',
                                discipleOf_en: g.discipleOf?.en || '', discipleOf_hi: g.discipleOf?.hi || '', discipleOf_gu: g.discipleOf?.gu || '', discipleOf_bn: g.discipleOf?.bn || '',
                                photoUrl: g.photoUrl || '',
                                summary_en: g.summary?.en || '', summary_hi: g.summary?.hi || '', summary_gu: g.summary?.gu || '', summary_bn: g.summary?.bn || '',
                                biography_en: g.biography?.en || '', biography_hi: g.biography?.hi || '', biography_gu: g.biography?.gu || '', biography_bn: g.biography?.bn || '',
                                birthDate: g.birthDate || '', deathDate: g.deathDate || '',
                                birthPlace_en: g.birthPlace?.en || '', birthPlace_hi: g.birthPlace?.hi || '', birthPlace_gu: g.birthPlace?.gu || '', birthPlace_bn: g.birthPlace?.bn || ''
                              });
                              setEditingEntityId(g.id);
                              setDrawerLang('en');
                              setShowAddForm(true);
                            }}
                            className="p-1.5 hover:bg-amber-100 rounded text-amber-850"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEntity('gurus', g.id)}
                            className="p-1.5 hover:bg-rose-100 rounded text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER ASHRAMS TAB */}
      {activeTab === 'ashrams' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
            <div>
              <h3 className="text-base font-serif font-medium text-amber-950">Ashram Sanctuary Centers</h3>
              <p className="text-[11px] text-amber-800/70 mt-0.5">Manage details and coordinates of global ashrams displayed on the earth globe</p>
            </div>
            <button
              onClick={() => {
                setEditingEntityId(null);
                setDrawerLang('en');
                setAshramForm({
                  name_en: '', name_hi: '', name_gu: '', name_bn: '',
                  city: '', state: '', country: 'India',
                  latitude: 20.5937, longitude: 78.9629,
                  coverUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
                  purpose_en: '', purpose_hi: '', purpose_gu: '', purpose_bn: '',
                  establishedDate: 'Established, 1975'
                });
                setShowAddForm(true);
              }}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add New Ashram
            </button>
          </div>

          <TranslationDrawer
            open={showAddForm}
            title={editingEntityId ? 'Edit Ashram' : 'Add New Ashram'}
            selectedLang={drawerLang}
            onLangChange={setDrawerLang}
            onClose={() => { setShowAddForm(false); setDrawerLang('en'); }}
            onSave={handleAshramSubmit}
          >
            {/* Translation fields */}
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-100 pb-2">
                Content · {LANG_LABELS[drawerLang]}
              </p>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Ashram Name{drawerLang === 'en' ? ' *' : ''}</label>
                <input type="text" required={drawerLang === 'en'} value={(ashramForm as any)[`name_${drawerLang}`]} onChange={e => setAshramForm({...ashramForm, [`name_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {ashramForm.name_en || '—'}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Purpose / Mission{drawerLang === 'en' ? ' *' : ''}</label>
                <textarea required={drawerLang === 'en'} value={(ashramForm as any)[`purpose_${drawerLang}`]} onChange={e => setAshramForm({...ashramForm, [`purpose_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 h-20" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic line-clamp-2">EN: {ashramForm.purpose_en || '—'}</p>}
              </div>
            </div>

            {/* Ashram details */}
            <div className="space-y-4 pt-4 border-t border-amber-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 pb-1">Location Details</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">City *</label>
                  <input type="text" required value={ashramForm.city} onChange={e => setAshramForm({...ashramForm, city: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">State *</label>
                  <input type="text" required value={ashramForm.state} onChange={e => setAshramForm({...ashramForm, state: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Country *</label>
                  <input type="text" required value={ashramForm.country} onChange={e => setAshramForm({...ashramForm, country: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Established *</label>
                  <input type="text" required value={ashramForm.establishedDate} onChange={e => setAshramForm({...ashramForm, establishedDate: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Latitude *</label>
                  <input type="number" step="0.0001" required value={ashramForm.latitude} onChange={e => setAshramForm({...ashramForm, latitude: Number(e.target.value)})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-amber-900 block mb-1">Longitude *</label>
                  <input type="number" step="0.0001" required value={ashramForm.longitude} onChange={e => setAshramForm({...ashramForm, longitude: Number(e.target.value)})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                </div>
              </div>
              <div>
                <ImageUploader label="Ashram Cover Image" defaultUrl={ashramForm.coverUrl} imageType="hero" entity="ashrams" onUploadSuccess={url => setAshramForm({...ashramForm, coverUrl: url})} />
                <div className="mt-1">
                  <label className="text-[9px] font-mono text-amber-700/70 block mb-0.5">Or paste direct image URL</label>
                  <input type="text" required value={ashramForm.coverUrl} onChange={e => setAshramForm({...ashramForm, coverUrl: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2 font-mono" />
                </div>
              </div>
            </div>
          </TranslationDrawer>

          <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-amber-50 uppercase text-[9px] tracking-wider text-amber-800/60 pb-3 font-mono">
                    <th className="pb-3 text-left">Cover</th>
                    <th className="pb-3 text-left">Ashram Sanctuary</th>
                    <th className="pb-3 text-left">City & Location</th>
                    <th className="pb-3 text-left">Coordinates</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {ashrams.map((a, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20">
                      <td className="py-3">
                        <img src={a.coverUrl} alt={t(a.name)} className="w-12 h-9 object-cover rounded" />
                      </td>
                      <td className="py-3 font-serif font-bold text-amber-950">{t(a.name)}</td>
                      <td className="py-3 text-amber-800 font-mono text-xs">{a.city}, {a.state}, {a.country}</td>
                      <td className="py-3 text-amber-700 font-mono text-[11px]">{a.latitude.toFixed(4)}°N, {a.longitude.toFixed(4)}°E</td>
                      <td className="py-3 text-right">
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              setAshramForm({
                                name_en: a.name.en || '', name_hi: a.name.hi || '', name_gu: a.name.gu || '', name_bn: a.name.bn || '',
                                city: a.city || '', state: a.state || '', country: a.country || 'India',
                                latitude: a.latitude || 20, longitude: a.longitude || 78,
                                coverUrl: a.coverUrl || '',
                                purpose_en: a.purpose?.en || '', purpose_hi: a.purpose?.hi || '', purpose_gu: a.purpose?.gu || '', purpose_bn: a.purpose?.bn || '',
                                establishedDate: a.establishedDate || ''
                              });
                              setEditingEntityId(a.id);
                              setDrawerLang('en');
                              setShowAddForm(true);
                            }}
                            className="p-1.5 hover:bg-amber-100 rounded text-amber-850"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEntity('ashrams', a.id)}
                            className="p-1.5 hover:bg-rose-100 rounded text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER BLOGS TAB */}
      {activeTab === 'blogs' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
            <div>
              <h3 className="text-base font-serif font-medium text-amber-950">Spiritual Blogs Manager</h3>
              <p className="text-[11px] text-amber-800/70 mt-0.5">Author articles, wisdom diaries, or dynamic news posts</p>
            </div>
            <button
              onClick={() => {
                setEditingEntityId(null);
                setDrawerLang('en');
                setBlogForm({
                  title_en: '', title_hi: '', title_gu: '', title_bn: '',
                  content_en: '', content_hi: '', content_gu: '', content_bn: '',
                  category: 'Veda Philosophy', author: 'Ashram Editorial Team',
                  coverUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600'
                });
                setShowAddForm(true);
              }}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add New Blog Post
            </button>
          </div>

          <TranslationDrawer
            open={showAddForm}
            title={editingEntityId ? 'Edit Blog Post' : 'Add New Blog Post'}
            selectedLang={drawerLang}
            onLangChange={setDrawerLang}
            onClose={() => { setShowAddForm(false); setDrawerLang('en'); }}
            onSave={handleBlogSubmit}
          >
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-100 pb-2">
                Content · {LANG_LABELS[drawerLang]}
              </p>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Blog Title{drawerLang === 'en' ? ' *' : ''}</label>
                <input type="text" required={drawerLang === 'en'} value={(blogForm as any)[`title_${drawerLang}`]} onChange={e => setBlogForm({...blogForm, [`title_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {blogForm.title_en || '—'}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Content Body{drawerLang === 'en' ? ' *' : ''}</label>
                <textarea required={drawerLang === 'en'} value={(blogForm as any)[`content_${drawerLang}`]} onChange={e => setBlogForm({...blogForm, [`content_${drawerLang}`]: e.target.value})} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 h-40" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic line-clamp-2">EN: {blogForm.content_en || '—'}</p>}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-amber-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 pb-1">Post Details</p>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Category *</label>
                <input type="text" required value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Author Byline *</label>
                <input type="text" required value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
              </div>
              <div>
                <ImageUploader label="Blog Post Cover Image" defaultUrl={blogForm.coverUrl} imageType="thumbnail" entity="blogs" onUploadSuccess={url => setBlogForm({...blogForm, coverUrl: url})} />
                <div className="mt-1">
                  <label className="text-[9px] font-mono text-amber-700/70 block mb-0.5">Or paste direct image URL</label>
                  <input type="text" required value={blogForm.coverUrl} onChange={e => setBlogForm({...blogForm, coverUrl: e.target.value})} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2 font-mono" />
                </div>
              </div>
            </div>
          </TranslationDrawer>

          <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-amber-50 uppercase text-[9px] tracking-wider text-amber-800/60 pb-3 font-mono">
                    <th className="pb-3 text-left">Post Cover</th>
                    <th className="pb-3 text-left">Title</th>
                    <th className="pb-3 text-left">Category</th>
                    <th className="pb-3 text-left">Author</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {blogs.map((b, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20">
                      <td className="py-3">
                        <img src={b.coverUrl} alt={t(b.title)} className="w-12 h-9 object-cover rounded" />
                      </td>
                      <td className="py-3 font-serif font-bold text-amber-950">{t(b.title)}</td>
                      <td className="py-3 text-amber-800">{b.category}</td>
                      <td className="py-3 text-amber-700 font-mono text-[11px]">{b.author}</td>
                      <td className="py-3 text-right">
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              setBlogForm({
                                title_en: b.title.en || '', title_hi: b.title.hi || '', title_gu: b.title.gu || '', title_bn: b.title.bn || '',
                                content_en: b.content.en || '', content_hi: b.content.hi || '', content_gu: b.content.gu || '', content_bn: b.content.bn || '',
                                category: b.category || '', author: b.author || '', coverUrl: b.coverUrl || ''
                              });
                              setEditingEntityId(b.id);
                              setDrawerLang('en');
                              setShowAddForm(true);
                            }}
                            className="p-1.5 hover:bg-amber-100 rounded text-amber-850"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEntity('blogs', b.id)}
                            className="p-1.5 hover:bg-rose-100 rounded text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER HOMEPAGE CONTROL TAB */}
      {activeTab === 'homepage' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-base font-serif font-medium text-amber-950">About Us & Homepage Controls</h3>
              <p className="text-[11px] text-amber-800/70 mt-0.5">Edit About Us titles, text block translations, and layout background images</p>
            </div>
          </div>

          <form onSubmit={handleHomepageSubmit} className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5 shadow-sm">
            {/* Language selector */}
            <div className="pb-4 border-b border-amber-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-2">Content Language</p>
              <div className="flex gap-2 flex-wrap">
                {(['en', 'hi', 'gu', 'bn'] as const).map(code => (
                  <button key={code} type="button" onClick={() => setDrawerLang(code)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${drawerLang === code ? 'bg-amber-600 text-white shadow-sm' : 'bg-white border border-amber-200 text-amber-800 hover:border-amber-400 hover:bg-amber-50'}`}>
                    {LANG_LABELS[code]}
                  </button>
                ))}
              </div>
              {drawerLang !== 'en' && (
                <p className="text-[10px] text-amber-500 mt-1.5 italic">English shown as reference below each translation field.</p>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-amber-100 pb-1.5 font-mono">
                About Us Section · {LANG_LABELS[drawerLang]}
              </h4>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">About Us Header Title{drawerLang === 'en' ? ' *' : ''}</label>
                <input type="text" required={drawerLang === 'en'} value={(homepageForm as any)[`aboutUsTitle_${drawerLang}`]} onChange={e => setHomepageForm({ ...homepageForm, [`aboutUsTitle_${drawerLang}`]: e.target.value })} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {homepageForm.aboutUsTitle_en || '—'}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Intro Subtitle / Slogan{drawerLang === 'en' ? ' *' : ''}</label>
                <input type="text" required={drawerLang === 'en'} value={(homepageForm as any)[`aboutUsSub_${drawerLang}`]} onChange={e => setHomepageForm({ ...homepageForm, [`aboutUsSub_${drawerLang}`]: e.target.value })} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic truncate">EN: {homepageForm.aboutUsSub_en || '—'}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-amber-900 block mb-1">Purpose / Philosophy Narrative{drawerLang === 'en' ? ' *' : ''}</label>
                <textarea required={drawerLang === 'en'} value={(homepageForm as any)[`aboutUsDescription_${drawerLang}`]} onChange={e => setHomepageForm({ ...homepageForm, [`aboutUsDescription_${drawerLang}`]: e.target.value })} placeholder={drawerLang !== 'en' ? 'Leave blank to use English' : ''} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 h-24 font-serif" />
                {drawerLang !== 'en' && <p className="text-[10px] text-amber-400 mt-0.5 italic line-clamp-2">EN: {homepageForm.aboutUsDescription_en || '—'}</p>}
              </div>
            </div>

            <div className="pt-4 border-t border-amber-100 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Background Image</p>
              <ImageUploader label="About Us Section Background Image" defaultUrl={homepageForm.aboutUsBgUrl} imageType="hero" entity="about" onUploadSuccess={url => setHomepageForm({...homepageForm, aboutUsBgUrl: url})} />
              <div className="mt-1">
                <label className="text-[9px] font-mono text-amber-700/70 block mb-0.5">Or paste direct image URL</label>
                <input type="text" required value={homepageForm.aboutUsBgUrl} onChange={e => setHomepageForm({ ...homepageForm, aboutUsBgUrl: e.target.value })} className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2 font-mono" />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-amber-50">
              <button type="submit" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer">
                Save Homepage Control Config
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LANGUAGE MANAGER TAB */}
      {activeTab === 'languages' && (
        <div className="space-y-6 animate-in fade-in duration-200">

          {/* Add new language */}
          <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm">
            <h3 className="text-base font-serif font-medium text-amber-950 mb-4">Add New Language</h3>
            <div className="flex gap-3 items-end">
              <div className="space-y-1 w-28">
                <label className="text-[10px] font-bold text-amber-900 block uppercase tracking-wider">Code</label>
                <input
                  type="text"
                  placeholder="e.g. ta"
                  maxLength={10}
                  value={newLangCode}
                  onChange={(e: { target: { value: string } }) => setNewLangCode(e.target.value.toLowerCase().trim())}
                  className="w-full text-xs bg-white border border-amber-200 rounded-lg px-3 py-2 font-mono"
                />
              </div>
              <div className="space-y-1 flex-1">
                <label className="text-[10px] font-bold text-amber-900 block uppercase tracking-wider">Display Label</label>
                <input
                  type="text"
                  placeholder="e.g. தமிழ்"
                  value={newLangLabel}
                  onChange={(e: { target: { value: string } }) => setNewLangLabel(e.target.value)}
                  className="w-full text-xs bg-white border border-amber-200 rounded-lg px-3 py-2 font-serif"
                />
              </div>
              <button
                onClick={() => {
                  const code = newLangCode.trim();
                  const label = newLangLabel.trim();
                  if (!code || !label) return;
                  if (langConfig.find((l: LangEntry) => l.code === code)) {
                    setLangMsg({ ok: false, text: `Language code "${code}" already exists.` });
                    return;
                  }
                  setLangConfig((prev: LangEntry[]) => [...prev, { code, label, enabled: true }]);
                  setNewLangCode('');
                  setNewLangLabel('');
                  setLangMsg(null);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
            <p className="text-[10px] text-amber-600 mt-2">After adding, click Save below. New languages show in the site picker and content falls back to English until translated.</p>
          </div>

          {/* Existing languages */}
          <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-base font-serif font-medium text-amber-950">Manage Languages</h3>
              <p className="text-xs text-amber-700 mt-1">Enable or disable languages shown in the site picker. English cannot be disabled.</p>
            </div>

            <div className="space-y-3">
              {langConfig.map((lang: LangEntry, idx: number) => (
                <div key={lang.code} className="flex items-center gap-4 p-4 rounded-xl border border-amber-100 bg-amber-50/40">
                  <span className="text-xs font-bold uppercase font-mono text-amber-800 w-10">{lang.code}</span>

                  <input
                    type="text"
                    value={lang.label}
                    onChange={e => {
                      const updated = [...langConfig];
                      updated[idx] = { ...lang, label: e.target.value };
                      setLangConfig(updated);
                    }}
                    className="flex-1 text-xs bg-white border border-amber-200 rounded-lg px-3 py-2 font-serif"
                  />

                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => {
                        if (lang.code === 'en') return;
                        const updated = [...langConfig];
                        updated[idx] = { ...lang, enabled: !lang.enabled };
                        setLangConfig(updated);
                      }}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        lang.enabled ? 'bg-amber-500' : 'bg-amber-200'
                      } ${lang.code === 'en' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${lang.enabled ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-xs text-amber-800 font-medium w-14">{lang.enabled ? 'Enabled' : 'Disabled'}</span>
                  </div>

                  {lang.code !== 'en' && lang.code !== 'hi' && lang.code !== 'gu' && lang.code !== 'bn' && (
                    <button
                      onClick={() => setLangConfig((prev: LangEntry[]) => prev.filter((l: LangEntry) => l.code !== lang.code))}
                      className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove language"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {langMsg && (
              <p className={`text-xs mt-3 font-medium ${langMsg.ok ? 'text-emerald-600' : 'text-rose-600'}`}>
                {langMsg.text}
              </p>
            )}

            <div className="flex justify-end pt-4 border-t border-amber-50 mt-5">
              <button
                onClick={handleSaveLangs}
                disabled={langSaving}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer"
              >
                {langSaving ? 'Saving...' : 'Save Language Settings'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UI TRANSLATIONS TAB */}
      {activeTab === 'translations' && (
        <div className="space-y-6 animate-in fade-in duration-200">

          {/* Manage existing strings */}
          <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-serif font-medium text-amber-950">Manage All Text Strings</h3>
                <p className="text-xs text-amber-700 mt-0.5">18 built-in strings — edit any value then Save All.</p>
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {Object.entries(translationDraft).filter(([key]) => BUILTIN_KEYS.has(key)).map(([key, vals]) => (
                <div key={key} className="border border-amber-100 rounded-xl p-4 bg-amber-50/30">
                  <div className="mb-3">
                    <span className="font-mono text-[11px] font-bold text-amber-900">{key}</span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {(['en', 'hi', 'gu', 'bn'] as const).map(lang => (
                      <div key={lang} className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-amber-600 block">{lang === 'en' ? 'EN' : lang === 'hi' ? 'HI' : lang === 'gu' ? 'GU' : 'BN'}</label>
                        <input
                          type="text"
                          value={(vals as Record<string, string>)[lang] || ''}
                          onChange={(e: { target: { value: string } }) =>
                            setTranslationDraft((prev: TranslationMap) => ({
                              ...prev,
                              [key]: { ...(prev[key] || { en: '', hi: '', gu: '', bn: '' }), [lang]: e.target.value }
                            }))
                          }
                          className="w-full text-xs bg-white border border-amber-200 rounded-lg px-2.5 py-1.5 font-serif"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {translationMsg && (
              <p className={`text-xs mt-3 font-medium ${translationMsg.ok ? 'text-emerald-600' : 'text-rose-600'}`}>
                {translationMsg.text}
              </p>
            )}

            <div className="flex justify-end pt-4 border-t border-amber-50 mt-5">
              <button
                onClick={handleSaveTranslations}
                disabled={translationSaving}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer"
              >
                {translationSaving ? 'Saving...' : 'Save All Translations'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
