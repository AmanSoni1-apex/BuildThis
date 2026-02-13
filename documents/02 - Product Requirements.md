# Product Requirements Document (PRD)

## Project: BuildThis.dev
**Problem Discovery Platform for Developers**

---

## 1. Product Vision

### 1.1 Problem Statement
Developers constantly ask: **"What should I build?"**

Existing resources provide tutorial exercises (todo apps, calculators), not real-world problems that need solving. There's no dedicated platform where developers can discover genuine problems faced by real people.

### 1.2 Solution
BuildThis.dev is a crowd-sourced repository of **real-world problems** (not solutions) that developers can discover, bookmark, and build solutions for.

### 1.3 Success Criteria
- 5,000+ registered users in 6 months
- 2,000+ real-world problems submitted
- 500+ problems with solutions built and tracked
- Mentioned in 5+ dev blogs/podcasts

---

## 2. Target Users

### Primary Users
1. **Aspiring Developers** - Need portfolio projects with real impact
2. **Students** - Looking for hackathon/capstone project ideas
3. **Indie Hackers** - Seeking startup ideas to validate
4. **Experienced Developers** - Want to build something meaningful

### Secondary Users
5. **Problem Submitters** - People/organizations with problems needing solutions
6. **Community Members** - Vote and curate best problems

---

## 3. Core Features - MVP (v0.1)

### 3.1 User Authentication
**Priority:** P0 (Must Have)

**User Stories:**
- As a user, I want to sign up with email/password so I can submit and bookmark problems
- As a user, I want to log in securely so I can access my saved problems

**Acceptance Criteria:**
- ✅ Email/password registration
- ✅ Email verification (optional for MVP)
- ✅ Secure password hashing (bcrypt)
- ✅ Login/logout functionality
- ✅ Session management

**Out of Scope (for now):**
- ❌ Social login (Google, GitHub) - v1.0
- ❌ Password reset flow - v1.0

---

### 3.2 Submit Problem
**Priority:** P0 (Must Have)

**User Stories:**
- As a user, I want to submit a real-world problem so others can build solutions
- As a user, I want AI help to articulate my problem clearly

**Acceptance Criteria:**
- ✅ Problem submission form with:
  - Title (max 120 chars)
  - Description (max 2000 chars)
  - Category (dropdown)
  - Tags (optional, up to 5)
- ✅ **AI Articulation Assistant** (see section 3.2.1)
- ✅ Preview before submitting
- ✅ Validation: Must be real-world problem, not tutorial
- ✅ Author attribution

**Out of Scope:**
- ❌ Rich text editor - v1.5
- ❌ Image uploads - v1.5

#### 3.2.1 AI Articulation Assistant ⭐ **NEW FEATURE**

**The Problem:**
Users often have vague ideas ("My neighborhood has a parking issue") but struggle to articulate them into clear, actionable problem statements.

**The Solution:**
AI-powered assistant that helps users refine their problem submissions.

**User Flow:**
1. User enters rough idea: *"parking is bad in my area"*
2. Clicks "Refine with AI" button
3. AI asks clarifying questions:
   - "Who is affected by this problem?"
   - "What makes finding parking difficult?"
   - "What do people currently do to solve this?"
4. AI suggests refined problem statement:
   - **Before:** "Parking is bad in my area"
   - **After:** "Apartment residents waste 20+ minutes daily searching for parking because there's no real-time visibility into available spots in nearby public lots"
5. User can accept, edit, or regenerate

**Technical Implementation:**
- Use OpenAI API (GPT-4 or similar)
- Prompt engineering to extract key details
- Fallback: If API fails, show validation tips instead
- Cost mitigation: Rate limit to 3 refinements per user per day

**Acceptance Criteria:**
- ✅ "Refine with AI" button on submission form
- ✅ AI asks 2-3 clarifying questions
- ✅ AI generates improved problem statement
- ✅ User can accept/edit/regenerate
- ✅ Graceful fallback if AI unavailable

**Why This is Powerful:**
- Lowers barrier to entry (anyone can submit)
- Improves problem quality automatically
- Unique differentiator (no competitor has this)
- Viral potential (people will share this feature)

---

### 3.3 Browse Problems
**Priority:** P0 (Must Have)

**User Stories:**
- As a developer, I want to browse all problems so I can find something to build
- As a developer, I want to filter by category so I can find relevant problems

**Acceptance Criteria:**
- ✅ List view of all problems (paginated, 20 per page)
- ✅ Each card shows:
  - Title
  - Excerpt (first 150 chars)
  - Category
  - Upvotes count
  - Submission date
- ✅ Filter by category
- ✅ Sort by: Recent, Popular, Trending
- ✅ Mobile-responsive

**Out of Scope:**
- ❌ Advanced filters (tags, date range) - v1.0
- ❌ Grid view option - v1.5

---

### 3.4 Problem Detail Page
**Priority:** P0 (Must Have)

**User Stories:**
- As a developer, I want to view full problem details so I can decide if I want to build it
- As a user, I want to upvote problems so good ones rise to the top

**Acceptance Criteria:**
- ✅ Full problem display:
  - Title
  - Full description
  - Category & tags
  - Author
  - Submission date
  - Upvote count
- ✅ Upvote button (requires login)
- ✅ Bookmark button (requires login)
- ✅ Share button (copy link, Twitter, LinkedIn)

**Out of Scope:**
- ❌ Comments - v1.0
- ❌ "Built this" solutions showcase - v1.5

