import React, { useState, useEffect } from 'react';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

// ─── Recipe data ──────────────────────────────────────────────────────────────
const RECIPES = [
  // ── Traditional / Breakfast ─────────────────────────────────────────────────
  {
    id: 'ragi-mudde',
    title: 'Ragi Mudde',
    time: '20 min',
    badge: 'High Fiber',
    badgeIcon: 'bolt',
    category: 'Traditional',
    featured: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD6XeBCHP3cLQT-rx1mdibMGaI7dmnh1UCKl85OO1ys8NbVRgrDyI3ZFvNIkySBODbaUp5Tl5FxkU73RoJ5BI4Q0SuVOczIScBisp8XqfEFGDC7nlJyMwqq6j7ZN83BHZxW6D70Cqvdp7LHKzu22RqXgOfqjkROwWlLyZY6k8N21gBV6lf62LZ8uCjp-UjMG4NAmrPYIxJ-OaNFXat0S7VsUT7goP1h3f1B5DAxHnI58mHsPHhEkOShdLssRqs_BvZjHxWOmPCjtIt',
    instructions: [
      'Boil water in a heavy-bottomed vessel with a pinch of salt.',
      'Slowly add Ragi flour while stirring continuously to avoid lumps.',
      'Cook on low heat until it forms a thick, non-sticky mass.',
      'Wet your hands and shape it into smooth round balls. Serve hot with sambar!',
    ],
  },
  {
    id: 'millet-khichdi',
    title: 'Millet Khichdi',
    time: '35 min',
    badge: 'Protein Rich',
    badgeIcon: 'restaurant',
    category: 'Breakfast',
    featured: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD31tGg8kpCbCxgRWbZWYYQL5OWFpGhE-9sUFMFGrJpW5MccPYBUcj8Jc9emieMNd4yS5Z3DDyP02X1HR760LMyPxsqr5Sxb4LbOSQ2WlQOjGuIumIQ8S4ZkbdPn8b1UFXvg9iRDiP46bQSg30e4yXXn24Ip_a-ieiB27OGLH1D_IZQX7zcZe2hIkOSXpx0u5_s5oB3Qj5JhDyLovdxGUWXU-OFBfMLnpvHM1fCOfQnb3fnpJurN6LUNg5BohCyiKzeNhYxyZ3LQtmf',
    instructions: [
      'Wash and soak millets and moong dal for 30 minutes.',
      'Sauté cumin, ginger, and vegetables in ghee.',
      'Add the soaked millets, dal, turmeric, salt, and water.',
      'Pressure cook for 3–4 whistles until soft and mushy.',
    ],
  },
  {
    id: 'jowar-roti',
    title: 'Jowar Roti',
    time: '15 min',
    badge: 'Gluten Free',
    badgeIcon: 'eco',
    category: 'Traditional',
    featured: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu5OGllBG7JEynpldYR7VFcfOrg1Ws5nJfU6y_dcncjdEec9MuiPK572Rq5DZ2mX69YXrrUbAIKHPZc-r2pzJ4uqd3jBMmLW4NdSPD4bmXlxdLqlvh7R0La-W7zq1VFlGjGGqS82d4FLcpl3B4JACQ-uHaFyhZX8XKkkWZtAXMoHnTmjnZClpqzBFqOnBuFd_HKCLrU0koHly_bfFi6lEfT8OiyAnE_G23FeROCtJJ5f609bQAZi7OLisZaTaBDAGzhLHBV_w2_wPt',
    instructions: [
      'Boil water and add it to Jowar flour with a pinch of salt.',
      "Knead into a soft, smooth dough while it's still warm.",
      'Take small portions and pat them into flat rounds using your palms.',
      'Cook on a hot tawa on both sides until slightly puffed and golden.',
    ],
  },
  {
    id: 'bajra-dosa',
    title: 'Bajra Dosa',
    time: '10 min',
    badge: 'Quick Prep',
    badgeIcon: 'timer_10',
    category: 'Breakfast',
    featured: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAuCx-i6uByVk2MVssi3vuZWPXMzsjwAC9wqKcIG_JcF0I6suVJcCDY3SU8JOE007AMxs2HnZVTvpptsfwPDOfrNTGEr2FqjbM6YlXyvFmJe3lWjKZ5pQ3BXJXhZN8dQP3ygQlfUKj9tUeen5h6aMGYMBXd_eY5Qj-R6qiTROa6-Dma3fxow7edo8mI5_qLNSYB7YNDdRjsEQAQGt1XsK_TMdV-EGqSlueesH6UA3R9YyVftXR3j8TZJaipAdMklQ9Xac5hcHzzoDq',
    instructions: [
      'Soak bajra, urad dal, and fenugreek seeds overnight.',
      'Grind to a smooth batter and let it ferment for 6–8 hours.',
      'Add salt and water to adjust the consistency.',
      'Pour a ladleful onto a hot greased griddle, spread thin, and cook until crisp.',
    ],
  },

  // ── Snacks ──────────────────────────────────────────────────────────────────
  {
    id: 'ragi-murukku',
    title: 'Ragi Murukku',
    time: '40 min',
    badge: 'Crispy',
    badgeIcon: 'local_fire_department',
    category: 'Snacks',
    featured: false,
    img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
    instructions: [
      'Mix Ragi flour and rice flour in a 1:2 ratio with sesame seeds, cumin, and red chilli powder.',
      'Add soft butter and mix well. Gradually add water to form a firm, non-sticky dough.',
      'Fill a murukku press with the dough and press spirals onto a greased plate or parchment.',
      'Deep-fry in hot oil on medium heat until golden and crisp. Drain on paper towels and cool before storing.',
    ],
  },
  {
    id: 'millet-bhel',
    title: 'Millet Bhel Puri',
    time: '15 min',
    badge: 'No Cook',
    badgeIcon: 'sports_bar',
    category: 'Snacks',
    featured: false,
    img: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80',
    instructions: [
      'Puff foxtail millet (navane) by dry-roasting in a hot pan until it pops — keep stirring to avoid burning.',
      'Toss puffed millet with finely chopped onion, tomato, coriander, and green chilli.',
      'Add tamarind chutney, green chutney, chaat masala, and a squeeze of lemon juice.',
      'Mix gently, top with sev and pomegranate seeds. Serve immediately for maximum crunch!',
    ],
  },
  {
    id: 'jowar-chivda',
    title: 'Jowar Chivda',
    time: '25 min',
    badge: 'Trail Mix',
    badgeIcon: 'grain',
    category: 'Snacks',
    featured: false,
    img: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&q=80',
    instructions: [
      'Dry-roast jowar (sorghum) in a heavy pan on medium heat, shaking constantly, until it starts to pop and puff.',
      'In another pan, heat oil and add mustard seeds, curry leaves, green chilli, and turmeric.',
      'Add the puffed jowar, roasted peanuts, fried cashews, and mix well over low heat.',
      'Season with salt, sugar, and a squeeze of lime. Cool completely before storing in an airtight jar.',
    ],
  },
  {
    id: 'ragi-ladoo-snack',
    title: 'Ragi Peanut Balls',
    time: '20 min',
    badge: 'Energy Bite',
    badgeIcon: 'fitness_center',
    category: 'Snacks',
    featured: false,
    img: 'https://images.unsplash.com/photo-1548170258-c90cd7e78ad0?w=600&q=80',
    instructions: [
      'Dry-roast ragi flour in a pan on low heat for 8–10 minutes until fragrant and slightly darker. Let it cool.',
      'Dry-roast peanuts, remove skins, and coarsely crush them.',
      'Mix roasted ragi, crushed peanuts, jaggery powder, cardamom, and a pinch of salt.',
      'Add just enough melted ghee to bind the mixture. Roll into small balls and refrigerate for 30 minutes.',
    ],
  },

  // ── Desserts ────────────────────────────────────────────────────────────────
  {
    id: 'ragi-halwa',
    title: 'Ragi Halwa',
    time: '30 min',
    badge: 'Iron Rich',
    badgeIcon: 'favorite',
    category: 'Desserts',
    featured: false,
    img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80',
    instructions: [
      'Mix ragi flour with water to form a smooth lump-free paste. Let it rest for 10 minutes.',
      'In a heavy pan, heat ghee and add the ragi paste. Stir continuously on medium heat.',
      'Add jaggery syrup (jaggery dissolved in warm water), cardamom powder, and chopped cashews.',
      'Cook stirring non-stop until the halwa thickens and leaves the sides of the pan. Serve warm.',
    ],
  },
  {
    id: 'millet-kheer',
    title: 'Foxtail Millet Kheer',
    time: '45 min',
    badge: 'Festival Sweet',
    badgeIcon: 'celebration',
    category: 'Desserts',
    featured: false,
    img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
    instructions: [
      'Wash and soak foxtail millet (navane) for 20 minutes, then drain well.',
      'Bring whole milk to a boil in a thick-bottomed pot. Add the soaked millet and cook on low heat, stirring often.',
      'Once the millet is soft and the milk has thickened (about 25 min), add jaggery or sugar and mix well.',
      'Stir in cardamom powder, saffron strands soaked in warm milk, and garnish with fried cashews and raisins.',
    ],
  },
  {
    id: 'bajra-ladoo',
    title: 'Bajra Ladoo',
    time: '35 min',
    badge: 'Winter Special',
    badgeIcon: 'ac_unit',
    category: 'Desserts',
    featured: false,
    img: 'https://images.unsplash.com/photo-1600326145308-d0716d28d9e3?w=600&q=80',
    instructions: [
      'Dry-roast bajra (pearl millet) flour in a pan on low heat for 12–15 minutes until golden and nutty-smelling.',
      'Add roasted sesame seeds, poppy seeds, dry coconut powder, and cardamom. Mix well and remove from heat.',
      'Once slightly cooled, add jaggery powder and mix thoroughly until combined.',
      'Add warm ghee little by little and bind the mixture. Shape into round ladoos while still warm. Store in an airtight container.',
    ],
  },
  {
    id: 'jowar-sheera',
    title: 'Jowar Sheera',
    time: '25 min',
    badge: 'Comfort Food',
    badgeIcon: 'spa',
    category: 'Desserts',
    featured: false,
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
    instructions: [
      'Heat ghee generously in a thick pan and add jowar (sorghum) flour. Roast on low flame for 10 minutes, stirring constantly, until fragrant.',
      'In a separate saucepan, bring milk and water to a boil. Slowly pour into the roasted jowar, stirring vigorously to prevent lumps.',
      'Add jaggery, cardamom powder, and a pinch of nutmeg. Cook until the sheera thickens to a soft pudding consistency.',
      'Garnish with chopped almonds, pistachios, and a drizzle of warm ghee. Serve hot.',
    ],
  },
];

