# Database Schema & API Design

## Project: BuildThis.dev

---

## 1. Database Schema

### 1.1 Technology Choice

**Recommended:** PostgreSQL (relational)
- Well-structured data
- ACID compliance
- Great for relationships (votes, bookmarks)
- Free tier available (Supabase, Neon, Railway)

**Alternative:** MongoDB (NoSQL)
- Faster initial development
- Schema flexibility
- Good for rapid iteration

**Decision:** Start with PostgreSQL for data integrity

---

### 1.2 Entity Relationship Diagram

```
┌─────────────┐         ┌──────────────┐
│   Users     │────────▶│   Problems   │
│             │ submits │              │
└─────────────┘         └──────────────┘
      │ │                      │ │
      │ │                      │ │
      │ │                      │ └──────┐
      │ └────────┐             │        │
      │          │             │        │
      ▼          ▼             ▼        ▼
┌─────────┐  ┌────────────┐  ┌──────────────┐
│  Votes  │  │ Bookmarks  │  │  Categories  │
└─────────┘  └────────────┘  └──────────────┘
```

---

### 1.3 Table Schemas

#### Table: `users`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique user identifier |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | Display name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email address |
| `password_hash` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation time |
| `email_verified` | BOOLEAN | DEFAULT FALSE | Email verification status |
| `is_active` | BOOLEAN | DEFAULT TRUE | Account active status |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_users_email` on `email`
- `idx_users_username` on `username`

---

#### Table: `categories`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Category ID |
| `name` | VARCHAR(100) | UNIQUE, NOT NULL | Category name |
| `slug` | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly slug |
| `description` | TEXT | NULL | Category description |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Creation time |

**Initial Data:**
```sql
INSERT INTO categories (name, slug, description) VALUES
('Small Business', 'small-business', 'Local shops, restaurants, services'),
('Education', 'education', 'Schools, students, teachers'),
('Healthcare', 'healthcare', 'Patients, clinics, wellness'),
('Community', 'community', 'Neighborhoods, local groups'),
('Nonprofit', 'nonprofit', 'NGOs, charities, volunteers'),
('Personal Productivity', 'personal-productivity', 'Individuals, freelancers'),
('Environment', 'environment', 'Sustainability, local ecosystems'),
('Transportation', 'transportation', 'Commute, parking, public transit'),
('Housing', 'housing', 'Renters, landlords, buildings'),
('Other', 'other', 'Uncategorized problems');
```

---

#### Table: `problems`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Problem ID |
| `title` | VARCHAR(120) | NOT NULL | Problem title |
| `description` | TEXT | NOT NULL | Full problem description |
| `category_id` | INTEGER | FOREIGN KEY → categories(id) | Category reference |
| `user_id` | UUID | FOREIGN KEY → users(id) | Author reference |
| `tags` | VARCHAR(255)[] | NULL | Array of tags |
| `upvotes_count` | INTEGER | DEFAULT 0 | Cached vote count |
| `bookmarks_count` | INTEGER | DEFAULT 0 | Cached bookmark count |
| `ai_refined` | BOOLEAN | DEFAULT FALSE | Used AI articulation? |
| `status` | VARCHAR(20) | DEFAULT 'active' | active/archived/deleted |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Submission time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_problems_category` on `category_id`
- `idx_problems_user` on `user_id`
- `idx_problems_created` on `created_at DESC`
- `idx_problems_upvotes` on `upvotes_count DESC`
- Full-text search index on `title, description`

---

#### Table: `votes`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Vote ID |
| `user_id` | UUID | FOREIGN KEY → users(id) | Voter reference |
| `problem_id` | UUID | FOREIGN KEY → problems(id) | Problem reference |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Vote time |

**Constraints:**
- UNIQUE constraint on `(user_id, problem_id)` - one vote per user per problem

**Indexes:**
- `idx_votes_problem` on `problem_id`
- `idx_votes_user` on `user_id`

**Triggers:**
- After INSERT: Increment `problems.upvotes_count`
- After DELETE: Decrement `problems.upvotes_count`

---

