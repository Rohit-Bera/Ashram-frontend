import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { useGlobalContext } from '../context/LangContext';
import { InteractiveGlobe } from '../components/InteractiveGlobe';
import { HeroSlider } from '../components/common/HeroSlider';
import { GuruCard } from '../components/common/GuruCard';
import { EventCard } from '../components/common/EventCard';
import { BlogCard } from '../components/common/BlogCard';
import { Guru, Ashram } from '../types';

const HERO_SLIDES = [
  {
    title: { en: 'Welcome to Sri Divine Heritage', hi: 'श्री दिव्य विरासत में आपका स्वागत है', gu: 'શ્રી દિવ્ય વિરાસતમાં તમારું સ્વાગત છે', bn: 'শ্রী দিব্য ঐতিহ্যে আপনাকে স্বাগত' },
    sub: { en: 'Connecting souls to ancient Gaudiya Vaishnava lineage teachings, world ashrams, and sacred scriptures.', hi: 'प्राचीन गौड़ीय वैष्णव संप्रदाय, विश्व के पावन धामों और पवित्र ग्रंथों से आत्माओं का दिव्य जुड़ाव।', gu: 'પ્રાચીન ગૌડીય વૈષ્ણવ સંપ્રદાય, વિશ્વના પવિત્ર આશ્રમો અને વેદિક ગ્રંથો સાથે જોડાણ.', bn: 'সুপ্রাচীন গৌড়ীয় বৈষ্ণবীয় সাধন-ভজন, বিশ্বব্যাপী বিস্তৃত পবিত্র মন্দির এবং শাস্ত্র গ্রন্থাবলীর সার্থক মেলবন্ধন।' },
    action: 'gurus',
    bg: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: { en: 'Discover Auspicious Sacred Spaces', hi: 'पावन भारतीय मंदिरों का दर्शन करें', gu: 'પવિત્ર ભારતીય મંદિરોના દર્શન કરો', bn: 'জগতের পরম পবিত্র ধাম পরিক্রমা' },
    sub: { en: 'Explore ISKCON Vrindavan, Mayapur Dham, and active communities around the globe through our rotating cosmic globe.', hi: 'घूमते हुए ब्रह्मांडीय ग्लोब के माध्यम से इस्कॉन वृंदावन, मायापुर धाम और वैश्विक आध्यात्मिक केंद्रों के दर्शन करें।', gu: 'ગ્લોબલ ફરતા મેપ દ્વારા ઇસ્કોન વૃંદાવન, માયાપુર ધામ અને વૈશ્વિક કેન્દ્રોની મુલાકાત લો.', bn: 'আমাদের ঘূর্ণায়মান গ্লোবের সাহায্যে মায়াপুর চন্দ্রোদয় মন্দির, শ্রীধাম বৃন্দাবন সহ শাখা মন্দিরসমূহ পরিক্রমা করুন।' },
    action: 'ashrams',
    bg: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: { en: 'Acquire Genuine Spiritual Items', hi: 'प्रामाणिक आध्यात्मिक भंडार', gu: 'અસલી આધ્યાત્મિક ભંડાર', bn: 'পারমার্থিক মাঙ্গলিক সামগ্রী সংগ্রহ' },
    sub: { en: 'Invest in original Vrindavan Tulsi malas, organic sandalwood incense, handloomed attire, and high commentaries books.', hi: 'वृंदावन की पावन तुलसी जप माला, प्राकृतिक चंदन धूप, हथकरघा वस्त्र और प्रामाणिक ग्रंथों को प्राप्त करें।', gu: 'વૃંદાવનની પવિત્ર તુલસી માળા, પ્રાકૃતિક ચંદનની અગરબત્તી અને શાસ્ત્રોક્ત પુસ્તકો મેળવો.', bn: 'বৃন্দাবনের খাঁটি তুলসী জপমালা, চন্দন ধূপ, সুতি বস্ত্র ও শ্রীল প্রভুপাদ প্রণীত পরম বৈদিক ভাষ্য গ্রন্থ পরিক্রমা।' },
    action: 'store',
    bg: 'https://images.unsplash.com/photo-1602166549142-978079a372e8?auto=format&fit=crop&q=80&w=1200'
  }
];

interface HomePageProps {
  onNavigate: (view: string) => void;
  onToast: (msg: string) => void;
  onOpenAuth: (registerMode: boolean) => void;
  onSelectGuru: (guru: Guru) => void;
  onSelectAshram: (ashram: Ashram) => void;
}