---

### 3.5 Voting System
**Priority:** P0 (Must Have)

**User Stories:**
- As a user, I want to upvote problems so the best ones are highlighted
- As a platform, we want to prevent spam voting

**Acceptance Criteria:**
- ✅ One vote per user per problem
- ✅ Toggle vote on/off
- ✅ Real-time vote count update
- ✅ Must be logged in to vote

**Out of Scope:**
- ❌ Downvotes - intentionally excluded (stay positive)
- ❌ Vote explanations - v2.0

---

### 3.6 Bookmark System
**Priority:** P0 (Must Have)

**User Stories:**
- As a developer, I want to bookmark problems so I can build them later

**Acceptance Criteria:**
- ✅ Bookmark/unbookmark button
- ✅ "My Bookmarks" page
- ✅ Remove from bookmarks

**Out of Scope:**
- ❌ Bookmark collections/folders - v1.5
- ❌ Share bookmark lists - v2.0

---

### 3.7 Search
**Priority:** P1 (Should Have)

**User Stories:**
- As a developer, I want to search problems so I can find specific topics

**Acceptance Criteria:**
- ✅ Search bar in header
- ✅ Search by title and description
- ✅ Display results with highlighting

**Out of Scope:**
- ❌ Advanced search (filters, operators) - v1.0
- ❌ Search by tags - v1.0

---

### 3.8 User Profile
**Priority:** P1 (Should Have)

**User Stories:**
- As a user, I want to view my profile so I can see my activity

**Acceptance Criteria:**
- ✅ Display:
  - Username
  - Join date
  - Problems submitted count
  - Bookmarks count
- ✅ List of my submitted problems

**Out of Scope:**
- ❌ Profile pictures - v1.5
- ❌ Bio/social links - v1.5
- ❌ Activity feed - v2.0

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Page load time: < 2 seconds
- Search results: < 1 second
- AI articulation: < 10 seconds

### 4.2 Security
- HTTPS only
- Password hashing (bcrypt, min 10 rounds)
- CSRF protection
- Rate limiting on API endpoints
- Input sanitization (prevent XSS)

### 4.3 Scalability
- Support 10,000 concurrent users
- Database: Handle 100,000+ problems

### 4.4 Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader compatible

### 4.5 Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

## 5. User Flows

### 5.1 New User → Find Problem → Build
1. Land on homepage
2. Browse featured problems
3. Sign up (prompted when trying to bookmark)
4. Bookmark interesting problem
5. Go to "My Bookmarks"
6. Click problem → Start building

### 5.2 Submitter → AI Help → Post Problem
1. Click "Submit Problem"
2. Enter rough idea
3. Click "Refine with AI"
4. Answer AI questions
5. Review refined problem
6. Submit
7. Share link on social media

---

## 6. MVP Feature Priority

| Feature | Priority | Reason |
|---------|----------|--------|
| Authentication | P0 | Foundational |
| Submit Problem | P0 | Core value prop |
| **AI Articulation** | **P0** | **Key differentiator** |
| Browse Problems | P0 | Primary use case |
| Upvote | P0 | Quality curation |
| Bookmark | P0 | User retention |
| Search | P1 | Discoverability |
| User Profile | P1 | Engagement |

---

## 7. Out of Scope for MVP

### Deferred to v1.0
- Comments on problems
- Social login (Google, GitHub)
- Email notifications
- Advanced search
- User following
- Password reset flow

### Deferred to v1.5+
- Problem collections/playlists
- Solution showcase (link built projects)
- Rich text editor
- Image uploads
- Reputation/karma system
- API for developers

### Deferred to v2.0
- Mobile app
- AI-powered problem suggestions
- Hackathon integration
- Premium features
- Monetization

---

## 8. Success Metrics (MVP)

### Engagement Metrics
- Daily Active Users (DAU)
- Problems submitted per week
- Upvotes per problem (avg)
- Bookmarks per user (avg)
- Search queries per session

### Quality Metrics
- % of problems using AI articulation
- Problem approval rate (moderation)
- User retention (30-day)

### Technical Metrics
- AI articulation success rate
- Average response time
- Error rate

---

## 9. Technical Constraints

### AI Feature
- OpenAI API cost: ~$0.01 per problem refinement
- Budget: $100/month = 10,000 refinements
- Mitigation: Rate limit to 3 per user per day

### Hosting
- Start with free tiers (Vercel, Supabase)
- Scale to paid ($25/month) when hitting limits

---

## 10. Launch Criteria

**MVP is ready to launch when:**
- ✅ All P0 features functional
- ✅ AI articulation working reliably
- ✅ 100 seed problems manually curated
- ✅ Zero critical bugs
- ✅ < 2s page load time
- ✅ Mobile responsive

**Soft launch targets:**
- 50 users in week 1
- 200+ problems submitted
- 80%+ positive feedback

---

## Appendix: Categories (Initial)

1. **Small Business** - Local shops, restaurants, services
2. **Education** - Schools, students, teachers
3. **Healthcare** - Patients, clinics, wellness
4. **Community** - Neighborhoods, local groups
5. **Nonprofit** - NGOs, charities, volunteers
6. **Personal Productivity** - Individuals, freelancers
7. **Environment** - Sustainability, local ecosystems
8. **Transportation** - Commute, parking, public transit
9. **Housing** - Renters, landlords, buildings
10. **Other** - Catch-all

(Can expand based on submissions)
