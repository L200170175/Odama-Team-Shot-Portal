import React, { useState } from 'react';

const imgFrame1 = "/assets/logo.svg";
const imgHeroiconsOutlineArrowRight = "/assets/arrow-right.svg";
const imgKeyboardArrowDown = "/assets/chevron-down.svg";

export default function SchedulingPage({ onNavigateTo, onLogout }) {
  const [monthDropdown, setMonthDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullScheduleOpen, setIsFullScheduleOpen] = useState(false);

  const scheduleData = [
    { date: '01 jan', name: 'Arthur', isActive: false },
    { date: '02 jan', name: 'Vincent', isActive: true },
    { date: '03 jan', name: 'Fachrul', isActive: false },
    { date: '04 jan', name: 'Xenyx', isActive: false },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const fullScheduleData = [
    // Row 1
    { date: '28', name: 'Arthur', isPrevMonth: true },
    { date: '29', name: 'Xenyx', isPrevMonth: true },
    { date: '30', name: 'Vincent', isPrevMonth: true },
    { date: '31', name: 'Fandit', isPrevMonth: true },
    { date: '01', name: 'Yoga' },
    { date: '02', name: 'Vincent', isActive: true },
    { date: '03', name: 'Fachrul' },
    // Row 2
    { date: '05', name: 'Arthur' },
    { date: '06', name: 'Xenyx' },
    { date: '07', name: 'Vincent' },
    { date: '08', name: 'Fandit' },
    { date: '09', name: 'Yoga' },
    { date: '10', name: 'Dicky' },
    { date: '11', name: 'Fachrul' },
    // Row 3
    { date: '12', name: 'Arthur' },
    { date: '13', name: 'Xenyx' },
    { date: '14', name: 'Vincent' },
    { date: '15', name: 'Fandit' },
    { date: '16', name: 'Yoga' },
    { date: '17', name: 'Dicky' },
    { date: '18', name: 'Fachrul' },
    // Row 4
    { date: '19', name: 'Arthur' },
    { date: '20', name: 'Xenyx' },
    { date: '21', name: 'Vincent' },
    { date: '22', name: 'Fandit' },
    { date: '23', name: 'Yoga' },
    { date: '24', name: 'Dicky' },
    { date: '25', name: 'Fachrul' },
    // Row 5
    { date: '26', name: 'Arthur' },
    { date: '27', name: 'Xenyx' },
    { date: '28', name: 'Vincent' },
    { date: '29', name: 'Fandit' },
    { date: '30', name: 'Yoga' },
    { date: '31', name: 'Dicky' },
    { date: '01', name: 'Fachrul', isNextMonth: true },
  ];

  return (
    <div className="bg-[#f9f9f9] relative w-full h-screen overflow-hidden font-['Inter',sans-serif]" data-name="Dashboard Page - Schedule" data-node-id="15:426">
      {/* Blurred Content Container */}
      <div className={`absolute inset-0 transition-all duration-300 ${(isMenuOpen || isFullScheduleOpen) ? 'blur-sm pointer-events-none' : 'pointer-events-auto'}`}>
        {/* Logo */}
        <div className="absolute h-[40px] left-1/2 top-[19px] -translate-x-1/2 w-[59px]" data-node-id="15:427">
          <img alt="Odama Logo" className="block max-w-none size-full" src={imgFrame1} />
        </div>

        {/* Main Content */}
        <div className="absolute flex flex-col gap-[40px] items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[477px]" data-node-id="15:613">
          {/* Schedule Label */}
          <div className="bg-[#e9e9e9] flex flex-col items-center justify-center px-[20px] py-[10px] relative rounded-[100px] shrink-0" data-node-id="15:679">
            <div className="flex flex-col font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#282828] text-[14px] text-center text-nowrap" data-node-id="15:680">
              <p className="leading-[20px]">{`My Schedule: 14 & 28 January`}</p>
            </div>
          </div>

          {/* Description */}
          <p className="font-medium leading-[24px] not-italic relative shrink-0 text-[#464646] text-[16px] text-center w-[248px]" data-node-id="15:683">
            Keep track who’s going to cook 🔥 this month.
          </p>

          {/* Schedule Cards */}
          <div className="h-[104px] relative shrink-0 w-[477px]" data-node-id="15:581">
            {scheduleData.map((item, index) => (
              <div
                key={index}
                className={`absolute flex flex-col gap-[10px] items-center justify-center p-[20px] rounded-[100px] top-0 transition-all ${
                  item.isActive ? 'bg-[#282828] z-10' : 'bg-[#e9e9e9] opacity-60'
                }`}
                style={{ left: `${index * 122}px` }}
                data-node-id={item.isActive ? "15:595" : `15:${582 + index * 10}`}
              >
                <p className={`font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap uppercase ${
                  item.isActive ? 'text-white' : 'text-[#757575]'
                }`} data-node-id={item.isActive ? "15:596" : `15:${583 + index * 10}`}>
                  {item.date}
                </p>
                <div className={`flex flex-col items-center justify-center px-[10px] py-[6px] relative rounded-[100px] shrink-0 ${
                  item.isActive ? 'bg-white' : 'bg-[#afafaf]'
                }`} data-node-id={item.isActive ? "15:597" : `15:${592 + index * 10}`}>
                  <p className={`font-medium leading-[17.5px] not-italic relative shrink-0 text-[12px] text-nowrap uppercase ${
                    item.isActive ? 'text-[#282828]' : 'text-white'
                  }`} data-node-id={item.isActive ? "15:598" : `15:${593 + index * 10}`}>
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Full Schedule Button */}
          <button 
            onClick={() => setIsFullScheduleOpen(true)}
            className="bg-[#282828] flex flex-col items-start justify-center overflow-clip px-[20px] py-[12px] relative rounded-[100px] shadow-[0px_2px_5px_0px_rgba(103,110,118,0.08),0px_0px_0px_1px_rgba(103,110,118,0.16),0px_1px_1px_0px_rgba(0,0,0,0.12)] shrink-0 transition hover:bg-[#1a1a1a] active:scale-95" data-name="Button" data-node-id="15:646"
          >
            <div className="flex gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="State-layer" data-node-id="15:647">
              <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white" data-node-id="15:650">
                <p className="leading-[20px]">Full Schedule</p>
              </div>
              <div className="relative shrink-0 size-[18px]" data-name="heroicons-outline/arrow-right" data-node-id="15:674">
                <img alt="" className="block max-w-none size-full" src={imgHeroiconsOutlineArrowRight} />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute flex gap-[12px] items-center left-1/2 bottom-[19px] -translate-x-1/2 z-50" data-node-id="15:691">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-[#e9e9e9] flex flex-col items-center justify-center px-[40px] py-[12px] relative rounded-[100px] shrink-0 transition hover:bg-[#dcdcdc]"
          data-node-id="15:429"
        >
          <p className="font-normal leading-[24px] not-italic relative shrink-0 text-[#757575] text-[16px] text-nowrap uppercase" data-node-id="15:430">
            Menu
          </p>
        </button>

        <div className="relative">
          <button
            onClick={() => setMonthDropdown(!monthDropdown)}
            className="bg-[#e9e9e9] flex gap-[10px] items-center justify-center pl-[20px] pr-[14px] py-[12px] relative rounded-[100px] shrink-0 transition hover:bg-[#dcdcdc]"
            data-node-id="15:685"
          >
            <p className="font-normal leading-[24px] not-italic relative shrink-0 text-[#757575] text-[16px] text-nowrap uppercase" data-node-id="15:686">
              {selectedMonth}
            </p>
            <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_down" data-node-id="15:687">
              <img alt="" className="block max-w-none size-full" src={imgKeyboardArrowDown} />
            </div>
          </button>

          {/* Dropdown Menu */}
          {monthDropdown && (
            <div className="absolute bottom-full mb-2 right-0 bg-[#e9e9e9] rounded-2xl shadow-lg z-50 overflow-hidden min-w-[100px]">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    setMonthDropdown(false);
                  }}
                  className={`w-full px-6 py-3 text-left text-[14px] font-normal uppercase transition ${
                    selectedMonth === month
                      ? 'bg-[#282828] text-white font-semibold'
                      : 'text-[#757575] hover:bg-[#d0d0d0]'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overlay - Shows when menu or full schedule is open */}
      {(isMenuOpen || isFullScheduleOpen) && (
        <div
          onClick={() => {
            setIsMenuOpen(false);
            setIsFullScheduleOpen(false);
          }}
          className="absolute inset-0 bg-black bg-opacity-30 z-40 fade-in-overlay"
        />
      )}

      {/* Full Schedule Popup */}
      {isFullScheduleOpen && (
        <div className="absolute bg-[#e9e9e9] flex flex-col gap-[20px] items-start left-1/2 p-[20px] rounded-[40px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl max-h-[90vh] overflow-y-auto" data-node-id="15:734">
          {/* Days of Week Header */}
          <div className="flex font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#757575] text-[16px] text-center uppercase w-full" data-node-id="15:890">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <p key={day} className="relative shrink-0 w-[104px]" data-node-id={`15:${881 + i}`}>
                {day}
              </p>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="flex flex-col gap-[12px] w-full">
            {[0, 1, 2, 3, 4].map((row) => (
              <div key={row} className="flex gap-[12px] items-center relative shrink-0 w-full">
                {fullScheduleData.slice(row * 7, (row + 1) * 7).map((item, col) => (
                  <div 
                    key={`${row}-${col}`}
                    className={`flex flex-col gap-[10px] items-center justify-center p-[20px] relative rounded-[100px] shrink-0 w-[104px] ${
                      item.isActive ? 'bg-[#282828]' : 'bg-[#dfdfdf]'
                    } ${(item.isPrevMonth || item.isNextMonth) ? 'opacity-50' : ''}`}
                  >
                    <p className={`font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap uppercase ${
                      item.isActive ? 'text-white' : 'text-[#464646]'
                    }`}>
                      {item.date}
                    </p>
                    <div className={`flex flex-col items-center justify-center px-[10px] py-[6px] relative rounded-[100px] shrink-0 ${
                      item.isActive ? 'bg-white' : 'bg-[#afafaf]'
                    }`}>
                      <p className={`font-medium leading-[17.5px] not-italic relative shrink-0 text-[12px] text-nowrap uppercase ${
                        item.isActive ? 'text-[#282828]' : 'text-white'
                      }`}>
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Popup (Not Blurred) */}
      {isMenuOpen && (
        <div className="absolute bottom-[calc(19px+44px+12px)] inset-x-0 mx-auto bg-[#e9e9e9] rounded-[40px] p-[20px] w-[296px] z-50 shadow-lg slide-in-blurred-bottom">
          {/* Menu Items Grid */}
          <div className="flex flex-wrap gap-3 items-start justify-center mb-5 w-[256px]">
            {/* Overview */}
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                onNavigateTo('dashboard');
              }}
              className="bg-[#dfdfdf] rounded-full w-[122px] h-[122px] flex items-center justify-center font-['Inter',sans-serif] text-[16px] font-normal text-[#464646] uppercase hover:bg-[#d0d0d0] transition"
            >
              Overview
            </button>

            {/* Schedule (Active) */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#afafaf] rounded-full w-[122px] h-[122px] flex items-center justify-center font-['Inter',sans-serif] text-[16px] font-normal text-[#f9f9f9] uppercase hover:bg-[#9a9a9a] transition"
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
