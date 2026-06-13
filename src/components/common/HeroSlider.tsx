import { Sparkles } from 'lucide-react';
import { HeroSlide } from '../../types';
import { useGlobalContext } from '../../context/LangContext';

interface HeroSliderProps {
  slides: HeroSlide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onNavigate: (view: string) => void;
  onOpenAuth: (registerMode: boolean) => void;
}

export function HeroSlider({ slides, currentSlide, onSlideChange, onNavigate, onOpenAuth }: HeroSliderProps) {
  const { t } = useGlobalContext();
  const slide = slides[currentSlide] || slides[0];

  return (
    <div className="relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg border border-amber-100 bg-amber-950">
      <img
        src={slide.bg}
        alt="Sacred Sanctuary scenery background"
        className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-overlay transition-all duration-1000 transform scale-102"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-950/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white max-w-2xl space-y-4">
        <div className="flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-amber-300">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
          Explore the Divine Heritage
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-white drop-shadow-sm">
          {t(slide.title)}
        </h2>
        <p className="text-xs md:text-sm text-amber-50/90 leading-relaxed font-serif tracking-wide">
          {t(slide.sub)}
        </p>
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => onNavigate(slide.action)}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-950 font-bold text-xs rounded-xl transition-all shadow-md transform hover:-translate-y-0.5"
          >
            Enter Sanctuary {slide.action}
          </button>
          <button
            onClick={() => onOpenAuth(true)}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium border border-white/20 transition-all font-serif"
          >
            Initiate Devotee Account
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => onSlideChange(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === i ? 'bg-amber-500 scale-125' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
