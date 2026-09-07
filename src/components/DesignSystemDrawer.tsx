import React from 'react';
import { 
  X, 
  Palette, 
  Layers, 
  Sparkles, 
  Type, 
  Check, 
  Copy,
  Zap
} from 'lucide-react';

interface DesignSystemDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRAND_COLORS = [
  {
    element: 'Primary Color',
    name: 'Electric Indigo',
    hex: '#4F46E5',
    tw: 'bg-indigo-600',
    textTw: 'text-indigo-600',
    description: 'Main CTAs, brand identity, navigation active states, high-priority links',
  },
  {
    element: 'Secondary Color',
    name: 'Emerald Mint',
    hex: '#10B981',
    tw: 'bg-emerald-500',
    textTw: 'text-emerald-500',
    description: 'Success states, verified skill badges, growth indicators, active status',
  },
  {
    element: 'Background Color',
    name: 'Crisp Slate Light',
    hex: '#F8FAFC',
    tw: 'bg-slate-50 border border-slate-300',
    textTw: 'text-slate-900',
    description: 'Clean, distraction-free modern background with high contrast',
  },
  {
    element: 'Accent Color',
    name: 'Sunset Orange',
    hex: '#F97316',
    tw: 'bg-orange-500',
    textTw: 'text-orange-500',
    description: 'Swap highlights, notification dots, star ratings, compatibility chips',
  },
];

const COMPONENT_VARIANTS = [
  {
    name: 'Primary Button',
    element: (
      <button className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-200 active:scale-95 transition">
        Propose Skill Swap
      </button>
    ),
  },
  {
    name: 'Secondary Action',
    element: (
      <button className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 text-sm font-semibold rounded-xl transition">
        ✓ Verified Swapper
      </button>
    ),
  },
  {
    name: 'Accent Badge',
    element: (
      <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold rounded-full">
        ⚡ 98% Match Score
      </span>
    ),
  },
  {
    name: 'Skill Tag Pill',
    element: (
      <span className="inline-flex items-center px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-medium rounded-lg">
        ⚛️ React & TypeScript · Master
      </span>
    ),
  },
];

export const DesignSystemDrawer: React.FC<DesignSystemDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm animate-fade-in flex justify-end">
      
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose}></div>

      {/* Drawer Container */}
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-slide-in border-l border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">SkillSwap Design System</h2>
              <p className="text-xs text-slate-500">Part 2: Brand Colors & UI Tokens</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Step 1: Select Brand Colors Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Brand Colors Specification</span>
              </h3>
              <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Design System v1.0
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Element</th>
                    <th className="py-2.5 px-3">Color</th>
                    <th className="py-2.5 px-3">Hex</th>
                    <th className="py-2.5 px-3 text-right">Sample</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BRAND_COLORS.map((item) => (
                    <tr key={item.element} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {item.element}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-700">
                        <button
                          onClick={() => handleCopy(item.hex)}
                          className="flex items-center space-x-1 hover:text-indigo-600 group cursor-pointer"
                          title="Click to copy hex"
                        >
                          <span>{item.hex}</span>
                          {copiedHex === item.hex ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400" />
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`inline-block w-6 h-6 rounded-lg shadow-sm ${item.tw}`}></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Semantic roles breakdown */}
            <div className="mt-4 grid grid-cols-1 gap-2.5">
              {BRAND_COLORS.map((item) => (
                <div key={item.name} className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/50 flex items-start space-x-3">
                  <div className={`w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 ${item.tw}`}></div>
                  <div className="text-xs">
                    <strong className="text-slate-800 font-semibold">{item.name} ({item.element}):</strong>{' '}
                    <span className="text-slate-600">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Component Tokens & Interactive States */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5 mb-3">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>UI Component Token Samples</span>
            </h3>

            <div className="space-y-3">
              {COMPONENT_VARIANTS.map((item) => (
                <div key={item.name} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-xs">
                  <span className="text-xs font-medium text-slate-600">{item.name}</span>
                  <div>{item.element}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography & Hierarchy */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5 mb-3">
              <Type className="w-4 h-4 text-purple-600" />
              <span>Typography System (Inter font)</span>
            </h3>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div>
                <p className="text-xl font-extrabold text-slate-900 tracking-tight">Display Heading Bold</p>
                <p className="text-[11px] text-slate-500 font-mono">20px / 1.25rem · ExtraBold 800</p>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-800">Section Title Semibold</p>
                <p className="text-[11px] text-slate-500 font-mono">16px / 1rem · Semibold 600</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Body Regular for descriptions, bios, and messages.</p>
                <p className="text-[11px] text-slate-500 font-mono">14px / 0.875rem · Regular 400</p>
              </div>
            </div>
          </div>

          {/* Configured Interactions & Transitions (Part 3/4) */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5 mb-3">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>Configured Interactions & Transitions</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-indigo-900">
                <span className="font-bold block">Smart Animate</span>
                <span className="text-[11px] text-indigo-700">Modals, match chips & filter pills</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-900">
                <span className="font-bold block">Slide In</span>
                <span className="text-[11px] text-emerald-700">Journey screen progression (1 $\rightarrow$ 5)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100 text-amber-900">
                <span className="font-bold block">Dissolve</span>
                <span className="text-[11px] text-amber-700">Overlays, toast banners & menus</span>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-100 text-purple-900">
                <span className="font-bold block">Push</span>
                <span className="text-[11px] text-purple-700">Screen push & backwards stack</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 mt-auto flex items-center justify-between text-xs text-slate-500">
          <span>SkillSwap System Tokens</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition"
          >
            Done
          </button>
        </div>

      </div>

    </div>
  );
};
