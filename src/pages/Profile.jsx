import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: 'Basavanna Gowda',
    location: 'Davangere, Karnataka',
    phone: '+91 98765 43210',
    email: 'basavanna.gowda@millethub.com',
    memberSince: 'Oct 2023',
    role: 'Farmer & Community Leader',
    stats: {
      recipesLiked: 0,
      purchases: 12,
      mandiAlerts: 5
    }
  });

  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('sd_user');
    const likedRecipes = JSON.parse(localStorage.getItem('sd_liked_recipes') || '[]');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(prev => ({
        ...prev,
        ...parsedUser,
        stats: {
          ...prev.stats,
          recipesLiked: likedRecipes.length
        }
      }));
    } else {
      setUser(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          recipesLiked: likedRecipes.length
        }
      }));
    }
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const updatedUser = { ...user, profilePic: base64String };
        setUser(updatedUser);
        localStorage.setItem('sd_user', JSON.stringify(updatedUser));
        // Notify other components
        window.dispatchEvent(new Event('sd_user_update'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sd_user');
    navigate('/login');
  };

  const [showSettings, setShowSettings] = React.useState(false);
  const [notifs, setNotifs] = React.useState({ mandi: true, recipes: true });

  const toggleNotif = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  const defaultPic = "https://lh3.googleusercontent.com/aida-public/AB6AXuDpw_MBaB5qQ-BmkgA91qzCVnhsItOL-GMmJnWn71HvJZoP97lvgKB334G4QYiWnbQ_CvNUwyy6dKfvacOMZKdmBTljGELMn-7fXntooDZ8lXkG1ftvYw9IIk5KaZUiLshySogNr9q9DpYaYKqp5zSumaXOiEwvQnF9rOhqnOUZmRR_WJUV15u-T2ME-jKjjqDexy7q0m8HSjcBAve93ZchOEO3K8NH24oX9x27LRHryFhJdPOzHo9ZCAvdSO-DrW4Kbnp2Q4b8Vv5C";

  return (
    <div className="bg-stone-50 font-body-lg text-on-surface min-h-screen pb-24">
      <TopAppBar title="Profile" />

      <main className="mt-20 px-container-margin pt-lg max-w-2xl mx-auto">
        {/* Profile Header */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 mb-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-surface-container overflow-hidden border-4 border-primary/20">
              <img className="w-full h-full object-cover" src={user.profilePic || defaultPic} alt="Profile" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleProfilePicChange} 
              accept="image/*" 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          <h2 className="text-2xl font-bold text-on-surface">{user.name}</h2>
          <p className="text-primary font-medium">{user.role}</p>
          <p className="text-outline text-sm flex items-center justify-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            {user.location}
          </p>
        </section>

        {/* User Stats */}
        <section className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-primary-container/20 rounded-xl p-3 text-center border border-primary-container/30">
            <p className="text-2xl font-bold text-primary">{user.stats.recipesLiked}</p>
            <p className="text-[10px] uppercase tracking-wider text-outline-variant font-bold">Liked</p>
          </div>
          <div className="bg-secondary-container/20 rounded-xl p-3 text-center border border-secondary-container/30">
            <p className="text-2xl font-bold text-secondary">{user.stats.purchases}</p>
            <p className="text-[10px] uppercase tracking-wider text-outline-variant font-bold">Orders</p>
          </div>
          <div className="bg-stone-100 rounded-xl p-3 text-center border border-stone-200">
            <p className="text-2xl font-bold text-stone-600">{user.stats.mandiAlerts}</p>
            <p className="text-[10px] uppercase tracking-wider text-outline-variant font-bold">Alerts</p>
          </div>
        </section>

        {/* User Details & Settings */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 mb-6">
          <div className="p-4 border-b border-stone-100 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">person</span>
            <div className="flex-1">
              <p className="text-[10px] text-outline uppercase font-bold tracking-wider">Account Details</p>
              <p className="text-on-surface font-medium">{user.email}</p>
              <p className="text-on-surface font-medium">{user.phone}</p>
            </div>
          </div>
          
          <div className="p-4 border-b border-stone-100 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">calendar_today</span>
            <div className="flex-1">
              <p className="text-[10px] text-outline uppercase font-bold tracking-wider">Member Since</p>
              <p className="text-on-surface font-medium">{user.memberSince}</p>
            </div>
          </div>

          {/* Account Settings Header */}
          <div 
            className={`p-4 border-b border-stone-100 flex items-center gap-3 cursor-pointer transition-colors ${showSettings ? 'bg-primary-container/10' : 'hover:bg-stone-50'}`}
            onClick={() => setShowSettings(!showSettings)}
          >
            <span className="material-symbols-outlined text-primary">settings</span>
            <div className="flex-1">
              <p className="text-on-surface font-medium">Account Settings</p>
            </div>
            <span className={`material-symbols-outlined text-outline transition-transform duration-300 ${showSettings ? 'rotate-90' : ''}`}>chevron_right</span>
          </div>

          {/* Settings Options (Expandable) */}
          {showSettings && (
            <div className="bg-stone-50/50 animate-fade-in border-b border-stone-100">
              <div className="p-4 pl-12 border-b border-stone-100/50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-on-surface">Mandi Price Alerts</p>
                  <p className="text-[11px] text-outline">Get notified when prices change</p>
                </div>
                <div 
                  onClick={() => toggleNotif('mandi')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${notifs.mandi ? 'bg-primary' : 'bg-stone-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notifs.mandi ? 'left-6' : 'left-1'}`}></div>
                </div>
              </div>

              <div className="p-4 pl-12 border-b border-stone-100/50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-on-surface">New Recipe Alerts</p>
                  <p className="text-[11px] text-outline">Weekly millet recipe updates</p>
                </div>
                <div 
                  onClick={() => toggleNotif('recipes')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${notifs.recipes ? 'bg-primary' : 'bg-stone-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notifs.recipes ? 'left-6' : 'left-1'}`}></div>
                </div>
              </div>

              <div className="p-4 pl-12 border-b border-stone-100/50 flex items-center justify-between">
                <p className="text-sm font-semibold text-on-surface">App Language</p>
                <select className="bg-white border border-stone-200 text-xs rounded-md px-2 py-1 outline-none">
                  <option>English</option>
                  <option>Kannada (ಕನ್ನಡ)</option>
                  <option>Hindi (हिन्दी)</option>
                </select>
              </div>

              <div className="p-4 pl-12 flex items-center justify-between hover:bg-stone-100 cursor-pointer transition-colors">
                <p className="text-sm font-semibold text-on-surface">Change Password</p>
                <span className="material-symbols-outlined text-outline text-sm">lock</span>
              </div>
            </div>
          )}

          <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-stone-50" onClick={() => navigate('/health')}>
            <span className="material-symbols-outlined text-primary">health_and_safety</span>
            <div className="flex-1">
              <p className="text-on-surface font-medium">Health Profile</p>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </div>
        </section>

        {/* Logout Section */}
        <section className="px-2">
          <button 
            onClick={handleLogout}
            className="w-full bg-error/10 text-error border border-error/20 py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout from Siri-Dhanya
          </button>
          <p className="text-center text-outline text-[11px] mt-4">
            Version 1.0.4 (Millet Hub)
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