export function HomePage({ onNavigate, onToast, onOpenAuth, onSelectGuru, onSelectAshram }: HomePageProps) {
  const { t, gurus, ashrams, events, blogs, homepageData, aboutData } = useGlobalContext();
  const [currSlide, setCurrSlide] = useState(0);

  const activeSlides = homepageData?.heroSlides || HERO_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => setCurrSlide(prev => (prev + 1) % activeSlides.length), 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <div className="space-y-12 animate-in fade-in duration-300">

      <HeroSlider
        slides={activeSlides}
        currentSlide={currSlide}
        onSlideChange={setCurrSlide}
        onNavigate={onNavigate}
        onOpenAuth={onOpenAuth}
      />

      {/* About section */}
      <section
        className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-100 min-h-[460px] flex items-center bg-amber-950"
        style={{
          backgroundImage: `url(${aboutData?.aboutUsBgUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/80 via-amber-950/60 to-transparent z-0" />
        <div className="relative z-10 max-w-3xl m-6 md:m-12 p-6 md:p-8 rounded-3xl backdrop-blur-md bg-white/40 border border-white/30 shadow-2xl text-amber-950 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] bg-amber-900 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            {t(aboutData?.aboutUsSub) || 'Our Sacred Purpose & Ashram Heritage'}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight text-amber-950 drop-shadow-sm">
            {t(aboutData?.aboutUsTitle) || 'An Oasis of Devotion & Vedic Wisdom'}
          </h3>
          <p className="text-xs md:text-sm text-amber-900 leading-relaxed font-serif">
            {t(aboutData?.aboutUsDescription) || 'Welcome to Sri Divine Heritage Ashram, a sacred sanctuary dedicated to keeping the flame of ancient Gaudiya Vaishnava teachings alive.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-950/20">
            {[
              { icon: '🧘‍♂️', title: 'Spiritual Contemplation', desc: 'Consecrated traditional worship and daily discourses from timeless scriptures.' },
              { icon: '🍲', title: 'Grand Prasadam Seva', desc: 'Distributing delicious, sanctified vegetarian meals daily to all spiritual pilgrims.' },
              { icon: '🐄', title: 'Holy Cow Protection', desc: 'Nurturing indigenous native breeds with veterinary care in our lush green Goshala.' },
              { icon: '📖', title: 'Knowledge Distribution', desc: 'Providing authentic spiritual hand-guided books for absolute self-realization.' },
            ].map(item => (
              <div key={item.title} className="flex gap-2.5 items-start">
                <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs">{item.icon}</span>
                <div>
                  <h4 className="text-xs font-bold font-serif text-amber-950">{item.title}</h4>
                  <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gurus */}
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
            <GuruCard key={guru.id} guru={guru} onClick={onSelectGuru} variant="compact" />
          ))}
        </div>
      </section>

      {/* Globe */}
      <section className="relative w-screen left-[50%] -translate-x-1/2 pt-4">
        <InteractiveGlobe
          onSelectAshram={(id) => {
            const found = ashrams.find(a => a.id === id);
            if (found) onSelectAshram(found);
          }}
        />
      </section>

      {/* Events preview */}
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
            <EventCard key={ev.id} event={ev} onClick={() => onNavigate('events')} />
          ))}
        </div>
      </section>

      {/* Testimonial + Blogs */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="space-y-6">
          <div>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Devotee Experiences</span>
            <h3 className="text-2xl md:text-3xl font-serif text-amber-950 mt-2 font-medium">Sacred Journey Journals</h3>
            <p className="text-xs text-amber-850/80 mt-1.5 leading-relaxed">
              Read the moving transformations of seekers around the world who visited our ashrams and aligned with pure devotional mantra lifestyles.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
                alt="Priyanka Patel"
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
              "I am profoundly satisfied with the Bhagavad Gita commented book quality and original sandalwood incense sticks. The aromatic warmth elevates my home temple, filling it with Vrindavan serenity!"
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Spiritual Blogs</span>
              <h3 className="text-2xl font-serif text-amber-950 mt-1 font-medium">Latest Teachings</h3>
            </div>
            <button onClick={() => onNavigate('blogs')} className="text-xs text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1">
              See All Articles
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-4">
            {blogs.slice(0, 2).map(art => (
              <BlogCard key={art.id} article={art} onClick={() => onNavigate('blogs')} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
