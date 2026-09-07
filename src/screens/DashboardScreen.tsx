import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRightLeft, 
  Play, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Video, 
  Plus, 
  Check, 
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { ScreenType, SwapRequest, User } from '../types';

interface DashboardScreenProps {
  currentUser: User;
  swaps: SwapRequest[];
  onNavigate: (screen: ScreenType) => void;
  onEnterLiveRoom: (swap: SwapRequest) => void;
  onAcceptSwap: (swapId: string) => void;
  onDeclineSwap: (swapId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  currentUser,
  swaps,
  onNavigate,
  onEnterLiveRoom,
  onAcceptSwap,
  onDeclineSwap,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'accepted' | 'pending' | 'completed'>('all');

  const filteredSwaps = swaps.filter((s) => {
    if (filterTab === 'all') return true;
    return s.status === filterTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Skill Exchange Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your scheduled sessions, incoming barter proposals, and learning history.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('explore')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold shadow-md shadow-indigo-200 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Discover New Swaps</span>
          </button>
        </div>
      </div>

      {/* Stats Overview Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed Swaps</span>
            <ArrowRightLeft className="w-4 h-4 text-brand-primary" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{currentUser.swapsCompleted + 1}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">↑ 100% mutual barter</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Hours Exchanged</span>
            <Clock className="w-4 h-4 text-brand-secondary" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{currentUser.swapsCompleted * 2} hrs</p>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">Equal teach & learn</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Peer Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{currentUser.rating.toFixed(1)} / 5.0</p>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{currentUser.reviewCount} verified reviews</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Saved on Tutors</span>
            <Sparkles className="w-4 h-4 text-brand-accent" />
          </div>
          <p className="text-2xl font-extrabold text-brand-secondary">$2,450</p>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">Zero monetary expense</p>
        </div>

      </div>

      {/* Main Content: Swaps List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6">
        
        {/* Filter Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            {(['all', 'accepted', 'pending', 'completed'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterTab(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                  filterTab === t
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t === 'accepted' ? 'Upcoming & Active' : t}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400">{filteredSwaps.length} sessions</span>
        </div>

        {/* Swaps Cards List */}
        <div className="space-y-4">
          {filteredSwaps.map((swap) => (
            <div
              key={swap.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-200 bg-slate-50/50 hover:bg-white transition-all duration-200 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
            >
              {/* Partner + Exchange breakdown */}
              <div className="flex items-start space-x-4">
                <img
                  src={swap.partnerAvatar}
                  alt={swap.partnerName}
                  className="w-13 h-13 rounded-2xl object-cover border border-white shadow-sm"
                  style={{ width: '52px', height: '52px' }}
                />

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-900 text-sm">{swap.partnerName}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      swap.status === 'accepted'
                        ? 'bg-emerald-100 text-brand-secondary border-emerald-200'
                        : swap.status === 'pending'
                        ? 'bg-amber-100 text-brand-accent border-amber-200'
                        : 'bg-slate-200 text-slate-700 border-slate-300'
                    }`}>
                      {swap.status === 'accepted' ? 'Confirmed' : swap.status}
                    </span>
                  </div>

                  {/* Skills Exchange Matrix Line */}
                  <div className="flex items-center space-x-2 mt-1.5 text-xs">
                    <span className="text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                      You Teach: {swap.offeredSkill}
                    </span>
                    <ArrowRightLeft className="w-3 h-3 text-slate-400" />
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      You Learn: {swap.requestedSkill}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-1 italic">
                    "{swap.note}"
                  </p>
                </div>
              </div>

              {/* Date & Action Controls */}
              <div className="flex items-center justify-between lg:justify-end space-x-4 border-t lg:border-t-0 pt-3 lg:pt-0">
                <div className="text-left lg:text-right text-xs">
                  <div className="flex items-center lg:justify-end space-x-1 font-bold text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{swap.date}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {swap.time} ({swap.format})
                  </div>
                </div>

                {/* Status-specific actions */}
                {swap.status === 'accepted' && (
                  <button
                    onClick={() => onEnterLiveRoom(swap)}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 active:scale-95 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Enter Live Room</span>
                  </button>
                )}

                {swap.status === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onAcceptSwap(swap.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => onDeclineSwap(swap.id)}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center space-x-1 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
