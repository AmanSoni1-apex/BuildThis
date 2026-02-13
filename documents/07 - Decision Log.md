# Decision Log

## Project: BuildThis.dev

All major decisions documented with reasoning.

---

## Decision 1: AI API Strategy

**Date:** 2026-02-13

**Decision:** Use Ollama (local AI) for v1.0, migrate to Gemini API for v2.0

**Rationale:**
- **Cost:** Ollama is 100% free (runs locally)
- **Quality:** 85-90% as good as GPT-4 (acceptable for MVP)
- **Risk Mitigation:** If AI refinement fails, we spent$0
- **Revenue Timeline:** By v2.0, we'll have revenue to afford Gemini ($50-100/month)

**Alternatives Considered:**
1. ❌ OpenAI GPT-4: $200/month too expensive for student
2. ❌ Gemini from start: Unnecessary cost before validation
3. ✅ Ollama → Gemini: Best balance of cost & quality

**Implementation:**
- v1.0: Host Ollama on Render.com free tier OR local
- v2.0: Switch to Gemini API when 1,000+ users

**Revisit When:** 1,000 users reached OR free tier limits hit

---

## Decision 2: Platform Name

**Date:** 2026-02-13

**Decision:** TBD - Leaning toward **BuildThis.dev**

**Top Candidates:**
1. **BuildThis.dev** - Direct, action-oriented, .dev TLD
2. **ProblemVault.io** - Professional, implies curation
3. **ProblemOcean** (original) - Creative but abstract

**Rationale for BuildThis.dev:**
- Answers the question directly: "What should I build?" → "BuildThis!"
- .dev domain signals developer audience
- Short, memorable, easy to say

**Alternatives Considered:**
- IssueBank, DevProblems, ProblemStack, WhatToBuild
- See feasibility study for full list (15+ options)

**Final Decision:** Pending user confirmation

**Revisit When:** Before domain purchase

---

## Decision 3: Domain Purchase Strategy

**Date:** 2026-02-13

**Decision:** Use FREE subdomain (buildthis.vercel.app) for v0.1-v1.0

**Rationale:**
- **Cost:** $0 vs $12/year
- **Validation:** Don't pay until idea is validated
- **Flexibility:** Can test different names
- **Professional Enough:** Many projects start on *.vercel.app

**Purchase Custom Domain When:**
- ✅ 500+ users (proof of demand)
- ✅ $25+ monthly revenue (can afford it)
- ✅ Committed long-term

**Cost:** $0 now, $12/year later

**Revisit When:** 500 users OR Month 2, whichever comes first

---

## Decision 4: Database Choice

**Date:** 2026-02-13

**Decision:** Supabase (PostgreSQL with UI)

**Rationale:**
- **Free Tier:** 500MB database (enough for 50K problems)
- **No New Language:** Standard PostgreSQL SQL
- **Built-in Features:** Auth, API, Dashboard included
- **Easy Setup:** No local installation needed

**Alternatives Considered:**
1. ❌ MongoDB: NoSQL less ideal for relational data (votes, bookmarks)
2. ❌ Firebase: More expensive, vendor lock-in
3. ❌ Self-hosted PostgreSQL: Requires server management
4. ✅ Supabase: Best balance

**Cost:** $0/month until 500MB exceeded

**Revisit When:** Database size > 400MB (80% of free tier)

---

## Decision 5: Frontend Framework

**Date:** 2026-02-13

**Decision:** Next.js (React framework)

**Rationale:**
- **Popularity:** Most common React framework
- **Features:** SSR, routing, API routes built-in
- **Vercel Integration:** Works seamlessly with free hosting
- **Student-Friendly:** Lots of tutorials

**Alternatives Considered:**
1. ❌ Vanilla React: Need to set up routing, SSR manually
2. ❌ Vue/Nuxt: Less popular, fewer resources
3. ✅ Next.js: Industry standard

**Cost:** $0 (open source)

**Revisit When:** Never - Next.js is the right choice

---

## Decision 6: Authentication Strategy

**Date:** 2026-02-13

**Decision:** JWT + Email/Password for v0.1, add social login in v1.0

**Rationale:**
- **Simplicity:** Email/password is straightforward
- **Control:** Full ownership of user data
- **Cost:** $0 (no third-party auth service)

**Deferred to v1.0:**
- Google OAuth
- GitHub OAuth
- Password reset flow

**Implementation:**
- Use bcrypt for password hashing
- JWT tokens (7-day expiry)
- Store in httpOnly cookies

**Revisit When:** v1.0 launch (Month 2)

---

## Decision 7: Email Service

**Date:** 2026-02-13

**Decision:** SKIP for v0.1, add in v1.0

**Rationale:**
- **Not Critical:** MVP works without emails
- **Complexity:** Adds setup time
- **Cost:** Though free tier exists, unnecessary for MVP

**Add in v1.0:**
- Welcome emails
- Password reset
- Weekly digest

**Service Choice (Later):** Resend.com (3,000/month free)

**Revisit When:** v1.0 development starts

---

## Decision 8: Payment System for Donations

**Date:** 2026-02-13

**Decision:** Use Ko-fi for v0.1 donations

**Rationale:**
- **Simplicity:** 5-minute setup, no coding
- **Cost:** 0% platform fee (just Stripe 2.9% + 30¢)
- **Speed:** Can add today via button embed

**Deferred to v1.0:**
- Stripe integration for Premium subscriptions

**Implementation:**
1. Create Ko-fi account
2. Get donation link
3. Add button to footer

**Cost:** $0 setup, ~$0.30 per donation

**Revisit When:** Adding Premium tier (v1.0)

---

