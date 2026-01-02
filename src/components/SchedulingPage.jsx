import React, { useState } from 'react';

const imgFrame1 = "/assets/logo.svg";
const imgHeroiconsOutlineArrowRight = "/assets/arrow-right.svg";
const imgKeyboardArrowDown = "/assets/chevron-down.svg";

const SwapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 8L15 4M19 8L15 12M19 8H5M5 16L9 20M5 16L9 12M5 16H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PostponeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QCIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SchedulingPage({ onNavigateTo, onLogout }) {
  const [monthDropdown, setMonthDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullScheduleOpen, setIsFullScheduleOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [openedFrom, setOpenedFrom] = useState(null); // 'initial' or 'full'

  const handleDateClick = (item, source, dayOfWeekOverride = null) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = dayOfWeekOverride || days[fullScheduleData.indexOf(item) % 7];
    setSelectedDetail({ ...item, dayOfWeek });
    setOpenedFrom(source);
    setIsDetailOpen(true);
  };

  // Get current day in Indonesia Time (WIB)
  const getTodayDay = () => {
    const options = { timeZone: 'Asia/Jakarta', day: 'numeric' };
    return parseInt(new Date().toLocaleDateString('en-US', options));
  };

  const today = getTodayDay();
  const currentMonthName = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Jakarta', month: 'short' });

  const isPastDate = (item) => {
    if (!item) return false;
    
    // If it's a previous month in the calendar grid
    if (item.isPrevMonth) return true;
    if (item.isNextMonth) return false;

    const selectedMonthIndex = months.indexOf(selectedMonth);
    const currentMonthIndex = months.indexOf(currentMonthName);

    // If selected month is before current month
    if (selectedMonthIndex < currentMonthIndex) return true;
    // If selected month is after current month
    if (selectedMonthIndex > currentMonthIndex) return false;
    
    // If same month, check day
    let dayStr = item.date;
    if (dayStr.includes(' ')) {
      dayStr = dayStr.split(' ')[0];
    }
    const day = parseInt(dayStr);
    return day < today;
  };

  const isToday = (item) => {
    if (!item || item.isPrevMonth || item.isNextMonth) return false;
    if (selectedMonth !== currentMonthName) return false;
    
    let dayStr = item.date;
    if (dayStr.includes(' ')) {
      dayStr = dayStr.split(' ')[0];
    }
    const day = parseInt(dayStr);
    return day === today;
  };

  const canPostpone = (item) => {
    if (!item || item.name !== 'User') return false;
    if (item.isPrevMonth) return false;
    
    let dayStr = item.date;
    if (dayStr.includes(' ')) {
      dayStr = dayStr.split(' ')[0];
    }
    const day = parseInt(dayStr);
    
    // Can only postpone if the event is at least 7 days away
    return (day - today) >= 7;
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Assignments data (mock)
  const assignments = {
    'Jan': {
      1: 'Arthur', 2: 'Vincent', 3: 'Fachrul', 4: 'Xenyx',
      5: 'Arthur', 6: 'Xenyx', 7: 'Vincent', 8: 'Fandit', 9: 'Yoga', 10: 'Dicky', 11: 'Fachrul',
      12: 'Arthur', 13: 'Xenyx', 14: 'Vincent', 15: 'Fandit', 16: 'Yoga', 17: 'Dicky', 18: 'Fachrul',
      19: 'Arthur', 20: 'Xenyx', 21: 'Vincent', 22: 'Fandit', 23: 'Yoga', 24: 'Dicky', 25: 'Fachrul',
      26: 'Arthur', 27: 'Xenyx', 28: 'Vincent', 29: 'Fandit', 30: 'User', 31: 'Dicky'
    }
  };

  const generateCalendarData = (monthName) => {
    const monthIndex = months.indexOf(monthName);
    const year = 2026;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDay = new Date(year, monthIndex, 1).getDay(); // 0 = Sunday
    
    const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();
    
    const data = [];
    
    // Prev month padding
    for (let i = 0; i < firstDay; i++) {
      const date = daysInPrevMonth - firstDay + 1 + i;
      data.push({ date: date.toString(), name: 'TBA', isPrevMonth: true });
    }
    
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      const name = assignments[monthName]?.[i] || 'TBA';
      data.push({ date: i.toString().padStart(2, '0'), name, isCurrentMonth: true });
    }
    
    // Next month padding
    const totalCells = data.length > 35 ? 42 : 35;
    const remainingCells = totalCells - data.length;
    
    for (let i = 1; i <= remainingCells; i++) {
      data.push({ date: i.toString().padStart(2, '0'), name: 'TBA', isNextMonth: true });
    }
    
    return data;
  };

  const fullScheduleData = generateCalendarData(selectedMonth);

  // Get User's schedule for the selected month
  const getUserScheduleText = () => {
    const userDates = fullScheduleData
      .filter(item => item.name === 'User' && item.isCurrentMonth)
      .map(item => parseInt(item.date));
    
    if (userDates.length === 0) return `My Schedule: No assignments in ${selectedMonth}`;
    
    const dateString = userDates.join(' & ');
    return `My Schedule: ${dateString} ${selectedMonth}`;
  };
  
  // Generate initial view cards (first 4 days of selected month)
  const scheduleData = fullScheduleData.filter(item => !item.isPrevMonth).slice(0, 4).map(item => ({
    ...item,
    date: `${item.date} ${selectedMonth.toLowerCase()}`
  }));

  return (
    <div className="bg-[#f9f9f9] relative w-full h-screen overflow-hidden font-['Inter',sans-serif]" data-name="Dashboard Page - Schedule" data-node-id="15:426">
      {/* Blurred Content Container */}
      <div className={`absolute inset-0 transition-all duration-300 ${(isMenuOpen || isFullScheduleOpen || isDetailOpen) ? 'blur-sm pointer-events-none' : 'pointer-events-auto'}`}>
        {/* Logo */}
        <div className="absolute h-[40px] left-1/2 top-[19px] -translate-x-1/2 w-[59px]" data-node-id="15:427">
          <img alt="Odama Logo" className="block max-w-none size-full" src={imgFrame1} />
        </div>

        {/* Main Content */}
        <div className="absolute flex flex-col gap-[40px] items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[477px]" data-node-id="15:613">
          {/* Schedule Label */}
          <div className="bg-[#e9e9e9] flex flex-col items-center justify-center px-[20px] py-[10px] relative rounded-[100px] shrink-0" data-node-id="15:679">
            <div className="flex flex-col font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#282828] text-[14px] text-center text-nowrap" data-node-id="15:680">
              <p className="leading-[20px]">{getUserScheduleText()}</p>
            </div>
          </div>

          {/* Description */}
          <p className="font-medium leading-[24px] not-italic relative shrink-0 text-[#464646] text-[16px] text-center w-[248px]" data-node-id="15:683">
            Keep track who’s going to cook 🔥 this month.
          </p>

          {/* Schedule Cards */}
          <div className="flex gap-[12px] items-center justify-center w-full" data-node-id="15:581">
            {scheduleData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleDateClick(item, 'initial', ['Thursday', 'Friday', 'Saturday', 'Sunday'][index])}
                className={`flex flex-col gap-[10px] items-center justify-center p-[20px] rounded-[100px] transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                  isToday(item) ? 'bg-[#282828] z-10' : 'bg-[#e9e9e9] opacity-60'
                } ${isPastDate(item) ? 'opacity-30 grayscale-[0.5]' : ''}`}
                data-node-id={isToday(item) ? "15:595" : `15:${582 + index * 10}`}
              >
                <p className={`font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap uppercase ${
                  isToday(item) ? 'text-white' : 'text-[#757575]'
                }`} data-node-id={isToday(item) ? "15:596" : `15:${583 + index * 10}`}>
                  {item.date}
                </p>
                <div className={`flex flex-col items-center justify-center px-[10px] py-[6px] relative rounded-[100px] shrink-0 ${
                  isToday(item) ? 'bg-white' : 'bg-[#afafaf]'
                }`} data-node-id={isToday(item) ? "15:597" : `15:${592 + index * 10}`}>
                  <p className={`font-medium leading-[17.5px] not-italic relative shrink-0 text-[12px] text-nowrap uppercase ${
                    isToday(item) ? 'text-[#282828]' : 'text-white'
                  }`} data-node-id={isToday(item) ? "15:598" : `15:${593 + index * 10}`}>
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
      <div className="absolute flex gap-[12px] items-center left-1/2 bottom-[19px] -translate-x-1/2 z-[100]" data-node-id="15:691">
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setMonthDropdown(false);
          }}
          className="bg-[#e9e9e9] flex flex-col items-center justify-center px-[40px] py-[12px] relative rounded-[100px] shrink-0 transition hover:bg-[#dcdcdc]"
          data-node-id="15:429"
        >
          <p className="font-normal leading-[24px] not-italic relative shrink-0 text-[#757575] text-[16px] text-nowrap uppercase" data-node-id="15:430">
            Menu
          </p>
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setMonthDropdown(!monthDropdown);
              setIsMenuOpen(false);
            }}
            className="bg-[#e9e9e9] flex gap-[10px] items-center justify-center pl-[20px] pr-[14px] py-[12px] relative rounded-[100px] shrink-0 transition hover:bg-[#dcdcdc]"
            data-node-id="15:685"
          >
            <p className="font-normal leading-[24px] not-italic relative shrink-0 text-[#757575] text-[16px] text-nowrap uppercase" data-node-id="15:686">
              {selectedMonth}
            </p>
            <div className={`relative shrink-0 size-[24px] transition-transform duration-300 ${monthDropdown ? 'rotate-180' : 'rotate-0'}`} data-name="keyboard_arrow_down" data-node-id="15:687">
              <img alt="" className="block max-w-none size-full" src={imgKeyboardArrowDown} />
            </div>
          </button>

          {/* Dropdown Menu */}
          {monthDropdown && (
            <div className="absolute bottom-full mb-4 right-0 bg-[#e9e9e9] rounded-[32px] p-[12px] shadow-2xl z-[110] flex flex-col gap-[12px] min-w-[110px] slide-in-blurred-bottom max-h-[400px] overflow-y-auto scrollbar-hide">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    setMonthDropdown(false);
                  }}
                  className={`px-[20px] py-[10px] rounded-full text-[14px] font-medium uppercase transition-all ${
                    selectedMonth === month
                      ? 'bg-[#afafaf] text-[#f9f9f9] shadow-md'
                      : 'text-[#757575] hover:bg-[#dfdfdf]'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overlay - Shows when menu, full schedule, detail, or month dropdown is open */}
      {(isMenuOpen || isFullScheduleOpen || isDetailOpen || monthDropdown) && (
        <div
          onClick={() => {
            if (isDetailOpen) {
              setIsDetailOpen(false);
              return;
            }
            setIsMenuOpen(false);
            setIsFullScheduleOpen(false);
            setMonthDropdown(false);
          }}
          className="absolute inset-0 bg-black bg-opacity-30 z-40 fade-in-overlay"
        />
      )}

      {/* Full Schedule Popup / Morphing Container */}
      {isFullScheduleOpen && (
        <div 
          className={`absolute bg-[#e9e9e9] flex flex-col left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden
            ${(isDetailOpen && openedFrom === 'full') 
              ? 'w-[337px] h-[521px] rounded-[40px] p-[20px] items-center' 
              : 'w-[840px] h-[660px] rounded-[40px] p-[20px] items-start'
            }`} 
          data-node-id="15:734"
        >
          {/* Full Schedule Content */}
          <div className={`flex flex-col gap-[20px] w-full transition-opacity duration-500 ${isDetailOpen && openedFrom === 'full' ? 'opacity-0 blur-md pointer-events-none absolute inset-0 m-[20px]' : 'opacity-100 blur-0'}`}>
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
              {Array.from({ length: fullScheduleData.length / 7 }).map((_, row) => (
                <div key={row} className="flex gap-[12px] items-center relative shrink-0 w-full">
                  {fullScheduleData.slice(row * 7, (row + 1) * 7).map((item, col) => {
                    return (
                      <div 
                        key={`${row}-${col}`}
                        onClick={() => handleDateClick(item, 'full')}
                        className={`flex flex-col gap-[10px] items-center justify-center p-[20px] relative rounded-[100px] shrink-0 w-[104px] cursor-pointer transition hover:scale-105 active:scale-95 ${
                          isToday(item) ? 'bg-[#282828]' : 'bg-[#dfdfdf]'
                        } ${(item.isPrevMonth || item.isNextMonth || isPastDate(item)) ? 'opacity-50 grayscale-[0.3]' : ''}`}
                      >
                        <p className={`font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap uppercase ${
                          isToday(item) ? 'text-white' : 'text-[#464646]'
                        }`}>
                          {item.date}
                        </p>
                        <div className={`flex flex-col items-center justify-center px-[10px] py-[6px] relative rounded-[100px] shrink-0 ${
                          isToday(item) ? 'bg-white' : (item.name === 'User' ? 'bg-[#282828]' : 'bg-[#afafaf]')
                        }`}>
                          <p className={`font-medium leading-[17.5px] not-italic relative shrink-0 text-[12px] text-nowrap uppercase ${
                            isToday(item) ? 'text-[#282828]' : 'text-white'
                          }`}>
                            {item.name === 'User' && '• '}{item.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Detail Content (Morphed) */}
          {selectedDetail && (
            <div className={`flex flex-col gap-[20px] items-center w-full transition-opacity duration-500 ${isDetailOpen && openedFrom === 'full' ? 'opacity-100 blur-0' : 'opacity-0 blur-md pointer-events-none absolute inset-0 m-[20px]'}`}>
              <div className="bg-[#f9f9f9] flex flex-col items-center justify-center px-[20px] py-[10px] relative rounded-[100px] shrink-0 w-full">
                <div className="flex flex-col font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#282828] text-[14px] text-center text-nowrap">
                  <p className="leading-[20px]">{selectedDetail.dayOfWeek}, {selectedDetail.date.split(' ')[0]} {selectedDetail.isPrevMonth ? 'December' : selectedDetail.isNextMonth ? 'February' : 'January'} 2026</p>
                </div>
              </div>
              
              <div className="bg-white overflow-clip relative rounded-full shrink-0 size-[257px] flex items-center justify-center shadow-inner">
                 <div className="text-[#282828] text-[80px] font-bold">{selectedDetail.name[0]}</div>
              </div>

              <div className="flex flex-col gap-[14px] items-center relative shrink-0">
                <p className="font-medium leading-[24px] not-italic relative shrink-0 text-[#464646] text-[20px] text-center text-nowrap">
                  {selectedDetail.name}
                </p>
                <div className="bg-[#afafaf] flex flex-col items-center justify-center px-[14px] py-[10px] relative rounded-[100px] shrink-0">
                  <p className="font-medium leading-[17.5px] not-italic relative shrink-0 text-[14px] text-nowrap text-white uppercase">
                    SaaS Landing Page
                  </p>
                </div>
              </div>

              <div className="flex gap-[10px] w-full">
                <button 
                  onClick={() => setIsDetailOpen(false)}
                  disabled={selectedDetail.name === 'User' ? !canPostpone(selectedDetail) : isPastDate(selectedDetail)}
                  className={`bg-[#282828] flex flex-col items-start justify-center overflow-clip px-[12px] py-[12px] relative rounded-[100px] shadow-lg shrink-0 transition hover:bg-[#1a1a1a] active:scale-95 flex-1 ${(selectedDetail.name === 'User' ? !canPostpone(selectedDetail) : isPastDate(selectedDetail)) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                >
                  <div className="flex gap-[6px] items-center justify-center relative shrink-0 w-full">
                    <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
                      <p className="leading-[16px]">
                        {selectedDetail.name === 'User' 
                          ? (canPostpone(selectedDetail) ? 'Postpone' : 'Postpone') 
                          : (isPastDate(selectedDetail) ? 'Unavailable' : 'Swap')}
                      </p>
                    </div>
                    {selectedDetail.name === 'User' 
                      ? (canPostpone(selectedDetail) && <div className="scale-75"><PostponeIcon /></div>)
                      : (!isPastDate(selectedDetail) && <div className="scale-75"><SwapIcon /></div>)}
                  </div>
                </button>

                {selectedDetail.name === 'User' && (
                  <button 
                    onClick={() => setIsDetailOpen(false)}
                    className="bg-white border-2 border-[#282828] flex flex-col items-start justify-center overflow-clip px-[12px] py-[12px] relative rounded-[100px] shadow-sm shrink-0 transition hover:bg-[#f0f0f0] active:scale-95 flex-1"
                  >
                    <div className="flex gap-[6px] items-center justify-center relative shrink-0 w-full">
                      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-[#282828]">
                        <p className="leading-[16px]">Request QC</p>
                      </div>
                      <div className="scale-75"><QCIcon /></div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Menu Popup (Not Blurred) */}
      {isMenuOpen && (
        <div className="absolute bottom-[calc(19px+44px+12px)] inset-x-0 mx-auto bg-[#e9e9e9] rounded-[40px] p-[20px] w-[296px] z-[100] shadow-lg slide-in-blurred-bottom">
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

      {/* Detail Popup (Only for Initial View) */}
      {isDetailOpen && selectedDetail && openedFrom === 'initial' && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none">
          <div className="bg-[#e9e9e9] flex flex-col gap-[20px] items-center p-[20px] rounded-[40px] shadow-2xl w-[337px] h-[521px] slide-in-blurred-bottom pointer-events-auto">
            <div className="bg-[#f9f9f9] flex flex-col items-center justify-center px-[20px] py-[10px] relative rounded-[100px] shrink-0 w-full">
              <div className="flex flex-col font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#282828] text-[14px] text-center text-nowrap">
                <p className="leading-[20px]">{selectedDetail.dayOfWeek}, {selectedDetail.date.split(' ')[0]} {selectedDetail.isPrevMonth ? 'December' : selectedDetail.isNextMonth ? 'February' : 'January'} 2026</p>
              </div>
            </div>
            
            <div className="bg-white overflow-clip relative rounded-full shrink-0 size-[257px] flex items-center justify-center shadow-inner">
               <div className="text-[#282828] text-[80px] font-bold">{selectedDetail.name[0]}</div>
            </div>

            <div className="flex flex-col gap-[14px] items-center relative shrink-0">
              <p className="font-medium leading-[24px] not-italic relative shrink-0 text-[#464646] text-[20px] text-center text-nowrap">
                {selectedDetail.name}
              </p>
              <div className="bg-[#afafaf] flex flex-col items-center justify-center px-[14px] py-[10px] relative rounded-[100px] shrink-0">
                <p className="font-medium leading-[17.5px] not-italic relative shrink-0 text-[14px] text-nowrap text-white uppercase">
                  SaaS Landing Page
                </p>
              </div>
            </div>

            <div className="flex gap-[10px] w-full">
              <button 
                onClick={() => setIsDetailOpen(false)}
                disabled={selectedDetail.name === 'User' ? !canPostpone(selectedDetail) : isPastDate(selectedDetail)}
                className={`bg-[#282828] flex flex-col items-start justify-center overflow-clip px-[12px] py-[12px] relative rounded-[100px] shadow-lg shrink-0 transition hover:bg-[#1a1a1a] active:scale-95 flex-1 ${(selectedDetail.name === 'User' ? !canPostpone(selectedDetail) : isPastDate(selectedDetail)) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
              >
                <div className="flex gap-[6px] items-center justify-center relative shrink-0 w-full">
                  <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
                    <p className="leading-[16px]">
                      {selectedDetail.name === 'User' 
                        ? (canPostpone(selectedDetail) ? 'Postpone' : 'Postpone') 
                        : (isPastDate(selectedDetail) ? 'Unavailable' : 'Swap')}
                    </p>
                  </div>
                  {selectedDetail.name === 'User' 
                    ? (canPostpone(selectedDetail) && <div className="scale-75"><PostponeIcon /></div>)
                    : (!isPastDate(selectedDetail) && <div className="scale-75"><SwapIcon /></div>)}
                </div>
              </button>

              {selectedDetail.name === 'User' && (
                <button 
                  onClick={() => setIsDetailOpen(false)}
                  className="bg-white border-2 border-[#282828] flex flex-col items-start justify-center overflow-clip px-[12px] py-[12px] relative rounded-[100px] shadow-sm shrink-0 transition hover:bg-[#f0f0f0] active:scale-95 flex-1"
                >
                  <div className="flex gap-[6px] items-center justify-center relative shrink-0 w-full">
                    <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-[#282828]">
                      <p className="leading-[16px]">Request QC</p>
                    </div>
                    <div className="scale-75"><QCIcon /></div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
