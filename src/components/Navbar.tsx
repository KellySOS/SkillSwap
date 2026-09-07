import React from 'react';
import { 
  ArrowLeftRight, 
  Search, 
  Palette, 
  Layers, 
  Calendar, 
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { ScreenType, User } from '../types';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenDesignSystem: () => void;
  currentUser: User;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenDesignSystem,
  currentUser,
  onOpenAuth,
  isLoggedIn,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-indigo-600 to-brand-accent">
                SkillSwap
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-wider font-bold bg-emerald-100 text-brand-secondary px-2 py-0.5 rounded-full border border-emerald-200">
                P2P Platform
              </span>
            </div>
          </div>

          {/* Center Search (visible when on explore/home) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentScreen !== 'explore') onNavigate('explore');
                }}
                placeholder="Search skills to learn (e.g. Japanese, Figma, React)..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-brand-primary rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Navigation Links & Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Primary navigation items */}
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentScreen === 'home'
                  ? 'text-brand-primary bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentScreen === 'explore'
                  ? 'text-brand-primary bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span>Explore Skills</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentScreen === 'dashboard'
                  ? 'text-brand-primary bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">My Swaps</span>
            </button>

            {/* Design System Inspector button */}
            <button
              onClick={onOpenDesignSystem}
              title="Inspect Design System & Brand Colors"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200"
            >
              <Palette className="w-3.5 h-3.5 text-brand-primary" />
              <span className="hidden lg:inline">Design System</span>
            </button>

            {/* User Profile / Auth Action */}
            {isLoggedIn ? (
              <div 
                onClick={() => onNavigate('dashboard')}
                className="flex items-center space-x-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-brand-primary/50 cursor-pointer bg-slate-50 transition"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-emerald-400"
                />
                <span className="text-xs font-medium text-slate-700 hidden sm:inline max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-secondary mr-1"></span>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-semibold bg-brand-primary hover:bg-brand-primary-hover text-white shadow-sm shadow-indigo-200 transition active:scale-95"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
