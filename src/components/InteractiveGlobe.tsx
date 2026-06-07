import React, { useRef, useState, useEffect, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { useGlobalContext } from './LangContext';
import type { Ashram } from '../types';
import {
  Search, Globe as GlobeIcon, MapPin, ZoomIn, ZoomOut,
  Compass, Play, Pause, RefreshCw, Compass as CompassIcon,
  ChevronRight, Check
} from 'lucide-react';

export const InteractiveGlobe: React.FC<{ onSelectAshram: (id: string) => void }> = ({ onSelectAshram }) => {
  const { ashrams, t } = useGlobalContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedAshram, setSelectedAshram] = useState<Ashram | null>(null);
  const [autoSpin, setAutoSpin] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [cameraAlt, setCameraAlt] = useState(2.5);

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => setDimensions({
      width: containerRef.current?.clientWidth || 800,
      height: containerRef.current?.clientHeight || 600,
    });
    update();
    const obs = new ResizeObserver(update);
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleGlobeReady = useCallback(() => {
    if (!globeRef.current) return;
    globeRef.current.pointOfView({ lat: 20, lng: 78, altitude: 2.5 }, 0);
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) controls.autoRotate = autoSpin;
  }, [autoSpin]);

  const filteredAshrams = ashrams.filter(a => {
    if (selectedCountry !== 'All' && a.country !== selectedCountry) return false;
    if (searchQuery && !t(a.name).toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const flyTo = useCallback((ashram: Ashram) => {
    setSelectedAshram(ashram);
    setAutoSpin(false);
    globeRef.current?.pointOfView({ lat: ashram.latitude, lng: ashram.longitude, altitude: 0.5 }, 2000);
  }, []);

  const handlePointClick = useCallback((point: object) => {
    flyTo(point as Ashram);
  }, [flyTo]);

  const handleZoomIn = () => {
    const pov = globeRef.current?.pointOfView();
    const newAlt = Math.max(0.1, (pov?.altitude ?? cameraAlt) * 0.6);
    globeRef.current?.pointOfView({ altitude: newAlt }, 500);
  };

  const handleZoomOut = () => {
    const pov = globeRef.current?.pointOfView();
    const newAlt = Math.min(10, (pov?.altitude ?? cameraAlt) * 1.6);
    globeRef.current?.pointOfView({ altitude: newAlt }, 500);
  };

  const handleReset = () => {
    setAutoSpin(true);
    globeRef.current?.pointOfView({ lat: 20, lng: 78, altitude: 2.5 }, 1500);
    if (globeRef.current) globeRef.current.controls().autoRotate = true;
  };

  const getPointLabel = (d: object): string => {
    const a = d as Ashram;
    const name = t(a.name).split('(')[0].trim();
    const purpose = t(a.purpose).substring(0, 80);
    return `
      <div style="background:rgba(2,6,23,0.92);padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.12);max-width:210px;font-family:sans-serif;box-shadow:0 8px 32px rgba(0,0,0,0.5)">
        <div style="font-weight:700;color:#f59e0b;font-size:12px;margin-bottom:4px">${name}</div>
        <div style="color:#94a3b8;font-size:10px;margin-bottom:4px">📍 ${a.city}, ${a.country}</div>
        <div style="color:#e2e8f0;font-size:10px;line-height:1.5">${purpose}...</div>
        <div style="color:#f59e0b;font-size:9px;font-weight:600;margin-top:6px;opacity:0.7">Click to zoom in</div>
      </div>
    `;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-[90vh] left-[50%] -translate-x-1/2 overflow-hidden bg-[#040817] text-white flex shadow-2xl border-t border-b border-amber-950/20"
      style={{ width: '100vw' }}
    >
      {/* LEFT SIDEBAR */}
      <div className="absolute left-6 top-6 bottom-6 w-full max-w-[340px] bg-slate-950/80 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl p-4 flex flex-col justify-between z-20 space-y-4 animate-in slide-in-from-left duration-300">
        <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <GlobeIcon className="w-5 h-5 animate-spin" style={{ animationDuration: '40s' }} />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                Google Earth
                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded">V2</span>
              </h2>
              <h3 className="text-base font-serif font-medium text-white leading-tight">
                Vedic Ashram Sanctuaries
              </h3>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-serif">
            {t({
              en: 'Click on any sanctuary card to trigger a smooth camera flight centering the Earth and zoom-in to focus coordinates.',
              hi: 'पृथ्वी मॉडल पर सीधे केंद्रित करने के लिए किसी भी मंदिर कार्ड पर क्लिक करें।',
              gu: 'પૃથ્વી મોડેલ પર સીધા કેન્દ્રિત કરવા માટે કોઈપણ કાર્ડ પર ક્લિક કરો.',
              bn: 'আশ্রম পরিক্রমার গতি সচল করতে যেকোনো কার্ড স্পর্শ করুন।',
            })}
          </p>

          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t({
                  en: 'Search geographic temples...',
                  hi: 'पवित्र धाम खोजें...',
                  gu: 'સ્થાનો શોધો...',
                  bn: 'আশ্রম খুঁজুন...',
                })}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-slate-900/60 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex gap-1">
              {['All', 'India', 'UK'].map(country => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`flex-1 py-1.5 text-[10px] uppercase font-bold tracking-wider rounded-md border transition-all ${
                    selectedCountry === country
                      ? 'bg-amber-600 border-amber-500 text-white shadow'
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
            {ashrams
              .filter(a => {
                if (selectedCountry !== 'All' && a.country !== selectedCountry) return false;
                if (searchQuery && !t(a.name).toLowerCase().includes(searchQuery.toLowerCase())) return false;
                return true;
              })
              .map(ash => {
                const isActive = selectedAshram?.id === ash.id;
                return (
                  <div
                    key={ash.id}
                    onClick={() => flyTo(ash)}
                    className={`group p-2.5 rounded-xl border transition-all cursor-pointer flex gap-3 items-center text-left ${
                      isActive
                        ? 'bg-amber-600/10 border-amber-500/40 shadow-lg'
                        : 'bg-slate-900/30 border-white/5 hover:bg-slate-900/60 hover:border-white/10'
                    }`}
                  >
                    <img
                      src={ash.coverUrl}
                      alt={t(ash.name)}
                      className="w-12 h-12 rounded-lg object-cover border border-white/5 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className={`text-xs font-serif font-bold truncate ${isActive ? 'text-amber-400' : 'text-slate-200'}`}>
                          {t(ash.name).split('(')[0]}
                        </h4>
                        {isActive && <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />}
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-amber-500/70" />
                        {ash.city}, {ash.country}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {selectedAshram && (
          <div className="pt-3 border-t border-white/5 space-y-2">
            <h4 className="text-[10px] uppercase font-bold text-amber-400 tracking-widest font-mono">
              Coordinates Locked
            </h4>
            <button
              onClick={() => onSelectAshram(selectedAshram.id)}
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow"
            >
              <GlobeIcon className="w-3.5 h-3.5" />
              Enter Temple Portal
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* GLOBE */}
      <div className="absolute inset-0">
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          atmosphereColor="lightskyblue"
          atmosphereAltitude={0.15}
          pointsData={filteredAshrams}
          pointLat={(d: object) => (d as Ashram).latitude}
          pointLng={(d: object) => (d as Ashram).longitude}
          pointColor={() => '#f59e0b'}
          pointAltitude={0.02}
          pointRadius={0.4}
          pointLabel={getPointLabel}
          onPointClick={handlePointClick}
          onGlobeReady={handleGlobeReady}
          onZoom={({ altitude }: { altitude: number }) => setCameraAlt(altitude)}
        />
      </div>

      {/* TELEMETRY HUD */}
      <div className="absolute bottom-6 left-6 z-10 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 px-3.5 py-2 text-left font-mono space-y-1 hidden sm:block text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5 border-b border-white/5 pb-1 mb-1 font-bold text-amber-400 uppercase tracking-widest text-[9px]">
          <CompassIcon className="w-3.5 h-3.5" />
          Geography telemetry
        </div>
        <div>
          <span className="text-slate-500">Camera Alt: </span>
          {Math.round(cameraAlt * 6371).toLocaleString()} km
        </div>
        <div>
          <span className="text-slate-500">Current Scale: </span>
          1 : {Math.round(25_000_000 * cameraAlt).toLocaleString()}
        </div>
      </div>

      {/* SCALE BAR */}
      <div className="absolute bottom-6 left-[230px] z-10 font-mono text-[9px] text-slate-400 bg-slate-950/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 items-center gap-2 hidden lg:flex animate-in fade-in">
        <span className="font-bold text-slate-500">SCALE:</span>
        <div className="flex flex-col items-center">
          <div className="h-1 border-l border-r border-b border-slate-400" style={{ width: `${Math.min(100, Math.max(20, 50 / cameraAlt))}px` }} />
          <span>{Math.round(2000 * cameraAlt)} km</span>
        </div>
      </div>

      {/* RIGHT CONTROLS */}
      <div className="absolute right-6 bottom-6 z-10 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/10 p-2 flex flex-col items-center gap-2.5 shadow-2xl text-slate-400 animate-in slide-in-from-right duration-300">
        <div
          className="p-3 bg-slate-900 border border-white/15 rounded-xl text-amber-500 shadow relative group flex justify-center items-center cursor-pointer hover:bg-slate-800 transition-colors"
          onClick={handleReset}
          title="Reset Heading & Tilt"
        >
          <Compass className="w-5 h-5" />
          <span className="absolute -left-14 text-[8px] bg-slate-950/90 border border-white/10 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
            Reset View
          </span>
        </div>

        <button
          onClick={handleZoomIn}
          className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-xl cursor-pointer hover:text-white transition-all shadow"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-xl cursor-pointer hover:text-white transition-all shadow"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={() => setAutoSpin(prev => !prev)}
          className={`p-2.5 border rounded-xl cursor-pointer transition-all shadow ${
            autoSpin
              ? 'bg-amber-600/25 border-amber-500/50 text-amber-400'
              : 'bg-slate-900 border-white/10 hover:bg-slate-800 hover:text-white'
          }`}
          title={autoSpin ? 'Halt Orbit Rotation' : 'Spin Orbit Rotation'}
        >
          {autoSpin ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={handleReset}
          className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-xl cursor-pointer hover:text-white transition-all shadow"
          title="Recenter Globe Orbit"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
