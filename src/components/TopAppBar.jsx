import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopAppBar = ({ title }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState([
    { id: 1, title: 'Price Drop: Ragi', desc: 'Ragi prices in Bengaluru dropped by ₹2/kg', time: '2m ago', read: false, icon: 'trending_down', color: 'text-error' },
    { id: 2, title: 'New Recipe Added', desc: 'Check out the new Millet Bhel Puri recipe!', time: '1h ago', read: false, icon: 'restaurant', color: 'text-primary' },
    { id: 3, title: 'Direct Buy Update', desc: 'Your order #8842 has been shipped', time: '5h ago', read: true, icon: 'local_shipping', color: 'text-secondary' },
  ]);

  const unreadCount = notifs.filter(n => !n.read).length;

  const defaultPic = "https://lh3.googleusercontent.com/aida-public/AB6AXuDpw_MBaB5qQ-BmkgA91qzCVnhsItOL-GMmJnWn71HvJZoP97lvgKB334G4QYiWnbQ_CvNUwyy6dKfvacOMZKdmBTljGELMn-7fXntooDZ8lXkG1ftvYw9IIk5PsKaZUiLshySogNr9q9DpYaYKqp5zSumaXOiEwvQnF9rOhqnOUZmRR_WJUV15u-T2ME-jKjjqDexy7q0m8HSjcBAve93ZchOEO3K8NH24oX9x27LRHryFhJdPOzHo9ZCAvdSO-DrW4Kbnp2Q4b8Vv5C";

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem('sd_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed) {
            if (parsed.name) setUserName(parsed.name.split(' ')[0]);
            if (parsed.profilePic) setProfilePic(parsed.profilePic);
          }
        } catch (e) {
          console.error("Error parsing user data", e);
        }
      }
    };

    loadUser();
    window.addEventListener('sd_user_update', loadUser);
    return () => window.removeEventListener('sd_user_update', loadUser);
  }, []);

  const markRead = (id) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="bg-stone-50 fixed top-0 w-full z-50 flex justify-between items-center px-4 py-3 border-b border-stone-200 shadow-sm font-['Inter'] antialiased">
      <div className="flex items-center gap-3">
        <div 
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant cursor-pointer active:scale-95 transition-all"
        >
          <img className="w-full h-full object-cover" data-alt="Farmer Profile" src={profilePic || defaultPic} alt="Farmer Profile" />
        </div>
        <div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-wider -mb-1">{userName ? `Namaste, ${userName}` : 'Siri-Dhanya'}</p>
          <h1 className="text-xl font-bold text-green-800">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2 relative">
        <button 
          onClick={() => setShowNotifs(!showNotifs)}
          className={`p-2 transition-colors rounded-full active:scale-95 duration-150 relative ${showNotifs ? 'bg-primary-container text-primary' : 'text-green-700 hover:bg-stone-100'}`}
        >
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error border-2 border-stone-50 rounded-full animate-pulse"></span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifs && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)}></div>
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 z-50 overflow-hidden animate-fade-in origin-top-right">
              <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <h3 className="font-bold text-on-surface">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary font-bold hover:underline">Mark all as read</button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifs.length > 0 ? (
                  notifs.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => markRead(n.id)}
                      className={`p-4 border-b border-stone-100 flex gap-3 cursor-pointer hover:bg-stone-50 transition-colors ${!n.read ? 'bg-primary-container/5' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white border border-stone-100 shrink-0 shadow-sm`}>
                        <span className={`material-symbols-outlined ${n.color}`}>{n.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <p className={`text-sm font-bold truncate ${!n.read ? 'text-on-surface' : 'text-outline'}`}>{n.title}</p>
                          <span className="text-[10px] text-outline shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2 mt-0.5">{n.desc}</p>
                        {!n.read && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <span className="material-symbols-outlined text-outline text-[48px] opacity-20">notifications_off</span>
                    <p className="text-outline text-sm mt-2">No new notifications</p>
                  </div>
                )}
              </div>
              <div className="p-3 text-center bg-stone-50/50">
                <button className="text-xs text-outline hover:text-primary transition-colors font-medium">View all alerts</button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default TopAppBar;
