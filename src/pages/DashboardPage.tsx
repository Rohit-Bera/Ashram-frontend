import { useGlobalContext } from '../context/LangContext';

export function DashboardPage() {
  const { t, currentUser, events, savedEvents, orders } = useGlobalContext();

  if (!currentUser) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left">

      <div className="bg-white p-6 rounded-2xl border border-amber-100/80 shadow-sm">
        <h2 className="text-xl font-serif font-bold text-amber-950">Devotee Profile Portfolio</h2>
        <p className="text-xs text-amber-800/80 mt-1">Configure shipping parameters and read physical product transit history logs</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-amber-950 leading-none divide-y md:divide-y-0 md:divide-x divide-amber-100">
          <div className="space-y-3.5 pr-2">
            <span className="font-bold text-amber-900 uppercase text-[9px] block mb-2 tracking-wider">Account Credentials</span>
            <div>
              <span className="font-bold block text-[10px] text-amber-800">Spiritual Name:</span>
              <span className="text-sm font-serif font-bold block mt-1">{currentUser.name}</span>
            </div>
            <div>
              <span className="font-bold block text-[10px] text-amber-800">Assigned email identifier:</span>
              <span className="block mt-1 font-mono">{currentUser.email}</span>
            </div>
            <div>
              <span className="font-bold block text-[10px] text-amber-800">Registered phone coordinate:</span>
              <span className="block mt-1 font-mono">{currentUser.phone || 'No phone registered yet'}</span>
            </div>
          </div>

          <div className="space-y-3.5 pt-4 md:pt-0 md:pl-6">
            <span className="font-bold text-amber-900 uppercase text-[9px] block mb-2 tracking-wider">Mailing Address Details</span>
            {currentUser.shippingAddress ? (
              <p className="font-serif leading-relaxed text-amber-900">
                {currentUser.shippingAddress.fullName}<br />
                {currentUser.shippingAddress.addressLines}<br />
                {currentUser.shippingAddress.city}, {currentUser.shippingAddress.state} - {currentUser.shippingAddress.postalCode}<br />
                {currentUser.shippingAddress.country}
              </p>
            ) : (
              <p className="text-amber-800/50 italic">No delivery address saved yet. Configure one during cart checkout.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm space-y-4">
        <h3 className="text-base font-serif font-bold text-amber-950">Booked Seva Slots Calendar</h3>
        {savedEvents.length === 0 ? (
          <p className="text-xs text-amber-800/60 italic">No booked seats currently active. Tap on upcoming events to claim free passes.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {savedEvents.map(evId => {
              const e = events.find(item => item.id === evId);
              if (!e) return null;
              return (
                <div key={e.id} className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-150 flex gap-3">
                  <img src={e.imageUrl} alt={t(e.name)} className="w-12 h-12 rounded object-cover shrink-0" />
                  <div>
                    <span className="text-[9px] text-amber-600 font-mono block font-bold">{e.date}</span>
                    <h4 className="text-xs font-serif font-bold text-amber-1000 line-clamp-1">{t(e.name)}</h4>
                    <p className="text-[10px] text-amber-750 line-clamp-1">{t(e.location)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm space-y-4">
        <h3 className="text-base font-serif font-bold text-amber-950">Seva Orders history</h3>
        {orders.length === 0 ? (
          <p className="text-xs text-amber-800/60 italic">No previous product purchases registered inside session cache.</p>
        ) : (
          <div className="space-y-4 font-serif">
            {orders.map((o, idx) => (
              <div key={idx} className="border border-amber-100 rounded-xl p-4 divide-y divide-amber-100 text-xs">
                <div className="pb-2.5 flex justify-between gap-3 flex-wrap">
                  <div>
                    <span className="font-bold text-amber-950 block">Invoice identifier: {o.id}</span>
                    <span className="text-amber-800 font-mono text-[10px]">Registered date: {o.orderDate.split('T')[0]}</span>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      o.orderStatus === 'Delivered' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-850'
                    }`}>
                      Transit: {o.orderStatus}
                    </span>
                  </div>
                </div>
                <div className="py-2.5 space-y-1.5 leading-relaxed text-amber-900">
                  <span className="font-bold text-amber-950 uppercase text-[9px] font-sans tracking-wide block">Listings</span>
                  {o.items.map((item, id) => (
                    <div key={id} className="flex justify-between">
                      <span>{item.quantity}x {t(item.productName)}</span>
                      <span className="font-mono">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-[10px] text-amber-700 font-mono">Tracking Coordinate: {o.trackingNumber || 'TRK-VRN-REGISTERED'}</span>
                  <span className="font-bold text-amber-950 font-mono text-sm leading-none pt-0.5">Total Paid: ₹{o.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
