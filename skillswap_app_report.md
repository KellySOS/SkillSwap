# SkillSwap — Comprehensive Application Report & Design Documentation

> **Platform**: Mobile (Apple iPhone 16 iOS 18 Design Specifications)  
> **Target Audience**: University Students, Student Mentors, Academic Peer Groups  
> **Status**: Complete & Interactive Prototype  
> **Live Local Port**: `http://localhost:8080/`  
> **Prototype Artifact**: [`mobile_app_preview.html`](file:///Users/mac/.gemini/antigravity/brain/2fdab7a3-bc91-48e8-aaa3-217bc7f9cb92/mobile_app_preview.html)  
> **Deployment Package**: [`SkillSwap-Presentation.zip`](file:///Users/mac/.gemini/antigravity/brain/2fdab7a3-bc91-48e8-aaa3-217bc7f9cb92/SkillSwap-Presentation.zip)

---

## 1. Executive Summary

**SkillSwap** is a campus-centric, peer-to-peer skill exchange and mentorship application designed for higher-education environments. Rather than relying on monetary payments, SkillSwap operates on a **mutual barter framework** (`Wants ⇄ Gives`), allowing students to trade skills (e.g., *Frontend Web Development in exchange for Machine Learning Tutoring*, or *UI/UX Design in exchange for Conversational Spanish*).

The product combines **Apple-grade minimalist aesthetics**, **gamified daily streaks**, **live WebRTC Mac webcam video calling**, and a **dynamic curriculum library system** to deliver a complete, highly engaging prototype for investor pitches, academic evaluations, and user testing.

```mermaid
graph LR
    A["Discovery & Search\n(Explore 06)"] -->|Find Match| B["Peer Proposal\n(Wants ⇄ Gives)"]
    B -->|Schedule| C["Live Mentorship\n(WebRTC Video Call 11)"]
    C -->|Complete Session| D["Gamification\n(+60 XP, Streaks)"]
    D -->|Add Class| E["Skills Library\n(Me Page 17)"]
    E -->|Offer to Peers| A
```

---

## 2. Design System & Visual Language

The design language adheres strictly to modern **Apple Human Interface Guidelines (HIG)** and minimalist **Linear-style design patterns**.

### 2.1 iPhone 16 Hardware Chassis Constraints
- **Chassis Dimensions**: Fixed strictly to **`385px` width × `780px` height** with zero layout shift or jumping across all screens, modals, and tab switches.
- **Hardware Accents**: Realistic Dynamic Island, Action Button, Volume Rockers, Power Button, and Camera Control Button.
- **Corner Radii**: Curvature at `54px` matching native iPhone 16 hardware geometry.

### 2.2 Color Tokens & Palette

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Obsidian Dark** | `#0F1115` / `#0C0D10` | Primary dark surface, navigation capsule, header cards, high-contrast buttons |
| **Electric Volt Lime** | `#D4FF00` | Signature brand accent, active states, XP badges, primary CTA highlights |
| **Studio Canvas** | `#FAFBFC` | App viewport background, giving clean negative space and high contrast |
| **Card Surface** | `#FFFFFF` | Primary content cards with soft `0 4px 16px rgba(0,0,0,0.04)` shadows |
| **Neutral Border** | `#E5E7EB` / `#F3F4F6` | Subtle 1px dividers and card boundaries |
| **Status Green** | `#10B981` | Verified student badges, live connection indicators, completed lessons |

### 2.3 Brand Identity & Logo
- **Signature Swap Logo**: An iconic double opposing horizontal arrows SVG badge (`rounded-xl bg-[#0F1115] text-[#D4FF00]`) is consistently deployed across the animated splash launch, app header, auth screens, and welcome view.
- **Flat Vector Iconography (Rule)**: **100% Flat vector SVG glyphs**. No emojis, no 3D illustrations, ensuring timeless clarity and consistency.
- **Typography**: Clean geometric typography powered by `Plus Jakarta Sans` with tight tracking and high-contrast weights (`font-black`, `font-extrabold`, `font-semibold`).

---

## 3. Comprehensive 21-Flow System Breakdown

SkillSwap covers the complete 21-flow Figma product roadmap across 120 screen equivalents:

```
├── 01. Design System (Tokens, Typography, SVG Icons, Buttons, Modals, Inputs)
├── 02. Splash & Onboarding (Animated Launch, Welcome, Onboarding 01, 02, 03)
├── 03. Authentication (Sign Up, Log In, Forgot Password, 4-Digit OTP)
├── 04. Profile Setup Wizard (10 Steps: Teach Skills, Learn Skills, Levels, Campus ID)
├── 05. Home Dashboard (Daily Streaks, XP Claim, 14:59 Live Mentorship, Carousel)
├── 06. Explore & Search (Hot Keywords, Real-time Search, Categories, Swap Cards)
├── 07. User Profile Details (Ratings, Bio, Endorsements, Verification)
├── 08. Skill Matching & Peer Network (Verified Mentors, Availability, Swap Proposals)
├── 09. Create & Offer Skill (Dynamic addition to Library, Carousel, and Feed)
├── 10. In-Session Live Messaging (Timestamps, Quick Reply Chips, Auto Peer Responses)
├── 11. Live Video Mentorship Room (Mac Camera WebRTC, PiP, Mic/Cam Controls, Rating)
├── 12. Scheduled & Pending Swaps (Session Queue, Confirmed Slots)
├── 13. My Skills Library (Teaching, Learning, Bookmarks with live counter)
├── 14. Bookmarking System (Save from Search, view & unsave on Me page)
├── 15. Notifications & Activity Feed (XP toasts, match confirmations)
├── 16. Post-Session Review & Rating (5-Star rating modal, XP logging)
├── 17. User "Me" Page (Student stats: 1,240 XP, 3 Days, 18.5h taught)
├── 18. App Settings & Toggles (Push Notifications, Discoverability, Camera HD Mode)
├── 19. Session Clock & Countdown (Real-time ticking P2P session clock)
├── 20. Dynamic Island Multitasking (Audio waveform pulse, in-call status indicator)
└── 21. All 21 Flows Quick Navigator (Drawer modal providing 1-click jump to all screens)
```

---

## 4. Key Functional Features & Interactive Systems

### 4.1 Real-Time Mac Camera WebRTC Video Calling
- **Native Hardware Access**: Powered by `navigator.mediaDevices.getUserMedia({ video: true, audio: false })`.
- **Picture-in-Picture (PiP) Window**: Streams the user's real Mac camera feed in a mirrored top-right window with live status indicators (`YOU (MAC)`).
- **Interactive In-Call Controls**:
  - 📹 **Camera Toggle**: Disables video track and switches smoothly to an avatar placeholder.
  - 🎙️ **Mic Mute Toggle**: Changes active states between white and warning red.
  - 🖥️ **Screen Share**: Broadcasts active sharing confirmation.
  - ⏱️ **Call Timer**: Real-time duration counter (`00:01:24...`).
  - 🔴 **End Call Button**: Terminates media tracks, logs session hours, and triggers the **5-Star Session Review Modal** (`+60 XP`).

### 4.2 Dynamic Class Creation & Library Integration
- Users can tap **"Add Class"** from either the **Home Carousel** or **Profile Library**.
- When submitted:
  1. Instantly creates a new class in active state.
  2. Appends the class into the **Home Screen's Active Skills Carousel** (incrementing the active count badge).
  3. Appends the class into **My Skills Library** under the user's Profile ("Me" page).
  4. Publishes a live announcement card to the **Explore Campus Feed** (`Alex Rivera (You) • Offering: [Title]`).
  5. Awards **+100 XP** and increments total taught hours.

### 4.3 Search Bar with Quick Swappable Keywords
- The search area features **hot swappable skill pills**:
  - `UI/UX`, `Graphic Design`, `Python`, `Machine Learning`, `3D Blender`, `Figma`.
- Tapping any keyword immediately filters the campus feed in real-time and highlights the active pill in Obsidian/Volt.
- Includes a dedicated search clear button (`✕`) for effortless resets.

### 4.4 Bookmarking System Linked to the "Me" Page
- Every peer offer in Explore features a flat vector bookmark ribbon.
- Tapping the ribbon saves the course with an instant toast notification (`Saved to your Me page Bookmarks!`).
- Navigating to the **"Me" (Profile)** page reveals a **Bookmarks** tab with a live badge counter.
- Bookmarks render with full peer details, subject tags, a direct **"Propose Swap"** button, a **"Video Call"** button, and an instant **Unsave** option.

### 4.5 Gamified Daily Streaks & Progression
- 7-day Monday–Sunday visual dot tracker.
- Active streak badge (`3 Days • Level 3 Scholar`) with an XP multiplier (`1.2x Boost`).
- Interactive **"Claim +50 XP"** button with dynamic progress bar expansion.

---

## 5. Technical Architecture & File Inventory

### 5.1 Architecture Highlights
- **Zero-Dependency Architecture**: Built with modern vanilla JavaScript and Tailwind CSS CDN for instant, bulletproof portability.
- **Responsive Chassis Lock**: Custom CSS rules enforce an exact iPhone 16 viewport across any display size.
- **Client-Side Reactive State**: Manages user skills, bookmarks, active filters, call timers, and messaging without requiring database roundtrips for local prototyping.

### 5.2 Key Files & Artifacts

| File Path | Description |
| :--- | :--- |
| [`mobile_app_preview.html`](file:///Users/mac/.gemini/antigravity/brain/2fdab7a3-bc91-48e8-aaa3-217bc7f9cb92/mobile_app_preview.html) | Primary interactive prototype with all 21 flows and Mac camera video call system |
| `/Users/mac/.gemini/antigravity/scratch/skillswap/index.html` | Synced server root served on port 8080 |
| `/Users/mac/.gemini/antigravity/scratch/skillswap/mobile_preview.html` | Dedicated mobile standalone route |
| `/Users/mac/.gemini/antigravity/scratch/skillswap/artboard.html` | Multi-screen gallery presentation board |
| [`SkillSwap-Presentation.zip`](file:///Users/mac/.gemini/antigravity/brain/2fdab7a3-bc91-48e8-aaa3-217bc7f9cb92/SkillSwap-Presentation.zip) | Complete standalone deployment archive for 1-click cloud hosting |

---

## 6. Presentation & Deployment Guide

For sharing and presenting to peers, evaluators, or investors:

### Method A: Local Live Presentation (Running Now)
- Open [**http://localhost:8080/**](http://localhost:8080/) in Google Chrome or Safari on your Mac.
- When prompted, grant **Camera Permission** to test the real-time Mac webcam video calling feature.

### Method B: 15-Second Free Cloud Deployment (Netlify Drop)
1. Open [**app.netlify.com/drop**](https://app.netlify.com/drop) in your browser.
2. Drag and drop the `skillswap` folder from `/Users/mac/.gemini/antigravity/scratch/skillswap` (or upload `SkillSwap-Presentation.zip`).
3. Netlify immediately generates a public HTTPS link (e.g. `https://skillswap.netlify.app`) that anyone can open on an iPhone, Android, or laptop.

### Method C: GitHub Pages (Permanent Portfolio Link)
1. Create a GitHub repository named `skillswap`.
2. Push the files in `/Users/mac/.gemini/antigravity/scratch/skillswap` to the repository.
3. Enable GitHub Pages in repository settings (**Deploy from branch `main`**).

---

## 7. Conclusion

SkillSwap successfully delivers an end-to-end, functional, high-fidelity mobile prototype that bridges the gap between static Figma UI/UX designs and live software engineering. Every requested feature—from **strict iPhone 16 layout integrity**, **flat SVG iconography**, and **real Mac camera integration** to **library management**, **search keywords**, and **cross-page bookmarking**—is fully integrated and ready for presentation.