#### Table: `bookmarks`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Bookmark ID |
| `user_id` | UUID | FOREIGN KEY → users(id) | User reference |
| `problem_id` | UUID | FOREIGN KEY → problems(id) | Problem reference |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Bookmark time |

**Constraints:**
- UNIQUE constraint on `(user_id, problem_id)`

**Indexes:**
- `idx_bookmarks_user` on `user_id`
- `idx_bookmarks_problem` on `problem_id`

**Triggers:**
- After INSERT: Increment `problems.bookmarks_count`
- After DELETE: Decrement `problems.bookmarks_count`

---

### 1.4 Optional Tables (v1.0+)

#### Table: `comments` (Future)
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY,
  problem_id UUID REFERENCES problems(id),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: `ai_sessions` (Future - Analytics)
```sql
CREATE TABLE ai_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  original_text TEXT,
  refined_text TEXT,
  accepted BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 2. API Design

### 2.1 Base URL
```
Production: https://api.buildthis.dev/v1
Development: http://localhost:3000/v1
```

### 2.2 Authentication
**Method:** JWT (JSON Web Tokens)

**Flow:**
1. User logs in → Server returns JWT
2. Client stores JWT in localStorage/cookie
3. Client sends JWT in header: `Authorization: Bearer <token>`
4. Server validates JWT on protected routes

**Token Payload:**
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234654290
}
```

**Token Expiry:** 7 days

---

### 2.3 API Endpoints

#### **Authentication Endpoints**

##### POST `/auth/register`
**Description:** Register new user

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "created_at": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- 400: Email already exists
- 400: Invalid email format
- 400: Password too weak

---

##### POST `/auth/login`
**Description:** Login existing user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- 401: Invalid credentials
- 404: User not found

---

#### **Problems Endpoints**

##### GET `/problems`
**Description:** Get all problems (paginated, filtered, sorted)

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `category` (filter by category slug)
- `sort` (recent | popular | trending)
- `search` (full-text search)

**Example:**
```
GET /problems?page=1&limit=20&category=small-business&sort=popular
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "problems": [
      {
        "id": "uuid",
        "title": "Local farmers can't compare crop prices",
        "description": "Farmers in rural areas...",
        "category": {
          "id": 1,
          "name": "Small Business",
          "slug": "small-business"
        },
        "author": {
          "id": "uuid",
          "username": "johndoe"
        },
        "tags": ["agriculture", "mobile", "pricing"],
        "upvotes_count": 42,
        "bookmarks_count": 15,
        "ai_refined": true,
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_count": 95,
      "per_page": 20
    }
  }
}
```

---

##### GET `/problems/:id`
**Description:** Get single problem by ID

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Local farmers can't compare crop prices",
    "description": "Full description here...",
    "category": {
      "id": 1,
      "name": "Small Business"
    },
    "author": {
      "id": "uuid",
      "username": "johndoe",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "tags": ["agriculture", "mobile"],
    "upvotes_count": 42,
    "bookmarks_count": 15,
    "ai_refined": true,
    "user_voted": false,
    "user_bookmarked": false,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Note:** `user_voted` and `user_bookmarked` require authentication

---

##### POST `/problems`
**Description:** Submit new problem (requires auth)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "My problem title",
  "description": "Full problem description",
  "category_id": 1,
  "tags": ["tag1", "tag2"],
  "ai_refined": false
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "My problem title",
    "...": "..."
  }
}
```

**Errors:**
- 401: Unauthorized
- 400: Validation failed (title too long, description empty, etc.)

---

##### POST `/problems/:id/vote`
**Description:** Upvote a problem (requires auth)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "voted": true,
    "upvotes_count": 43
  }
}
```

**Note:** Calling again removes vote (toggle)

---

##### POST `/problems/:id/bookmark`
**Description:** Bookmark a problem (requires auth)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "bookmarked": true
  }
}
```

**Note:** Calling again removes bookmark (toggle)

---

#### **User Endpoints**

##### GET `/users/me`
**Description:** Get current user profile (requires auth)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00Z",
    "stats": {
      "problems_submitted": 5,
      "bookmarks_count": 12,
      "upvotes_given": 47
    }
  }
}
```

