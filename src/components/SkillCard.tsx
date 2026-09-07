import React from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  ArrowRightLeft, 
  CheckCircle, 
  Sparkles, 
  MessageSquare,
  Zap
} from 'lucide-react';
import { User } from '../types';

interface SkillCardProps {
  user: User;
  onProposeSwap: (partner: User) => void;
  onViewProfile?: (partner: User) => void;
  currentUserSkillsOffered?: string[];
}

export const SkillCard: React.FC<SkillCardProps> = ({
  user,
  onProposeSwap,
  onViewProfile,
  currentUserSkillsOffered = ['React & TypeScript', 'API Architecture', 'UI/UX System Design'],
}) => {
  // Calculate smart match compatibility
  const hasDirectMatch = user.skillsWanted.some((wanted) =>
    currentUserSkillsOffered.some((offered) =>
      wanted.name.toLowerCase().includes(offered.toLowerCase()) ||
      offered.toLowerCase().includes(wanted.name.toLowerCase())
    )
  );

  const matchScore = hasDirectMatch ? 96 + (user.rating >= 4.9 ? 3 : 0) : 84;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
      
      {/* Top Banner / Match Score Ribbon */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between">
          
          {/* Avatar + Info */}
          <div className="flex items-start space-x-3.5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                style={{ width: '52px', height: '52px' }}
              />
              {user.isOnline && (
                <span 
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-secondary border-2 border-white rounded-full"
                  title="Online Now"
                />
              )}
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors text-base">
                  {user.name}
                </h3>
                {user.rating >= 4.9 && (
                  <CheckCircle className="w-4 h-4 text-brand-secondary fill-emerald-100" />
                )}
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 font-medium">{user.title}</p>
              
              <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-400">
                <span className="flex items-center space-x-0.5 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{user.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({user.reviewCount})</span>
                </span>
                <span>•</span>
                <span className="text-slate-500">{user.swapsCompleted} swaps</span>
              </div>
            </div>

          </div>

          {/* AI Match Badge */}
          <div className="text-right">
            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              matchScore >= 90
                ? 'bg-orange-100 text-brand-accent border border-orange-200 shadow-xs'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
            }`}>
              <Zap className="w-3 h-3 fill-current" />
              <span>{matchScore}% Match</span>
            </span>
          </div>

        </div>

        {/* Bio summary */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {user.bio}
        </p>

      </div>

      {/* Skills Exchange Matrix */}
      <div className="px-5 py-3 bg-slate-50/70 border-t border-b border-slate-100 space-y-2.5">
        
        {/* Can Teach (Offered) */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            <span className="flex items-center space-x-1 text-indigo-700">
              <Sparkles className="w-3 h-3 text-brand-primary" />
              <span>Teaches (Offered)</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {user.skillsOffered.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs font-medium"
              >
                <span>{skill.name}</span>
                <span className="text-[10px] bg-indigo-200/70 text-indigo-900 px-1 rounded font-semibold">
                  {skill.level}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Wants to Learn (Requested) */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            <span className="flex items-center space-x-1 text-emerald-700">
              <ArrowRightLeft className="w-3 h-3 text-brand-secondary" />
              <span>Wants to Learn</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {user.skillsWanted.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Card Footer Actions */}
      <div className="p-4 bg-white flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="truncate max-w-[120px]">{user.responseTime}</span>
        </div>

        <div className="flex items-center space-x-2">
          {onViewProfile && (
            <button
              onClick={() => onViewProfile(user)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200"
            >
              Details
            </button>
          )}

          <button
            onClick={() => onProposeSwap(user)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md shadow-indigo-200 active:scale-95 transition"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Propose Swap</span>
          </button>
        </div>
      </div>

    </div>
  );
};
