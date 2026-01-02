import React, { useState } from 'react';

const imgFrame1 = "/assets/logo.svg";

const OdamaLogo = () => (
  <div className="w-[59px] h-[40px]">
    <img alt="Odama Logo" className="block max-w-none w-full h-full" src={imgFrame1} />
  </div>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function LoginPage({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin(username, password);
      setPassword('');
    }, 500);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#f9f9f9]">
      {/* Logo/Error Frame - Positioned at top with width morphing animation */}
      <div className={`absolute top-[19px] left-1/2 translate-x-[-50%] rounded-full transition-all duration-400 flex items-center justify-center ${
        error 
          ? 'bg-[rgba(40,40,40,0.3)] px-[20px] py-[8px] morph-width' 
          : 'w-[59px] h-[40px]'
      }`}>
        {/* Logo - Fades out on error */}
        {!error && (
          <img alt="Odama Logo" className="block max-w-none w-full h-full fade-in" src={imgFrame1} />
        )}
        
        {/* Error Message - Fades in on error */}
        {error && (
          <p className="text-white text-[16px] font-normal leading-[24px] font-['Inter',sans-serif] text-nowrap fade-in opacity-0">
            Invalid username or password.
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-6 w-full max-w-sm px-4">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {/* Username Input */}
          <input
            type="text"
            placeholder={usernameFocused ? "" : "Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
            className="h-[44px] px-[20px] rounded-full bg-[#e9e9e9] text-[#757575] placeholder-[#757575] text-center text-[16px] font-normal leading-[24px] font-['Inter',sans-serif] border-0 outline-none transition focus:outline-none focus:bg-[#dcdcdc]"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder={passwordFocused ? "" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className="h-[44px] px-[20px] rounded-full bg-[#e9e9e9] text-[#757575] placeholder-[#757575] text-center text-[16px] font-normal leading-[24px] font-['Inter',sans-serif] border-0 outline-none transition focus:outline-none focus:bg-[#dcdcdc]"
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 h-10 px-5 mt-3 bg-[#282828] text-white rounded-full font-semibold text-sm transition hover:bg-[#1a1a1a] active:scale-95 disabled:opacity-70 self-center shadow-[0px_2px_5px_0px_rgba(103,110,118,0.08),0px_0px_0px_1px_rgba(103,110,118,0.16),0px_1px_1px_0px_rgba(0,0,0,0.12)]"
          >
            <span>{isLoading ? 'Logging in...' : 'Login'}</span>
            <div className={`transition ${isLoading ? 'animate-pulse' : ''}`}>
              <ArrowIcon />
            </div>
          </button>
        </form>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-10 text-center">
        <p className="text-[#464646] text-base font-medium">Odama® Team Shot Portal</p>
      </div>
    </div>
  );
}
