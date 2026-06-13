import { useState } from 'react';
import { Search, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { useGlobalContext } from '../context/LangContext';
import { Ashram } from '../types';

interface AshramsPageProps {
  viewedAshram: Ashram | null;
  setViewedAshram: (ashram: Ashram | null) => void;
  onNavigate: (view: string, extra?: { productCategory?: string }) => void;
  onToast: (msg: string) => void;
}

export function AshramsPage({ viewedAshram, setViewedAshram, onNavigate, onToast }: AshramsPageProps) {
  const { t, ashrams } = useGlobalContext();
  const [ashramSearch, setAshramSearch] = useState('');

  const filteredAshrams = ashrams.filter(a => {
    if (ashramSearch && !t(a.name).toLowerCase().includes(ashramSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Divine Sanctuaries</span>
        <h3 className="text-3xl font-serif text-amber-950 font-medium">Explore world Ashrams</h3>
        <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
          Gain spiritual shelter at ISKCON farm communities and ancient holy city templates. Read daily arati schedules and request guest room bookings.
        </p>
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
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1 drop-shadow-sm">{t(viewedAshram.name)}</h2>
              <p className="text-xs text-amber-50/90 flex items-center gap-1 mt-1 pb-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {viewedAshram.city}, {viewedAshram.state}, {viewedAshram.country}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h4 className="text-base font-serif font-bold text-amber-950 mb-2">Temple Vision & Purpose</h4>
                <p className="text-xs text-amber-850 leading-relaxed font-serif bg-amber-550/5 p-4 border border-amber-50 rounded-xl italic">
                  " {t(viewedAshram.purpose)} "
                </p>
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-amber-950 mb-2">Overview biography</h4>
                <p className="text-xs text-amber-900 leading-relaxed font-serif">{t(viewedAshram.description)}</p>
              </div>
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
              <div className="bg-amber-100/30 rounded-xl p-4 border border-amber-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs leading-none">
                <div className="space-y-1 text-amber-950 font-medium">
                  <span className="font-bold underline text-amber-900 mr-2 uppercase text-[9px] block mb-1 tracking-wider">Inquiries Desk</span>
                  <p className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-amber-600" /> {viewedAshram.contactEmail}</p>
                  <p className="flex items-center gap-1 pt-1"><Phone className="w-3.5 h-3.5 text-amber-600" /> {viewedAshram.contactPhone}</p>
                </div>
                <button
                  onClick={() => onToast('Pilgrimage Guest house slot requested! Confirm details via email.')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow"
                >
                  Request Room booking
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-b from-amber-50 to-amber-100/20 rounded-2xl border border-amber-150 p-5 divide-y divide-amber-200/50 space-y-4">
              <div className="pb-2 text-left">
                <h4 className="text-base font-serif font-bold text-amber-950 flex items-center gap-1.5 leading-none">
                  <Clock className="w-4 h-4 text-amber-600" />
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
              <div className="pt-4 text-center space-y-2">
                <h5 className="text-[11px] font-bold text-amber-950 uppercase tracking-widest">Sponsor Goshala & Prasadam</h5>
                <p className="text-[10px] text-amber-800 leading-relaxed">Sponsor wholesome sacred vegetarian meals and happy milch cow care directly here at Goshala</p>
                <button
                  onClick={() => onNavigate('store', { productCategory: 'Donations' })}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 text-white text-[11px] font-bold py-2 rounded-lg shadow-md transition-all"
                >
                  Sponsor Now (Annadan)
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAshrams.map(ash => (
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
  );
}
