import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRightLeft, 
  Calendar, 
  Clock, 
  Video, 
  Copy, 
  Check, 
  Sparkles, 
  Play, 
  ArrowRight,
  Share2,
  Download,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScreenType, SwapRequest, User } from '../types';

interface ConfirmationScreenProps {
  latestSwap: SwapRequest | null;
  currentUser: User;
  onNavigate: (screen: ScreenType) => void;
  onEnterLiveRoom: (swap: SwapRequest) => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  latestSwap,
  currentUser,
  onNavigate,
  onEnterLiveRoom,
}) => {
  const [copiedLink, setCopiedLink] = React.useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (e) {
      console.log('Confetti effect fired');
    }
  }, []);

  const swap = latestSwap || {
    id: 'SWAP-89241',
    partnerId: 'user-01',
    partnerName: 'Kenji Takahashi',
    partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    offeredSkill: 'React & TypeScript',
    requestedSkill: 'Japanese (JLPT / Casual)',
    date: 'Tomorrow, Aug 31',
    time: '7:00 PM - 8:00 PM',
    duration: 60,
    format: '1-on-1 Video',
    note: 'Looking forward to our Japanese & React session!',
    status: 'accepted' as const,
    createdAt: 'Just now',
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://skillswap.live/room/${swap.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in space-y-8">
      
      {/* Step 5 Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-brand-secondary text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Step 5: Result Screen — Swap Confirmed!</span>
        </div>

        {/* Big Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl shadow-emerald-200 animate-scale-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Skill Swap Match Confirmed!
        </h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Your proposal was accepted. Both parties are confirmed for a 1-hour reciprocal exchange.
        </p>
      </div>

      {/* Confirmation Card / Receipt */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Top Reference Strip */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Confirmation ID:</span>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-slate-800 px-2 py-0.5 rounded">
              #{swap.id}
            </span>
          </div>
          <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Status: Confirmed & Scheduled</span>
          </span>
        </div>

        {/* Exchange Matrix Visual */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: You Teach */}
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-xl object-cover border border-white shadow-sm"
              />
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">You Will Teach</p>
                <p className="text-sm font-extrabold text-indigo-900">{swap.offeredSkill}</p>
                <p className="text-xs text-slate-500">{currentUser.name}</p>
              </div>
            </div>

            {/* Middle Exchange Badge */}
            <div className="w-10 h-10 rounded-full bg-white text-indigo-600 shadow-sm border border-indigo-200 flex items-center justify-center font-bold shrink-0">
              <ArrowRightLeft className="w-5 h-5 text-brand-primary" />
            </div>

            {/* Right: Partner Teaches */}
            <div className="flex items-center space-x-3 w-full sm:w-auto sm:text-right flex-row-reverse sm:flex-row">
              <div className="mr-3 sm:mr-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">You Will Learn</p>
                <p className="text-sm font-extrabold text-emerald-900">{swap.requestedSkill}</p>
                <p className="text-xs text-slate-500">{swap.partnerName}</p>
              </div>
              <img
                src={swap.partnerAvatar}
                alt={swap.partnerName}
                className="w-12 h-12 rounded-xl object-cover border border-white shadow-sm shrink-0"
              />
            </div>

          </div>

          {/* Session Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block mb-1 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                <span>Date</span>
              </span>
              <span className="font-bold text-slate-900 text-sm">{swap.date}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block mb-1 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Time & Duration</span>
              </span>
              <span className="font-bold text-slate-900 text-sm">{swap.time}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block mb-1 flex items-center space-x-1">
                <Video className="w-3.5 h-3.5 text-indigo-600" />
                <span>Platform</span>
              </span>
              <span className="font-bold text-slate-900 text-sm">{swap.format}</span>
            </div>
          </div>

          {/* Room Link & Copy */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-700 min-w-0">
              <Video className="w-4 h-4 text-brand-primary shrink-0" />
              <span className="font-mono truncate">https://skillswap.live/room/{swap.id}</span>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-semibold flex items-center space-x-1 transition shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Room Link'}</span>
            </button>
          </div>

          {/* Zero-Cost & Safety Assurance */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center space-x-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-brand-secondary shrink-0" />
            <span>
              <strong>Zero Payment Required:</strong> Both peers receive 100% free guidance. After completing the session, you will both receive a verified skill rating badge.
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
            >
              View in My Swaps Dashboard
            </button>

            {/* Launch live room button */}
            <button
              onClick={() => onEnterLiveRoom(swap)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold shadow-xl shadow-indigo-300/40 flex items-center justify-center space-x-2 active:scale-95 transition"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Simulated Live Room Now</span>
            </button>

          </div>

        </div>

      </div>

      {/* Return to Flow CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-semibold text-brand-primary hover:underline"
        >
          ← Return to Home Screen (Step 1)
        </button>
      </div>

    </div>
  );
};
