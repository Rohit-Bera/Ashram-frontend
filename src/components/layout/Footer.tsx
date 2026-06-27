import { Compass, MapPin, Mail, Phone } from 'lucide-react';
import { useGlobalContext } from '../../context/LangContext';

interface FooterProps {
  onToast: (msg: string) => void;
}

export function Footer({ onToast }: FooterProps) {
  const { translateUI } = useGlobalContext();

  return (
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
            Kriya Yoga and the Guru Lineage.
          </p>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h5 className="font-bold text-amber-50 uppercase text-[10px] tracking-widest border-b border-amber-900 pb-2">Sacred Coordinates</h5>
          <p className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-amber-500" /> Kolkata, West Bengal, India</p>
          <p className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-amber-500" /> info@kriyayoga.org</p>
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
              onClick={() => onToast('Pranams! Email coordinator subscribed.')}
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
  );
}
