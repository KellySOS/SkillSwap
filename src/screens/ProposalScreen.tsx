import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Calendar, 
  Clock, 
  Video, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  User as UserIcon, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { ScreenType, SwapRequest, User } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface ProposalScreenProps {
  currentUser: User;
  partner: User | null;
  onNavigate: (screen: ScreenType) => void;
  onSubmitProposal: (swapData: Partial<SwapRequest>) => void;
  onSelectPartner: (partner: User) => void;
}

export const ProposalScreen: React.FC<ProposalScreenProps> = ({
  currentUser,
  partner,
  onNavigate,
  onSubmitProposal,
  onSelectPartner,
}) => {
  // If no partner selected, default to the first mock user (Kenji Takahashi)
  const activePartner = partner || MOCK_USERS[0];

  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState(
    currentUser.skillsOffered[0]?.name || 'React & TypeScript'
  );
  const [selectedRequestedSkill, setSelectedRequestedSkill] = useState(
    activePartner.skillsOffered[0]?.name || 'Japanese (JLPT / Casual)'
  );
  const [sessionDate, setSessionDate] = useState('Tomorrow, Aug 31');
  const [sessionTime, setSessionTime] = useState('7:00 PM - 8:00 PM (60 min)');
  const [sessionFormat, setSessionFormat] = useState<'1-on-1 Video' | 'Code & Screen Share' | 'Project Review' | 'Language Practice'>('1-on-1 Video');
  const [proposalNote, setProposalNote] = useState(
    `Hi ${activePartner.name.split(' ')[0]}! I saw your profile and would love to exchange 30 mins of ${selectedOfferedSkill} for 30 mins of ${selectedRequestedSkill}. Let me know if the time slot works for you!`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProposal({
      partnerId: activePartner.id,
      partnerName: activePartner.name,
      partnerAvatar: activePartner.avatar,
      offeredSkill: selectedOfferedSkill,
      requestedSkill: selectedRequestedSkill,
      date: sessionDate,
      time: sessionTime,
      duration: 60,
      format: sessionFormat,
      note: proposalNote,
      status: 'accepted',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('explore')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Skill Directory (Step 3)</span>
        </button>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-brand-accent text-xs font-bold shadow-xs">
          <span>Step 4: Action Screen — Proposal & Schedule Setup</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Configure Your 1-on-1 Skill Barter
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            Choose what you will teach, select the skill you will learn in return, and pick a mutual time slot. Both members exchange equal time.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          
          {/* Step 4.1: Partner Selection Strip */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              1. Select Exchange Partner:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MOCK_USERS.slice(0, 3).map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    onSelectPartner(user);
                    setSelectedRequestedSkill(user.skillsOffered[0]?.name || '');
                  }}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-center space-x-3 ${
                    activePartner.id === user.id
                      ? 'border-brand-primary bg-indigo-50/70 shadow-md ring-2 ring-indigo-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-11 h-11 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.title}</p>
                    <span className="text-[10px] text-emerald-600 font-bold">★ {user.rating} ({user.swapsCompleted} swaps)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4.2: Exchange Matrix */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span>2. Select Skills to Exchange</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* You Teach */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-brand-primary flex items-center justify-center font-bold text-xs">
                    You
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900">You Teach (Skill Offered)</span>
                    <p className="text-[11px] text-slate-400">From your verified repertoire</p>
                  </div>
                </div>

                <select
                  value={selectedOfferedSkill}
                  onChange={(e) => setSelectedOfferedSkill(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-brand-primary outline-none"
                >
                  {currentUser.skillsOffered.map((skill) => (
                    <option key={skill.id} value={skill.name}>
                      {skill.name} ({skill.level})
                    </option>
                  ))}
                </select>
              </div>

              {/* Partner Teaches */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-secondary flex items-center justify-center font-bold text-xs">
                    {activePartner.name.split(' ')[0]}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900">Partner Teaches (Skill Requested)</span>
                    <p className="text-[11px] text-slate-400">From {activePartner.name}'s offerings</p>
                  </div>
                </div>

                <select
                  value={selectedRequestedSkill}
                  onChange={(e) => setSelectedRequestedSkill(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-brand-primary outline-none"
                >
                  {activePartner.skillsOffered.map((skill) => (
                    <option key={skill.id} value={skill.name}>
                      {skill.name} ({skill.level})
                    </option>
                  ))}
                </select>
              </div>

            </div>

          </div>

          {/* Step 4.3: Session Logistics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              3. Session Logistics & Delivery Mode
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Target Date</span>
                </label>
                <select
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white outline-none"
                >
                  <option value="Tomorrow, Aug 31">Tomorrow, Aug 31</option>
                  <option value="Wednesday, Sep 2">Wednesday, Sep 2</option>
                  <option value="Friday, Sep 4">Friday, Sep 4</option>
                  <option value="Saturday, Sep 5">Saturday, Sep 5</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Time & Duration</span>
                </label>
                <select
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white outline-none"
                >
                  <option value="6:00 PM - 7:00 PM (60 min)">6:00 PM - 7:00 PM (60m)</option>
                  <option value="7:00 PM - 8:00 PM (60 min)">7:00 PM - 8:00 PM (60m)</option>
                  <option value="8:30 PM - 9:30 PM (60 min)">8:30 PM - 9:30 PM (60m)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center space-x-1">
                  <Video className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Format</span>
                </label>
                <select
                  value={sessionFormat}
                  onChange={(e) => setSessionFormat(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white outline-none"
                >
                  <option value="1-on-1 Video">1-on-1 Live Video</option>
                  <option value="Code & Screen Share">Code & Screen Share</option>
                  <option value="Project Review">Project Review</option>
                  <option value="Language Practice">Language Practice</option>
                </select>
              </div>
            </div>
          </div>

          {/* Proposal Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              4. Introductory Proposal Message
            </label>
            <textarea
              rows={3}
              value={proposalNote}
              onChange={(e) => setProposalNote(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-brand-primary outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Submission Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-brand-secondary shrink-0" />
              <span>100% Free · Equal Time Swap Protected</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm shadow-xl shadow-indigo-300/40 flex items-center justify-center space-x-2 active:scale-95 transition"
            >
              <Send className="w-4 h-4" />
              <span>Submit Proposal & Confirm (Go to Step 5)</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
