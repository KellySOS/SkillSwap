import React, { useState } from 'react';
import { 
  LogIn, 
  UserPlus, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Plus, 
  X, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  ArrowLeftRight,
  Github
} from 'lucide-react';
import { ScreenType, Skill, SkillLevel, User } from '../types';

interface AuthScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSaveProfile: (userData: Partial<User>) => void;
  currentUser: User;
}

const PRESET_TEACH_SKILLS = [
  'React & TypeScript', 'Python & Machine Learning', 'UI/UX & Figma',
  'Conversational Spanish', 'Japanese (JLPT)', 'Acoustic Guitar',
  'Piano & Music Theory', 'Digital Marketing', 'Vinyasa Yoga'
];

const PRESET_LEARN_SKILLS = [
  'Japanese (Conversational)', 'Acoustic Guitar', 'Digital Illustration',
  'Next.js App Router', 'French Conversation', '3D Blender Modeling',
  'Public Speaking', 'Vocal Mixing'
];

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onNavigate,
  onSaveProfile,
  currentUser,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('register');
  const [name, setName] = useState(currentUser.name);
  const [title, setTitle] = useState(currentUser.title);
  const [bio, setBio] = useState(currentUser.bio);
  
  const [skillsOffered, setSkillsOffered] = useState<string[]>(
    currentUser.skillsOffered.map((s) => s.name)
  );
  const [newTeachSkill, setNewTeachSkill] = useState('');
  
  const [skillsWanted, setSkillsWanted] = useState<string[]>(
    currentUser.skillsWanted.map((s) => s.name)
  );
  const [newLearnSkill, setNewLearnSkill] = useState('');

  const handleAddTeach = (skill: string) => {
    if (!skill.trim() || skillsOffered.includes(skill)) return;
    setSkillsOffered([...skillsOffered, skill]);
    setNewTeachSkill('');
  };

  const handleRemoveTeach = (skill: string) => {
    setSkillsOffered(skillsOffered.filter((s) => s !== skill));
  };

  const handleAddLearn = (skill: string) => {
    if (!skill.trim() || skillsWanted.includes(skill)) return;
    setSkillsWanted([...skillsWanted, skill]);
    setNewLearnSkill('');
  };

  const handleRemoveLearn = (skill: string) => {
    setSkillsWanted(skillsWanted.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedOffered: Skill[] = skillsOffered.map((s, idx) => ({
      id: `offered-${idx}`,
      name: s,
      category: 'General',
      level: 'Master' as SkillLevel,
    }));

    const formattedWanted: Skill[] = skillsWanted.map((s, idx) => ({
      id: `wanted-${idx}`,
      name: s,
      category: 'General',
      level: 'Beginner' as SkillLevel,
    }));

    onSaveProfile({
      name,
      title,
      bio,
      skillsOffered: formattedOffered,
      skillsWanted: formattedWanted,
    });

    // Proceed directly to Step 3 (Core Feature)
    onNavigate('explore');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      
      {/* Step 2 Badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-brand-primary text-xs font-bold mb-3 shadow-xs">
          <span>Step 2: Login & Skill Profile Setup</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Join SkillSwap & Setup Your Exchange Profile
        </h1>
        <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
          Create your profile to start finding perfect barter matches across languages, coding, design, and music.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Tab Header */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-2">
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-center rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition ${
              tab === 'register'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>1. Create Profile & Skills (Recommended)</span>
          </button>
          
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-center rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition ${
              tab === 'login'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>2. Quick Sign In</span>
          </button>
        </div>

        {/* Quick Social Auth Buttons */}
        <div className="p-6 pb-2 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              onSaveProfile({ name: 'Alex Morgan' });
              onNavigate('explore');
            }}
            className="flex-1 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center space-x-2 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSaveProfile({ name: 'Alex Morgan' });
              onNavigate('explore');
            }}
            className="flex-1 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center space-x-2 transition"
          >
            <Github className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-brand-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Professional Title / Role
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Full Stack Dev & Tech Mentor"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-brand-primary outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Short Bio & Exchange Philosophy
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others what you are eager to learn and your teaching approach..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-brand-primary outline-none resize-none"
            />
          </div>

          {/* Section 1: What Can You Teach? */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-brand-primary" />
                <span>Skills You Can Teach (Offered Skills)</span>
              </span>
              <span className="text-[11px] text-indigo-600 font-semibold">{skillsOffered.length} selected</span>
            </div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2">
              {skillsOffered.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-indigo-900 text-xs font-semibold shadow-xs"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTeach(skill)}
                    className="hover:text-rose-500 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add custom or pick presets */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTeachSkill}
                onChange={(e) => setNewTeachSkill(e.target.value)}
                placeholder="Type a skill and press Add (e.g. Python, Salsa Dancing)..."
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:border-brand-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTeach(newTeachSkill);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleAddTeach(newTeachSkill)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Preset Suggestions */}
            <div className="flex items-center flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 font-medium">Quick Suggestions:</span>
              {PRESET_TEACH_SKILLS.filter((s) => !skillsOffered.includes(s)).slice(0, 4).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddTeach(s)}
                  className="text-[11px] bg-white hover:bg-indigo-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg transition"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: What Do You Want to Learn? */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-brand-secondary" />
                <span>Skills You Want to Learn (Requested Skills)</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold">{skillsWanted.length} selected</span>
            </div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2">
              {skillsWanted.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-900 text-xs font-semibold shadow-xs"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLearn(skill)}
                    className="hover:text-rose-500 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add custom or pick presets */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newLearnSkill}
                onChange={(e) => setNewLearnSkill(e.target.value)}
                placeholder="Type a target skill and press Add (e.g. Japanese, Guitar)..."
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:border-brand-secondary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddLearn(newLearnSkill);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleAddLearn(newLearnSkill)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Preset Suggestions */}
            <div className="flex items-center flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 font-medium">Popular Wants:</span>
              {PRESET_LEARN_SKILLS.filter((s) => !skillsWanted.includes(s)).slice(0, 4).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddLearn(s)}
                  className="text-[11px] bg-white hover:bg-emerald-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg transition"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action Submit Button */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Skills will be matched automatically on Step 3</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm shadow-xl shadow-indigo-300/40 flex items-center justify-center space-x-2 active:scale-95 transition"
            >
              <span>Save & Discover Swappers (Go to Step 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
