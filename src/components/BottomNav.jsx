import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavClass = (path) => {
    const isActive = location.pathname.includes(path);
    if (isActive) {
      return "flex flex-col items-center justify-center bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-100 rounded-2xl px-5 py-1 transition-all font-['Inter'] text-[12px] font-medium";
    }
    return "flex flex-col items-center justify-center text-stone-500 dark:text-stone-400 px-5 py-1 hover:text-green-600 dark:hover:text-green-400 active:scale-90 transition-all font-['Inter'] text-[12px] font-medium cursor-pointer";
  };

  const getIconStyle = (path) => {
    return location.pathname.includes(path) ? { fontVariationSettings: "'FILL' 1" } : {};
  };

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div onClick={() => navigate('/mandi')} className={getNavClass('mandi')}>
        <span className="material-symbols-outlined" style={getIconStyle('mandi')}>trending_up</span>
        <span>Mandi</span>
      </div>
      <div onClick={() => navigate('/recipes')} className={getNavClass('recipes')}>
        <span className="material-symbols-outlined" style={getIconStyle('recipes')}>cooking</span>
        <span>Recipes</span>
      </div>
      <div onClick={() => navigate('/health')} className={getNavClass('health')}>
        <span className="material-symbols-outlined" style={getIconStyle('health')}>favorite</span>
        <span>Health</span>
      </div>
      <div onClick={() => navigate('/buy')} className={getNavClass('buy')}>
        <span className="material-symbols-outlined" style={getIconStyle('buy')}>storefront</span>
        <span>Buy</span>
      </div>
      <div onClick={() => navigate('/profile')} className={getNavClass('profile')}>
        <span className="material-symbols-outlined" style={getIconStyle('profile')}>person</span>
        <span>Profile</span>
      </div>
    </nav>
  );
};

export default BottomNav;
