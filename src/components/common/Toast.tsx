import { Sparkles } from 'lucide-react';

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#5C4D3C] text-white rounded-xl px-5 py-3 shadow-2xl border border-[#FAF7F2]/20 text-xs font-medium flex items-center gap-2 animate-in slide-in-from-top-6 duration-200">
      <Sparkles className="w-4 h-4 text-[#FF9933] animate-pulse" />
      {message}
    </div>
  );
}
