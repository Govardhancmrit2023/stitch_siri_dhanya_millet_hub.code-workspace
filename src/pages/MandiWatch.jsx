import React, { useState, useEffect, useRef, useCallback } from 'react';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

// ─── Locations ────────────────────────────────────────────────────────────────
const LOCATIONS = ['Bengaluru', 'Davangere', 'Mysuru'];

// ─── Millet metadata (icon, label) ───────────────────────────────────────────
const MILLET_META = {
  ragi:   { label: 'Ragi',   icon: 'grain',        colorClass: 'bg-primary' },
  navane: { label: 'Navane', icon: 'eco',          colorClass: 'bg-error'   },
  sajje:  { label: 'Sajje',  icon: 'potted_plant', colorClass: 'bg-primary' },
  baragu: { label: 'Baragu', icon: 'agriculture',  colorClass: 'bg-outline' },
};

// ─── Seed prices per [millet][location] ──────────────────────────────────────
// Each location has slightly different market prices reflecting real variation
const SEED_PRICES = {
  ragi: {
    Bengaluru: { price: 45, high7: 48, low7: 42, history: [38, 40, 42, 41, 44, 43, 45] },
    Davangere: { price: 43, high7: 46, low7: 40, history: [36, 38, 40, 39, 42, 41, 43] },
    Mysuru:    { price: 47, high7: 50, low7: 44, history: [40, 42, 44, 43, 46, 45, 47] },
  },
  navane: {
    Bengaluru: { price: 60, high7: 64, low7: 57, history: [64, 62, 61, 60, 61, 59, 60] },
    Davangere: { price: 58, high7: 62, low7: 55, history: [62, 61, 60, 59, 60, 58, 58] },
    Mysuru:    { price: 55, high7: 59, low7: 52, history: [59, 57, 56, 55, 57, 55, 55] },
  },
  sajje: {
    Bengaluru: { price: 40, high7: 43, low7: 37, history: [35, 36, 37, 38, 37, 39, 40] },
    Davangere: { price: 38, high7: 41, low7: 35, history: [33, 34, 35, 36, 35, 37, 38] },
    Mysuru:    { price: 42, high7: 45, low7: 39, history: [37, 38, 39, 40, 39, 41, 42] },
  },
  baragu: {
    Bengaluru: { price: 65, high7: 68, low7: 63, history: [63, 64, 65, 65, 66, 64, 65] },
    Davangere: { price: 62, high7: 65, low7: 60, history: [60, 61, 62, 62, 63, 61, 62] },
    Mysuru:    { price: 68, high7: 71, low7: 66, history: [66, 67, 68, 68, 69, 67, 68] },
  },
};

// Deep-clone helper
const cloneSeed = () =>
  Object.fromEntries(
    Object.entries(SEED_PRICES).map(([millet, locs]) => [
      millet,
      Object.fromEntries(
        Object.entries(locs).map(([loc, data]) => [loc, { ...data, history: [...data.history], trend: 'stable' }])
      ),
    ])
  );

// Simulate a small random price tick
const simulateTick = (current) => {
  const roll = Math.random();
  if (roll < 0.4) return current;
  const delta = Math.floor(Math.random() * 3) + 1;
  return roll < 0.7 ? current + delta : current - delta;
};
const trendFor = (prev, curr) => (curr > prev ? 'up' : curr < prev ? 'down' : 'stable');

const REFRESH_INTERVAL = 30;