---

##### GET `/users/me/bookmarks`
**Description:** Get user's bookmarked problems (requires auth)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "bookmarks": [
      {
        "problem": { /* full problem object */ },
        "bookmarked_at": "2024-01-10T15:00:00Z"
      }
    ]
  }
}
```

---

##### GET `/users/me/problems`
**Description:** Get user's submitted problems (requires auth)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "problems": [ /* array of problem objects */ ]
  }
}
```

---

#### **AI Endpoints**

##### POST `/ai/refine`
**Description:** Refine problem using AI (requires auth)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "rough_idea": "parking is bad in my area"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "questions": [
      "Who is primarily affected by this parking issue?",
      "What makes finding parking difficult?",
      "What do people currently do to find parking?"
    ],
    "session_id": "uuid"
  }
}
```

---

##### POST `/ai/refine/:session_id`
**Description:** Continue AI refinement with answers

**Request Body:**
```json
{
  "answers": [
    "Apartment residents",
    "No real-time visibility of spots",
    "Drive around looking for 20+ minutes"
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "refined_problem": {
      "title": "Real-time parking availability for apartment residents",
      "description": "Apartment residents waste 20+ minutes daily searching for parking because there's no real-time visibility into available spots in nearby public lots."
    }
  }
}
```

**Rate Limiting:**
- 3 refinements per user per day
- Returns 429 Too Many Requests if exceeded

---

#### **Categories Endpoints**

##### GET `/categories`
**Description:** Get all categories

**Response (200):**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": 1,
        "name": "Small Business",
        "slug": "small-business",
        "description": "Local shops, restaurants, services",
        "problems_count": 23
      }
    ]
  }
}
```

---

### 2.4 Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title must be between 10 and 120 characters",
    "details": {
      "field": "title",
      "constraint": "length"
    }
  }
}
```

**Common Error Codes:**
- `VALIDATION_ERROR` (400)
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `RATE_LIMIT_EXCEEDED` (429)
- `INTERNAL_SERVER_ERROR` (500)

---

### 2.5 Rate Limiting

| Endpoint | Limit |
|----------|-------|
| `/auth/register` | 5 per hour per IP |
| `/auth/login` | 10 per hour per IP |
| `/problems` (POST) | 10 per day per user |
| `/ai/refine` | 3 per day per user |
| All other endpoints | 100 per minute per user |

---

## 3. Implementation Notes

### 3.1 Database Triggers (PostgreSQL)

```sql
-- Auto-update upvotes_count
CREATE OR REPLACE FUNCTION update_problem_upvotes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE problems SET upvotes_count = upvotes_count + 1 WHERE id = NEW.problem_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE problems SET upvotes_count = upvotes_count - 1 WHERE id = OLD.problem_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER votes_update_count
AFTER INSERT OR DELETE ON votes
FOR EACH ROW EXECUTE FUNCTION update_problem_upvotes();
```

### 3.2 Full-Text Search (PostgreSQL)

```sql
-- Add tsvector column for search
ALTER TABLE problems ADD COLUMN search_vector tsvector;

-- Create trigger to auto-update search vector
CREATE TRIGGER problems_search_update
BEFORE INSERT OR UPDATE ON problems
FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(search_vector, 'pg_catalog.english', title, description);

-- Create GIN index for fast search
CREATE INDEX problems_search_idx ON problems USING GIN(search_vector);
```

**Search Query:**
```sql
SELECT * FROM problems
WHERE search_vector @@ plainto_tsquery('english', 'parking availability')
ORDER BY ts_rank(search_vector, plainto_tsquery('english', 'parking availability')) DESC;
```

---

## 4. Tech Stack Summary

**Backend:**
- Node.js + Express (or Spring Boot if you prefer)
- PostgreSQL (database)
- JWT for authentication
- OpenAI API for AI refinement

**Hosting (Free Tier):**
- Backend: Railway / Render
- Database: Supabase / Neon
- Total cost: $0/month initially

---

This schema supports all MVP features and can scale to 100K+ problems easily! 🚀
