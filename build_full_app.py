import os

HTML_CONTENT = r'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UniSwap — 22-Module Complete University Skill Exchange App</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Fredoka:wght@500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
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
              lime: '#A3E635',       // Plopp electric lime
              limeDark: '#65A30D',
              limeLight: '#ECFCCB',
              cream: '#FDFBF7',      // Warm paper background
              ink: '#0F172A',        // Midnight dark slate
              lilac: '#DDD6FE',      // Pastel bento lilac
              peach: '#FED7AA',      // Pastel bento peach
              mint: '#A7F3D0',       // Pastel bento mint
              sky: '#BAE6FD',        // Pastel bento sky
              pink: '#FBCFE8',       // Pastel bento bubblegum
              yellow: '#FEF08A',     // Pastel sunny yellow
              coral: '#FECDD3',      // Pastel soft coral
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            fun: ['"Fredoka"', '"Plus Jakarta Sans"', 'cursive', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          animation: {
            'bounce-slow': 'bounce 2.5s infinite',
            'float': 'float 3s ease-in-out infinite',
            'float-delayed': 'float 3s ease-in-out 1.5s infinite',
            'wiggle': 'wiggle 1s ease-in-out infinite',
            'pop-in': 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            'pulse-glow': 'pulseGlow 2s infinite',
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-8px)' },
            },
            wiggle: {
              '0%, 100%': { transform: 'rotate(-3deg)' },
              '50%': { transform: 'rotate(3deg)' },
            },
            popIn: {
              '0%': { transform: 'scale(0.8)', opacity: '0' },
              '100%': { transform: 'scale(1)', opacity: '1' },
            },
            slideUp: {
              '0%': { transform: 'translateY(25px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            pulseGlow: {
              '0%, 100%': { opacity: '1', transform: 'scale(1)' },
              '50%': { opacity: '0.85', transform: 'scale(1.03)' },
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: radial-gradient(circle at 15% 15%, #f1f5f9 0%, #e2e8f0 100%);
      color: #0F172A;
      overflow-x: hidden;
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    /* Tactile Bubbly 3D Button Shadows */
    .btn-3d-lime {
      background-color: #A3E635;
      color: #0F172A;
      box-shadow: 0 5px 0 #65A30D, 0 10px 15px -3px rgba(101, 163, 13, 0.3);
      transition: all 0.1s ease;
    }
    .btn-3d-lime:active {
      transform: translateY(4px);
      box-shadow: 0 1px 0 #65A30D, 0 4px 6px -2px rgba(101, 163, 13, 0.3);
    }

    .btn-3d-dark {
      background-color: #0F172A;
      color: #FFFFFF;
      box-shadow: 0 5px 0 #020617, 0 10px 15px -3px rgba(15, 23, 42, 0.3);
      transition: all 0.1s ease;
    }
    .btn-3d-dark:active {
      transform: translateY(4px);
      box-shadow: 0 1px 0 #020617, 0 4px 6px -2px rgba(15, 23, 42, 0.3);
    }

    .btn-3d-white {
      background-color: #FFFFFF;
      color: #0F172A;
      box-shadow: 0 5px 0 #E2E8F0, 0 10px 15px -3px rgba(0, 0, 0, 0.05);
      transition: all 0.1s ease;
    }
    .btn-3d-white:active {
      transform: translateY(4px);
      box-shadow: 0 1px 0 #CBD5E1, 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .btn-3d-danger {
      background-color: #EF4444;
      color: #FFFFFF;
      box-shadow: 0 5px 0 #B91C1C, 0 10px 15px -3px rgba(239, 68, 68, 0.3);
      transition: all 0.1s ease;
    }
    .btn-3d-danger:active {
      transform: translateY(4px);
      box-shadow: 0 1px 0 #B91C1C, 0 4px 6px -2px rgba(239, 68, 68, 0.3);
    }

    .bento-card {
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
    }
    .bento-card:hover {
      transform: translateY(-4px) scale(1.01);
    }
  </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-start p-2 sm:p-4 select-none">
  <div id="root" class="w-full max-w-7xl"></div>

  <script type="text/babel">
    const { useState, useEffect, useRef } = React;

    // --- Web Audio Sound Synthesizer ---
    const SoundFx = {
      ctx: null,
      muted: false,
      init() {
        if (!this.ctx && typeof window !== 'undefined') {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) this.ctx = new AudioContext();
        }
      },
      playPop(freq = 600) {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.08);
        } catch(e) {}
      },
      playMatch() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
          const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
          notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);
            gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.07);
            osc.stop(this.ctx.currentTime + idx * 0.07 + 0.25);
          });
        } catch(e) {}
      },
      playWhoosh() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(400, this.ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.12);
        } catch(e) {}
      },
      playGiggle() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
          [700, 900, 800, 1100].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.05);
            gain.gain.setValueAtTime(0.18, this.ctx.currentTime + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.05 + 0.06);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + i * 0.05);
            osc.stop(this.ctx.currentTime + i * 0.05 + 0.06);
          });
        } catch(e) {}
      }
    };

    // --- 22 Figma Chapters Directory ---
    const FIGMA_CHAPTERS = [
      { id: '01', title: '01. Design System', icon: '🎨', badge: 'Tokens & UI Kit' },
      { id: '02', title: '02. Splash & Onboarding', icon: '✨', badge: 'Intro & Carousel' },
      { id: '03', title: '03. Authentication', icon: '🔐', badge: 'Login & OTP' },
      { id: '04', title: '04. Profile Setup', icon: '📝', badge: '10-Step Wizard' },
      { id: '05', title: '05. Home', icon: '🏠', badge: 'Feed & Vibe' },
      { id: '06', title: '06. Explore', icon: '🔍', badge: 'Search & Filters' },
      { id: '07', title: '07. User Profile', icon: '👤', badge: 'Public Card' },
      { id: '08', title: '08. Skill Matching', icon: '🔥', badge: 'Swipe Deck' },
      { id: '09', title: '09. Create Skill', icon: '➕', badge: 'Skill Creator' },
      { id: '10', title: '10. Messaging', icon: '💬', badge: 'Live Chat' },
      { id: '11', title: '11. Sessions', icon: '⏱️', badge: 'Scheduler' },
      { id: '12', title: '12. Calendar', icon: '📅', badge: 'Monthly/Daily' },
      { id: '13', title: '13. Learning', icon: '📚', badge: 'Progress Hub' },
      { id: '14', title: '14. Teaching', icon: '👨‍🏫', badge: 'Student Queue' },
      { id: '15', title: '15. Reviews', icon: '⭐', badge: '5-Star Ratings' },
      { id: '16', title: '16. Notifications', icon: '🔔', badge: 'Activity Feed' },
      { id: '17', title: '17. Profile', icon: '⚙️', badge: 'Edit Profile' },
      { id: '18', title: '18. Settings', icon: '🛡️', badge: 'Security & App' },
      { id: '19', title: '19. Safety', icon: '🚨', badge: 'Report & Block' },
      { id: '20', title: '20. Empty & Error States', icon: '⚠️', badge: 'Edge Cases' },
      { id: '21', title: '21. Final Prototype Flows', icon: '🔄', badge: '5 End-to-End Flows' },
      { id: '22', title: '22. Figma Pages Tree', icon: '📁', badge: 'Sitemap Matrix' },
    ];

    // --- Mock Data ---
    const UNIVERSITIES = [
      { id: 'stanford', name: 'Stanford University', icon: '🌲' },
      { id: 'berkeley', name: 'UC Berkeley', icon: '🐻' },
      { id: 'mit', name: 'MIT', icon: '🏛️' },
      { id: 'oxford', name: 'Univ. of Oxford', icon: '🎓' },
      { id: 'nyu', name: 'New York University', icon: '🗽' },
      { id: 'toronto', name: 'Univ. of Toronto', icon: '🍁' },
    ];

    const MOCK_SWAPPERS = [
      {
        id: 'u-1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        major: 'Computer Science',
        year: 'Junior (\'26)',
        uni: 'Stanford University',
        vibe: '⚡ Laser Focused',
        vibeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        rating: 4.9,
        reviewsCount: 28,
        swapsCompleted: 24,
        canTeach: [
          { skill: 'Python & Data Structures', badge: 'CS106B Ace', color: 'bg-brand-limeLight text-lime-900' },
          { skill: 'React & Web Dev', badge: 'Full-Stack', color: 'bg-brand-sky text-sky-950' },
          { skill: 'Technical Interviews', badge: 'FAANG Prep', color: 'bg-brand-lilac text-purple-950' }
        ],
        wantsToLearn: [
          { skill: 'Conversational Japanese', goal: 'JLPT N3 Study' },
          { skill: 'Figma UI/UX Design', goal: 'Design portfolio' },
          { skill: 'Acoustic Guitar', goal: 'Pop chords' }
        ],
        preferredSpot: 'Green Library 3rd Floor / Zoom',
        bio: 'Need help mastering recursion or building web apps? Looking to swap for Japanese practice or guitar!',
        compatibility: 98,
      },
      {
        id: 'u-2',
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
        major: 'Design & Interaction',
        year: 'Senior (\'25)',
        uni: 'Stanford University',
        vibe: '🎨 Creative Flow',
        vibeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        rating: 5.0,
        reviewsCount: 42,
        swapsCompleted: 38,
        canTeach: [
          { skill: 'Figma Systems & Prototyping', badge: 'Industry Pro', color: 'bg-brand-peach text-amber-950' },
          { skill: '3D Blender Modeling', badge: 'Visuals', color: 'bg-brand-pink text-pink-950' },
          { skill: 'Pitch Deck Storytelling', badge: 'Venture Ready', color: 'bg-brand-yellow text-amber-950' }
        ],
        wantsToLearn: [
          { skill: 'Machine Learning Basics', goal: 'AI Tools' },
          { skill: 'Calculus III (Multivariable)', goal: 'Midterm Prep' },
          { skill: 'French Cooking', goal: 'Dorm meals' }
        ],
        preferredSpot: 'd.school Studio 2 / Virtual',
        bio: 'Senior design major. I can turn your rough wireframes into Apple-grade UI. Looking for Math/ML swaps!',
        compatibility: 94,
      },
      {
        id: 'u-3',
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        major: 'Linguistics & East Asian Studies',
        year: 'Sophomore (\'27)',
        uni: 'Stanford University',
        vibe: '☕ Chill & Friendly',
        vibeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        rating: 4.8,
        reviewsCount: 19,
        swapsCompleted: 19,
        canTeach: [
          { skill: 'Japanese (Native/JLPT N1)', badge: 'Native Speaker', color: 'bg-brand-mint text-emerald-950' },
          { skill: 'Essay Editing & Rhetoric', badge: 'Writing Center', color: 'bg-brand-sky text-sky-950' },
          { skill: 'Music Theory & Piano', badge: 'Classical 8yr', color: 'bg-brand-lilac text-purple-950' }
        ],
        wantsToLearn: [
          { skill: 'Python for Beginners', goal: 'Data Analysis' },
          { skill: 'Video Editing (Premiere)', goal: 'Study Vlogs' },
          { skill: 'Financial Literacy', goal: 'Budgeting' }
        ],
        preferredSpot: 'Coupa Cafe at Y2E2',
        bio: 'Native Japanese speaker & peer writing tutor. Excited to swap Japanese for basic Python coding or video editing!',
        compatibility: 96,
      }
    ];

    // --- Interactive Mascot Component: PIP ---
    const MascotPip = ({ 
      mood = 'happy', 
      customMessage = '', 
      size = 'normal', // 'small' | 'normal' | 'large'
      onTickle = null,
      showBubble = true 
    }) => {
      const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
      const [isBlinking, setIsBlinking] = useState(false);
      const [isJumping, setIsJumping] = useState(false);
      const containerRef = useRef(null);

      // Mouse tracking for pupil movement
      useEffect(() => {
        const handleMouseMove = (e) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          const dist = Math.hypot(dx, dy);
          const maxDist = 8;
          const angle = Math.atan2(dy, dx);
          const moveDist = Math.min(dist / 25, maxDist);
          setPupilOffset({
            x: Math.cos(angle) * moveDist,
            y: Math.sin(angle) * moveDist,
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }, []);

      // Blink interval
      useEffect(() => {
        const interval = setInterval(() => {
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 180);
        }, 4500 + Math.random() * 2000);
        return () => clearInterval(interval);
      }, []);

      const handleClick = () => {
        setIsJumping(true);
        SoundFx.playGiggle();
        if (window.confetti) {
          window.confetti({
            particleCount: 25,
            spread: 50,
            origin: { y: 0.75 },
            colors: ['#A3E635', '#FEF08A', '#DDD6FE', '#BAE6FD']
          });
        }
        setTimeout(() => setIsJumping(false), 600);
        if (onTickle) onTickle();
      };

      const scaleClass = size === 'large' ? 'w-40 h-40' : size === 'small' ? 'w-16 h-16' : 'w-28 h-28';

      return (
        <div className="relative inline-flex flex-col items-center select-none" ref={containerRef}>
          {showBubble && (
            <div className="mb-2 bg-white px-3.5 py-1.5 rounded-2xl rounded-bl-sm shadow-md border border-slate-200 text-xs font-bold text-slate-800 animate-pop-in flex items-center space-x-1.5 max-w-[200px] text-center z-10">
              <span>{customMessage || "Hi! I'm Pip! Let's swap skills! ⚡"}</span>
            </div>
          )}

          <div 
            onClick={handleClick}
            className={`cursor-pointer transition-transform duration-300 ${scaleClass} ${isJumping ? 'scale-110 -translate-y-3' : 'hover:scale-105 active:scale-95'}`}
            title="Click Pip to tickle!"
          >
            <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient id="limeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#BEF264" />
                  <stop offset="100%" stopColor="#84CC16" />
                </linearGradient>
                <linearGradient id="pupilShine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
              </defs>

              <path d="M 57 20 C 52 8, 40 12, 45 23 C 49 14, 65 6, 63 21" fill="#FEF08A" className="animate-wiggle origin-bottom" />
              <path d="M 60 15 C 95 15, 110 40, 110 75 C 110 102, 90 115, 60 115 C 30 115, 10 102, 10 75 C 10 40, 25 15, 60 15 Z" fill="url(#limeGrad)" stroke="#65A30D" strokeWidth="4" />
              
              {/* Eyebrows */}
              <path d={mood === 'thinking' ? "M 28 32 Q 40 25, 48 30" : "M 28 28 Q 38 23, 48 29"} stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d={mood === 'thinking' ? "M 72 26 Q 82 20, 92 31" : "M 72 29 Q 82 23, 92 28"} stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />

              {/* Eyes */}
              <ellipse cx="40" cy="50" rx="17" ry={isBlinking ? "2" : "19"} fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
              <ellipse cx="80" cy="50" rx="17" ry={isBlinking ? "2" : "19"} fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />

              {!isBlinking && (
                <>
                  <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                    <ellipse cx="40" cy="50" rx="9" ry="11" fill="url(#pupilShine)" />
                    <circle cx="37" cy="46" r="3.5" fill="#FFFFFF" />
                    <circle cx="43" cy="54" r="1.5" fill="#FFFFFF" />
                  </g>
                  <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                    <ellipse cx="80" cy="50" rx="9" ry="11" fill="url(#pupilShine)" />
                    <circle cx="77" cy="46" r="3.5" fill="#FFFFFF" />
                    <circle cx="83" cy="54" r="1.5" fill="#FFFFFF" />
                  </g>
                </>
              )}

              <circle cx="57" cy="65" r="2.2" fill="#365314" />
              <circle cx="63" cy="65" r="2.2" fill="#365314" />
              <ellipse cx="23" cy="64" rx="6" ry="3.5" fill="#F472B6" opacity="0.6" />
              <ellipse cx="97" cy="64" rx="6" ry="3.5" fill="#F472B6" opacity="0.6" />

              {mood === 'excited' || isJumping ? (
                <path d="M 48 76 Q 60 92, 72 76 Z" fill="#0F172A" />
              ) : (
                <path d="M 50 75 Q 60 83, 70 75" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              )}
            </svg>
          </div>
        </div>
      );
    };

    // --- MAIN UNISWAP APPLICATION COMPONENT ---
    function App() {
      const [activeChapter, setActiveChapter] = useState('08'); // Default: 08. Skill Matching
      const [subScreen, setSubScreen] = useState('default');
      const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'desktop'
      const [selectedUni, setSelectedUni] = useState(UNIVERSITIES[0]);
      const [isMuted, setIsMuted] = useState(false);
      
      // Global App State
      const [karmaXP, setKarmaXP] = useState(480);
      const [streak, setStreak] = useState(5);
      const [cardIndex, setCardIndex] = useState(0);
      const [swapper, setSwapper] = useState(MOCK_SWAPPERS[0]);

      // State variables for sub-screens
      const [onboardingSlide, setOnboardingSlide] = useState(1);
      const [setupStep, setSetupStep] = useState(1);
      const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: 'them', text: 'Hey Alex! Loved your React & TS profile. Would love to swap for conversational Japanese!', time: '10:14 AM' },
        { id: 2, sender: 'me', text: 'Hey Sarah! That sounds awesome. Are you available for a 1-on-1 session tomorrow at Green Library?', time: '10:16 AM' }
      ]);
      const [inputMsg, setInputMsg] = useState('');
      const [isTyping, setIsTyping] = useState(false);
      const [ratingStars, setRatingStars] = useState(5);
      const [toastText, setToastText] = useState(null);
      const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

      const triggerToast = (msg) => {
        setToastText(msg);
        SoundFx.playPop(700);
        setTimeout(() => setToastText(null), 3000);
      };

      const selectChapter = (chId) => {
        setActiveChapter(chId);
        setSubScreen('default');
        SoundFx.playPop(500 + parseInt(chId, 10) * 15);
      };

      return (
        <div className="w-full flex flex-col space-y-4">
          
          {/* 1. TOP GLOBAL APP BAR */}
          <header className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:px-6 sm:py-3.5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            
            {/* Left: Brand & University Picker */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-lime flex items-center justify-center font-fun text-xl font-extrabold shadow-sm border-2 border-lime-600">
                U
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-fun text-lg font-black tracking-tight text-slate-900">UniSwap</span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-limeLight text-[10px] font-bold text-lime-900 uppercase">22-Module Suite</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-600 font-semibold cursor-pointer">
                  <span>{selectedUni.icon}</span>
                  <select 
                    value={selectedUni.id}
                    onChange={(e) => {
                      const f = UNIVERSITIES.find(u => u.id === e.target.value);
                      if (f) setSelectedUni(f);
                      SoundFx.playPop(650);
                    }}
                    className="bg-transparent font-medium outline-none cursor-pointer text-slate-800"
                  >
                    {UNIVERSITIES.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Middle: Badges & Live Counters */}
            <div className="hidden lg:flex items-center space-x-3 text-xs font-bold">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <span>🔥</span>
                <span>{streak} Day Streak</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900">
                <span>⚡</span>
                <span>{karmaXP} Karma XP</span>
              </div>
            </div>

            {/* Right: Sound toggle & View Mode (Mobile Frame vs Desktop) */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => {
                  SoundFx.muted = !isMuted;
                  setIsMuted(!isMuted);
                  if (isMuted) SoundFx.playPop(800);
                }}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              <div className="bg-slate-100 p-1 rounded-2xl flex items-center space-x-1 text-xs font-bold">
                <button
                  onClick={() => { setViewMode('phone'); SoundFx.playPop(500); }}
                  className={`px-3 py-1.5 rounded-xl transition ${viewMode === 'phone' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  📱 Mobile Frame
                </button>
                <button
                  onClick={() => { setViewMode('desktop'); SoundFx.playPop(600); }}
                  className={`px-3 py-1.5 rounded-xl transition ${viewMode === 'desktop' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  💻 Wide Studio
                </button>
              </div>
            </div>

          </header>

          {/* 2. FIGMA CHAPTERS TOP SCROLLER (01 to 22) */}
          <nav className="w-full bg-white rounded-2xl p-2 shadow-xs border border-slate-200/80 overflow-x-auto no-scrollbar flex items-center space-x-1.5">
            {FIGMA_CHAPTERS.map(ch => (
              <button
                key={ch.id}
                onClick={() => selectChapter(ch.id)}
                className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
                  activeChapter === ch.id 
                    ? 'bg-brand-lime text-slate-950 shadow-sm border border-lime-600 font-extrabold' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <span>{ch.icon}</span>
                <span>{ch.title}</span>
              </button>
            ))}
          </nav>

          {/* 3. MAIN WORKSPACE CONTAINER */}
          <main className="w-full flex justify-center pb-12">

            {/* ========================================================= */}
            {/* VIEW MODE 1: MOBILE DEVICE VIEWPORT (393px × 852px)       */}
            {/* ========================================================= */}
            {viewMode === 'phone' ? (
              <div className="relative w-full max-w-[400px] h-[840px] bg-brand-cream rounded-[52px] shadow-2xl border-[12px] border-slate-950 overflow-hidden flex flex-col">
                
                {/* iOS Dynamic Island & Status Bar */}
                <div className="w-full h-11 shrink-0 bg-transparent flex items-center justify-between px-7 pt-1 z-30 select-none">
                  <span className="text-xs font-black text-slate-900 tracking-tight">9:41</span>
                  <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 space-x-1">
                    <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-900 text-xs font-bold">
                    <span>5G</span>
                    <span className="text-[10px]">100%</span>
                  </div>
                </div>

                {/* Mobile Active Screen Container */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col p-4 space-y-4">
                  {renderChapterScreen()}
                </div>

                {/* Mobile Floating Bottom Bar */}
                <div className="w-full h-16 shrink-0 bg-slate-900 text-white flex items-center justify-around px-3 rounded-t-3xl shadow-2xl z-30">
                  {[
                    { ch: '05', label: 'Home', icon: '🏠' },
                    { ch: '08', label: 'Match', icon: '🔥' },
                    { ch: '06', label: 'Explore', icon: '🔍' },
                    { ch: '10', label: 'Chat', icon: '💬' },
                    { ch: '07', label: 'Profile', icon: '👤' },
                  ].map(tab => (
                    <button 
                      key={tab.ch}
                      onClick={() => selectChapter(tab.ch)}
                      className={`flex flex-col items-center space-y-0.5 ${activeChapter === tab.ch ? 'text-brand-lime font-bold scale-110' : 'text-slate-400 hover:text-white'} transition`}
                    >
                      <span className="text-base">{tab.icon}</span>
                      <span className="text-[10px]">{tab.label}</span>
                    </button>
                  ))}
                </div>

              </div>
            ) : (
              /* ========================================================= */
              /* VIEW MODE 2: WIDE STUDIO BENTO CANVAS                     */
              /* ========================================================= */
              <div className="w-full bg-white/95 backdrop-blur-xl rounded-[36px] p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 animate-pop-in">
                
                {/* Header with Chapter Title */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{FIGMA_CHAPTERS.find(c => c.id === activeChapter)?.icon}</span>
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400">UniSwap Spec Module</span>
                      <h2 className="font-fun text-2xl font-black text-slate-900">{FIGMA_CHAPTERS.find(c => c.id === activeChapter)?.title}</h2>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-brand-limeLight text-lime-900 text-xs font-bold">
                      {FIGMA_CHAPTERS.find(c => c.id === activeChapter)?.badge}
                    </span>
                  </div>
                </div>

                {/* Wide Chapter Render */}
                <div className="max-w-4xl mx-auto">
                  {renderChapterScreen()}
                </div>

              </div>
            )}

          </main>

          {/* Toast Notification */}
          {toastText && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center space-x-2 animate-pop-in">
              <span>✨</span>
              <span>{toastText}</span>
            </div>
          )}

        </div>
      );

      // --- SCREEN RENDER ROUTER FOR ALL 22 MODULES ---
      function renderChapterScreen() {
        switch (activeChapter) {

          // ==========================================
          // 01. DESIGN SYSTEM
          // ==========================================
          case '01':
            return (
              <div className="space-y-6 animate-slide-up pb-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">01 — Tokens & Component Library</span>
                  <h3 className="font-fun text-xl font-bold text-slate-900">Design System & UI Kit</h3>
                </div>

                {/* Colors */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase text-slate-400">Color Palette Tokens</span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { name: 'Lime Primary', hex: '#A3E635', bg: 'bg-[#A3E635]', text: 'text-slate-950' },
                      { name: 'Dark Ink', hex: '#0F172A', bg: 'bg-[#0F172A]', text: 'text-white' },
                      { name: 'Warm Cream', hex: '#FDFBF7', bg: 'bg-[#FDFBF7]', text: 'text-slate-900 border' },
                      { name: 'Lilac Bento', hex: '#DDD6FE', bg: 'bg-[#DDD6FE]', text: 'text-purple-950' },
                      { name: 'Peach Bento', hex: '#FED7AA', bg: 'bg-[#FED7AA]', text: 'text-amber-950' },
                      { name: 'Mint Bento', hex: '#A7F3D0', bg: 'bg-[#A7F3D0]', text: 'text-emerald-950' },
                    ].map((c, i) => (
                      <div 
                        key={i} 
                        onClick={() => triggerToast(`Copied ${c.hex}!`)}
                        className={`p-3 rounded-2xl ${c.bg} ${c.text} text-center cursor-pointer shadow-xs hover:scale-105 transition`}
                      >
                        <div className="text-xs font-black">{c.name}</div>
                        <div className="text-[10px] font-mono opacity-80">{c.hex}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons Sandbox */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase text-slate-400">3D Tactile Buttons</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => SoundFx.playPop(600)} className="py-3 rounded-2xl btn-3d-lime font-fun font-bold text-xs">
                      Primary 3D Lime
                    </button>
                    <button onClick={() => SoundFx.playPop(500)} className="py-3 rounded-2xl btn-3d-dark font-fun font-bold text-xs">
                      Secondary Dark
                    </button>
                    <button onClick={() => SoundFx.playPop(700)} className="py-3 rounded-2xl btn-3d-white font-fun font-bold text-xs">
                      White Bento Card
                    </button>
                    <button onClick={() => SoundFx.playPop(400)} className="py-3 rounded-2xl btn-3d-danger font-fun font-bold text-xs">
                      Destructive Danger
                    </button>
                  </div>
                </div>

                {/* Tags & Chips */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase text-slate-400">Chips & Badges</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 rounded-xl bg-brand-limeLight text-lime-900 text-xs font-bold">Python CS106B</span>
                    <span className="px-3 py-1 rounded-xl bg-brand-lilac text-purple-950 text-xs font-bold">React Dev</span>
                    <span className="px-3 py-1 rounded-xl bg-brand-peach text-amber-950 text-xs font-bold">Figma Pro</span>
                    <span className="px-3 py-1 rounded-xl bg-brand-mint text-emerald-950 text-xs font-bold">Japanese N1</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">✓ Campus Verified</span>
                  </div>
                </div>

                {/* Mascot Inspector */}
                <div className="bg-brand-cream p-4 rounded-3xl border border-slate-200 text-center space-y-2">
                  <span className="text-xs font-black uppercase text-slate-400">Interactive Mascot Token</span>
                  <MascotPip mood="happy" size="normal" customMessage="Mascot avatar token with pupil physics!" />
                </div>
              </div>
            );

          // ==========================================
          // 02. SPLASH & ONBOARDING
          // ==========================================
          case '02':
            return (
              <div className="space-y-4 animate-slide-up text-center pb-8">
                {subScreen === 'splash' ? (
                  <div className="h-96 flex flex-col items-center justify-center space-y-4 bg-brand-lime rounded-3xl p-6 border-4 border-lime-600">
                    <MascotPip mood="excited" size="large" showBubble={false} />
                    <h2 className="font-fun text-3xl font-black text-slate-950 tracking-tight">UniSwap</h2>
                    <p className="text-xs font-bold text-lime-900">Stanford Skill & Knowledge Exchange</p>
                    <button onClick={() => setSubScreen('default')} className="px-6 py-2.5 rounded-xl btn-3d-dark text-xs font-bold">
                      Enter Welcome Screen →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-bold text-slate-400">Onboarding 0{onboardingSlide} / 03</span>
                      <button onClick={() => setSubScreen('splash')} className="text-xs font-bold text-brand-limeDark underline">
                        View Splash
                      </button>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                      <MascotPip 
                        mood={onboardingSlide === 1 ? 'happy' : onboardingSlide === 2 ? 'thinking' : 'excited'} 
                        size="large" 
                        customMessage={
                          onboardingSlide === 1 ? "Trade skills, not money!" :
                          onboardingSlide === 2 ? "Pair with verified campus classmates!" :
                          "Jump into live collaborative study rooms!"
                        }
                      />

                      <h3 className="font-fun text-xl font-black text-slate-900">
                        {onboardingSlide === 1 ? "Zero Dollars Required" :
                         onboardingSlide === 2 ? "Direct Campus Peer Matching" :
                         "Live 1-on-1 Virtual Exchanges"}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {onboardingSlide === 1 ? "Exchange your programming, language, or design talents directly with fellow students across campus." :
                         onboardingSlide === 2 ? "Search by courses (CS106B, Math 51, Chem 31A) to find the perfect study and swap partner." :
                         "Hop into synchronized video study rooms with collaborative notes, whiteboards, and timers."}
                      </p>

                      <div className="flex justify-center space-x-1.5 pt-2">
                        {[1, 2, 3].map(step => (
                          <span 
                            key={step} 
                            onClick={() => { setOnboardingSlide(step); SoundFx.playPop(500 + step * 50); }}
                            className={`h-2 rounded-full cursor-pointer transition-all ${onboardingSlide === step ? 'w-6 bg-brand-limeDark' : 'w-2 bg-slate-200'}`} 
                          />
                        ))}
                      </div>

                      <div className="pt-2 flex space-x-2">
                        {onboardingSlide < 3 ? (
                          <button 
                            onClick={() => { setOnboardingSlide(prev => prev + 1); SoundFx.playPop(600); }}
                            className="w-full py-3.5 rounded-2xl btn-3d-lime font-fun font-bold text-sm"
                          >
                            Next Step →
                          </button>
                        ) : (
                          <button 
                            onClick={() => selectChapter('03')}
                            className="w-full py-3.5 rounded-2xl btn-3d-lime font-fun font-bold text-sm"
                          >
                            Get Started Free 🚀
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );

          // ==========================================
          // 03. AUTHENTICATION
          // ==========================================
          case '03':
            return (
              <div className="space-y-4 animate-slide-up pb-8">
                <div className="text-center space-y-1">
                  <span className="text-xs font-black uppercase text-slate-400">03 — Campus Auth</span>
                  <h3 className="font-fun text-xl font-bold text-slate-900">
                    {subScreen === 'signup' ? "Create Student Account" :
                     subScreen === 'otp' ? "Verify University Email" :
                     subScreen === 'forgot' ? "Reset Password" : "Sign In to UniSwap"}
                  </h3>
                </div>

                {subScreen === 'otp' ? (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4 text-center">
                    <p className="text-xs text-slate-600">We sent a 6-digit code to <b>alex@stanford.edu</b></p>
                    <div className="flex justify-center space-x-2 py-2">
                      {['4', '8', '2', '9', '1', '7'].map((digit, i) => (
                        <input key={i} defaultValue={digit} maxLength={1} className="w-10 h-12 text-center text-lg font-black bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-brand-limeDark outline-none" />
                      ))}
                    </div>
                    <button onClick={() => { triggerToast("Email verified!"); setSubScreen('default'); }} className="w-full py-3.5 rounded-2xl btn-3d-lime font-fun font-bold text-sm">
                      Verify & Continue ✨
                    </button>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-600">University Email (.edu)</label>
                      <input defaultValue="alex.miller@stanford.edu" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold" />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600">Password</label>
                      <input type="password" defaultValue="••••••••••••" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold" />
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <label className="flex items-center space-x-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded text-brand-lime" />
                        <span className="text-slate-600 font-medium">Remember me</span>
                      </label>
                      <button onClick={() => setSubScreen('otp')} className="text-brand-limeDark font-bold">
                        OTP Code?
                      </button>
                    </div>

                    <button onClick={() => selectChapter('04')} className="w-full py-3.5 rounded-2xl btn-3d-lime font-fun font-bold text-sm">
                      Log In to Campus Hub ✨
                    </button>

                    <div className="pt-2 flex justify-center space-x-2 text-xs font-bold">
                      <button onClick={() => setSubScreen('signup')} className="text-slate-500 hover:text-slate-900">
                        Don't have account? <span className="text-brand-limeDark underline">Sign Up</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );

          // ==========================================
          // 04. PROFILE SETUP (10-Step Wizard)
          // ==========================================
          case '04':
            return (
              <div className="space-y-4 animate-slide-up pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400">Step {setupStep} of 10</span>
                    <h3 className="font-fun text-lg font-bold text-slate-900">
                      {setupStep === 1 ? "Personal Details" :
                       setupStep === 2 ? "Upload Avatar" :
                       setupStep === 3 ? "Skills You Can Teach" :
                       setupStep === 4 ? "Skills You Want to Learn" :
                       setupStep === 5 ? "Proficiency Level" :
                       setupStep === 6 ? "Your Interests" :
                       setupStep === 7 ? "Languages Spoken" :
                       setupStep === 8 ? "Study Availability" :
                       setupStep === 9 ? "Profile Preview" : "Setup Complete! 🎉"}
                    </h3>
                  </div>
                  <span className="text-xs font-black text-brand-limeDark bg-brand-limeLight px-2 py-0.5 rounded-full">
                    {setupStep * 10}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand-limeDark h-full transition-all duration-300" style={{ width: `${setupStep * 10}%` }}></div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                  {setupStep === 1 && (
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <label className="font-bold text-slate-600">Full Name</label>
                        <input defaultValue="Alex Miller" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold" />
                      </div>
                      <div>
                        <label className="font-bold text-slate-600">Major & Department</label>
                        <input defaultValue="Computer Science & Symbolic Systems" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold" />
                      </div>
                      <div>
                        <label className="font-bold text-slate-600">Graduation Year</label>
                        <input defaultValue="Class of 2026 (Junior)" className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold" />
                      </div>
                    </div>
                  )}

                  {setupStep === 3 && (
                    <div className="space-y-2">
                      <span className="text-xs text-slate-600">Select skills you are ready to teach:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['Python & Algorithms', 'React & Web Dev', 'Calculus Math', 'Figma Prototyping', 'Organic Chemistry', 'Acoustic Guitar'].map((skill, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-brand-limeLight border border-lime-300 text-lime-950 font-bold text-xs flex items-center space-x-1.5">
                            <span>✓</span>
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {setupStep === 10 ? (
                    <div className="text-center space-y-3 py-2">
                      <MascotPip mood="excited" size="large" customMessage="All set! Welcome to UniSwap campus!" />
                      <h4 className="font-fun text-xl font-bold text-slate-900">Profile Activated!</h4>
                      <p className="text-xs text-slate-600">+100 Karma XP awarded for completing your profile.</p>
                      <button onClick={() => selectChapter('05')} className="w-full py-3.5 rounded-2xl btn-3d-lime font-fun font-bold text-sm">
                        Enter Home Feed 🏠
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2 pt-2">
                      {setupStep > 1 && (
                        <button onClick={() => setSetupStep(prev => prev - 1)} className="px-4 py-3 rounded-2xl bg-slate-100 font-bold text-xs text-slate-700">
                          Back
                        </button>
                      )}
                      <button onClick={() => { setSetupStep(prev => prev + 1); SoundFx.playPop(600); }} className="flex-1 py-3.5 rounded-2xl btn-3d-lime font-fun font-bold text-xs">
                        Continue ({setupStep}/10) →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );

          // ==========================================
          // 05. HOME FEED
          // ==========================================
          case '05':
            return (
              <div className="space-y-4 animate-slide-up pb-8">
                {/* Greeting & Mascot Tip */}
                <div className="bg-gradient-to-r from-brand-limeLight to-emerald-50 p-4 rounded-3xl border border-lime-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-lime-900">Welcome Back</span>
                    <h3 className="font-fun text-lg font-bold text-slate-900">Hey Alex! ⚡</h3>
                    <p className="text-xs text-slate-600 mt-0.5">3 swap requests waiting for midterm prep!</p>
                  </div>
                  <MascotPip mood="happy" size="small" showBubble={false} />
                </div>

                {/* Upcoming Session Card */}
                <div className="bg-slate-900 text-white p-4 rounded-3xl space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brand-lime font-bold">⏱️ Upcoming Swap Session</span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[10px]">Today 4:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" className="w-10 h-10 rounded-full object-cover border-2 border-brand-lime" />
                    <div>
                      <h4 className="font-fun text-sm font-bold">React Dev & Japanese</h4>
                      <p className="text-xs text-slate-400">with Sarah Chen • Green Library 3F</p>
                    </div>
                  </div>
                  <button onClick={() => selectChapter('11')} className="w-full py-2.5 rounded-xl btn-3d-lime text-slate-950 font-bold text-xs">
                    View Session Details →
                  </button>
                </div>

                {/* Recommended Swappers */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-slate-400">Recommended Campus Peers</span>
                    <button onClick={() => selectChapter('08')} className="text-xs font-bold text-brand-limeDark">
                      View Match Deck →
                    </button>
                  </div>

                  {MOCK_SWAPPERS.slice(0, 2).map((u, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={u.avatar} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <div className="flex items-center space-x-1">
                            <h5 className="font-bold text-xs text-slate-900">{u.name}</h5>
                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 rounded">98% match</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{u.canTeach[0].skill}</p>
                        </div>
                      </div>
                      <button onClick={() => selectChapter('08')} className="px-3 py-1.5 rounded-xl btn-3d-lime text-xs font-bold">
                        Swap
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );

          // ==========================================
          // 08. SKILL MATCHING (SWAP DECK)
          // ==========================================
          case '08':
            return (
              <div className="space-y-4 animate-slide-up pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400">08 — Swipe Matcher</span>
                    <h3 className="font-fun text-xl font-bold text-slate-900">Campus Skill Match</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brand-limeLight text-lime-900 font-bold text-xs">
                    {swapper.compatibility}% Compatibility
                  </span>
                </div>

                {/* Match Card */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xl space-y-3">
                  <div className="flex items-center space-x-3">
                    <img src={swapper.avatar} className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-lime" />
                    <div>
                      <h4 className="font-fun text-base font-bold text-slate-900">{swapper.name}</h4>
                      <p className="text-xs text-slate-500">{swapper.major} • {swapper.year}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${swapper.vibeColor}`}>
                        {swapper.vibe}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl italic">
                    "{swapper.bio}"
                  </p>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">They Teach:</span>
                    <div className="flex flex-wrap gap-1">
                      {swapper.canTeach.map((t, idx) => (
                        <span key={idx} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${t.color}`}>
                          {t.skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">They Want in Exchange:</span>
                    <div className="flex flex-wrap gap-1">
                      {swapper.wantsToLearn.map((w, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                          🎯 {w.skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button 
                      onClick={() => {
                        SoundFx.playWhoosh();
                        setCardIndex(prev => (prev + 1) % MOCK_SWAPPERS.length);
                        setSwapper(MOCK_SWAPPERS[(cardIndex + 1) % MOCK_SWAPPERS.length]);
                      }}
                      className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xl flex items-center justify-center transition"
                    >
                      ✕
                    </button>
                    <button 
                      onClick={() => {
                        SoundFx.playMatch();
                        if (window.confetti) window.confetti({ particleCount: 70, spread: 60 });
                        setIsMatchModalOpen(true);
                      }}
                      className="flex-1 h-14 rounded-2xl btn-3d-lime font-fun font-bold text-base"
                    >
                      💚 Propose Skill Swap
                    </button>
                  </div>
                </div>

                {/* Match Modal */}
                {isMatchModalOpen && (
                  <div className="bg-brand-limeLight p-4 rounded-3xl border-2 border-brand-lime space-y-3 text-center animate-pop-in">
                    <span className="text-xs font-black uppercase text-emerald-800">🎉 It's a Match!</span>
                    <h4 className="font-fun text-lg font-bold text-slate-900">You & {swapper.name} are paired!</h4>
                    <div className="flex space-x-2">
                      <button onClick={() => selectChapter('10')} className="flex-1 py-2.5 rounded-xl btn-3d-dark text-xs font-bold">
                        Open Chat 💬
                      </button>
                      <button onClick={() => selectChapter('11')} className="flex-1 py-2.5 rounded-xl btn-3d-lime text-xs font-bold text-slate-950">
                        Schedule Session 📅
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );

          // ==========================================
          // 10. MESSAGING & LIVE CHAT
          // ==========================================
          case '10':
            return (
              <div className="space-y-3 animate-slide-up pb-8 flex flex-col h-[520px]">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <img src={MOCK_SWAPPERS[0].avatar} className="w-9 h-9 rounded-full object-cover border-2 border-brand-lime" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Sarah Chen</h4>
                      <span className="text-[10px] text-emerald-600 font-bold">● Online • Stanford CS</span>
                    </div>
                  </div>
                  <button onClick={() => selectChapter('11')} className="px-3 py-1 rounded-xl btn-3d-lime text-[10px] font-bold">
                    📅 Book Swap
                  </button>
                </div>

                {/* Message Stream */}
                <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                  {chatMessages.map(m => (
                    <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] p-3 rounded-2xl text-xs font-medium ${
                        m.sender === 'me' ? 'bg-slate-900 text-white rounded-br-none' : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-xs'
                      }`}>
                        <p>{m.text}</p>
                        <span className="text-[9px] opacity-60 block text-right mt-1">{m.time}</span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-[10px] text-slate-400 italic">Sarah is typing...</div>
                  )}
                </div>

                {/* Input Bar */}
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={inputMsg} 
                    onChange={e => setInputMsg(e.target.value)}
                    placeholder="Type study notes or message..."
                    className="flex-1 p-3 rounded-2xl bg-white border border-slate-200 text-xs outline-none"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && inputMsg.trim()) {
                        setChatMessages([...chatMessages, { id: Date.now(), sender: 'me', text: inputMsg, time: 'Just now' }]);
                        setInputMsg('');
                        SoundFx.playPop(700);
                      }
                    }}
                  />
                  <button 
                    onClick={() => {
                      if (inputMsg.trim()) {
                        setChatMessages([...chatMessages, { id: Date.now(), sender: 'me', text: inputMsg, time: 'Just now' }]);
                        setInputMsg('');
                        SoundFx.playPop(700);
                      }
                    }}
                    className="w-11 h-11 rounded-2xl btn-3d-lime flex items-center justify-center font-bold"
                  >
                    ➤
                  </button>
                </div>
              </div>
            );

          // ==========================================
          // 11. SESSIONS & SCHEDULER
          // ==========================================
          case '11':
            return (
              <div className="space-y-4 animate-slide-up pb-8">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400">11 — Session Management</span>
                  <h3 className="font-fun text-xl font-bold text-slate-900">Study Session Details</h3>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-3 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-500">Status:</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">✓ Confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Topic:</span>
                    <span className="font-bold text-slate-900">React Hooks & Japanese Verbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Date & Time:</span>
                    <span className="font-bold text-slate-900">Tomorrow • 4:00 PM (60 min)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Location:</span>
                    <span className="font-bold text-slate-900">Green Library 3rd Floor / Virtual</span>
                  </div>

                  <div className="pt-2 flex flex-col space-y-2">
                    <button onClick={() => triggerToast("Session link launched!")} className="w-full py-3.5 rounded-2xl btn-3d-lime font-fun font-bold text-xs text-slate-950">
                      Join Live Study Room 💻
                    </button>
                    <button onClick={() => triggerToast("Reschedule requested!")} className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
                      Reschedule Session 📅
                    </button>
                  </div>
                </div>
              </div>
            );

          // ==========================================
          // 20. EMPTY & ERROR STATES
          // ==========================================
          case '20':
            return (
              <div className="space-y-4 animate-slide-up pb-8 text-center">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400">20 — Edge Cases</span>
                  <h3 className="font-fun text-xl font-bold text-slate-900">Empty & Error State Matrix</h3>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                  <MascotPip mood="thinking" size="normal" customMessage="Oops! No matches found for this filter!" />
                  <h4 className="font-fun text-base font-bold text-slate-900">No Search Results Found</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Try broadening your skill keywords or switching campus locations to find available peers.
                  </p>
                  <button onClick={() => triggerToast("Filters reset!")} className="px-6 py-3 rounded-2xl btn-3d-lime font-bold text-xs">
                    Reset All Filters 🔄
                  </button>
                </div>
              </div>
            );

          // ==========================================
          // 21. FINAL GUIDED PROTOTYPE FLOWS
          // ==========================================
          case '21':
            return (
              <div className="space-y-4 animate-slide-up pb-8">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400">21 — End-to-End Walkthroughs</span>
                  <h3 className="font-fun text-xl font-bold text-slate-900">Interactive Prototype Flows</h3>
                </div>

                <div className="space-y-2.5">
                  {[
                    { title: '🔄 Flow 1: Onboarding & Profile Setup', desc: 'Splash → Welcome → 10-step wizard → Profile Ready', target: '02' },
                    { title: '💚 Flow 2: Skill Matching & Proposal', desc: 'Explore deck → Propose swap → It\'s a Match!', target: '08' },
                    { title: '💬 Flow 3: Messaging & Instant Booking', desc: 'Chat thread → Request session → Calendar sync', target: '10' },
                    { title: '📅 Flow 4: Session Execution & Ratings', desc: 'Live whiteboard room → Rate 5-stars → +100 XP', target: '11' },
                  ].map((flow, i) => (
                    <div 
                      key={i} 
                      onClick={() => selectChapter(flow.target)}
                      className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer transition"
                    >
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{flow.title}</h4>
                        <p className="text-[11px] text-slate-500">{flow.desc}</p>
                      </div>
                      <span className="text-sm text-brand-limeDark font-black">▶</span>
                    </div>
                  ))}
                </div>
              </div>
            );

          // ==========================================
          // 22. FIGMA PAGES TREE / MATRIX
          // ==========================================
          case '22':
            return (
              <div className="space-y-4 animate-slide-up pb-8">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400">22 — Architecture Matrix</span>
                  <h3 className="font-fun text-xl font-bold text-slate-900">Recommended Figma Pages Tree</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {FIGMA_CHAPTERS.map(ch => (
                    <div 
                      key={ch.id}
                      onClick={() => selectChapter(ch.id)}
                      className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{ch.icon}</span>
                        <span className="font-bold text-slate-900">{ch.title}</span>
                      </div>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-600 font-semibold">{ch.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            );

          // Default fallback for remaining screens
          default:
            return (
              <div className="space-y-4 animate-slide-up pb-8 text-center">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
                  <MascotPip mood="happy" size="normal" customMessage={`Viewing module ${activeChapter}!`} />
                  <h4 className="font-fun text-lg font-bold text-slate-900">
                    {FIGMA_CHAPTERS.find(c => c.id === activeChapter)?.title}
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Full spec preview for {FIGMA_CHAPTERS.find(c => c.id === activeChapter)?.badge}.
                  </p>
                  <button onClick={() => selectChapter('08')} className="px-6 py-3 rounded-2xl btn-3d-lime font-bold text-xs">
                    Return to Match Deck 🔥
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

print("Successfully wrote standalone.html and index.html with all 22 Figma chapters!")