// ─── Component ────────────────────────────────────────────────────────────────
const MandiWatch = () => {
  const [activeLocation, setActiveLocation] = useState('Bengaluru');
  const [expandedItem, setExpandedItem]     = useState(null);
  const [showReport, setShowReport]         = useState(false);
  const [prices, setPrices]                 = useState(cloneSeed);
  const [flash, setFlash]                   = useState({});
  const [lastUpdated, setLastUpdated]       = useState(new Date());
  const [countdown, setCountdown]           = useState(REFRESH_INTERVAL);
  const countdownRef                        = useRef(REFRESH_INTERVAL);

  // ── Refresh all prices ──────────────────────────────────────────────────────
  const refreshPrices = useCallback(() => {
    setPrices((prev) => {
      const next      = {};
      const newFlash  = {};
      Object.keys(prev).forEach((millet) => {
        next[millet] = {};
        LOCATIONS.forEach((loc) => {
          const old   = prev[millet][loc];
          const newP  = simulateTick(old.price);
          const trend = trendFor(old.price, newP);
          const hist  = [...old.history.slice(1), newP];
          next[millet][loc] = { price: newP, high7: Math.max(...hist), low7: Math.min(...hist), trend, history: hist };
          if (loc === activeLocation && trend !== 'stable') newFlash[millet] = trend;
        });
      });
      setFlash(newFlash);
      setTimeout(() => setFlash({}), 1500);
      return next;
    });
    setLastUpdated(new Date());
    countdownRef.current = REFRESH_INTERVAL;
    setCountdown(REFRESH_INTERVAL);
  }, [activeLocation]);

  // ── Countdown ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
      if (countdownRef.current <= 0) refreshPrices();
    }, 1000);
    return () => clearInterval(tick);
  }, [refreshPrices]);

  const toggleItem = (key) => setExpandedItem(expandedItem === key ? null : key);

  // ── Trend badge ─────────────────────────────────────────────────────────────
  const trendBadge = (trend) => {
    if (trend === 'up')
      return (
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-lg flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          <span className="font-label-lg">Up</span>
        </div>
      );
    if (trend === 'down')
      return (
        <div className="bg-red-50 text-red-700 px-2 py-1 rounded-lg flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">trending_down</span>
          <span className="font-label-lg">Down</span>
        </div>
      );
    return (
      <div className="bg-stone-100 text-stone-600 px-2 py-1 rounded-lg flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">horizontal_rule</span>
        <span className="font-label-lg">Stable</span>
      </div>
    );
  };

  // ── History chart ────────────────────────────────────────────────────────────
  const renderHistoryChart = (key) => {
    const { history, colorClass } = { ...prices[key][activeLocation], ...MILLET_META[key] };
    const max  = Math.max(...history);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      <div className="p-md bg-surface-container-lowest border-t border-surface-container-highest">
        <h4 className="font-label-lg text-on-surface mb-3">
          7-Day History — {activeLocation} Mandi (₹/kg)
        </h4>
        <div className="flex justify-between text-label-sm text-outline mb-2 px-1">
          {days.map((d) => <span key={d}>{d}</span>)}
        </div>
        <div className="flex items-end justify-between h-24 gap-2 pt-2">
          {history.map((val, i) => {
            const pct = Math.round((val / max) * 100);
            return (
              <div key={i} className="w-full flex flex-col items-center gap-1">
                <span className="text-[9px] text-outline">₹{val}</span>
                <div
                  className={`w-full ${colorClass} rounded-t-md transition-all duration-700`}
                  style={{ height: `${pct}%`, minHeight: '6px', opacity: 0.2 + (i / history.length) * 0.8 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Cross-location comparison row ────────────────────────────────────────────
  const renderCompareRow = (key) => {
    return (
      <div className="px-md pb-md border-t border-dashed border-surface-container-highest pt-3">
        <p className="font-label-sm text-outline mb-2">Compare across Mandis</p>
        <div className="flex gap-2">
          {LOCATIONS.map((loc) => {
            const d   = prices[key][loc];
            const isActive = loc === activeLocation;
            return (
              <div
                key={loc}
                className={`flex-1 rounded-lg p-2 text-center border ${
                  isActive
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant bg-surface-container-lowest'
                }`}
              >
                <p className={`font-label-sm mb-1 truncate ${isActive ? 'text-primary font-bold' : 'text-outline'}`}>{loc}</p>
                <p className={`font-bold text-base ${isActive ? 'text-primary' : 'text-on-surface'}`}>₹{d.price}</p>
                <p className="font-label-sm text-outline text-[10px]">/kg</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Stats for active location ────────────────────────────────────────────────
  const locationPrices = Object.entries(prices).map(([k, locs]) => ({ key: k, ...locs[activeLocation] }));
  const upCount   = locationPrices.filter((p) => p.trend === 'up').length;
  const downCount = locationPrices.filter((p) => p.trend === 'down').length;
  const topGainer = locationPrices.reduce((best, cur) =>
    cur.price - SEED_PRICES[cur.key][activeLocation].price > (best ? prices[best.key][activeLocation].price - SEED_PRICES[best.key][activeLocation].price : -Infinity)
      ? cur : best, null);

  const fmtTime = (d) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="font-body-md text-on-background min-h-screen pb-24 bg-[#f5fbef]">
      <TopAppBar title="Mandi Watch" />

      <main className="mt-20 px-container-margin max-w-5xl mx-auto">

        {/* ── LIVE status bar ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-4 bg-white rounded-xl px-4 py-2 shadow-sm border border-green-100">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="font-label-lg text-green-700 font-bold tracking-wide">LIVE</span>
            <span className="text-outline font-label-sm ml-1 hidden sm:inline">
              Last updated: <strong className="text-on-surface">{fmtTime(lastUpdated)}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-outline font-label-sm">
              Refresh in <strong className="text-primary">{countdown}s</strong>
            </span>
            <button
              onClick={refreshPrices}
              title="Refresh now"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
          </div>
        </div>

        {/* ── Location tabs ─────────────────────────────────────────────────── */}
        <section className="mb-lg">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => { setActiveLocation(loc); setExpandedItem(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-lg whitespace-nowrap transition-all duration-200 ${
                  activeLocation === loc
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'border border-outline text-on-surface hover:bg-primary/10'
                }`}
              >
                {activeLocation === loc && (
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                )}
                {loc} Mandi
              </button>
            ))}
          </div>
          <p className="font-label-sm text-outline mt-1 ml-1">
            Showing prices at <strong className="text-on-surface">{activeLocation} Mandi</strong> — tap any mandi to switch
          </p>
        </section>

        {/* ── Insight bento ────────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-md mb-md">
          <div className="bg-primary-container p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden">
            <span className="text-on-primary-container font-label-lg">Market Movement</span>
            <div className="text-on-primary-container">
              <p className="font-headline-md">{upCount > downCount ? 'Bullish' : upCount < downCount ? 'Bearish' : 'Neutral'}</p>
              <p className="font-label-sm opacity-80">↑{upCount} up · ↓{downCount} down</p>
            </div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-6xl opacity-10" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
          </div>
          <div className="bg-secondary-container p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden">
            <span className="text-on-secondary-container font-label-lg">Top Gainer</span>
            <div className="text-on-secondary-container">
              <p className="font-headline-md">{topGainer ? MILLET_META[topGainer.key].label : '—'}</p>
              <p className="font-label-sm opacity-80">{activeLocation} Mandi</p>
            </div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-6xl opacity-10" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
        </section>

        {/* ── Price Report ──────────────────────────────────────────────────── */}
        {showReport && (
          <section className="mb-xl bg-white border border-surface-container-highest rounded-2xl p-md shadow-sm animate-fade-in">
            <div className="flex justify-between items-center mb-md">
              <h2 className="font-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Price Report — All Mandis
              </h2>
              <span className="text-outline font-label-sm">
                {lastUpdated.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>

            {/* Price comparison table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="text-left p-3 font-label-lg text-outline rounded-tl-lg">Millet</th>
                    {LOCATIONS.map((loc) => (
                      <th key={loc} className={`text-center p-3 font-label-lg ${activeLocation === loc ? 'text-primary' : 'text-outline'}`}>
                        {loc}
                        {activeLocation === loc && <span className="ml-1 text-[10px] bg-primary text-on-primary px-1 rounded-full">Active</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(MILLET_META).map(([key, meta], i) => (
                    <tr key={key} className={`border-t border-surface-container-highest ${i % 2 === 0 ? 'bg-white' : 'bg-surface-container-lowest'}`}>
                      <td className="p-3 font-label-lg text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-base">{meta.icon}</span>
                        {meta.label}
                      </td>
                      {LOCATIONS.map((loc) => {
                        const d     = prices[key][loc];
                        const seed  = SEED_PRICES[key][loc].price;
                        const delta = d.price - seed;
                        return (
                          <td key={loc} className={`p-3 text-center ${activeLocation === loc ? 'bg-primary/5' : ''}`}>
                            <span className="font-bold text-on-surface">₹{d.price}</span>
                            {delta !== 0 && (
                              <span className={`ml-1 text-xs font-medium ${delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {delta > 0 ? '+' : ''}{delta}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Mandi Cards for active location ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {Object.entries(MILLET_META).map(([key, meta]) => {
            const data  = prices[key][activeLocation];
            const seed  = SEED_PRICES[key][activeLocation].price;
            const delta = data.price - seed;
            const pct   = ((delta / seed) * 100).toFixed(1);
            const fl    = flash[key];

            return (
              <div
                key={key}
                className={`bg-white rounded-xl shadow-[0_4px_12px_rgba(117,88,77,0.08)] border overflow-hidden hover:shadow-md transition-all duration-500 ${
                  fl === 'up'
                    ? 'border-green-400 shadow-[0_0_0_2px_rgba(74,222,128,0.4)]'
                    : fl === 'down'
                    ? 'border-red-400 shadow-[0_0_0_2px_rgba(248,113,113,0.4)]'
                    : 'border-surface-container-highest'
                }`}
              >
                <div className="p-md">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary text-3xl">{meta.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-on-surface leading-none">{meta.label}</h3>
                        <p className="font-label-sm text-outline flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          {activeLocation} Mandi
                        </p>
                      </div>
                    </div>
                    {trendBadge(data.trend)}
                  </div>

                  {/* Live price */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`text-3xl font-bold transition-colors duration-500 ${
                      fl === 'up' ? 'text-green-600' : fl === 'down' ? 'text-red-600' : 'text-on-surface'
                    }`}>
                      ₹{data.price}
                    </span>
                    <span className="font-label-lg text-outline">/kg</span>
                    {delta !== 0 && (
                      <span className={`font-label-sm ml-1 ${delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {delta > 0 ? '+' : ''}{delta} ({pct}%)
                      </span>
                    )}
                  </div>

                  {fl && (
                    <div className={`text-xs font-bold mb-2 animate-pulse ${fl === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {fl === 'up' ? '▲ Price increased' : '▼ Price decreased'}
                    </div>
                  )}

                  {/* High / Low / Session strip */}
                  <div className="bg-surface-container-low p-sm rounded-lg flex justify-between items-center mt-2">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-outline">7-day High</span>
                      <span className="font-label-lg text-primary">₹{data.high7}</span>
                    </div>
                    <div className="h-6 w-px bg-outline-variant" />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-outline">7-day Low</span>
                      <span className="font-label-lg text-secondary">₹{data.low7}</span>
                    </div>
                    <div className="h-6 w-px bg-outline-variant" />
                    <div className="flex flex-col items-end">
                      <span className="font-label-sm text-outline">Session</span>
                      <span className={`font-label-lg font-bold ${delta > 0 ? 'text-green-600' : delta < 0 ? 'text-red-600' : 'text-stone-500'}`}>
                        {delta > 0 ? `+₹${delta}` : delta < 0 ? `-₹${Math.abs(delta)}` : '—'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Compare across mandis */}
                {renderCompareRow(key)}

                {/* History toggle */}
                <button
                  onClick={() => toggleItem(key)}
                  className="w-full py-3 bg-stone-50 border-t border-surface-container-highest text-primary font-label-lg hover:bg-stone-100 transition-colors"
                >
                  {expandedItem === key ? 'Hide Price History' : 'View Price History'}
                </button>
                {expandedItem === key && renderHistoryChart(key)}
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />

      {/* FAB */}
      <button
        onClick={() => setShowReport(!showReport)}
        className="fixed right-6 bottom-24 w-14 h-14 bg-primary text-on-primary rounded-2xl shadow-xl flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-3xl">
          {showReport ? 'close' : 'add_chart'}
        </span>
      </button>
    </div>
  );
};

export default MandiWatch;
