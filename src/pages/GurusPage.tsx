import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useGlobalContext } from '../context/LangContext';
import { GuruCard } from '../components/common/GuruCard';
import { GuruLineageTree } from '../components/GuruLineageTree';
import { Guru } from '../types';

interface GurusPageProps {
  viewedGuru: Guru | null;
  setViewedGuru: (guru: Guru | null) => void;
  onToast: (msg: string) => void;
}

export function GurusPage({ viewedGuru, setViewedGuru, onToast }: GurusPageProps) {
  const { t, gurus } = useGlobalContext();
  const [guruSearch, setGuruSearch] = useState('');
  const [guruEraFilter, setGuruEraFilter] = useState('All');

  const filteredGurus = gurus.filter(g => {
    if (guruSearch && !t(g.name).toLowerCase().includes(guruSearch.toLowerCase())) return false;
    if (guruEraFilter !== 'All' && !g.era.includes(guruEraFilter)) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Lineage Archaryas</span>
        <h3 className="text-3xl font-serif text-amber-950 font-medium">Teachings & Life Roadmaps</h3>
        <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
          Dive deep into the life occurrences, deep realizations, and elaborate sanskrit text translations of our guiding spiritual teachers.
        </p>
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

          <div className="border-t border-amber-100 pt-6 space-y-4">
            <h3 className="text-lg font-serif font-bold text-amber-1000 mb-2">Life Event Timeline</h3>
            <div className="relative border-l-2 border-amber-200 ml-4 pl-6 space-y-6">
              {viewedGuru.timeline.map((time, idx) => (
                <div key={idx} className="relative">
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
        <div className="space-y-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredGurus.map(guru => (
              <GuruCard key={guru.id} guru={guru} onClick={setViewedGuru} />
            ))}
          </div>

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
  );
}
