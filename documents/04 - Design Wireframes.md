# UI/UX Wireframes & Design

## Project: BuildThis.dev

---

## 1. Design Principles

### 1.1 Core Values
- **Clean & Minimal** - Focus on content, not clutter
- **Developer-Friendly** - Dark mode first, code-aesthetic
- **Fast & Responsive** - Instant interactions, mobile-first
- **Accessible** - WCAG 2.1 AA compliance

### 1.2 Visual Style
- **Primary Audience:** Developers
- **Aesthetic:** Modern, tech-focused, slightly playful
- **Inspiration:** GitHub, Linear, ProductHunt, IndieHackers

---

## 2. Color Palette

### 2.1 Dark Mode (Primary)
```
Background:    #0D1117 (GitHub dark)
Surface:       #161B22
Border:        #30363D
Text Primary:  #C9D1D9
Text Secondary:#8B949E
Accent:        #58A6FF (Blue)
Success:       #3FB950 (Green)
Warning:       #D29922 (Yellow)
```

### 2.2 Light Mode (Secondary)
```
Background:    #FFFFFF
Surface:       #F6F8FA
Border:        #D0D7DE
Text Primary:  #24292F
Text Secondary:#57606A
Accent:        #0969DA (Blue)
```

---

## 3. Typography

**Font Family:**
```
Headings:      'Inter', sans-serif
Body:          'Inter', sans-serif
Code/Monospace: 'JetBrains Mono', monospace
```

**Scale:**
```
H1: 32px / 2rem (Homepage hero)
H2: 24px / 1.5rem (Section titles)
H3: 20px / 1.25rem (Card titles)
Body: 16px / 1rem
Small: 14px / 0.875rem
```

---

## 4. Page Wireframes

