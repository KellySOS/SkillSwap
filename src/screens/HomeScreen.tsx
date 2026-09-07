import React from 'react';
import { 
  ArrowRight, 
  ArrowRightLeft, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Zap, 
  Code, 
  Languages, 
  Palette, 
  Music, 
  Briefcase, 
  HeartPulse, 
  Star,
  CheckCircle2,
  TrendingUp,
  Play
} from 'lucide-react';
import { Category, ScreenType, User } from '../types';
import { CATEGORIES, MOCK_USERS } from '../data/mockData';
import { SkillCard } from '../components/SkillCard';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onProposeSwap: (partner: User) => void;
  onSelectCategory: (catId: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  all: Sparkles,
  tech: Code,
  lang: Languages,
  design: Palette,
  music: Music,
  business: Briefcase,
  wellness: HeartPulse,
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onProposeSwap,
  onSelectCategory,
}) => {
  const featuredSwappers = MOCK_USERS.slice(0, 3);

  return (
    <div className="space-y-16 pb-20 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-indigo-50/70 via-slate-50 to-white border-b border-slate-200/60">
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 right-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-1/3 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Step 1 Prototype Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 shadow-sm mb-6 animate-scale-in">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wide">
              Step 1: Home & Landing Screen
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-600 font-medium">Peer-to-Peer Knowledge Economy</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Exchange Skills, Expand Horizons — <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-indigo-600 to-brand-accent">
              Zero Money Required.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Trade what you know for what you want to learn. Pair with native speakers, software engineers, designers, and musicians for direct 1-on-1 swaps.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('auth')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white text-base font-bold shadow-xl shadow-indigo-300/40 flex items-center justify-center space-x-2 active:scale-95 transition"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-base font-bold border border-slate-300 shadow-sm flex items-center justify-center space-x-2 transition"
            >
              <Sparkles className="w-5 h-5 text-brand-accent" />
              <span>Explore Skill Directory</span>
            </button>
          </div>

          {/* Community Trust Counters */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-2xl font-extrabold text-brand-primary">48,000+</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Completed Swaps</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-2xl font-extrabold text-brand-secondary">$0.00</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Always Free & Equal</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-2xl font-extrabold text-brand-accent">98.4%</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Positive Match Rating</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-2xl font-extrabold text-slate-800">120+ Countries</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Global Community</p>
            </div>
          </div>

        </div>

      </section>

      {/* Category Pills Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Explore by Category</h2>
            <p className="text-xs text-slate-500 mt-0.5">Find peers with complementary talents</p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-bold text-brand-primary hover:text-indigo-700 flex items-center space-x-1"
          >
            <span>View all 120+ categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigate('explore');
                }}
                className="p-4 rounded-2xl bg-white hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-300 text-left transition group shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-brand-primary text-brand-primary group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{cat.count} swappers</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3-Step "How It Works" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              The Swap Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              How SkillSwap Works in 3 Simple Steps
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              No subscription fees, no points, no coin friction. Just direct, verified human-to-human learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative z-10">
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold text-base shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold">List Your Skills</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add what you can teach (e.g., Python, Guitar, Spanish) and what you want to master in exchange.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary text-white flex items-center justify-center font-bold text-base shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold">Smart Match & Propose</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our algorithm matches you with users who want what you offer and offer what you want. Send a 1-click swap proposal.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-accent text-white flex items-center justify-center font-bold text-base shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold">Live 1-on-1 Exchange</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Meet in the built-in virtual room with video, code notepad, and collaborative screen sharing. Earn verified review badges!
              </p>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Identity & Skill Ratings Verified Community</span>
            </div>

            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs shadow-lg transition active:scale-95 flex items-center space-x-1.5"
            >
              <span>Test Interactive Flow Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Featured Swappers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Top Rated Matches
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Featured Swappers Today</h2>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-bold text-brand-primary hover:text-indigo-700 flex items-center space-x-1"
          >
            <span>See All Swappers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSwappers.map((user) => (
            <SkillCard
              key={user.id}
              user={user}
              onProposeSwap={onProposeSwap}
              onViewProfile={() => onNavigate('explore')}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