## Decision 9: GitHub Student Pack

**Date:** 2026-02-13

**Decision:** Proceed WITHOUT GitHub Student Pack

**Rationale:**
- **Not Required:** Entire stack has free tiers without credits
- **Lost Value:** ~$600 in credits, but unnecessary
- **Alternatives Exist:** Google Cloud ($300 free), Azure ($1,000 for startups)

**Impact:** NONE - can still launch and scale to 10K users for free

**Alternative Credits Applied For:**
- Google Cloud Free Tier ($300)
- Microsoft for Startups ($1,000)

**Revisit When:** If we need paid services (unlikely)

---

## Decision 10: MVP Feature Scope

**Date:** 2026-02-13

**Decision:** 8 core features ONLY for v0.1

**P0 (Must Have):**
1. ✅ User authentication
2. ✅ Submit problem
3. ✅ **AI Articulation**
4. ✅ Browse problems
5. ✅ Upvote
6. ✅ Bookmark
7. ✅ Search (basic)
8. ✅ User profile

**Deferred to v1.0:**
- Comments
- Social login
- Email notifications
- Advanced filters
- Password reset

**Rationale:**
- **Speed:** Can ship in 2-3 weeks
- **Validation:** Enough to test if people want this
- **Quality:** Better to perfect 8 features than rush 15

**Revisit When:** After MVP launch feedback

---

## Decision 11: AI Refinement as P0

**Date:** 2026-02-13

**Decision:** AI Articulation is MUST-HAVE (P0), not optional

**Rationale:**
- **Differentiation:** Only platform with this feature
- **Quality:** Dramatically improves problem submissions
- **Viral Potential:** People will share this feature
- **User Value:** Lowers barrier to entry

**Impact:** Adds 3-5 days to development, but worth it

**Implementation Complexity:** Medium
- Ollama integration: 1-2 days
- UI flow: 1 day
- Testing: 1 day

**Revisit When:** If Ollama setup proves too difficult (fallback: skip it)

---

## Decision 12: Design Aesthetic

**Date:** 2026-02-13

**Decision:** Dark mode FIRST, modern developer aesthetic

**Rationale:**
- **Audience:** Developers prefer dark mode
- **Differentiation:** Looks more premium
- **Branding:** Aligns with dev tools (GitHub, VS Code)

**Color Palette:**
- Background: #0D1117 (GitHub dark)
- Accent: #58A6FF (Blue)
- Text: #C9D1D9

**Revisit When:** User feedback requests light mode (add as toggle)

---

## Decision 13: Mobile Responsiveness

**Date:** 2026-02-13

**Decision:** Mobile-FIRST design

**Rationale:**
- **Usage:** 60%+ developers browse on mobile
- **Accessibility:** Must work on all devices
- **Modern Standard:** Expected in 2024

**Implementation:**
- Breakpoints: <768px (mobile), 768-1024px (tablet), >1024px (desktop)
- Touch-friendly buttons
- Responsive navigation

**Revisit When:** Never - this is non-negotiable

---

## Decision 14: Hosting Provider

**Date:** 2026-02-13

**Decision:** Vercel for frontend, Supabase for backend/DB

**Rationale:**
- **Vercel:**
  - Free tier: Unlimited
  - Best Next.js integration
  - Global CDN
  
- **Supabase:**
  - Free tier: 500MB DB
  - Built-in auth
  - PostgreSQL (familiar)

**Cost:** $0/month for first 5,000-10,000 users

**Alternatives Considered:**
- ❌ Netlify: Good but slightly worse Next.js support
- ❌ Railway: Database costs add up faster
- ✅ Vercel + Supabase: Best free tiers

**Revisit When:** Hitting free tier limits

---

## Decision 15: Launch Timeline

**Date:** 2026-02-13

**Decision:** 4-week sprint to MVP launch

**Timeline:**
- Week 1: Backend + Database
- Week 2: Frontend UI
- Week 3: AI Integration (Ollama)
- Week 4: Testing + Seed data + Launch

**Rationale:**
- **Speed:** Faster validation = less risk
- **Feasibility:** 3-4 hours/day as student
- **Quality:** Still time to polish

**Launch Target:** Week 4 (soft launch to Reddit/HN)

**Revisit When:** If development takes longer, extend to Week 5-6

---

## Summary of Key Decisions

| Decision | Choice | Cost | Impact |
|----------|--------|------|--------|
| **AI Strategy** | Ollama → Gemini | $0 → $50/mo | Killer feature enabled |
| **Platform Name** | BuildThis.dev (TBD) | $0 (free subdomain) | Clear branding |
| **Database** | Supabase | $0 | Easy setup |
| **Frontend** | Next.js + Vercel | $0 | Fast development |
| **Donations** | Ko-fi button | $0 | Revenue from Month 1 |
| **Student Pack** | Skip it | $0 lost | No impact |
| **MVP Scope** | 8 features | 4 weeks effort | Shippable |

---

## Decision 16: Open Source Strategy (Day 1)

**Date:** 2026-02-13

**Decision:** Open Source the project from the very first commit.

**Rationale:**
- **Infrastructure:** Qualifies the project for Vercel's Open Source sponsorship (Pro features for $0).
- **YC Preparation:** Demonstrates transparency and community-building skills early on.
- **Hiring/Portfolio:** Provides immediate high-visibility proof of work for the founder.
- **Trust:** Developers (the target audience) prefer open-source tools.

**Risk:** Potential copycats.
**Mitigation:** Focus on brand building and problem curation (the "moat") rather than just code.

**Revisit When:** Never—once open source, always open source.

---

**All major decisions documented.** Revisit this log as project evolves! 📋
