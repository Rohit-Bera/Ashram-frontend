import { useGlobalContext } from '../context/LangContext';
import { EventCard } from '../components/common/EventCard';

interface EventsPageProps {
  onToast: (msg: string) => void;
  onOpenAuth: (registerMode: boolean) => void;
}

export function EventsPage({ onToast, onOpenAuth }: EventsPageProps) {
  const { events, savedEvents, registerForEvent, currentUser } = useGlobalContext();

  const handleRegister = async (eventId: string) => {
    if (!currentUser) {
      onToast('Please Devotee Sign In first before event registration.');
      onOpenAuth(false);
      return;
    }
    const ok = await registerForEvent(eventId);
    if (ok) {
      onToast('Auspicious slot book completed! Track in profile.');
    } else {
      onToast('Slot registration failure. Verify capacity limits.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Divine gatherings</span>
        <h3 className="text-3xl font-serif text-amber-950 font-medium">Auspicious festivals & schedules</h3>
        <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
          Be a part of world cultural assemblies, holy pilgrimages and active kirtan weeks configured at Vrindavan and other centers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {events.filter(e => e.isActive).map(ev => (
          <EventCard
            key={ev.id}
            event={ev}
            onRegister={handleRegister}
            isRegistered={savedEvents.includes(ev.id)}
            variant="full"
          />
        ))}
      </div>

    </div>
  );
}
