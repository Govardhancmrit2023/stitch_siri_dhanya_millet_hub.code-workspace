import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Defined outside Login to prevent re-creation on every render (which causes input focus loss)
const InputField = ({ id, name, label, icon, type = 'text', placeholder, value, onChange, error, extra }) => (
  <div className="flex flex-col gap-xs">
    <label className="font-label-lg text-on-surface-variant ml-xs" htmlFor={id}>{label}</label>
    <div className="relative flex items-center">
      <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px]">{icon}</span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`w-full h-14 pl-12 pr-12 bg-surface-container-low border rounded-lg font-body-md focus:ring-1 focus:ring-primary transition-all outline-none ${error ? 'border-error focus:border-error focus:ring-error' : 'border-outline-variant focus:border-primary'}`}
      />
      {extra}
    </div>
    {error && <p className="text-error font-label-sm ml-xs">{error}</p>}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  // 'signup' | 'login'
  const [mode, setMode] = useState('signup');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateSignup = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.includes('@')) errs.email = 'Enter a valid email';
    if (form.phone && !/^\d{10}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit number';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const validateLogin = () => {
    const errs = {};
    if (!form.email.includes('@')) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = mode === 'signup' ? validateSignup() : validateLogin();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    
    const registeredUsers = JSON.parse(localStorage.getItem('sd_registered_users') || '[]');

    if (mode === 'signup') {
      // Check if email already exists
      if (registeredUsers.some(u => u.email === form.email)) {
        setErrors({ email: 'Email already registered' });
        return;
      }

      // Register new user
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || '+91 98765 43210',
        role: 'Farmer & Community Leader',
        location: 'Davangere, Karnataka',
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };
      
      registeredUsers.push(newUser);
      localStorage.setItem('sd_registered_users', JSON.stringify(registeredUsers));
      
      // Auto-login after signup
      localStorage.setItem('sd_user', JSON.stringify(newUser));
      navigate('/mandi');
    } else {
      // Login mode
      const userMatch = registeredUsers.find(u => u.email === form.email && u.password === form.password);
      
      if (userMatch) {
        localStorage.setItem('sd_user', JSON.stringify(userMatch));
        navigate('/mandi');
      } else {
        setErrors({ 
          auth: 'Incorrect email or password. Please try again.',
          email: ' ', 
          password: ' ' 
        });
      }
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  };


  return (
    <div className="font-body-md text-on-background min-h-screen flex items-center justify-center p-md bg-surface">
      {/* Decorative BG */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-container blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-tertiary-container blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 right-1/4 w-[40rem] h-[40rem] rounded-full bg-secondary-container blur-3xl opacity-20"></div>
      </div>

      <main className="w-full max-w-[480px] flex flex-col gap-lg z-10 py-8">
        {/* Logo & Title */}
        <header className="flex flex-col items-center text-center gap-base">
          <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[40px] text-primary">agriculture</span>
          </div>
          <div className="mt-xs">
            <h1 className="font-headline-md text-primary tracking-tight">Siri-Dhanya Hub</h1>
            <p className="font-body-md text-secondary mt-xs">Connecting farmers to sustainable markets</p>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="flex bg-surface-container-low rounded-xl p-1 border border-outline-variant/30">
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`flex-1 py-2 rounded-lg font-label-lg transition-all ${mode === 'signup' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 rounded-lg font-label-lg transition-all ${mode === 'login' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            Sign In
          </button>
        </div>

        {/* Form Card */}
        <section className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/30">
          <form className="flex flex-col gap-md" onSubmit={handleSubmit}>

            {errors.auth && (
              <div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg flex items-center gap-2 animate-shake mb-2">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <p className="text-xs font-bold">{errors.auth}</p>
              </div>
            )}

            {mode === 'signup' && (
              <>
                <InputField id="name" name="name" label="Full Name" icon="person" placeholder="Enter your full name" value={form.name} onChange={handleChange} error={errors.name} />
                <InputField id="email" name="email" label="Email Address" icon="mail" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} error={errors.email} />
                <InputField id="phone" name="phone" label="Phone Number (Optional)" icon="phone" type="tel" placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} error={errors.phone} />
                <InputField
                  id="password"
                  name="password"
                  label="Create Password"
                  icon="lock"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                  extra={
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-[20px]">{showPass ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  }
                />
                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  icon="lock_reset"
                  type={showConfirmPass ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  extra={
                    <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-[20px]">{showConfirmPass ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  }
                />
                <button type="submit" className="w-full h-14 bg-primary text-on-primary font-label-lg rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-sm mt-xs">
                  Create Account
                  <span className="material-symbols-outlined">how_to_reg</span>
                </button>
                <p className="text-center font-body-md text-on-surface-variant">
                  Already have an account?{' '}
                  <button type="button" onClick={() => switchMode('login')} className="text-primary font-bold hover:underline">Sign In</button>
                </p>
              </>
            )}

            {mode === 'login' && (
              <>
                <InputField id="email" name="email" label="Email Address" icon="mail" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} error={errors.email} />
                <InputField
                  id="password"
                  name="password"
                  label="Password"
                  icon="lock"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                  extra={
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-[20px]">{showPass ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  }
                />
                <div className="flex justify-end -mt-xs">
                  <a href="#" className="font-label-lg text-primary font-semibold hover:underline">Forgot Password?</a>
                </div>
                <button type="submit" className="w-full h-14 bg-primary text-on-primary font-label-lg rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-sm">
                  Sign In
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                {/* Social Login */}
                <div className="relative my-sm flex items-center">
                  <div className="flex-grow border-t border-outline-variant"></div>
                  <span className="mx-md font-label-sm text-on-surface-variant bg-surface-container-lowest px-sm uppercase tracking-widest">Or sign in with</span>
                  <div className="flex-grow border-t border-outline-variant"></div>
                </div>
                <div className="grid grid-cols-2 gap-md">
                  <button type="button" className="flex items-center justify-center gap-sm h-12 border border-outline-variant rounded-lg font-label-lg hover:bg-surface-container-high transition-colors active:scale-95">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="flex items-center justify-center gap-sm h-12 border border-outline-variant rounded-lg font-label-lg hover:bg-surface-container-high transition-colors active:scale-95">
                    <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>
                <p className="text-center font-body-md text-on-surface-variant">
                  New here?{' '}
                  <button type="button" onClick={() => switchMode('signup')} className="text-primary font-bold hover:underline">Create an account</button>
                </p>
              </>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;
