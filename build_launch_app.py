import os

HTML_CONTENT = r'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillSwap — University Skill & Knowledge Exchange Platform</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <!-- Canvas Confetti -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <!-- React & Babel -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              primary: '#4338CA',      // Royal Indigo
              primaryHover: '#3730A3',
              dark: '#0F172A',         // Slate 900
              surface: '#FFFFFF',
              bg: '#F8FAFC',
              border: '#E2E8F0',
              // 3D Avatar Card Colors (Ref Image)
              cardBlue: '#3B82F6',
              cardRed: '#EF4444',
              cardYellow: '#F59E0B',
              // Refined Bento Pastels
              honey: '#FEF3C7',
              honeyText: '#92400E',
              sage: '#D1FAE5',
              sageText: '#065F46',
              lavender: '#EDE9FE',
              lavenderText: '#5B21B6',
              sky: '#E0F2FE',
              skyText: '#075985',
              rose: '#FFE4E6',
              roseText: '#9F1239',
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          boxShadow: {
            'card': '0 2px 4px rgba(0,0,0,0.02), 0 12px 28px -4px rgba(0,0,0,0.05)',
            'card-hover': '0 20px 35px -10px rgba(0,0,0,0.08)',
            'float-primary': '0 20px 40px -15px rgba(67, 56, 202, 0.3)',
            'avatar-3d': '0 15px 30px -8px rgba(0,0,0,0.25)',
          },
          animation: {
            'fade-in': 'fadeIn 0.2s ease-out forwards',
            'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            slideUp: {
              '0%': { transform: 'translateY(16px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            scaleIn: {
              '0%': { transform: 'scale(0.96)', opacity: '0' },
              '100%': { transform: 'scale(1)', opacity: '1' },
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #080B12;
      color: #0F172A;
      overflow-x: hidden;
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .bento-box {
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .bento-box:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px -10px rgba(0,0,0,0.08);
    }

    .btn-pill-dark {
      background-color: #0F172A;
      color: #FFFFFF;
      transition: all 0.15s ease;
    }
    .btn-pill-dark:hover {
      background-color: #1E293B;
      transform: translateY(-1px);
    }
    .btn-pill-dark:active {
      transform: translateY(1px);
    }

    .btn-pill-white {
      background-color: #FFFFFF;
      color: #0F172A;
      border: 1px solid #E2E8F0;
      transition: all 0.15s ease;
    }
    .btn-pill-white:hover {
      background-color: #F8FAFC;
      border-color: #CBD5E1;
      transform: translateY(-1px);
    }
    .btn-pill-white:active {
      transform: translateY(1px);
    }
  </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-start p-2 sm:p-4 antialiased">
  <div id="root" class="w-full max-w-7xl"></div>

  <script type="text/babel">
    const { useState, useEffect, useRef } = React;

    // --- Sound Effects Synthesizer (Professional Haptic Audio) ---
    const SoundFx = {
      ctx: null,
      muted: false,
      init() {
        if (!this.ctx && typeof window !== 'undefined') {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) this.ctx = new AudioContext();
        }
      },
      playClick(freq = 440) {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.2, this.ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.05);
        } catch(e) {}
      },
      playSuccess() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
          const notes = [587.33, 739.99, 880.00]; // D5, F#5, A5 (Harmonic Major)
          notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
            gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.06);
            osc.stop(this.ctx.currentTime + idx * 0.06 + 0.2);
          });
        } catch(e) {}
      }
    };

    // --- 22 Figma Chapters Directory ---
    const FIGMA_CHAPTERS = [
      { id: '01', title: '01. Design System', icon: '🎨', badge: 'Tokens & UI Library' },
      { id: '02', title: '02. Splash & Onboarding', icon: '✨', badge: '3D Hero Onboarding' },
      { id: '03', title: '03. Authentication', icon: '🔐', badge: 'Login & Verification' },
      { id: '04', title: '04. Profile Setup', icon: '📝', badge: '10-Step Wizard' },
      { id: '05', title: '05. Home', icon: '🏠', badge: 'Daily Feed & Agenda' },
      { id: '06', title: '06. Explore', icon: '🔍', badge: 'Search & Directory' },
      { id: '07', title: '07. User Profile', icon: '👤', badge: 'Verified Credentials' },
      { id: '08', title: '08. Skill Matching', icon: '⚡', badge: 'Smart Pairing Deck' },
      { id: '09', title: '09. Create Skill', icon: '➕', badge: 'Publish Syllabus' },
      { id: '10', title: '10. Messaging', icon: '💬', badge: 'Chat & Inline Booking' },
      { id: '11', title: '11. Sessions', icon: '⏱️', badge: 'Scheduler & Timer Room' },
      { id: '12', title: '12. Calendar', icon: '📅', badge: 'Weekly Timetable' },
      { id: '13', title: '13. Learning', icon: '📚', badge: 'Milestone Tracker' },
      { id: '14', title: '14. Teaching', icon: '👨‍🏫', badge: 'Student Requests' },
      { id: '15', title: '15. Reviews', icon: '⭐', badge: 'Verified Feedback' },
      { id: '16', title: '16. Notifications', icon: '🔔', badge: 'Activity Ledger' },
      { id: '17', title: '17. Profile', icon: '⚙️', badge: 'Edit Credentials' },
      { id: '18', title: '18. Settings', icon: '🛡️', badge: 'Security & Privacy' },
      { id: '19', title: '19. Safety', icon: '🚨', badge: 'Moderation & Reporting' },
      { id: '20', title: '20. Empty & Error States', icon: '⚠️', badge: 'Edge Case Gallery' },
      { id: '21', title: '21. Final Prototype Flows', icon: '🔄', badge: '5 Complete Flows' },
      { id: '22', title: '22. Figma Pages Tree', icon: '📁', badge: 'Sitemap Matrix' },
    ];

    const UNIVERSITIES = [
      { id: 'stanford', name: 'Stanford University', short: 'Stanford', domain: 'stanford.edu' },
      { id: 'berkeley', name: 'UC Berkeley', short: 'Berkeley', domain: 'berkeley.edu' },
      { id: 'mit', name: 'MIT', short: 'MIT', domain: 'mit.edu' },
      { id: 'oxford', name: 'University of Oxford', short: 'Oxford', domain: 'ox.ac.uk' },
      { id: 'nyu', name: 'New York University', short: 'NYU', domain: 'nyu.edu' },
    ];

    const MOCK_PEERS = [
      {
        id: 'p-1',
        name: 'Sarah Chen',
        title: 'Computer Science, B.S.',
        year: 'Class of 2026',
        university: 'Stanford University',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        rating: 4.96,
        reviewsCount: 34,
        completedSwaps: 28,
        matchScore: 98,
        badgeColor: 'bg-brand-sage text-brand-sageText',
        teachSkills: [
          { name: 'Python & Data Structures', code: 'CS 106B', level: 'Advanced' },
          { name: 'React & TypeScript Architecture', code: 'Web Systems', level: 'Expert' },
          { name: 'Technical Interview Prep', code: 'Algorithms', level: 'Advanced' }
        ],
        learnSkills: [
          { name: 'Conversational Japanese', target: 'JLPT N3 Fluency' },
          { name: 'Figma UI/UX Design Systems', target: 'Design Portfolios' }
        ],
        preferredLocation: 'Green Library 3rd Floor / Virtual Room',
        bio: 'Teaching assistant for introductory algorithms. Offering structured CS tutoring in exchange for Japanese speaking practice or Figma design systems.',
      },
      {
        id: 'p-2',
        name: 'Marcus Vance',
        title: 'Product Design & HCI',
        year: 'Class of 2025',
        university: 'Stanford University',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
        rating: 5.0,
        reviewsCount: 48,
        completedSwaps: 42,
        matchScore: 94,
        badgeColor: 'bg-brand-lavender text-brand-lavenderText',
        teachSkills: [
          { name: 'Figma Design Tokens & Systems', code: 'HCI 194', level: 'Expert' },
          { name: 'User Research & Prototyping', code: 'Design Studio', level: 'Advanced' },
          { name: 'Executive Pitch Deck Design', code: 'Venture Lab', level: 'Expert' }
        ],
        learnSkills: [
          { name: 'Machine Learning Foundations', target: 'PyTorch Basics' },
          { name: 'Calculus III (Multivariable)', target: 'Math 51 Review' }
        ],
        preferredLocation: 'd.school Studio 2 / Zoom',
        bio: 'Former design intern at linear.app. Looking to trade production-grade design system mentoring for ML mathematics tutoring.',
      },
      {
        id: 'p-3',
        name: 'Elena Rostova',
        title: 'Linguistics & International Relations',
        year: 'Class of 2027',
        university: 'Stanford University',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        rating: 4.88,
        reviewsCount: 22,
        completedSwaps: 19,
        matchScore: 96,
        badgeColor: 'bg-brand-sky text-brand-skyText',
        teachSkills: [
          { name: 'Native Japanese & Kanji (N1)', code: 'East Asian Studies', level: 'Native' },
          { name: 'Academic Essay Editing', code: 'Writing Center', level: 'Expert' },
          { name: 'Classical Piano & Theory', code: 'Music Dept', level: 'Advanced' }
        ],
        learnSkills: [
          { name: 'Introductory Python Programming', target: 'Data Analytics' },
          { name: 'Video Editing & Motion Graphics', target: 'Content Creation' }
        ],
        preferredLocation: 'Coupa Cafe / Y2E2 Study Commons',
        bio: 'Peer writing tutor and native speaker. Excited to exchange Japanese grammar/conversation for Python coding fundamentals.',
      }
    ];

    const WEEK_DAYS = [
      { day: 'Mon', date: '11' },
      { day: 'Tue', date: '12' },
      { day: 'Wed', date: '13' },
      { day: 'Thu', date: '14' },
      { day: 'Fri', date: '15' },
      { day: 'Sat', date: '16' },
    ];

    // --- 3D Avatar Card Stack (Exact Reference Image 1 Style) ---
    const AvatarCardStack = () => (
      <div className="relative w-full h-48 flex items-center justify-center pt-2 select-none">
        
        {/* Left Card: 3D Boy in Cyan/Teal Card (Rotated -9deg) */}
        <div className="absolute left-10 w-24 h-32 rounded-2xl bg-[#4A7C59] p-1.5 shadow-avatar-3d -rotate-9 -translate-y-1 transition-transform hover:-translate-y-3 hover:scale-105 overflow-hidden flex flex-col justify-end border-2 border-white/20">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80" 
            className="w-full h-28 object-cover rounded-xl"
            alt="3D Student 1"
          />
        </div>

        {/* Center Card: 3D Guy in Crimson Card (Elevated, 0deg) */}
        <div className="relative z-10 w-26 h-36 rounded-2xl bg-[#D9383A] p-1.5 shadow-2xl -translate-y-2 transition-transform hover:-translate-y-4 hover:scale-105 overflow-hidden flex flex-col justify-end border-2 border-white/30">
          <img 
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80" 
            className="w-full h-32 object-cover rounded-xl"
            alt="3D Student 2"
          />
        </div>

        {/* Right Card: 3D Girl in Yellow Card (Rotated +9deg) */}
        <div className="absolute right-10 w-24 h-32 rounded-2xl bg-[#E5A83B] p-1.5 shadow-avatar-3d rotate-9 -translate-y-1 transition-transform hover:-translate-y-3 hover:scale-105 overflow-hidden flex flex-col justify-end border-2 border-white/20">
          <img 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80" 
            className="w-full h-28 object-cover rounded-xl"
            alt="3D Student 3"
          />
        </div>

      </div>
    );

    // --- MAIN APP ROOT ---
    function App() {
      const [activeChapter, setActiveChapter] = useState('02'); // Default: 02. Splash & Onboarding (Ref Match)
      const [subScreen, setSubScreen] = useState('default');
      const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'desktop'
      const [selectedUni, setSelectedUni] = useState(UNIVERSITIES[0]);
      const [selectedDate, setSelectedDate] = useState('13');
      const [isMuted, setIsMuted] = useState(false);

      // App Global State
      const [peerIndex, setPeerIndex] = useState(0);
      const [setupStep, setSetupStep] = useState(1);
      const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
      const [toast, setToast] = useState(null);

      // Live Countdown Timer in Session Room
      const [timerSeconds, setTimerSeconds] = useState(2086); // 34 min 46 sec
      const [isTimerRunning, setIsTimerRunning] = useState(false);

      // Chat Messages with Real-time Simulated Replies
      const [chatList, setChatList] = useState([
        { id: 1, sender: 'them', text: 'Hi Alex! I saw your React & TypeScript profile. Would you be open to an exchange for Japanese conversation practice?', time: '10:14 AM' },
        { id: 2, sender: 'me', text: 'Hello Sarah! Absolutely. I have time tomorrow afternoon at Green Library.', time: '10:16 AM' }
      ]);
      const [msgInput, setMsgInput] = useState('');
      const [isPartnerTyping, setIsPartnerTyping] = useState(false);

      // Timer interval
      useEffect(() => {
        let interval = null;
        if (isTimerRunning && timerSeconds > 0) {
          interval = setInterval(() => {
            setTimerSeconds(s => s - 1);
          }, 1000);
        }
        return () => clearInterval(interval);
      }, [isTimerRunning, timerSeconds]);

      const formatTimer = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return { m, s: s < 10 ? `0${s}` : s };
      };

      const showToast = (text) => {
        setToast(text);
        SoundFx.playClick(600);
        setTimeout(() => setToast(null), 3000);
      };

      const selectChapter = (id) => {
        setActiveChapter(id);
        setSubScreen('default');
        SoundFx.playClick(500 + parseInt(id, 10) * 12);
      };

      const sendMessage = () => {
        if (!msgInput.trim()) return;
        const newMsg = { id: Date.now(), sender: 'me', text: msgInput, time: 'Just now' };
        setChatList(prev => [...prev, newMsg]);
        setMsgInput('');
        SoundFx.playClick(650);

        // Simulate realistic peer reply after 1.5 seconds
        setIsPartnerTyping(true);
        setTimeout(() => {
          setIsPartnerTyping(false);
          setChatList(prev => [
            ...prev,
            { id: Date.now() + 1, sender: 'them', text: 'Sounds perfect! Let\'s meet on the 3rd floor quiet study lounge at 4:00 PM.', time: 'Just now' }
          ]);
          SoundFx.playSuccess();
        }, 1500);
      };

      const currentPeer = MOCK_PEERS[peerIndex % MOCK_PEERS.length];

      return (
        <div className="w-full flex flex-col space-y-4">

          {/* 1. TOP PROFESSIONAL APP BAR */}
          <header className="w-full bg-[#111622] text-white rounded-2xl p-3 sm:px-6 sm:py-3.5 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center font-black text-white text-base shadow-sm">
                S
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-base tracking-tight text-white">SkillSwap</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-semibold text-slate-300 border border-slate-700">Launch Ready</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-400 font-medium">
                  <span>Campus:</span>
                  <select 
                    value={selectedUni.id}
                    onChange={(e) => {
                      const u = UNIVERSITIES.find(x => x.id === e.target.value);
                      if (u) setSelectedUni(u);
                      SoundFx.playClick(600);
                    }}
                    className="bg-transparent text-slate-200 font-semibold outline-none cursor-pointer"
                  >
                    {UNIVERSITIES.map(u => (
                      <option key={u.id} value={u.id} className="bg-slate-900 text-white">{u.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Middle: Badges */}
            <div className="hidden lg:flex items-center space-x-3 text-xs font-semibold text-slate-300">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Verified @{selectedUni.domain}</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700">
                <span>⚡ 480 Karma Credits</span>
              </div>
            </div>

            {/* Right: Audio & View Mode Switcher */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => {
                  SoundFx.muted = !isMuted;
                  setIsMuted(!isMuted);
                  if (isMuted) SoundFx.playClick(700);
                }}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs transition"
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              <div className="bg-slate-800 p-1 rounded-xl flex items-center space-x-1 text-xs font-semibold">
                <button
                  onClick={() => { setViewMode('phone'); SoundFx.playClick(480); }}
                  className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'phone' ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  📱 Mobile Device
                </button>
                <button
                  onClick={() => { setViewMode('desktop'); SoundFx.playClick(560); }}
                  className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'desktop' ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  💻 Wide Studio
                </button>
              </div>
            </div>

          </header>

          {/* 2. FIGMA CHAPTERS TOP SCROLLER (01 to 22) */}
          <nav className="w-full bg-[#111622] rounded-xl p-1.5 border border-slate-800 overflow-x-auto no-scrollbar flex items-center space-x-1">
            {FIGMA_CHAPTERS.map(ch => (
              <button
                key={ch.id}
                onClick={() => selectChapter(ch.id)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition ${
                  activeChapter === ch.id 
                    ? 'bg-brand-primary text-white shadow-sm font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{ch.icon}</span>
                <span>{ch.title}</span>
              </button>
            ))}
          </nav>

          {/* 3. MAIN WORKSPACE */}
          <main className="w-full flex justify-center pb-8">

            {/* ========================================================= */}
            {/* VIEW MODE 1: MOBILE DEVICE VIEWPORT (393px × 852px)       */}
            {/* ========================================================= */}
            {viewMode === 'phone' ? (
              <div className="relative w-full max-w-[393px] h-[844px] bg-[#FFFFFF] rounded-[48px] shadow-2xl border-[10px] border-[#0A0D14] overflow-hidden flex flex-col">
                
                {/* iOS Dynamic Island & Status Bar */}
                <div className="w-full h-11 shrink-0 bg-white flex items-center justify-between px-7 pt-1 z-30 select-none border-b border-slate-50">
                  <span className="text-xs font-bold text-slate-900 tracking-tight">23:52</span>
                  <div className="w-24 h-4 bg-black rounded-full mx-auto"></div>
                  <div className="flex items-center space-x-1 text-slate-900 text-xs font-semibold">
                    <span className="text-[11px]">5G</span>
                    <span className="text-[10px]">100%</span>
                  </div>
                </div>

                {/* Mobile Active Viewport */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col p-4 space-y-4 bg-white">
                  {renderChapterScreen()}
                </div>

                {/* Mobile Bottom Bar (Only on Main Dashboard Tabs) */}
                {activeChapter !== '02' && (
                  <div className="w-full h-16 shrink-0 bg-white border-t border-slate-200/80 flex items-center justify-around px-4 z-30 shadow-lg">
                    <button 
                      onClick={() => selectChapter('05')}
                      className={`flex flex-col items-center space-y-0.5 ${activeChapter === '05' ? 'text-brand-primary font-bold' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                      <span className="text-[10px]">Home</span>
                    </button>

                    <button 
                      onClick={() => selectChapter('06')}
                      className={`flex flex-col items-center space-y-0.5 ${activeChapter === '06' ? 'text-brand-primary font-bold' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                      <span className="text-[10px]">Explore</span>
                    </button>

                    {/* Elevated Center Action Button */}
                    <button 
                      onClick={() => { selectChapter('09'); SoundFx.playClick(650); }}
                      className="w-11 h-11 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-xl font-bold shadow-float-primary -translate-y-2 active:scale-95 transition"
                      title="Create New Skill / Propose Swap"
                    >
                      +
                    </button>

                    <button 
                      onClick={() => selectChapter('10')}
                      className={`flex flex-col items-center space-y-0.5 ${activeChapter === '10' ? 'text-brand-primary font-bold' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                      <span className="text-[10px]">Chat</span>
                    </button>

                    <button 
                      onClick={() => selectChapter('07')}
                      className={`flex flex-col items-center space-y-0.5 ${activeChapter === '07' ? 'text-brand-primary font-bold' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      <span className="text-[10px]">Profile</span>
                    </button>
                  </div>
                )}

              </div>
            ) : (
              /* ========================================================= */
              /* VIEW MODE 2: WIDE STUDIO CANVAS (DESKTOP)                 */
              /* ========================================================= */
              <div className="w-full bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-fade-in">
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">SkillSwap Architecture Spec</span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{FIGMA_CHAPTERS.find(c => c.id === activeChapter)?.title}</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                    {FIGMA_CHAPTERS.find(c => c.id === activeChapter)?.badge}
                  </span>
                </div>

                {/* Render Container */}
                <div className="max-w-3xl mx-auto">
                  {renderChapterScreen()}
                </div>

              </div>
            )}

          </main>

          {/* Global Toast */}
          {toast && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-2 border border-slate-700 animate-scale-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{toast}</span>
            </div>
          )}

        </div>
      );

      // --- SCREEN RENDERER (ALL 22 MODULES) ---
      function renderChapterScreen() {
        switch (activeChapter) {

          // =========================================================
          // 02. SPLASH & ONBOARDING (EXACT LATEST REFERENCE MATCH)
          // =========================================================
          case '02':
            return (
              <div className="h-full flex flex-col justify-between py-2 space-y-4 animate-slide-up text-center select-none">
                
                {/* 1. Top 3D Character Avatar Cards Stack */}
                <AvatarCardStack />

                {/* 2. Micro Hairline Brand Title */}
                <div className="space-y-1">
                  <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-slate-400 tracking-[0.25em] uppercase">
                    <span className="w-6 h-[1px] bg-slate-200"></span>
                    <span>s k i l l s w a p</span>
                    <span className="w-6 h-[1px] bg-slate-200"></span>
                  </div>

                  {/* 3. High Impact Headline */}
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight px-4">
                    Exchange skills with your campus peers
                  </h1>

                  {/* 4. Subtitle */}
                  <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto leading-relaxed pt-1">
                    Trade knowledge in CS, Design, Languages and Math with verified students across campus.
                  </p>
                </div>

                {/* 5. Pagination Indicator */}
                <div className="flex justify-center items-center space-x-1.5 py-1">
                  <span className="w-4 h-1.5 rounded-full bg-[#0F172A]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                </div>

                {/* 6. High Contrast Action Buttons */}
                <div className="space-y-2.5 px-2 pt-2">
                  <button 
                    onClick={() => {
                      SoundFx.playClick(600);
                      selectChapter('04'); // Profile Setup Wizard
                    }}
                    className="w-full py-3.5 rounded-2xl btn-pill-dark font-bold text-xs shadow-md"
                  >
                    Get Started
                  </button>

                  <button 
                    onClick={() => {
                      SoundFx.playClick(500);
                      selectChapter('03'); // Login Screen
                    }}
                    className="w-full py-3.5 rounded-2xl btn-pill-white font-bold text-xs"
                  >
                    I already have an account
                  </button>

                  <p className="text-[10px] text-slate-400 font-medium pt-1 px-4 leading-normal">
                    Verified university authentication. Your campus credentials and privacy are fully protected.
                  </p>
                </div>

              </div>
            );

          // =========================================================
          // 01. DESIGN SYSTEM
          // =========================================================
          case '01':
            return (
              <div className="space-y-6 animate-slide-up pb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">01 — Foundations</span>
                  <h3 className="text-lg font-bold text-slate-900">Design System Tokens & Components</h3>
                </div>

                {/* 3D Avatar Card Showcase */}
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 text-center space-y-2">
                  <span className="text-xs font-bold text-slate-600">3D Stylized Character Hero Token</span>
                  <AvatarCardStack />
                </div>

                {/* Color Palette Tokens */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-600">Color Palette</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { name: 'Dark Slate', hex: '#0F172A', bg: 'bg-[#0F172A]', text: 'text-white' },
                      { name: 'Royal Indigo', hex: '#4338CA', bg: 'bg-[#4338CA]', text: 'text-white' },
                      { name: 'Card Crimson', hex: '#EF4444', bg: 'bg-[#EF4444]', text: 'text-white' },
                      { name: 'Card Amber', hex: '#F59E0B', bg: 'bg-[#F59E0B]', text: 'text-white' },
                      { name: 'Muted Honey', hex: '#FEF3C7', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E] border' },
                      { name: 'Soft Sage', hex: '#D1FAE5', bg: 'bg-[#D1FAE5]', text: 'text-[#065F46] border' },
                      { name: 'Lavender', hex: '#EDE9FE', bg: 'bg-[#EDE9FE]', text: 'text-[#5B21B6] border' },
                      { name: 'Pure Surface', hex: '#FFFFFF', bg: 'bg-[#FFFFFF]', text: 'text-slate-800 border' },
                    ].map((c, i) => (
                      <div 
                        key={i} 
                        onClick={() => showToast(`Copied ${c.hex}`)}
                        className={`p-3 rounded-xl ${c.bg} ${c.text} text-center cursor-pointer hover:opacity-90 transition`}
                      >
                        <div className="text-xs font-bold">{c.name}</div>
                        <div className="text-[10px] font-mono opacity-80 mt-0.5">{c.hex}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-600">Button Styles</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => SoundFx.playClick(500)} className="py-3 rounded-2xl btn-pill-dark text-xs font-bold">
                      Get Started (Solid Black)
                    </button>
                    <button onClick={() => SoundFx.playClick(550)} className="py-3 rounded-2xl btn-pill-white text-xs font-bold">
                      Secondary (Bordered)
                    </button>
                  </div>
                </div>
              </div>
            );

          // =========================================================
          // 03. AUTHENTICATION
          // =========================================================
          case '03':
            return (
              <div className="space-y-4 animate-slide-up pb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">03 — Campus Access</span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {subScreen === 'otp' ? 'Enter Verification Code' : 'Sign in to SkillSwap'}
                  </h3>
                </div>

                {subScreen === 'otp' ? (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4 text-center">
                    <p className="text-xs text-slate-600">Enter the 6-digit verification code sent to <b>alex.miller@stanford.edu</b></p>
                    <div className="flex justify-center space-x-2 py-2">
                      {['5', '8', '2', '9', '1', '4'].map((d, i) => (
                        <input key={i} defaultValue={d} maxLength={1} className="w-10 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-primary" />
                      ))}
                    </div>
                    <button onClick={() => { showToast('Account verified!'); setSubScreen('default'); }} className="w-full py-3.5 rounded-2xl btn-pill-dark text-xs font-bold">
                      Verify & Sign In →
                    </button>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700">University Email (.edu)</label>
                      <input defaultValue="alex.miller@stanford.edu" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium outline-none focus:border-brand-primary" />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700">Password</label>
                      <input type="password" defaultValue="••••••••••••" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium outline-none focus:border-brand-primary" />
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <label className="flex items-center space-x-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded text-brand-primary" />
                        <span className="text-slate-600">Keep me logged in</span>
                      </label>
                      <button onClick={() => setSubScreen('otp')} className="text-brand-primary font-semibold">
                        Enter OTP Code
                      </button>
                    </div>

                    <button onClick={() => selectChapter('05')} className="w-full py-3.5 rounded-2xl btn-pill-dark text-xs font-bold">
                      Sign In to Stanford Hub
                    </button>

                    <div className="pt-2 flex justify-center text-xs text-slate-500">
                      <span>Don't have an account?</span>
                      <button onClick={() => selectChapter('04')} className="ml-1 text-brand-primary font-bold">
                        Sign up with .edu
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );

          // =========================================================
          // 04. PROFILE SETUP (10-Step Wizard)
          // =========================================================
          case '04':
            return (
              <div className="space-y-4 animate-slide-up pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Step {setupStep} of 10</span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {setupStep === 1 ? 'Personal Information' :
                       setupStep === 2 ? 'Upload Avatar' :
                       setupStep === 3 ? 'Skills You Can Teach' :
                       setupStep === 4 ? 'Skills You Want to Learn' :
                       setupStep === 5 ? 'Proficiency Level' :
                       setupStep === 6 ? 'Academic Interests' :
                       setupStep === 7 ? 'Spoken Languages' :
                       setupStep === 8 ? 'Weekly Availability' :
                       setupStep === 9 ? 'Profile Preview' : 'Setup Complete'}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-brand-primary bg-indigo-50 px-2 py-0.5 rounded-full">
                    {setupStep * 10}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#0F172A] h-full transition-all duration-300" style={{ width: `${setupStep * 10}%` }}></div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-3">
                  {setupStep === 1 && (
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700">Full Name</label>
                        <input defaultValue="Alex Miller" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium" />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700">Major & Department</label>
                        <input defaultValue="Computer Science & Symbolic Systems" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium" />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700">Class Year</label>
                        <input defaultValue="Junior (Class of 2026)" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium" />
                      </div>
                    </div>
                  )}

                  {setupStep === 3 && (
                    <div className="space-y-2">
                      <span className="text-xs text-slate-600">Select disciplines you are confident teaching:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {['Python Algorithms', 'React & Web Systems', 'Calculus & Linear Algebra', 'Figma Design Systems', 'Academic Writing', 'MCAT Organic Chem'].map((s, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold flex items-center space-x-1.5">
                            <span className="text-emerald-600">✓</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {setupStep === 10 ? (
                    <div className="text-center space-y-3 py-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mx-auto">
                        ✓
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">Profile Initialized</h4>
                      <p className="text-xs text-slate-600 max-w-xs mx-auto">
                        Your verified Stanford credentials are live. You can now explore peers and propose skill exchanges.
                      </p>
                      <button onClick={() => selectChapter('05')} className="w-full py-3.5 rounded-2xl btn-pill-dark text-xs font-bold">
                        Go to Home Feed →
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2 pt-2">
                      {setupStep > 1 && (
                        <button onClick={() => setSetupStep(prev => prev - 1)} className="px-4 py-3 rounded-2xl btn-pill-white text-xs font-bold">
                          Back
                        </button>
                      )}
                      <button onClick={() => { setSetupStep(prev => prev + 1); SoundFx.playClick(520); }} className="flex-1 py-3.5 rounded-2xl btn-pill-dark text-xs font-bold">
                        Continue ({setupStep}/10) →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );

          // =========================================================
          // 05. HOME FEED
          // =========================================================
          case '05':
            return (
              <div className="space-y-4 animate-slide-up pb-6">
                
                {/* Header Greeting */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-slate-500">Good morning,</span>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Alex Miller</h2>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-900" 
                    alt="Profile"
                  />
                </div>

                {/* Horizontal Weekday Date Picker */}
                <div className="flex items-center justify-between gap-1.5 py-1">
                  {WEEK_DAYS.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedDate(d.date); SoundFx.playClick(500 + i * 20); }}
                      className={`flex-1 py-2 rounded-2xl flex flex-col items-center justify-center transition ${
                        selectedDate === d.date 
                          ? 'bg-[#0F172A] text-white shadow-md' 
                          : 'bg-white text-slate-700 border border-slate-200/70 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[13px] font-extrabold">{d.date}</span>
                      <span className="text-[10px] font-medium opacity-80">{d.day}</span>
                    </button>
                  ))}
                </div>

                {/* Bento Grid (Ref 1) */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Card 1: CS106B Algorithm Review */}
                  <div className="bento-box p-4 rounded-3xl bg-brand-honey text-brand-honeyText border border-amber-200/70 flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                      <span className="text-base">📖</span>
                      <span className="w-5 h-5 rounded-full border-2 border-amber-600/40"></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-tight">Reading</h4>
                      <p className="text-[11px] opacity-80 mt-0.5">Read 20 pages CS106B</p>
                    </div>
                  </div>

                  {/* Card 2: React Web Development */}
                  <div className="bento-box p-4 rounded-3xl bg-brand-sage text-brand-sageText border border-emerald-200/70 flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                      <span className="text-base">💻</span>
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">✓</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-tight">Programming</h4>
                      <p className="text-[11px] opacity-80 mt-0.5">Write mini-games in C++</p>
                    </div>
                  </div>

                  {/* Card 3: Financial Literacy */}
                  <div className="bento-box p-4 rounded-3xl bg-brand-rose text-brand-roseText border border-rose-200/70 flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                      <span className="text-base">💳</span>
                      <span className="w-5 h-5 rounded-full border-2 border-rose-600/40"></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-tight">Financial literacy</h4>
                      <p className="text-[11px] opacity-80 mt-0.5">Record all expenses</p>
                    </div>
                  </div>

                  {/* Card 4: Positive Thought */}
                  <div className="bento-box p-4 rounded-3xl bg-brand-sky text-brand-skyText border border-sky-200/70 flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                      <span className="text-base">💡</span>
                      <span className="w-5 h-5 rounded-full border-2 border-sky-600/40"></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-tight">Positive thought</h4>
                      <p className="text-[11px] opacity-80 mt-0.5">Write 10 affirmations</p>
                    </div>
                  </div>

                </div>

                {/* Upcoming Session Widget */}
                <div className="p-4 rounded-3xl bg-[#0F172A] text-white shadow-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">Confirmed Swap Session</span>
                    <span className="bg-slate-800 px-2.5 py-0.5 rounded-full text-[10px] text-slate-300 font-medium">Today 4:00 PM</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <img src={currentPeer.avatar} className="w-11 h-11 rounded-2xl object-cover border border-slate-700" alt={currentPeer.name} />
                    <div>
                      <h4 className="font-bold text-sm text-white">{currentPeer.name}</h4>
                      <p className="text-xs text-slate-400">React Dev & Conversational Japanese</p>
                    </div>
                  </div>

                  <button onClick={() => selectChapter('11')} className="w-full py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold transition">
                    Open Session Workspace →
                  </button>
                </div>

              </div>
            );

          // =========================================================
          // 06. EXPLORE & SEARCH
          // =========================================================
          case '06':
            return (
              <div className="space-y-4 animate-slide-up pb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">06 — Campus Directory</span>
                  <h3 className="text-lg font-bold text-slate-900">Explore Skills & Mentors</h3>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search courses, skills, or departments..." 
                    className="w-full p-3 pl-10 rounded-2xl bg-white border border-slate-200 text-xs font-medium outline-none focus:border-brand-primary shadow-xs"
                  />
                  <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
                </div>

                {/* Category Pills */}
                <div className="flex space-x-1.5 overflow-x-auto no-scrollbar py-1">
                  {['All Disciplines', 'Computer Science', 'Design Systems', 'Languages', 'Mathematics', 'Pre-Med'].map((cat, i) => (
                    <button key={i} className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold ${i === 0 ? 'bg-[#0F172A] text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Directory Peer Cards */}
                <div className="space-y-3">
                  {MOCK_PEERS.map((p, idx) => (
                    <div key={idx} className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={p.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={p.name} />
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                              <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">Verified</span>
                            </div>
                            <p className="text-xs text-slate-500">{p.title} • {p.year}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {p.matchScore}% Match
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Teaches:</span>
                        <div className="flex flex-wrap gap-1">
                          {p.teachSkills.map((ts, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
                              {ts.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button onClick={() => selectChapter('08')} className="w-full py-2.5 rounded-2xl btn-pill-dark text-xs font-bold">
                        Propose 1-on-1 Swap →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );

          // =========================================================
          // 08. SKILL MATCHING (SMART PAIRING DECK)
          // =========================================================
          case '08':
            return (
              <div className="space-y-4 animate-slide-up pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">08 — Pairing Deck</span>
                    <h3 className="text-lg font-bold text-slate-900">Direct Skill Match</h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {currentPeer.matchScore}% Compatibility
                  </span>
                </div>

                {/* Candidate Profile Card */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
                  <div className="flex items-center space-x-3">
                    <img src={currentPeer.avatar} className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-primary" alt={currentPeer.name} />
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{currentPeer.name}</h4>
                      <p className="text-xs text-slate-500">{currentPeer.title} • {currentPeer.year}</p>
                      <p className="text-xs text-slate-700 font-semibold mt-0.5">📍 {currentPeer.preferredLocation}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                    "{currentPeer.bio}"
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">They Teach You:</span>
                    <div className="space-y-1">
                      {currentPeer.teachSkills.map((ts, i) => (
                        <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-900">{ts.name}</span>
                          <span className="text-[10px] text-brand-primary font-bold bg-indigo-50 px-2 py-0.5 rounded">{ts.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">They Learn in Return:</span>
                    <div className="space-y-1">
                      {currentPeer.learnSkills.map((ls, i) => (
                        <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-900">{ls.name}</span>
                          <span className="text-[10px] text-slate-500">{ls.target}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center space-x-3">
                    <button 
                      onClick={() => {
                        SoundFx.playClick(400);
                        setPeerIndex(prev => prev + 1);
                      }}
                      className="w-14 h-12 rounded-2xl btn-pill-white font-bold text-sm flex items-center justify-center transition"
                    >
                      Skip
                    </button>
                    <button 
                      onClick={() => {
                        SoundFx.playSuccess();
                        if (window.confetti) window.confetti({ particleCount: 60, spread: 50 });
                        setIsMatchModalOpen(true);
                      }}
                      className="flex-1 h-12 rounded-2xl btn-pill-dark font-bold text-xs shadow-md"
                    >
                      Propose Skill Swap
                    </button>
                  </div>
                </div>

                {/* Match Modal */}
                {isMatchModalOpen && (
                  <div className="p-5 rounded-3xl bg-white border-2 border-brand-primary shadow-xl space-y-3 text-center animate-scale-in">
                    <span className="text-xs font-bold text-brand-primary uppercase">Proposal Ready</span>
                    <h4 className="text-base font-bold text-slate-900">Exchange request sent to {currentPeer.name}</h4>
                    <p className="text-xs text-slate-600">You can now coordinate times directly in chat or schedule a slot.</p>
                    <div className="flex space-x-2 pt-1">
                      <button onClick={() => selectChapter('10')} className="flex-1 py-2.5 rounded-xl btn-pill-white text-xs font-semibold">
                        Open Chat 💬
                      </button>
                      <button onClick={() => selectChapter('11')} className="flex-1 py-2.5 rounded-xl btn-pill-dark text-xs font-semibold">
                        Schedule Session 📅
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );

          // =========================================================
          // 09. CREATE SKILL
          // =========================================================
          case '09':
            return (
              <div className="space-y-4 animate-slide-up pb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">09 — Syllabus Creator</span>
                  <h3 className="text-lg font-bold text-slate-900">Publish a New Skill Offering</h3>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700">Skill Title / Course Name</label>
                    <input defaultValue="CS 106B: Data Structures & C++" className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-brand-primary" />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700">Curriculum Description</label>
                    <textarea rows="2" defaultValue="Covers recursion, pointers, linked structures, trees, and algorithmic complexity." className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-brand-primary" />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700">Session Format</label>
                    <select className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium">
                      <option>1-on-1 Collaborative Study (60 mins)</option>
                      <option>Peer Code Review & Problem Sets (45 mins)</option>
                      <option>Language Speaking Practice (30 mins)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="font-semibold text-slate-700">Category Indicator Badge</label>
                    <div className="flex space-x-2">
                      {['bg-brand-honey', 'bg-brand-sage', 'bg-brand-lavender', 'bg-brand-sky'].map((color, i) => (
                        <span key={i} className={`w-8 h-8 rounded-xl ${color} border border-slate-300 flex items-center justify-center cursor-pointer text-xs`}>
                          {i === 0 ? '✓' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      SoundFx.playSuccess();
                      showToast('Skill Published to Stanford Hub!');
                      selectChapter('06');
                    }}
                    className="w-full py-3.5 rounded-2xl btn-pill-dark text-xs font-bold mt-2"
                  >
                    Publish to Campus Directory
                  </button>
                </div>
              </div>
            );

          // =========================================================
          // 10. MESSAGING & LIVE CHAT (REALTIME REPLIES)
          // =========================================================
          case '10':
            return (
              <div className="space-y-3 animate-slide-up pb-6 flex flex-col h-[520px]">
                {/* Chat Top Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center space-x-2.5">
                    <img src={currentPeer.avatar} className="w-9 h-9 rounded-full object-cover border border-slate-300" alt={currentPeer.name} />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{currentPeer.name}</h4>
                      <span className="text-[10px] text-emerald-600 font-semibold">● Online • Stanford CS</span>
                    </div>
                  </div>
                  <button onClick={() => selectChapter('11')} className="px-3 py-1.5 rounded-xl btn-pill-dark text-[10px] font-bold">
                    Schedule Slot
                  </button>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-slate-50/70 rounded-2xl border border-slate-100">
                  {chatList.map(m => (
                    <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                        m.sender === 'me' 
                          ? 'bg-[#0F172A] text-white rounded-br-none' 
                          : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-xs'
                      }`}>
                        <p className="leading-relaxed">{m.text}</p>
                        <span className="text-[9px] opacity-60 block text-right mt-1">{m.time}</span>
                      </div>
                    </div>
                  ))}
                  {isPartnerTyping && (
                    <div className="text-[10px] text-slate-400 italic px-2 animate-pulse">
                      Sarah is typing...
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={msgInput} 
                    onChange={e => setMsgInput(e.target.value)}
                    placeholder="Write a message or study note..." 
                    className="flex-1 p-2.5 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:border-brand-primary"
                    onKeyDown={e => {
                      if (e.key === 'Enter') sendMessage();
                    }}
                  />
                  <button 
                    onClick={sendMessage}
                    className="w-10 h-10 rounded-xl btn-pill-dark flex items-center justify-center font-bold text-sm"
                  >
                    ➤
                  </button>
                </div>
              </div>
            );

          // =========================================================
          // 11. SESSIONS & LIVE COUNTDOWN TIMER
          // =========================================================
          case '11':
            const timer = formatTimer(timerSeconds);
            return (
              <div className="space-y-4 animate-slide-up pb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">11 — Live Workspace</span>
                  <h3 className="text-lg font-bold text-slate-900">Active Study Session</h3>
                </div>

                {/* Countdown Timer Card */}
                <div className="p-5 rounded-3xl bg-brand-sage text-brand-sageText border border-emerald-200/80 text-center space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">1-on-1 Exchange Timer</span>
                  
                  <div className="text-4xl font-extrabold tracking-tight text-slate-900 font-mono">
                    {timer.m} <span className="text-lg font-bold font-sans">min</span> {timer.s} <span className="text-lg font-bold font-sans">s</span>
                  </div>

                  <div className="flex justify-center space-x-2 pt-1">
                    <button 
                      onClick={() => {
                        setIsTimerRunning(!isTimerRunning);
                        SoundFx.playClick(500);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs"
                    >
                      {isTimerRunning ? 'Pause ⏸' : 'Start ▶'}
                    </button>
                    <button 
                      onClick={() => {
                        setTimerSeconds(2086);
                        setIsTimerRunning(false);
                        SoundFx.playClick(400);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white text-slate-700 font-bold text-xs border border-slate-200"
                    >
                      Reset ↺
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs text-left max-w-xs mx-auto pt-2">
                    <div className="p-2 rounded-xl bg-white/80 flex items-center space-x-2">
                      <span>🎵</span>
                      <span>Calm background focus audio enabled</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/80 flex items-center space-x-2">
                      <span>📝</span>
                      <span>Shared scratchpad synchronized</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      SoundFx.playSuccess();
                      showToast('Session Completed & 5-Star Logged!');
                      selectChapter('15');
                    }}
                    className="w-full py-3 rounded-2xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-50 transition"
                  >
                    Finish Session & Rate Peer
                  </button>
                </div>
              </div>
            );

          // =========================================================
          // 21. PROTOTYPE FLOWS
          // =========================================================
          case '21':
            return (
              <div className="space-y-4 animate-slide-up pb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">21 — Verification</span>
                  <h3 className="text-lg font-bold text-slate-900">Interactive Prototype Flows</h3>
                </div>

                <div className="space-y-2.5">
                  {[
                    { title: 'Flow 1: Campus Onboarding & Verification', desc: 'Splash → Auth → 10-step wizard → Hub Live', target: '02' },
                    { title: 'Flow 2: Peer Discovery & Skill Matching', desc: 'Explore directory → Smart pairing deck → Propose swap', target: '08' },
                    { title: 'Flow 3: Messaging & Instant Scheduling', desc: 'Chat thread → Session booking → Calendar sync', target: '10' },
                    { title: 'Flow 4: Live 1-on-1 Room & Feedback', desc: 'Timer workspace → Complete session → Verified review', target: '11' },
                  ].map((flow, i) => (
                    <div 
                      key={i} 
                      onClick={() => selectChapter(flow.target)}
                      className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-card flex items-center justify-between cursor-pointer transition"
                    >
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{flow.title}</h4>
                        <p className="text-[11px] text-slate-500">{flow.desc}</p>
                      </div>
                      <span className="text-xs text-brand-primary font-bold">Run Flow →</span>
                    </div>
                  ))}
                </div>
              </div>
            );

          // =========================================================
          // 22. FIGMA PAGES SITEMAP
          // =========================================================
          case '22':
            return (
              <div className="space-y-4 animate-slide-up pb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">22 — Architecture Matrix</span>
                  <h3 className="text-lg font-bold text-slate-900">Figma Page Hierarchy</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {FIGMA_CHAPTERS.map(ch => (
                    <div 
                      key={ch.id}
                      onClick={() => selectChapter(ch.id)}
                      className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{ch.icon}</span>
                        <span className="font-semibold text-slate-900">{ch.title}</span>
                      </div>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">{ch.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            );

          // Default Fallback
          default:
            return (
              <div className="space-y-4 animate-slide-up pb-6 text-center">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-3">
                  <h4 className="text-base font-bold text-slate-900">
                    {FIGMA_CHAPTERS.find(c => c.id === activeChapter)?.title}
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Specification view for {FIGMA_CHAPTERS.find(c => c.id === activeChapter)?.badge}.
                  </p>
                  <button onClick={() => selectChapter('05')} className="px-5 py-2.5 rounded-xl btn-pill-dark text-xs font-semibold">
                    Return to Home Feed
                  </button>
                </div>
              </div>
            );
        }
      }
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>
'''

with open('/Users/mac/.gemini/antigravity/scratch/skillswap/standalone.html', 'w') as f:
    f.write(HTML_CONTENT)

with open('/Users/mac/.gemini/antigravity/scratch/skillswap/index.html', 'w') as f:
    f.write(HTML_CONTENT)

print("Successfully wrote 3D Avatar Hero & launch-ready SkillSwap app to standalone.html and index.html!")
