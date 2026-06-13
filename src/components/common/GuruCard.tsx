import { ArrowRight } from 'lucide-react';
import { Guru } from '../../types';
import { useGlobalContext } from '../../context/LangContext';

interface GuruCardProps {
  guru: Guru;
  onClick: (guru: Guru) => void;
  variant?: 'compact' | 'full';
}

export function GuruCard({ guru, onClick, variant = 'full' }: GuruCardProps) {
  const { t } = useGlobalContext();

  if (variant === 'compact') {
    return (
      <div
        onClick={() => onClick(guru)}
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
    );
  }

  return (
    <div
      onClick={() => onClick(guru)}
      className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1.5 cursor-pointer flex flex-col group"
    >
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
  );
}
