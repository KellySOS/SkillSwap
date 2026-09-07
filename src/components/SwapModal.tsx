import React, { useState } from 'react';
import { 
  X, 
  ArrowRightLeft, 
  Calendar, 
  Clock, 
  Video, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Send,
  ShieldCheck
} from 'lucide-react';
import { User, SwapRequest } from '../types';

interface SwapModalProps {
  partner: User | null;
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmitProposal: (swapData: Partial<SwapRequest>) => void;
}

export const SwapModal: React.FC<SwapModalProps> = ({
  partner,
  currentUser,
  isOpen,
  onClose,
  onSubmitProposal,
}) => {
  if (!isOpen || !partner) return null;

  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState(
    currentUser.skillsOffered[0]?.name || 'React & TypeScript'
  );
  const [selectedRequestedSkill, setSelectedRequestedSkill] = useState(
    partner.skillsOffered[0]?.name || ''
  );
  const [sessionDate, setSessionDate] = useState('Tomorrow, Aug 31');
  const [sessionTime, setSessionTime] = useState('7:00 PM - 8:00 PM (1 hour)');
  const [sessionFormat, setSessionFormat] = useState<'1-on-1 Video' | 'Code & Screen Share' | 'Project Review' | 'Language Practice'>('1-on-1 Video');
  const [proposalNote, setProposalNote] = useState(
    `Hey ${partner.name.split(' ')[0]}! I'd love to learn ${partner.skillsOffered[0]?.name || 'your skill'} with you. In return, I can help you with ${currentUser.skillsOffered[0]?.name || 'my skills'}. Let me know if this time works!`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProposal({
      partnerId: partner.id,
      partnerName: partner.name,
      partnerAvatar: partner.avatar,
      offeredSkill: selectedOfferedSkill,
      requestedSkill: selectedRequestedSkill,
      date: sessionDate,
      time: sessionTime,
      duration: 60,
      format: sessionFormat,
      note: proposalNote,
      status: 'accepted', // instant acceptance for rich prototype demo
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      
      {/* Modal Box */}
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-in">
        
        {/* Header with Step 4 badge */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-orange-500 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                Step 4: Action Screen
              </span>
              <span className="text-xs text-indigo-200">Configure Skill Swap Proposal</span>
            </div>
            <h2 className="text-xl font-extrabold mt-1 text-white flex items-center space-x-2">
              <span>Propose Swap with {partner.name}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Partner & User Exchange Preview Header */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="text-xs text-slate-500 font-medium">You Offer</p>
                <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white text-indigo-600 shadow-sm border border-indigo-100 flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-5 h-5 text-brand-primary" />
            </div>

            <div className="flex items-center space-x-3 text-right">
              <div>
                <p className="text-xs text-slate-500 font-medium">You Receive</p>
                <p className="text-sm font-bold text-slate-900">{partner.name}</p>
              </div>
              <img
                src={partner.avatar}
                alt={partner.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
              />
            </div>
          </div>

          {/* Skill Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* What you teach */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select Skill You Will Teach:
              </label>
              <select
                value={selectedOfferedSkill}
                onChange={(e) => setSelectedOfferedSkill(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              >
                {currentUser.skillsOffered.map((skill) => (
                  <option key={skill.id} value={skill.name}>
                    {skill.name} ({skill.level})
                  </option>
                ))}
              </select>
            </div>

            {/* What partner teaches */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Select Skill You Want to Learn:
              </label>
              <select
                value={selectedRequestedSkill}
                onChange={(e) => setSelectedRequestedSkill(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              >
                {partner.skillsOffered.map((skill) => (
                  <option key={skill.id} value={skill.name}>
                    {skill.name} ({skill.level})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Date, Time & Format */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                <span>Preferred Date</span>
              </label>
              <select
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
              >
                <option value="Tomorrow, Aug 31">Tomorrow (Aug 31)</option>
                <option value="Wednesday, Sep 2">Wednesday (Sep 2)</option>
                <option value="Friday, Sep 4">Friday (Sep 4)</option>
                <option value="This Weekend (Flexible)">This Weekend</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Time Slot</span>
              </label>
              <select
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
              >
                <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                <option value="8:30 PM - 9:30 PM">8:30 PM - 9:30 PM</option>
                <option value="Weekend Morning (10 AM)">Weekend Morning (10 AM)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <Video className="w-3.5 h-3.5 text-indigo-600" />
                <span>Exchange Format</span>
              </label>
              <select
                value={sessionFormat}
                onChange={(e) => setSessionFormat(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
              >
                <option value="1-on-1 Video">1-on-1 Live Video</option>
                <option value="Code & Screen Share">Code & Screen Share</option>
                <option value="Project Review">Project Review</option>
                <option value="Language Practice">Language Practice</option>
              </select>
            </div>

          </div>

          {/* Proposal Message Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                <span>Proposal Message & Goal</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Optional personal note</span>
            </label>
            <textarea
              rows={3}
              value={proposalNote}
              onChange={(e) => setProposalNote(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Swap Guarantee Banner */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center space-x-2.5 text-xs text-emerald-800">
            <ShieldCheck className="w-5 h-5 text-brand-secondary shrink-0" />
            <span>
              <strong>Zero-Cost Guarantee:</strong> Both partners exchange equal value (1 hr for 1 hr). No monetary transaction ever required.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-brand-primary hover:bg-brand-primary-hover text-white shadow-lg shadow-indigo-200 active:scale-95 transition"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Send Proposal</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
