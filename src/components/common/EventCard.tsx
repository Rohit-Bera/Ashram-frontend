import { MapPin, ArrowRight } from 'lucide-react';
import { AshramEvent } from '../../types';
import { useGlobalContext } from '../../context/LangContext';

interface EventCardProps {
  event: AshramEvent;
  onClick?: () => void;
  onRegister?: (eventId: string) => void;
  isRegistered?: boolean;
  variant?: 'compact' | 'full';
}

export function EventCard({ event, onClick, onRegister, isRegistered, variant = 'compact' }: EventCardProps) {
  const { t } = useGlobalContext();

  if (variant === 'full') {
    return (
      <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 flex flex-col md:flex-row gap-5 text-left">
        <img
          src={event.imageUrl}
          alt={t(event.name)}
          className="w-full md:w-48 h-44 object-cover rounded-xl shrink-0"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2 flex-wrap">
              <span className="text-xs text-amber-600 font-bold font-mono">{event.date}</span>
              <span className="text-[10px] text-amber-500 font-mono">{event.time}</span>
            </div>
            <h4 className="text-base font-serif font-bold text-amber-950 leading-tight">{t(event.name)}</h4>
            <p className="text-[10px] text-amber-700 font-mono flex items-center gap-0.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {t(event.location)}
            </p>
            <p className="text-xs text-amber-800/85 pt-1.5 leading-relaxed font-serif">{t(event.description)}</p>
          </div>
          {onRegister && (
            <div className="mt-4 pt-3 border-t border-amber-50 flex justify-between items-center gap-3">
              <button
                onClick={() => onRegister(event.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow ${
                  isRegistered
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {isRegistered ? '✓ Seva Slot Registered' : 'Claim Seva Slot (Free Ticket)'}
              </button>
              <span className="text-[10px] text-amber-700 font-mono">
                Available capacity pools: {event.availableTickets} items left
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-amber-100/60 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div className="relative h-44">
        <img
          src={event.imageUrl}
          alt={t(event.name)}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-amber-950 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono shadow-sm">
          {event.date}
        </div>
        <div className={`absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded font-bold text-white shadow ${
          event.isActive ? 'bg-emerald-600' : 'bg-rose-600'
        }`}>
          {event.isActive ? 'Active Schedule' : 'Hold Status'}
        </div>
      </div>
      <div className="p-4 text-left flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-serif font-bold text-amber-950 line-clamp-1">{t(event.name)}</h4>
          <p className="text-[10px] text-amber-700 flex items-center gap-0.5 mt-1 font-mono">
            <MapPin className="w-3 h-3 text-amber-500" />
            {t(event.location)}
          </p>
          <p className="text-xs text-amber-800/80 mt-2 line-clamp-2 leading-relaxed">{t(event.description)}</p>
        </div>
        <div className="mt-4 pt-3 border-t border-amber-50 flex justify-between items-center text-[10px] font-bold">
          <span className="text-amber-600 uppercase tracking-widest flex items-center gap-1">
            Register Seva Slot
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="font-mono text-amber-700/60">Registered: {event.registrationsCount}</span>
        </div>
      </div>
    </div>
  );
}
