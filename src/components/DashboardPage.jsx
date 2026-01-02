import React, { useState } from 'react';

const imgFrame1 = "/assets/logo.svg";

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DashboardPage({ user, onLogout, onNavigateTo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#f9f9f9]">
      {/* Blurred Content Container */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'blur-sm' : ''} ${isMenuOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        {/* Logo - Positioned at top */}
        <div className="absolute top-[19px] left-1/2 translate-x-[-50%] w-[59px] h-[40px]">
          <img alt="Odama Logo" className="block max-w-none w-full h-full" src={imgFrame1} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-10 items-center w-full max-w-[426px] px-4">
          {/* Welcome Message */}
          <div className="text-center">
            <p className="text-[16px] leading-[24px] font-['Inter',sans-serif]">
              <span className="text-[#464646] font-medium">Hello {user}! Here's what's </span>
              <span className="text-[#757575]">happening in</span>{' '}
              <span className="text-[#757575]">the studio today.</span>
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3 items-center justify-center w-full">
            {/* Pending Card */}
            <div className="bg-[#e9e9e9] rounded-full px-5 py-5 text-center flex flex-col gap-[10px] items-center justify-center flex-1 h-[100px]">
              <p className="text-[#757575] text-[16px] font-normal leading-[24px] font-['Inter',sans-serif] uppercase">
                Pending
              </p>
              <p className="text-[#464646] text-[16px] font-medium leading-[24px] font-['Inter',sans-serif] uppercase">
                1 Shot
              </p>
            </div>

            {/* Approved Card */}
            <div className="bg-[#e9e9e9] rounded-full px-5 py-5 text-center flex flex-col gap-[10px] items-center justify-center flex-1 h-[100px]">
              <p className="text-[#757575] text-[16px] font-normal leading-[24px] font-['Inter',sans-serif] uppercase">
                Approved
              </p>
              <p className="text-[#464646] text-[16px] font-medium leading-[24px] font-['Inter',sans-serif] uppercase">
                1 Shot
              </p>
            </div>

            {/* Next Deadline Card */}
            <div className="bg-[#e9e9e9] rounded-full px-5 py-5 text-center flex flex-col gap-[10px] items-center justify-center flex-1 h-[100px]">
              <p className="text-[#757575] text-[16px] font-normal leading-[24px] font-['Inter',sans-serif] uppercase whitespace-nowrap">
                Next Deadline
              </p>
              <p className="text-[#464646] text-[16px] font-medium leading-[24px] font-['Inter',sans-serif] uppercase">
                05 Jan
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button className="flex items-center justify-center gap-2 h-10 px-5 bg-[#282828] text-white rounded-full font-semibold text-sm transition hover:bg-[#1a1a1a] active:scale-95 shadow-[0px_2px_5px_0px_rgba(103,110,118,0.08),0px_0px_0px_1px_rgba(103,110,118,0.16),0px_1px_1px_0px_rgba(0,0,0,0.12)]">
            <span>Submit a Shot</span>
            <ArrowIcon />
          </button>
        </div>
      </div>

      {/* Menu Button - Bottom (Not Blurred) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute bottom-[19px] px-[40px] py-[12px] bg-[#e9e9e9] rounded-full text-center text-[#757575] text-[16px] font-normal leading-[24px] font-['Inter',sans-serif] uppercase transition hover:bg-[#dcdcdc] z-50"
      >
        Menu
      </button>

      {/* Overlay - Shows when menu is open */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-black bg-opacity-30 z-40 fade-in-overlay"
        />
      )}

      {/* Menu Popup (Not Blurred) */}
      {isMenuOpen && (
        <div className="absolute bottom-[calc(19px+44px+12px)] inset-x-0 mx-auto bg-[#e9e9e9] rounded-[40px] p-[20px] w-[296px] z-50 shadow-lg slide-in-blurred-bottom">
          {/* Menu Items Grid */}
          <div className="flex flex-wrap gap-3 items-start justify-center mb-5 w-[256px]">
            {/* Overview */}
            <button className="bg-[#afafaf] rounded-full w-[122px] h-[122px] flex items-center justify-center font-['Inter',sans-serif] text-[16px] font-normal text-[#f9f9f9] uppercase hover:bg-[#9a9a9a] transition">
              Overview
            </button>

            {/* Schedule */}
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                onNavigateTo('scheduling');
              }}
              className="bg-[#dfdfdf] rounded-full w-[122px] h-[122px] flex items-center justify-center font-['Inter',sans-serif] text-[16px] font-normal text-[#464646] uppercase hover:bg-[#d0d0d0] transition"
            >
              Schedule
            </button>

            {/* Request */}
            <button className="bg-[#dfdfdf] rounded-full w-[122px] h-[122px] flex items-center justify-center font-['Inter',sans-serif] text-[16px] font-normal text-[#464646] uppercase hover:bg-[#d0d0d0] transition">
              Request
            </button>

            {/* Leaderboard */}
            <button className="bg-[#dfdfdf] rounded-full w-[122px] h-[122px] flex items-center justify-center font-['Inter',sans-serif] text-[16px] font-normal text-[#464646] uppercase text-center hover:bg-[#d0d0d0] transition">
              Leaderboard
            </button>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onLogout();
            }}
            className="w-full bg-[#dfdfdf] rounded-full px-[40px] py-[12px] text-center text-[#757575] text-[16px] font-normal leading-[24px] font-['Inter',sans-serif] uppercase hover:bg-[#d0d0d0] transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