### 4.1 Homepage

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] BuildThis.dev          [Browse] [Submit] [Sign In]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│          🌊 Find Real-World Problems to Build                │
│                                                               │
│     Discover problems that need solving, not tutorials       │
│                                                               │
│          [Browse Problems]  [Submit a Problem]               │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  🔥 Trending Problems                                        │
│                                                               │
│  ┌────────────────────────────────────────────────────┐      │
│  │ 🏢 Small farmers can't compare crop prices         │      │
│  │ Local farmers in rural areas have no way to view  │      │
│  │ and compare crop prices across nearby markets...  │      │
│  │                                                    │      │
│  │ 👤 @johndoe  📁 Small Business  ⬆ 42  🔖 15      │      │
│  └────────────────────────────────────────────────────┘      │
│                                                               │
│  ┌────────────────────────────────────────────────────┐      │
│  │ 🏘️ Apartment residents waste time on parking      │      │
│  │ Apartment residents waste 20+ minutes daily...    │      │
│  │ 👤 @sarahj  📁 Housing  ⬆ 38  🔖 22              │      │
│  └────────────────────────────────────────────────────┘      │
│                                                               │
│  ┌────────────────────────────────────────────────────┐      │
│  │ 🎓 Students miss campus events due to poor...     │      │
│  │ 👤 @alexchen  📁 Education  ⬆ 35  🔖 18          │      │
│  └────────────────────────────────────────────────────┘      │
│                                                               │
│                    [View All Problems]                        │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  Footer: About | How It Works | GitHub | Twitter             │
└─────────────────────────────────────────────────────────────┘
```

**Components:**
1. **Navbar** (Fixed top)
   - Logo (left)
   - Navigation links (Browse, Submit)
   - Auth buttons (right)

2. **Hero Section**
   - Large heading
   - Subtitle
   - 2 CTA buttons

3. **Trending Problems**
   - 3-5 problem cards
   - Each shows: emoji, title, excerpt, metadata
   - "View All" link

4. **Footer**
   - Simple links

---

### 4.2 Browse Problems Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] BuildThis.dev          [Browse] [Submit] [Sign In]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Browse Problems                                              │
│                                                               │
│  [Search: "parking, education, etc..."]                      │
│                                                               │
│  Filter by:  [All Categories ▼]  Sort: [Popular ▼]          │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🏢 Local farmers can't compare crop prices          │     │
│  │ Farmers in rural areas have no way to view and     │     │
│  │ compare crop prices across nearby markets, leading │     │
│  │ to lost income and poor negotiation leverage.      │     │
│  │                                                     │     │
│  │ 👤 @johndoe  📁 Small Business  🏷️ agriculture     │     │
│  │ ⬆ 42  🔖 15  📅 2 days ago                         │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🏘️ Apartment residents waste time on parking       │     │
│  │ Apartment residents waste 20+ minutes daily        │     │
│  │ searching for parking because there's no real-time │     │
│  │ visibility into available spots in nearby lots.    │     │
│  │                                                     │     │
│  │ 👤 @sarahj  📁 Housing  🏷️ parking, mobile         │     │
│  │ ⬆ 38  🔖 22  📅 5 days ago                         │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  [Load More] or [Pagination: 1 2 3 ... 10]                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Components:**
1. **Search Bar**
   - Full-width, prominent
   - Placeholder text with examples

2. **Filters**
   - Category dropdown
   - Sort dropdown (Recent, Popular, Trending)

3. **Problem Cards**
   - Larger than homepage
   - Full excerpt (first 200 chars)
   - All metadata visible
   - Hover effect

4. **Pagination**
   - Load more button OR page numbers

---

### 4.3 Problem Detail Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] BuildThis.dev          [Browse] [Submit] [Sign In]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─ Back to Browse                                           │
│                                                               │
│  📁 Small Business                                            │
│                                                               │
│  🏢 Local farmers can't compare crop prices                  │
│                                                               │
│  ┌──────────────────────────────────────────────┐            │
│  │                                              │            │
│  │  Farmers in rural areas have no centralized │            │
│  │  platform to view and compare crop prices   │            │
│  │  across nearby markets. They rely on phone  │            │
│  │  calls or traveling to each market, which   │            │
│  │  wastes time and leads to poor price        │            │
│  │  negotiation. Most farmers have smartphones │            │
│  │  but no app addresses this need.            │            │
│  │                                              │            │
│  │  This affects 10,000+ small farmers in the  │            │
│  │  region, resulting in lost income and       │            │
│  │  reduced market efficiency.                 │            │
│  │                                              │            │
│  └──────────────────────────────────────────────┘            │
│                                                               │
│  🏷️ Tags: agriculture, pricing, mobile, farmers             │
│                                                               │
│  ┌────────────────────────────────────────────┐              │
│  │  ⬆ Upvote (42)  |  🔖 Bookmark  |  🔗 Share│              │
│  └────────────────────────────────────────────┘              │
│                                                               │
│  Submitted by @johndoe • 2 days ago • ✨ AI Refined          │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**Components:**
1. **Breadcrumb/Back Link**
   - Easy navigation

2. **Category Badge**
   - Colored pill

3. **Title**
   - Large, prominent (H1)

4. **Description Box**
   - Light background
   - Easy to read
   - Generous padding

5. **Tags**
   - Pill-style, clickable

6. **Action Bar**
   - Upvote button (toggle, shows count)
   - Bookmark button (toggle)
   - Share button (dropdown: Copy link, Twitter, LinkedIn)

7. **Metadata**
   - Author, date, AI badge

---

### 4.4 Submit Problem Page (With AI)

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] BuildThis.dev          [Browse] [Submit] [Sign In]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Submit a Problem                                             │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ Step 1: Describe the Problem                        │     │
│  │                                                      │     │
│  │ Title:                                               │     │
│  │ ┌────────────────────────────────────────────────┐  │     │
│  │ │ Local farmers can't compare crop prices        │  │     │
│  │ └────────────────────────────────────────────────┘  │     │
│  │ (10-120 characters)                                 │     │
│  │                                                      │     │
│  │ Description:                                         │     │
│  │ ┌────────────────────────────────────────────────┐  │     │
│  │ │ Farmers have to call around to find prices... │  │     │
│  │ │                                                │  │     │
│  │ │                                                │  │     │
│  │ │                                                │  │     │
│  │ └────────────────────────────────────────────────┘  │     │
│  │ (50-2000 characters)                                │     │
│  │                                                      │     │
│  │        ✨ [Refine with AI]                          │     │
│  │                                                      │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  After clicking "Refine with AI":                             │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🤖 AI Assistant                                      │     │
│  │                                                      │     │
│  │ Let me help you refine this problem!                │     │
│  │                                                      │     │
│  │ Question 1 of 3:                                     │     │
│  │ "Who is primarily affected by this problem?"        │     │
│  │                                                      │     │
│  │ ┌────────────────────────────────────────────────┐  │     │
│  │ │ Small farmers in rural areas                   │  │     │
│  │ └────────────────────────────────────────────────┘  │     │
│  │                                                      │     │
│  │              [Next Question →]                       │     │
│  │                                                      │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  After AI refinement:                                         │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ ✅ Refined Problem                                   │     │
│  │                                                      │     │
│  │ Title:                                               │     │
│  │ Local farmers can't compare crop prices easily      │     │
│  │                                                      │     │
│  │ Description:                                         │     │
│  │ Farmers in rural areas have no centralized platform │     │
│  │ to view and compare crop prices across nearby       │     │
│  │ markets. They rely on phone calls or traveling to   │     │
│  │ each market, which wastes time and leads to poor    │     │
│  │ price negotiation. Most farmers have smartphones    │     │
│  │ but no app addresses this need.                     │     │
│  │                                                      │     │
│  │  [Accept] [Edit Manually] [Regenerate]              │     │
│  │                                                      │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ Step 2: Add Details                                 │     │
│  │                                                      │     │
│  │ Category: [Small Business ▼]                        │     │
│  │                                                      │     │
│  │ Tags (optional):                                     │     │
│  │ ┌────────────────────────────────────────────────┐  │     │
│  │ │ agriculture, pricing, mobile                   │  │     │
│  │ └────────────────────────────────────────────────┘  │     │
│  │ (comma-separated, max 5)                            │     │
│  │                                                      │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│             [Preview] [Submit Problem]                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**AI Refinement Flow:**

**State 1: Initial Entry**
- Simple form
- "Refine with AI" button prominently displayed

**State 2: AI Questions (Modal/Inline)**
- Shows progress (Question 1 of 3)
- One question at a time
- Text input for answers
- "Next" button

**State 3: AI Result**
- Shows refined title + description
- 3 action buttons:
  - Accept (use AI version)
  - Edit Manually (tweaks)
  - Regenerate (try again)

**State 4: Final Details**
- Category dropdown
- Tags input
- Preview + Submit

---

### 4.5 User Profile Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] BuildThis.dev          [Browse] [Submit] [@johndoe] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  👤 @johndoe                                                  │
│  Member since Jan 2024                                        │
│                                                               │
│  📊 Stats:                                                    │
│  • 5 problems submitted                                      │
│  • 12 bookmarks                                              │
│  • 47 upvotes given                                          │
│                                                               │
│  ────────────────────────────────────────────────            │
│                                                               │
│  🔥 My Submitted Problems                                     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🏢 Local farmers can't compare crop prices          │     │
│  │ ⬆ 42  🔖 15  📅 2 days ago                          │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🌱 Community gardens lack volunteer management      │     │
│  │ ⬆ 18  🔖 7  📅 1 week ago                           │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.6 My Bookmarks Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] BuildThis.dev          [Browse] [Submit] [@johndoe] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  🔖 My Bookmarks (12)                                         │
│                                                               │
│  Problems you want to build:                                  │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🏘️ Apartment residents waste time on parking        │     │
│  │ Bookmarked 3 days ago                               │     │
│  │ ⬆ 38  📁 Housing                                    │     │
│  │                                           [Remove]  │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🎓 Students miss campus events                      │     │
│  │ Bookmarked 1 week ago                               │     │
│  │ ⬆ 35  📁 Education                                  │     │
│  │                                           [Remove]  │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.7 Search Results Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] BuildThis.dev          [Browse] [Submit] [Sign In]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [Search: "parking" 🔍]                                       │
│                                                               │
│  Search results for "parking" (3 problems)                    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🏘️ Apartment residents waste time on **parking**    │     │
│  │ Apartment residents waste 20+ minutes daily         │     │
│  │ searching for **parking** because there's no...     │     │
│  │                                                      │     │
│  │ ⬆ 38  🔖 22  📁 Housing                             │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🏢 Mall visitors can't find **parking** easily      │     │
│  │ Shopping mall visitors drive around for 15 mins...  │     │
│  │                                                      │     │
│  │ ⬆ 12  🔖 5  📁 Small Business                       │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Note:** Search terms are highlighted in results

---

### 4.8 Login/Register Modal

```
┌──────────────────────────────────┐
│  ✕                        │
│                                  │
│    Welcome to BuildThis.dev      │
│                                  │
│  ┌───────────────────────────┐   │
│  │ Tab: [Sign In] [Register] │   │
│  ├───────────────────────────┤   │
│  │                           │   │
│  │ Email:                    │   │
│  │ ┌───────────────────────┐ │   │
│  │ │ john@example.com      │ │   │
│  │ └───────────────────────┘ │   │
│  │                           │   │
│  │ Password:                 │   │
│  │ ┌───────────────────────┐ │   │
│  │ │ ••••••••••            │ │   │
│  │ └───────────────────────┘ │   │
│  │                           │   │
│  │    [Sign In]              │   │
│  │                           │   │
│  │ Forgot password?          │   │
│  │                           │   │
│  └───────────────────────────┘   │
│                                  │
└──────────────────────────────────┘
```

**Auth Modal:**
- Centered overlay
- Tabs for Sign In / Register
- Minimal fields
- Clean design

---

## 5. Component Library

### 5.1 Problem Card (Reusable)

**Variants:**
1. **Compact** (Homepage)
   - Small, 3 lines excerpt
   - Icon + Title + Metadata

2. **Full** (Browse page)
   - Larger, full excerpt
   - All metadata visible

3. **Detail** (Problem page)
   - Entire description
   - Action buttons

**States:**
- Default
- Hover (slight shadow, border change)
- Active (when clicked)

---

### 5.2 Button Styles

**Primary:**
```
Background: #58A6FF (Accent blue)
Text: White
Hover: #1F6FEB
```

**Secondary:**
```
Background: Transparent
Border: 1px solid #30363D
Text: #C9D1D9
Hover: Background #161B22
```

**Ghost:**
```
Background: Transparent
Text: #8B949E
Hover: Text #C9D1D9
```

---

### 5.3 Form Inputs

**Text Input:**
```
Background: #0D1117
Border: 1px solid #30363D
Padding: 12px
Border-radius: 6px
Focus: Border #58A6FF, 2px
```

**Dropdown:**
```
Same as text input
Arrow icon on right
```

---

## 6. Responsive Design

### 6.1 Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

### 6.2 Mobile Adjustments

**Homepage:**
- Stack hero buttons vertically
- Show 2 trending problems (not 5)
- Simplify navbar (hamburger menu)

**Browse:**
- Filters stack vertically
- Cards full-width
- Larger touch targets

**Submit:**
- Full-screen AI modal
- Larger input fields
- Sticky submit button

---

## 7. Accessibility

### 7.1 Keyboard Navigation
- All interactive elements tabbable
- Focus indicators visible
- Escape closes modals
- Enter submits forms

### 7.2 Screen Readers
- Semantic HTML (nav, main, article)
- ARIA labels on icons
- Alt text for emojis
- Skip to content link

### 7.3 Color Contrast
- All text meets WCAG AA (4.5:1)
- Interactive elements distinguishable
- No color-only information

---

## 8. Micro-interactions

### 8.1 Upvote Button
- Click: Immediate count +1
- Animation: Subtle bounce
- Color change: Gray → Accent blue

### 8.2 Bookmark Button
- Click: Fill icon
- Save to list (async)
- Toast notification: "Saved to bookmarks"

### 8.3 AI Refinement
- Typing indicator while AI thinks
- Fade in questions one by one
- Smooth transitions between steps

---

## 9. Empty States

### 9.1 No Bookmarks
```
  🔖

  No bookmarks yet!
  
  Browse problems and bookmark
  the ones you want to build.
  
  [Browse Problems]
```

### 9.2 No Search Results
```
  🔍
  
  No problems found for "xyz"
  
  Try different keywords or
  [Submit this as a problem]
```

---

## 10. Implementation Priority

**Must Have (MVP):**
1. ✅ Homepage
2. ✅ Browse page
3. ✅ Submit page (with AI)
4. ✅ Problem detail
5. ✅ Auth modal
6. ✅ User profile
7. ✅ Bookmarks page

**Nice to Have (v1.0):**
- Search results page (can reuse browse)
- Advanced filters UI
- Richer problem cards

**Future:**
- Commenting interface
- Notification center
- User following
- Collections/playlists

---

## 11. Design Tools

**Recommended:**
- **Figma** (free) - High-fidelity mockups
- **Excalidraw** (free) - Quick sketches
- **Coolors.co** (free) - Color palette generator

**Process:**
1. Start with these ASCII wireframes
2. Create low-fidelity Figma mockups
3. Add color/typography
4. Build in code

---

**This gives you a complete visual blueprint for BuildThis.dev!** 🎨
