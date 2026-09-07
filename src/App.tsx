import React, { useState } from 'react';
import { ScreenType, SwapRequest, TransitionEffect, User } from './types';
import { CURRENT_USER, INITIAL_SWAPS, MOCK_USERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { PrototypeFlowBar } from './components/PrototypeFlowBar';
import { DesignSystemDrawer } from './components/DesignSystemDrawer';
import { SwapModal } from './components/SwapModal';
import { LiveSessionRoom } from './components/LiveSessionRoom';
import { HomeScreen } from './screens/HomeScreen';
import { AuthScreen } from './screens/AuthScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { ProposalScreen } from './screens/ProposalScreen';
import { ConfirmationScreen } from './screens/ConfirmationScreen';
import { DashboardScreen } from './screens/DashboardScreen';

export const App: React.FC = () => {
  // Navigation & Prototype State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [transitionEffect, setTransitionEffect] = useState<TransitionEffect>('smart-animate');
  const [isPrototypeBarOpen, setIsPrototypeBarOpen] = useState(true);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

  // App Data & Session State
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [swaps, setSwaps] = useState<SwapRequest[]>(INITIAL_SWAPS);
  
  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Active Flow Partner & Modal
  const [selectedPartner, setSelectedPartner] = useState<User | null>(MOCK_USERS[0]);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [latestConfirmedSwap, setLatestConfirmedSwap] = useState<SwapRequest | null>(INITIAL_SWAPS[0]);
  const [activeLiveSession, setActiveLiveSession] = useState<SwapRequest | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Flow Navigation Handler
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Swap Action (Modal / Step 4)
  const handleProposeSwap = (partner: User) => {
    setSelectedPartner(partner);
    setIsSwapModalOpen(true);
  };

  // Submit Proposal -> Navigates to Step 5 (Result Screen)
  const handleSubmitProposal = (swapData: Partial<SwapRequest>) => {
    const newSwap: SwapRequest = {
      id: `SWAP-${Math.floor(10000 + Math.random() * 90000)}`,
      partnerId: swapData.partnerId || 'user-01',
      partnerName: swapData.partnerName || 'Partner',
      partnerAvatar: swapData.partnerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      offeredSkill: swapData.offeredSkill || 'React & TypeScript',
      requestedSkill: swapData.requestedSkill || 'Japanese',
      date: swapData.date || 'Tomorrow, Aug 31',
      time: swapData.time || '7:00 PM - 8:00 PM',
      duration: swapData.duration || 60,
      format: swapData.format || '1-on-1 Video',
      note: swapData.note || 'Excited to swap skills!',
      status: 'accepted',
      createdAt: 'Just now',
    };

    setSwaps([newSwap, ...swaps]);
    setLatestConfirmedSwap(newSwap);
    setIsSwapModalOpen(false);
    showToast('✨ Swap proposal accepted and scheduled!');
    
    // Automatically transition to Step 5 (Result Screen)
    handleNavigate('confirmation');
  };

  // Update Profile on Step 2
  const handleSaveProfile = (userData: Partial<User>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...userData,
    }));
    setIsLoggedIn(true);
    showToast('Profile and skills saved successfully!');
  };

  // Live Room Handlers
  const handleEnterLiveRoom = (swap: SwapRequest) => {
    setActiveLiveSession(swap);
  };

  const handleSessionComplete = (swapId: string, rating: number, feedback: string) => {
    setSwaps((prev) =>
      prev.map((s) => (s.id === swapId ? { ...s, status: 'completed' as const } : s))
    );
    showToast(`⭐ Session completed & ${rating}-star review logged!`);
    handleNavigate('dashboard');
  };

  const handleAcceptSwap = (swapId: string) => {
    setSwaps((prev) =>
      prev.map((s) => (s.id === swapId ? { ...s, status: 'accepted' as const } : s))
    );
    showToast('Swap request accepted!');
  };

  const handleDeclineSwap = (swapId: string) => {
    setSwaps((prev) =>
      prev.map((s) => (s.id === swapId ? { ...s, status: 'declined' as const } : s))
    );
    showToast('Swap request declined.');
  };

  // Dynamic Screen Animation Class
  const getTransitionClass = () => {
    switch (transitionEffect) {
      case 'slide-in':
        return 'animate-slide-in';
      case 'dissolve':
        return 'animate-fade-in';
      case 'push':
        return 'animate-scale-in';
      case 'smart-animate':
      default:
        return 'transition-all duration-300 ease-out';
    }
  };

  return (
    <div className="min-h-screen bg-brand-background text-slate-900 flex flex-col font-sans">
      
      {/* 1. Top Prototype Controller Banner (Part 4 Flow Validator) */}
      <PrototypeFlowBar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        transitionEffect={transitionEffect}
        onChangeTransition={setTransitionEffect}
        isOpen={isPrototypeBarOpen}
        onToggleOpen={() => setIsPrototypeBarOpen(!isPrototypeBarOpen)}
      />

      {/* 2. Main Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => handleNavigate('auth')}
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 animate-scale-in flex items-center space-x-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4. Active Screen Viewport */}
      <main className={`flex-1 ${getTransitionClass()}`}>
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onProposeSwap={handleProposeSwap}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            onNavigate={handleNavigate}
            onSaveProfile={handleSaveProfile}
            currentUser={currentUser}
          />
        )}

        {currentScreen === 'explore' && (
          <ExploreScreen
            onNavigate={handleNavigate}
            onProposeSwap={handleProposeSwap}
            currentUser={currentUser}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {currentScreen === 'proposal' && (
          <ProposalScreen
            currentUser={currentUser}
            partner={selectedPartner}
            onNavigate={handleNavigate}
            onSubmitProposal={handleSubmitProposal}
            onSelectPartner={setSelectedPartner}
          />
        )}

        {currentScreen === 'confirmation' && (
          <ConfirmationScreen
            latestSwap={latestConfirmedSwap}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onEnterLiveRoom={handleEnterLiveRoom}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            currentUser={currentUser}
            swaps={swaps}
            onNavigate={handleNavigate}
            onEnterLiveRoom={handleEnterLiveRoom}
            onAcceptSwap={handleAcceptSwap}
            onDeclineSwap={handleDeclineSwap}
          />
        )}
      </main>

      {/* 5. Action Modal: Step 4 Proposal Overlay */}
      <SwapModal
        partner={selectedPartner}
        currentUser={currentUser}
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        onSubmitProposal={handleSubmitProposal}
      />

      {/* 6. Live 1-on-1 Virtual Exchange Room */}
      {activeLiveSession && (
        <LiveSessionRoom
          swap={activeLiveSession}
          currentUser={currentUser}
          onClose={() => setActiveLiveSession(null)}
          onSessionComplete={handleSessionComplete}
        />
      )}

      {/* 7. Design System Inspector Drawer (Part 2) */}
      <DesignSystemDrawer
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />

      {/* 8. Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-800 text-sm">SkillSwap</span>
            <span>— Complete Peer-to-Peer Skill Exchange Application & Prototype</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDesignSystemOpen(true)}
              className="text-brand-primary font-semibold hover:underline"
            >
              Inspect Design System
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigate('home')}
              className="hover:text-slate-800"
            >
              Home (Step 1)
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigate('explore')}
              className="hover:text-slate-800"
            >
              Core Feature (Step 3)
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
