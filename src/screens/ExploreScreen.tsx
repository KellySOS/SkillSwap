import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowRightLeft, 
  Star, 
  MapPin, 
  CheckCircle, 
  X, 
  MessageSquare,
  Zap,
  Globe,
  Clock
} from 'lucide-react';
import { Category, ScreenType, User } from '../types';
import { CATEGORIES, MOCK_USERS } from '../data/mockData';
import { SkillCard } from '../components/SkillCard';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onProposeSwap: (partner: User) => void;
  currentUser: User;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onNavigate,
  onProposeSwap,
  currentUser,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<User | null>(null);
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'swaps'>('match');
  const [onlyOnline, setOnlyOnline] = useState(false);

  const currentUserOfferedNames = currentUser.skillsOffered.map((s) => s.name);

  // Filtered & Sorted Users
  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const matchesCat = user.skillsOffered.some((s) =>
          s.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (selectedCategory === 'tech' && s.category === 'Programming') ||
          (selectedCategory === 'lang' && s.category === 'Languages') ||
          (selectedCategory === 'music' && s.category === 'Music') ||
          (selectedCategory === 'design' && s.category === 'Design') ||
          (selectedCategory === 'business' && s.category === 'Business') ||
          (selectedCategory === 'wellness' && s.category === 'Wellness')
        );
        if (!matchesCat) return false;
      }

      // Online status filter
      if (onlyOnline && !user.isOnline) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = user.name.toLowerCase().includes(q);
        const matchesTitle = user.title.toLowerCase().includes(q);
        const matchesBio = user.bio.toLowerCase().includes(q);
        const matchesOffered = user.skillsOffered.some((s) => s.name.toLowerCase().includes(q));
        const matchesWanted = user.skillsWanted.some((s) => s.name.toLowerCase().includes(q));

        if (!matchesName && !matchesTitle && !matchesBio && !matchesOffered && !matchesWanted) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'swaps') return b.swapsCompleted - a.swapsCompleted;
      
      // Default: AI Match compatibility score
      const aMatches = a.skillsWanted.some((sw) =>
        currentUserOfferedNames.some((co) => sw.name.toLowerCase().includes(co.toLowerCase()) || co.toLowerCase().includes(sw.name.toLowerCase()))
      );
      const bMatches = b.skillsWanted.some((sw) =>
        currentUserOfferedNames.some((co) => sw.name.toLowerCase().includes(co.toLowerCase()) || co.toLowerCase().includes(sw.name.toLowerCase()))
      );
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return b.rating - a.rating;
    });
  }, [selectedCategory, searchQuery, onlyOnline, sortBy, currentUserOfferedNames]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      
      {/* Header with Step 3 Badge */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-secondary text-xs font-bold mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 3: Core Feature — Skill Catalog & AI Matchmaker</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Verified Skill Swappers
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Browse {filteredUsers.length} compatible mentors and peers ready for direct 1-on-1 exchange.
          </p>
        </div>

        {/* Action button to Jump to Step 4 */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('proposal')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-brand-primary text-xs font-bold border border-indigo-200 transition"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Jump to Step 4 (Action Screen)</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-indigo-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by skill name, keyword (e.g. Japanese, Figma, Python, Guitar)..."
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-primary outline-none focus:ring-2 focus:ring-indigo-100"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-primary text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Sort & Toggle Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          
          {/* Online Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={onlyOnline}
              onChange={(e) => setOnlyOnline(e.target.checked)}
              className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-indigo-400"
            />
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Available & Online Now</span>
            </span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:border-indigo-400"
            >
              <option value="match">AI Compatibility Match %</option>
              <option value="rating">Highest Star Rating</option>
              <option value="swaps">Most Completed Swaps</option>
            </select>
          </div>

        </div>

      </div>

      {/* Swappers Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <SkillCard
              key={user.id}
              user={user}
              onProposeSwap={onProposeSwap}
              onViewProfile={(u) => setSelectedUserForDetail(u)}
              currentUserSkillsOffered={currentUserOfferedNames}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No skill matches found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or switch category filter to see all available swappers.
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
              setOnlyOnline(false);
            }}
            className="px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-bold hover:bg-brand-primary-hover transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Detail Modal for Selected Swapper */}
      {selectedUserForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white max-w-xl w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-in">
            
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedUserForDetail.avatar}
                  alt={selectedUserForDetail.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400 shadow-md"
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedUserForDetail.name}</h2>
                  <p className="text-xs text-slate-400">{selectedUserForDetail.title}</p>
                  <div className="flex items-center space-x-3 mt-1 text-xs text-slate-300">
                    <span className="flex items-center space-x-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{selectedUserForDetail.rating} ({selectedUserForDetail.reviewCount} reviews)</span>
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400">{selectedUserForDetail.swapsCompleted} swaps completed</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUserForDetail(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">About & Teaching Style</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedUserForDetail.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-1">Location & Timezone</span>
                  <span className="font-semibold text-slate-800">{selectedUserForDetail.location}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-1">Response Time</span>
                  <span className="font-semibold text-slate-800">{selectedUserForDetail.responseTime}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Languages Spoken</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUserForDetail.languages.map((lang) => (
                    <span key={lang} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Weekly Availability</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUserForDetail.availability.map((avail) => (
                    <span key={avail} className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                      🕒 {avail}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setSelectedUserForDetail(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const u = selectedUserForDetail;
                    setSelectedUserForDetail(null);
                    onProposeSwap(u);
                  }}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-200 transition"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>Propose Skill Swap Now</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
