import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  MessageSquare, 
  FileText, 
  Star, 
  Send, 
  Award, 
  Sparkles, 
  Share2, 
  PhoneOff, 
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SwapRequest, User } from '../types';

interface LiveSessionRoomProps {
  swap: SwapRequest;
  currentUser: User;
  onClose: () => void;
  onSessionComplete: (swapId: string, rating: number, feedback: string) => void;
}

export const LiveSessionRoom: React.FC<LiveSessionRoomProps> = ({
  swap,
  currentUser,
  onClose,
  onSessionComplete,
}) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'chat' | 'code'>('notes');
  const [sessionNotes, setSessionNotes] = useState(
    `# SkillSwap Session Notes: ${swap.offeredSkill} ⇄ ${swap.requestedSkill}\n\n` +
    `**Partner**: ${swap.partnerName}\n` +
    `**Goal**: Learn conversational phrases / review custom hooks\n\n` +
    `## Part 1: ${swap.requestedSkill} (30 Mins)\n` +
    `- Key vocabulary and idiomatic pronunciation\n` +
    `- Practice dialogues\n\n` +
    `## Part 2: ${swap.offeredSkill} (30 Mins)\n` +
    `- Architecture overview & clean patterns\n` +
    `- Live Q&A and practical exercise\n`
  );

  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string; isSelf: boolean }[]>([
    { sender: swap.partnerName, text: `Hey ${currentUser.name.split(' ')[0]}! Sound and video check! Ready to start?`, time: '12:01 PM', isSelf: false },
    { sender: currentUser.name, text: `Loud and clear! Let's do the first 30 minutes on ${swap.requestedSkill}.`, time: '12:02 PM', isSelf: true },
    { sender: swap.partnerName, text: `Awesome! Sharing the study deck on screen right now.`, time: '12:02 PM', isSelf: false },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('Outstanding exchange session! Very patient mentor and super clear explanations.');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      sender: currentUser.name,
      text: inputMessage,
      time: 'Just now',
      isSelf: true,
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Simulated reply after 1.5 seconds
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: swap.partnerName,
          text: `Got it! Let's write down that pattern in the notes.`,
          time: 'Just now',
          isSelf: false,
        },
      ]);
    }, 1200);
  };

  const handleFinishSession = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    setShowReviewModal(true);
  };

  const handleCompleteReview = () => {
    onSessionComplete(swap.id, rating, feedback);
    setShowReviewModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col animate-fade-in overflow-hidden">
      
      {/* Top Header */}
      <div className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <h1 className="font-bold text-sm text-white flex items-center space-x-2">
              <span>Live Skill Exchange Room</span>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                REC 00:32:14
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {swap.partnerName} ({swap.requestedSkill}) ⇄ You ({swap.offeredSkill})
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleFinishSession}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finish & Complete Swap</span>
          </button>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Leave Room"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Workspace Area: Split Screen */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Video Streams */}
        <div className="flex-1 p-4 flex flex-col justify-between space-y-4 bg-slate-950 overflow-y-auto">
          
          {/* Dual Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            
            {/* Partner's Stream */}
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 aspect-video md:aspect-auto flex items-center justify-center group shadow-xl">
              <img
                src={swap.partnerAvatar}
                alt={swap.partnerName}
                className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              
              {/* Partner Label */}
              <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold">{swap.partnerName}</span>
                <span className="text-slate-400">({swap.requestedSkill})</span>
              </div>

              {/* Status */}
              <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-md px-2 py-1 rounded text-[11px] text-slate-300">
                1080p · 60fps HD
              </div>
            </div>

            {/* Current User Stream */}
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 aspect-video md:aspect-auto flex items-center justify-center shadow-xl">
              {isVideoOn ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-500 mb-2">
                    <VideoOff className="w-8 h-8" />
                  </div>
                  <p className="text-xs text-slate-400">Your camera is turned off</p>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

              {/* User Label */}
              <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-xs">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span className="font-semibold">You ({currentUser.name})</span>
                <span className="text-slate-400">({swap.offeredSkill})</span>
              </div>

              {!isMicOn && (
                <div className="absolute top-3 right-3 bg-rose-500/90 text-white px-2 py-0.5 rounded text-[11px] font-bold">
                  MUTED
                </div>
              )}
            </div>

          </div>

          {/* Bottom Floating Call Controls */}
          <div className="h-16 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-center space-x-3 px-6 shadow-2xl backdrop-blur-md">
            
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-xl transition ${
                isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
              title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-xl transition ${
                isVideoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
              title={isVideoOn ? 'Stop Camera' : 'Start Camera'}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => alert('Screen sharing stream initialized!')}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
              title="Share Screen"
            >
              <Monitor className="w-5 h-5" />
            </button>

            <div className="h-6 w-px bg-slate-700 mx-2"></div>

            <button
              onClick={handleFinishSession}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-rose-950 transition active:scale-95"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Leave / Finish</span>
            </button>

          </div>

        </div>

        {/* Right Side: Interactive Notepad & Live Chat */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900 flex flex-col">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-800 p-2 space-x-2">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${
                activeTab === 'notes'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Collab Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Room Chat</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-between">
            {activeTab === 'notes' ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Live Shared Markdown Note
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-1.5 py-0.5 rounded">
                    Synced Real-time
                  </span>
                </div>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="w-full flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                />
              </div>
            ) : (
              <div className="h-full flex flex-col justify-between">
                
                {/* Messages List */}
                <div className="space-y-3 overflow-y-auto pr-1">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-[10px] text-slate-400 font-medium">{msg.sender}</span>
                        <span className="text-[9px] text-slate-500">{msg.time}</span>
                      </div>
                      <div
                        className={`p-2.5 rounded-2xl text-xs max-w-[85%] ${
                          msg.isSelf
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="mt-4 flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type message to partner..."
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            )}
          </div>

        </div>

      </div>

      {/* Review Modal on Complete */}
      {showReviewModal && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full text-center space-y-5 shadow-2xl">
            
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-500 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">Skill Swap Completed! 🎉</h3>
              <p className="text-xs text-slate-400 mt-1">
                You exchanged 60 minutes with <strong>{swap.partnerName}</strong>. Rate your learning experience:
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400 drop-shadow-md'
                        : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Written Review */}
            <div>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share feedback on what was taught and how helpful it was..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Badge Earned Alert */}
            <div className="p-3 bg-indigo-950/60 border border-indigo-800/60 rounded-xl text-xs text-indigo-200 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Earned +1 Verified Swap Badge on your Skill Profile!</span>
            </div>

            <button
              onClick={handleCompleteReview}
              className="w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-900 active:scale-95 transition"
            >
              Submit Review & Back to Dashboard
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
