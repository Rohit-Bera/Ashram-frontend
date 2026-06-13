import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useGlobalContext } from '../context/LangContext';

type ViewType = 'home' | 'gurus' | 'ashrams' | 'store' | 'events' | 'blogs' | 'admin' | 'dashboard' | 'about';

interface AuthModalProps {
  isRegisterMode: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
  onNavigate: (view: ViewType) => void;
  onModeSwitch: (mode: boolean) => void;
}

export function AuthModal({ isRegisterMode, onClose, onToast, onNavigate, onModeSwitch }: AuthModalProps) {
  const { loginUser, registerUser } = useGlobalContext();
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoginError, setAuthLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoginError('');
    if (isRegisterMode) {
      if (!authName || !authEmail || !authPassword) return;
      const ok = await registerUser(authName, authEmail, undefined, authPassword);
      if (ok) {
        onClose();
        setAuthPassword('');
        onToast('Pranams! Account registered. Saffron server synchronized.');
      } else {
        setAuthLoginError('Registration failed. Email may already be in use.');
      }
    } else {
      if (!authEmail || !authPassword) return;
      const ok = await loginUser(authEmail, authPassword);
      if (ok) {
        onClose();
        setAuthPassword('');
        onToast('Radhe Radhe! Handshake success. Profile synchronized.');
        const stored = localStorage.getItem('ashram_user');
        if (stored) {
          const user = JSON.parse(stored);
          if (user.role === 'Super Admin' || user.role === 'Content Manager' || user.role === 'Store Manager') {
            onNavigate('admin');
          }
        }
      } else {
        setAuthLoginError('Invalid email or password.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-amber-950/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-amber-50 border border-amber-100 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden text-left animate-in zoom-in-95 duration-150">
        <div className="bg-[#5C4D3C] p-4 text-white flex justify-between items-center border-b border-amber-100/10">
          <span className="font-serif font-bold text-sm text-amber-100">
            {isRegisterMode ? 'Vedic Devotee Registration' : 'Auspicious Devotee Sign In'}
          </span>
          <button onClick={onClose} className="text-amber-100"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {isRegisterMode && (
            <div>
              <label className="text-[10px] font-bold block mb-1 text-amber-900 uppercase">Spiritual Name *</label>
              <input
                type="text"
                required
                placeholder="Sri Chaitanya Das"
                value={authName}
                onChange={e => setAuthName(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-amber-200 rounded-lg"
              />
            </div>
          )}
          <div>
            <label className="text-[10px] font-bold block mb-1 text-amber-900 uppercase">Email Coordinates *</label>
            <input
              type="email"
              required
              placeholder="seeker@gmail.com"
              value={authEmail}
              onChange={e => setAuthEmail(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-amber-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block mb-1 text-amber-900 uppercase">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={e => setAuthPassword(e.target.value)}
                className="w-full text-xs p-2.5 pr-9 bg-white border border-amber-200 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {authLoginError && (
            <p className="text-[10px] text-red-600 font-bold">{authLoginError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg py-2.5 text-xs font-bold shadow transition-colors"
          >
            {isRegisterMode ? 'Claim Account Initiation' : 'Decrypt Profile Portal'}
          </button>

          <div className="text-center pt-3 border-t border-amber-100">
            <button
              type="button"
              onClick={() => { onModeSwitch(!isRegisterMode); setAuthLoginError(''); setAuthPassword(''); }}
              className="text-amber-600 text-xs font-bold hover:underline bg-transparent"
            >
              {isRegisterMode ? 'Back to standard Sign In logs' : 'Create new Seva Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