const CATEGORIES = ['All Recipes', 'Breakfast', 'Traditional', 'Snacks', 'Desserts'];

// Load/save likes from localStorage
const loadLikes = () => {
  try { return JSON.parse(localStorage.getItem('sd_liked_recipes') || '[]'); }
  catch { return []; }
};
const saveLikes = (likes) => localStorage.setItem('sd_liked_recipes', JSON.stringify(likes));

// ─── Component ────────────────────────────────────────────────────────────────
const RecipeLab = () => {
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [likedIds, setLikedIds]             = useState(loadLikes);
  const [activeTab, setActiveTab]           = useState('All Recipes');
  const [heartAnim, setHeartAnim]           = useState(null);   // id currently animating
  const [search, setSearch]                 = useState('');
  const [showFavToast, setShowFavToast]     = useState(null);   // {msg, type}

  // Sync likes → localStorage
  useEffect(() => { saveLikes(likedIds); }, [likedIds]);

  const isLiked = (id) => likedIds.includes(id);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setHeartAnim(id);
    setTimeout(() => setHeartAnim(null), 500);

    if (isLiked(id)) {
      setLikedIds((prev) => prev.filter((x) => x !== id));
      setShowFavToast({ msg: 'Removed from favourites', type: 'remove' });
    } else {
      setLikedIds((prev) => [...prev, id]);
      setShowFavToast({ msg: 'Added to favourites ❤️', type: 'add' });
    }
    setTimeout(() => setShowFavToast(null), 2200);
  };

  const toggleRecipe = (id) =>
    setExpandedRecipe(expandedRecipe === id ? null : id);

  // Filtered list based on tab + search
  const visibleRecipes = RECIPES.filter((r) => {
    const matchesTab =
      activeTab === 'All Recipes' ? true :
      activeTab === 'My Favourites' ? isLiked(r.id) :
      r.category === activeTab;
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // ── Recipe card ─────────────────────────────────────────────────────────────
  const RecipeCard = ({ recipe }) => {
    const liked   = isLiked(recipe.id);
    const anim    = heartAnim === recipe.id;
    const expanded = expandedRecipe === recipe.id;

    return (
      <div className="group relative bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(117,88,77,0.12)] border border-surface-container-high transition-shadow duration-300 hover:shadow-md flex flex-col">
        {/* Image area */}
        <div
          className="relative h-56 overflow-hidden cursor-pointer"
          onClick={() => toggleRecipe(recipe.id)}
        >
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={recipe.img}
            alt={recipe.title}
          />

          {/* Heart button */}
          <button
            onClick={(e) => toggleLike(e, recipe.id)}
            className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
              liked
                ? 'bg-red-50/90 text-red-500 shadow-md'
                : 'bg-white/80 text-outline hover:text-red-400'
            }`}
            title={liked ? 'Remove from favourites' : 'Add to favourites'}
          >
            <span
              className={`material-symbols-outlined transition-transform duration-300 ${anim ? 'scale-150' : 'scale-100'}`}
              style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>

          {/* Featured badge */}
          {recipe.featured && (
            <div className="absolute bottom-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-lg font-label-sm backdrop-blur-sm">
              Featured
            </div>
          )}

          {/* Liked badge overlay */}
          {liked && (
            <div className="absolute bottom-4 right-4 bg-red-500/90 text-white px-2 py-0.5 rounded-full font-label-sm backdrop-blur-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              Liked
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="p-md cursor-pointer" onClick={() => toggleRecipe(recipe.id)}>
          <h3 className="font-headline-md text-on-surface mb-xs">{recipe.title}</h3>
          <div className="flex items-center gap-sm text-outline font-label-sm">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {recipe.time}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">{recipe.badgeIcon}</span>
              {recipe.badge}
            </span>
            <span className="ml-auto px-2 py-0.5 bg-surface-container-low rounded-full text-outline text-[11px]">
              {recipe.category}
            </span>
          </div>
        </div>

        {/* Instructions toggle */}
        <button
          onClick={() => toggleRecipe(recipe.id)}
          className="w-full py-3 mt-auto bg-stone-50 border-t border-surface-container-highest text-primary font-label-lg hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">
            {expanded ? 'expand_less' : 'expand_more'}
          </span>
          {expanded ? 'Hide Instructions' : 'View Instructions'}
        </button>

        {/* Instructions panel */}
        {expanded && (
          <div className="p-md bg-surface-container-lowest border-t border-surface-container-highest animate-fade-in text-sm">
            <h4 className="font-label-lg text-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Step-by-step Instructions
            </h4>
            <ol className="space-y-3">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-on-surface-variant font-body-md leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-surface font-body-lg text-on-surface min-h-screen pb-24">
      <TopAppBar title="Recipe Lab" />

      {/* ── Toast notification ─────────────────────────────────────────────── */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          showFavToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className={`px-5 py-2.5 rounded-full shadow-lg font-label-lg flex items-center gap-2 ${
          showFavToast?.type === 'add'
            ? 'bg-red-500 text-white'
            : 'bg-stone-700 text-white'
        }`}>
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {showFavToast?.type === 'add' ? 'favorite' : 'heart_broken'}
          </span>
          {showFavToast?.msg}
        </div>
      </div>

      <main className="mt-16 px-container-margin pt-lg max-w-5xl mx-auto">

        {/* ── Search bar ───────────────────────────────────────────────────── */}
        <section className="mb-lg">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
            <input
              className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline font-body-md"
              placeholder="Search recipes by millet..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>
        </section>

        {/* ── Tab bar (All / Favourites / categories) ──────────────────────── */}
        <section className="mb-lg overflow-x-auto whitespace-nowrap pb-2 flex gap-sm no-scrollbar">
          {/* My Favourites tab — always first */}
          <button
            onClick={() => setActiveTab('My Favourites')}
            className={`relative px-md py-sm rounded-full font-label-lg flex items-center gap-2 transition-all ${
              activeTab === 'My Favourites'
                ? 'bg-red-500 text-white shadow-sm'
                : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-red-50 hover:border-red-300 hover:text-red-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: activeTab === 'My Favourites' ? "'FILL' 1" : "'FILL' 0" }}>
              favorite
            </span>
            My Favourites
            {likedIds.length > 0 && (
              <span className={`ml-0.5 min-w-[20px] h-5 px-1 rounded-full text-xs font-bold flex items-center justify-center ${
                activeTab === 'My Favourites' ? 'bg-white text-red-500' : 'bg-red-500 text-white'
              }`}>
                {likedIds.length}
              </span>
            )}
          </button>

          {/* Category tabs */}
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-md py-sm rounded-full font-label-lg transition-all ${
                activeTab === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* ── Favourites hero banner (shown when on favourites tab) ─────────── */}
        {activeTab === 'My Favourites' && (
          <div className="mb-md bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-2xl px-md py-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-red-400 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <div>
              <p className="font-label-lg text-red-700 font-bold">
                {likedIds.length > 0 ? `${likedIds.length} Saved Recipe${likedIds.length > 1 ? 's' : ''}` : 'No favourites yet'}
              </p>
              <p className="font-label-sm text-red-500">
                {likedIds.length > 0
                  ? 'Tap ❤️ on any card to remove it from this list.'
                  : 'Tap the ❤️ icon on any recipe to save it here.'}
              </p>
            </div>
          </div>
        )}

        {/* ── Recipe grid ──────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md mb-xl">
          {visibleRecipes.length > 0 ? (
            visibleRecipes.map((r) => <RecipeCard key={r.id} recipe={r} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <span className="material-symbols-outlined text-6xl text-outline mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                {activeTab === 'My Favourites' ? 'favorite_border' : 'search_off'}
              </span>
              <p className="font-headline-md text-outline">
                {activeTab === 'My Favourites' ? 'No favourites yet' : 'No recipes found'}
              </p>
              <p className="font-label-sm text-outline mt-1">
                {activeTab === 'My Favourites'
                  ? 'Like a recipe by tapping the ❤️ button on any card.'
                  : 'Try a different search or category.'}
              </p>
              {activeTab === 'My Favourites' && (
                <button
                  onClick={() => setActiveTab('All Recipes')}
                  className="mt-4 px-5 py-2 bg-primary text-on-primary rounded-full font-label-lg"
                >
                  Browse All Recipes
                </button>
              )}
            </div>
          )}
        </section>

        {/* ── Discovery section ────────────────────────────────────────────── */}
        <section className="bg-primary-container/20 rounded-2xl p-lg mb-xl border border-primary-container/30">
          <div className="flex flex-col md:flex-row items-center gap-lg">
            <div className="flex-1">
              <h2 className="font-headline-md text-on-primary-container mb-sm">Unsure what to cook?</h2>
              <p className="font-body-md text-on-surface-variant mb-md">
                Try our millet matching engine. Tell us what ingredients you have, and we'll find the perfect recipe for you.
              </p>
              <button className="bg-primary text-on-primary px-lg py-md rounded-xl font-label-lg shadow-md active:scale-95 transition-all">
                Start Matching
              </button>
            </div>
            <div className="w-full md:w-1/3 aspect-video rounded-xl bg-surface-container-high overflow-hidden shadow-inner">
              <img
                className="w-full h-full object-cover opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7-31qwlDlRkoJ5XJVykWnOgk2k7P1CcpAVjDgoSldSHycE0OzHYTwNDT82HGtbupnKEAnDf24dYPuFNGyV70L4fY_--dBUpDvPxhJ-wePJoQ65HF5P-VUaI_MTqPwzJup0KDXDmuQ2zbwv09lWvm447N8J5zYfeQe6ch2Vrqbv9kKXtE_V9DuCrA8Zsryp64Eulvctz-2-o-eBpb_SZSceNNzQ5D7yVFRIIXOp991JBftC-axyAwZ6cpv2nw_K3zG49HmdxYlWZhT"
                alt="Millet composition"
              />
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default RecipeLab;
