import React, { useState } from 'react';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

const millets = [
  {
    id: 'ragi',
    name: 'Ragi (Finger Millet)',
    icon: 'grain',
    price: 45,
    unit: 'kg',
    seller: 'Suresh Farms, Bengaluru',
    badge: 'Organic',
    badgeColor: 'bg-green-100 text-green-800',
    stock: 'In Stock',
    stockColor: 'text-primary',
    description: 'Rich in calcium and iron. Ideal for porridge, mudde, and dosas.',
  },
  {
    id: 'navane',
    name: 'Navane (Foxtail Millet)',
    icon: 'eco',
    price: 58,
    unit: 'kg',
    seller: 'Kaveri Agro, Davangere',
    badge: 'Premium',
    badgeColor: 'bg-amber-100 text-amber-800',
    stock: 'Low Stock',
    stockColor: 'text-error',
    description: 'High in protein and dietary fibre. Great for pongal and upma.',
  },
  {
    id: 'sajje',
    name: 'Sajje (Pearl Millet)',
    icon: 'potted_plant',
    price: 38,
    unit: 'kg',
    seller: 'Mysuru Millets Co-op',
    badge: 'Best Value',
    badgeColor: 'bg-blue-100 text-blue-800',
    stock: 'In Stock',
    stockColor: 'text-primary',
    description: 'High in magnesium. Perfect for rotis and bhakri breads.',
  },
  {
    id: 'baragu',
    name: 'Baragu (Proso Millet)',
    icon: 'agriculture',
    price: 65,
    unit: 'kg',
    seller: 'Deccan Heritage Farm',
    badge: 'Rare Find',
    badgeColor: 'bg-purple-100 text-purple-800',
    stock: 'In Stock',
    stockColor: 'text-primary',
    description: 'Rich in antioxidants and gluten-free. Used in traditional Kannada cuisine.',
  },
  {
    id: 'korle',
    name: 'Korle (Kodo Millet)',
    icon: 'spa',
    price: 72,
    unit: 'kg',
    seller: 'Western Ghats Organics',
    badge: 'Organic',
    badgeColor: 'bg-green-100 text-green-800',
    stock: 'In Stock',
    stockColor: 'text-primary',
    description: 'Low glycaemic index. Ideal for diabetic-friendly cooking.',
  },
  {
    id: 'oodalu',
    name: 'Oodalu (Barnyard Millet)',
    icon: 'yard',
    price: 55,
    unit: 'kg',
    seller: 'Sahyadri Farms, Hassan',
    badge: 'New Arrival',
    badgeColor: 'bg-teal-100 text-teal-800',
    stock: 'In Stock',
    stockColor: 'text-primary',
    description: 'High in fibre and iron. Used in fasting foods and traditional recipes.',
  },
];

