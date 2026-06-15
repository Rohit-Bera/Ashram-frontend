import { Sparkles } from 'lucide-react';
import { useGlobalContext } from '../context/LangContext';

export function AboutPage() {
  const { t, aboutData } = useGlobalContext();

  return (
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
            {t(aboutData?.aboutUsDescription) || 'Welcome to Brahmarshi Satyananda Sannyas Ashram, a sacred sanctuary dedicated to keeping the flame of ancient Kriya Yoga teachings alive. Rooted in the pure line of the Gurus passed down through centuries, we strive to offer an ambient haven for self-realization, deep meditation, and continuous practice. Under the supreme guidance of Babaji Maharaj and our revered gurus, we cultivate spiritual education, teach the Kriya techniques, and help seekers from all walks of life. Our ultimate purpose is simple yet sublime: to awaken the dormant inner peace in every heart, spreading compassion and divine harmony across the universe.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-950/20">
            {[
              { icon: '🧘‍♂️', title: 'Spiritual Contemplation', desc: 'Consecrated traditional temple worship and daily discourses from timeless scriptures.' },
              { icon: '🍲', title: 'Grand Prasadam Seva', desc: 'Distributing delicious, sanctified vegetarian meals daily to all spiritual pilgrims.' },
              { icon: '🐄', title: 'Holy Cow Protection', desc: 'Nurturing indigenous native breeds with veterinary care in our lush green Goshala.' },
              { icon: '📖', title: 'Knowledge Distribution', desc: 'Providing authentic spiritual hand-guided books for absolute self-realization.' },
            ].map(item => (
              <div key={item.title} className="flex gap-2.5 items-start">
                <span className="p-1.5 bg-amber-900/10 rounded-lg text-amber-900 text-xs text-center font-bold">{item.icon}</span>
                <div>
                  <h4 className="text-xs font-bold font-serif text-amber-950">{item.title}</h4>
                  <p className="text-[10px] text-amber-900/80 mt-0.5 font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
