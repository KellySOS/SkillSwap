import React from 'react';
import { 
  Home, 
  LogIn, 
  Search, 
  ArrowRightLeft, 
  CheckCircle2, 
  Play, 
  Sliders, 
  ChevronRight,
  Info
} from 'lucide-react';
import { ScreenType, TransitionEffect } from '../types';

interface PrototypeFlowBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  transitionEffect: TransitionEffect;
  onChangeTransition: (effect: TransitionEffect) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

const FLOW_STEPS: {
  id: ScreenType;
  stepNum: number;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  trigger: string;
  action: string;
}[] = [
  {
    id: 'home',
    stepNum: 1,
    label: 'Home',
    sublabel: 'Landing & Value Prop',
    icon: Home,
    trigger: 'On Click "Get Started"',
    action: 'Navigate to Step 2',
  },
  {
    id: 'auth',
    stepNum: 2,
    label: 'Login & Setup',
    sublabel: 'Account & Skills',
    icon: LogIn,
    trigger: 'On Submit Profile',
    action: 'Navigate to Step 3',
  },
  {
    id: 'explore',
    stepNum: 3,
    label: 'Core Feature',
    sublabel: 'Discover & Search',
    icon: Search,
    trigger: 'On Click "Propose Swap"',
    action: 'Open Step 4 Action Screen',
  },
  {
    id: 'proposal',
    stepNum: 4,
    label: 'Action Screen',
    sublabel: 'Swap Proposal',
    icon: ArrowRightLeft,
    trigger: 'On Submit Proposal',
    action: 'Confirm Swap & Move to 5',
  },
  {
    id: 'confirmation',
    stepNum: 5,
    label: 'Result Screen',
    sublabel: 'Confirmed & Live Room',
    icon: CheckCircle2,
    trigger: 'On Click "Join Live Room"',
    action: 'Launch 1-on-1 Session',
  },
];

export const PrototypeFlowBar: React.FC<PrototypeFlowBarProps> = ({
  currentScreen,
  onNavigate,
  transitionEffect,
  onChangeTransition,
  isOpen,
  onToggleOpen,
}) => {
  const currentStep = FLOW_STEPS.find((s) => s.id === currentScreen);

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top micro-bar toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        
        {/* Left: Mode Badge */}
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Interactive Prototype Controller
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-400">
            (Step-by-step user journey validator)
          </span>
        </div>

        {/* Center/Right: Transition Selector & Open/Close */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-1.5 text-xs text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Transition:</span>
            <select
              value={transitionEffect}
              onChange={(e) => onChangeTransition(e.target.value as TransitionEffect)}
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded px-2 py-1 focus:ring-1 focus:ring-indigo-400 outline-none"
            >
              <option value="smart-animate">Smart Animate</option>
              <option value="slide-in">Slide In</option>
              <option value="dissolve">Dissolve</option>
              <option value="push">Push</option>
            </select>
          </div>

          <button
            onClick={onToggleOpen}
            className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700 flex items-center space-x-1"
          >
            <span>{isOpen ? 'Collapse Flow Bar' : 'Expand Flow Bar'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>

      </div>

      {/* Expanded Flow Steps (5-step pipeline) */}
      {isOpen && (
        <div className="border-t border-slate-800/80 bg-slate-950/60 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Steps Container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {FLOW_STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = currentScreen === step.id;
                const isPassed = FLOW_STEPS.findIndex((s) => s.id === currentScreen) > step.stepNum - 1;

                return (
                  <button
                    key={step.id}
                    onClick={() => onNavigate(step.id)}
                    className={`relative text-left p-2.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-indigo-950/80 to-slate-900 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500'
                        : isPassed
                        ? 'bg-slate-900/60 border-slate-700 hover:border-slate-600'
                        : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                            isActive
                              ? 'bg-indigo-500 text-white'
                              : isPassed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {step.stepNum}
                        </span>
                        <span className="text-xs font-bold text-slate-200">
                          {step.label}
                        </span>
                      </div>
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    </div>

                    <p className="text-[11px] text-slate-400 truncate mb-1">
                      {step.sublabel}
                    </p>

                    <div className="text-[9px] font-mono text-emerald-400/90 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 inline-block max-w-full truncate">
                      ⚡ {step.trigger}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Interaction Context Note */}
            {currentStep && (
              <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  <span>
                    Current Stage: <strong className="text-white font-medium">Step {currentStep.stepNum} ({currentStep.label})</strong>
                  </span>
                  <span className="text-slate-600">|</span>
                  <span>Action: <code className="text-indigo-300 font-mono text-[11px]">{currentStep.action}</code></span>
                </div>
                <div className="hidden lg:block text-[11px] text-slate-400">
                  Tip: Click any step above to jump directly to that screen in the user flow.
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
