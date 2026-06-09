import React from 'react';
import { X } from 'lucide-react';
import { LanguageCode } from '../types';

interface TranslationDrawerProps {
  open: boolean;
  title: string;
  selectedLang: LanguageCode;
  onLangChange: (lang: LanguageCode) => void;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  saving?: boolean;
  children: React.ReactNode;
}

const LANGS: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'bn', label: 'বাংলা' },
];

export const TranslationDrawer: React.FC<TranslationDrawerProps> = ({
  open, title, selectedLang, onLangChange, onClose, onSave, saving, children
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[580px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-200 bg-amber-950 text-white shrink-0">
          <h2 className="text-sm font-serif font-semibold tracking-wide">{title}</h2>
          <button type="button" onClick={onClose} className="p-1.5 hover:bg-amber-800 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language selector */}
        <div className="px-6 py-3 border-b border-amber-100 bg-amber-50/70 shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-2">Content Language</p>
          <div className="flex gap-2 flex-wrap">
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => onLangChange(code)}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                  selectedLang === code
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white border border-amber-200 text-amber-800 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {selectedLang !== 'en' && (
            <p className="text-[10px] text-amber-500 mt-1.5 italic">
              English shown as reference below each translation field.
            </p>
          )}
        </div>

        {/* Scrollable form body + sticky footer */}
        <form onSubmit={onSave} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {children}
          </div>
          <div className="px-6 py-4 border-t border-amber-100 bg-white shrink-0 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs bg-white border border-amber-200 text-amber-900 rounded-lg font-medium hover:border-amber-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg font-bold text-xs shadow transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