const DirectBuy = () => {
  const [cart, setCart] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Real-time price state
  const [prices, setPrices] = useState(
    Object.fromEntries(millets.map(m => [m.id, { price: m.price, trend: 'stable' }]))
  );
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [flash, setFlash] = useState({});

  const simulateTick = (current) => {
    const roll = Math.random();
    if (roll < 0.6) return current;
    const delta = Math.floor(Math.random() * 2) + 1;
    const newPrice = roll < 0.8 ? current + delta : current - delta;
    return Math.max(10, newPrice); // Keep price above 10
  };

  const trendFor = (prev, curr) => (curr > prev ? 'up' : curr < prev ? 'down' : 'stable');

  const refreshPrices = React.useCallback(() => {
    setPrices(prev => {
      const next = {};
      const newFlash = {};
      Object.entries(prev).forEach(([id, data]) => {
        const newP = simulateTick(data.price);
        const trend = trendFor(data.price, newP);
        next[id] = { price: newP, trend };
        if (trend !== 'stable') newFlash[id] = trend;
      });
      setFlash(newFlash);
      setTimeout(() => setFlash({}), 1500);
      return next;
    });
    setLastUpdated(new Date());
  }, []);

  React.useEffect(() => {
    const interval = setInterval(refreshPrices, 15000); // Update every 15s
    return () => clearInterval(interval);
  }, [refreshPrices]);

  const updateCart = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    return sum + (prices[id]?.price || 0) * qty;
  }, 0);

  const handleOrder = () => {
    if (totalItems === 0) return;
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart({});
    }, 3000);
  };

  const fmtTime = (d) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const trendBadge = (trend) => {
    if (trend === 'up') return <span className="flex items-center gap-0.5 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded"><span className="material-symbols-outlined text-[12px]">trending_up</span> UP</span>;
    if (trend === 'down') return <span className="flex items-center gap-0.5 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded"><span className="material-symbols-outlined text-[12px]">trending_down</span> DOWN</span>;
    return null;
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen pb-32">
      <TopAppBar title="Direct Buy" />

      <main className="mt-16 px-container-margin pt-lg max-w-5xl mx-auto">

        {/* Order Placed Success Banner */}
        {orderPlaced && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-label-lg animate-bounce">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            Order Placed Successfully!
          </div>
        )}

        {/* Hero Banner */}
        <section className="mb-lg bg-primary-container rounded-2xl p-lg relative overflow-hidden">
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10 text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <h2 className="font-headline-md text-on-primary-container mb-xs">Buy Direct from Farmers</h2>
          <p className="font-body-md text-on-surface-variant mb-md">Fresh millets straight from Karnataka's heartland. No middlemen. Fair prices guaranteed.</p>
          <div className="flex gap-md flex-wrap">
            <div className="flex items-center gap-1 font-label-lg text-on-primary-container">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> 100% Verified Sellers
            </div>
            <div className="flex items-center gap-1 font-label-lg text-on-primary-container">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span> Free Delivery ≥5kg
            </div>
          </div>
        </section>

        {/* Cart Summary Bar */}
        {totalItems > 0 && (
          <div className="mb-md bg-white border border-primary/30 rounded-xl p-md flex justify-between items-center shadow-sm">
            <div>
              <p className="font-label-lg text-on-surface">{totalItems} item{totalItems > 1 ? 's' : ''} in cart</p>
              <p className="font-headline-md text-primary">₹{totalPrice.toLocaleString()}</p>
            </div>
            <button
              onClick={handleOrder}
              className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-lg shadow-md active:scale-95 transition-transform flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
              Place Order
            </button>
          </div>
        )}

        {/* LIVE status bar */}
        <div className="flex items-center justify-between mb-4 bg-white rounded-xl px-4 py-2 shadow-sm border border-green-100">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="font-label-lg text-green-700 font-bold tracking-wide">LIVE PRICES</span>
          </div>
          <span className="text-outline font-label-sm">
            Last updated: <strong className="text-on-surface">{fmtTime(lastUpdated)}</strong>
          </span>
        </div>

        {/* Product Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-md mb-xl">
          {millets.map(millet => {
            const data = prices[millet.id];
            const fl = flash[millet.id];

            return (
              <div
                key={millet.id}
                className={`bg-white rounded-xl border overflow-hidden hover:shadow-md transition-all duration-500 ${fl === 'up'
                  ? 'border-green-400 shadow-[0_0_0_2px_rgba(74,222,128,0.4)]'
                  : fl === 'down'
                    ? 'border-red-400 shadow-[0_0_0_2px_rgba(248,113,113,0.4)]'
                    : 'border-surface-container-highest shadow-[0_4px_12px_rgba(117,88,77,0.06)]'
                  }`}
              >
                <div className="p-md">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary text-3xl">{millet.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-label-lg text-on-surface leading-tight">{millet.name}</h3>
                        <p className="font-label-sm text-outline flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-sm">person_pin</span>
                          {millet.seller}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${millet.badgeColor}`}>{millet.badge}</span>
                      {trendBadge(data.trend)}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body-md text-on-surface-variant mb-md text-sm">{millet.description}</p>

                  {/* Price & Stock */}
                  <div className="flex justify-between items-center mb-md">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold transition-colors duration-500 ${fl === 'up' ? 'text-green-600' : fl === 'down' ? 'text-red-600' : 'text-on-surface'
                        }`}>
                        ₹{data.price}
                      </span>
                      <span className="font-label-sm text-outline">/{millet.unit}</span>
                    </div>
                    <span className={`font-label-sm font-medium ${millet.stockColor} flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {millet.stockColor.includes('error') ? 'warning' : 'check_circle'}
                      </span>
                      {millet.stock}
                    </span>
                  </div>

                  {/* Add to Cart Controls */}
                  {cart[millet.id] ? (
                    <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl p-sm">
                      <button
                        onClick={() => updateCart(millet.id, -1)}
                        className="w-9 h-9 rounded-lg bg-white border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">remove</span>
                      </button>
                      <span className="font-headline-md text-primary">{cart[millet.id]} kg</span>
                      <button
                        onClick={() => updateCart(millet.id, 1)}
                        className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center hover:bg-primary-dim active:scale-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateCart(millet.id, 1)}
                      className="w-full py-2.5 bg-primary/10 text-primary border border-primary/30 rounded-xl font-label-lg hover:bg-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* Farmers Directory CTA */}
        <section className="bg-secondary-container/40 rounded-2xl p-lg mb-xl border border-secondary-container">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary text-4xl mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            <div>
              <h3 className="font-headline-md text-on-surface mb-xs">Connect with Local Farmer Groups</h3>
              <p className="font-body-md text-on-surface-variant mb-md">Join FPOs and millet cooperatives directly. Get bulk pricing and seasonal offers.</p>
              <button className="bg-secondary text-on-secondary px-lg py-sm rounded-xl font-label-lg active:scale-95 transition-transform">
                Explore FPO Directory
              </button>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default DirectBuy;
