# CLAUDE.md

## PROJECT
Name: RootLink (Family Heritage Social Platform)
Type: Family tree + social storytelling web application
Core idea: Users build a multi-generational family tree, connect with relatives, and share family stories. Other users can read stories, upvote/downvote, and comment.
Framework: Next.js 16, App Router, TypeScript strict mode
UI: ShadCN UI, Tailwind CSS v4
Package manager: npm
Auth: Custom token-based authentication (JWT, httpOnly cookies)
DB: MongoDB via Mongoose
State: TanStack Query (server state), React Context (light client state)
Validation: Zod (always both client and server)
Forms: React Hook Form + Zod resolver
Uploads: UploadThing

## CORE DOMAIN CONCEPTS

### Family Tree
Each user owns a family tree.
A family tree is a graph of FamilyMember nodes connected by FamilyRelationship edges.
A FamilyMember can be a registered user (linked by userId) or an unregistered person (manually added by the tree owner).
If a FamilyMember is a registered user, their profile is linked and kept in sync.
The tree owner can add, edit, and remove members and relationships.
Relationship types between two members: father, mother, son, daughter, spouse, brother, sister, grandfather, grandmother, grandson, granddaughter, uncle, aunt, nephew, niece, cousin.
The system must infer and display inverse relationships automatically (e.g. if A is father of B, then B is son/daughter of A).
A user can send a connection request to another registered user to link their trees or confirm a relationship.

### Connection Request
A user can send a connection request to another user with a defined relationship type.
Example: User A sends a request to User B with relationship type "cousin".
User B can accept or reject the request.
On acceptance, a confirmed FamilyRelationship is created between both users.
Connection requests are directional: sender and receiver are tracked.

### Stories (Posts)
A story is a family-related post written by a user.
Stories can contain text content and optional media (images).
Stories are visible to all users (public feed) or optionally scoped to connected relatives only.
Visibility options: public, relatives-only.
Users can upvote or downvote a story (one vote per user, togglable, mutually exclusive).
Users can comment on a story.
Comments are flat (no nested replies in v1).
Story feed is sorted by: latest, most upvoted, or trending (upvotes - downvotes in last 7 days).

## FOLDER STRUCTURE
app/(auth)/                            → login, register pages (public only)
app/(root)/feed/                       → global story feed
app/(root)/tree/                       → current user's family tree view
app/(root)/tree/[username]/            → another user's family tree (read-only)
app/(root)/profile/[username]/         → user public profile + their stories
app/(root)/story/[id]/                 → single story detail page
app/(root)/connections/                → pending connection requests (in + out)
app/(root)/notifications/              → notifications
app/api/auth/register/                 → POST register
app/api/auth/login/                    → POST login, set httpOnly JWT cookie
app/api/auth/logout/                   → POST clear cookie
app/api/auth/me/                       → GET current user from token
app/api/tree/                          → GET own tree, POST init tree
app/api/tree/members/                  → POST add member to tree
app/api/tree/members/[memberId]/       → PATCH edit, DELETE remove member
app/api/tree/relationships/            → POST add relationship between members
app/api/tree/relationships/[id]/       → DELETE remove relationship
app/api/tree/[username]/               → GET another user's tree (public/relative-scoped)
app/api/connections/                   → GET list of connections
app/api/connections/request/           → POST send connection request
app/api/connections/[requestId]/accept/ → POST accept request
app/api/connections/[requestId]/reject/ → POST reject request
app/api/stories/                       → GET feed (paginated), POST create story
app/api/stories/[id]/                  → GET one, PATCH update, DELETE
app/api/stories/[id]/vote/             → POST upvote or downvote (body: { type: "up" | "down" })
app/api/stories/[id]/comments/         → GET comments, POST add comment
app/api/stories/[id]/comments/[cid]/   → DELETE comment
app/api/users/[username]/              → GET public user profile
app/api/notifications/                 → GET notifications (paginated)
app/api/notifications/read/            → POST mark all as read
app/api/upload/                        → POST media upload via UploadThing
components/ui/                         → ShadCN generated (NEVER EDIT)
components/shared/                     → reusable cross-feature components
components/layout/                     → Navbar, Sidebar, Footer, MobileNav
components/tree/                       → FamilyTreeCanvas, MemberNode, MemberCard, AddMemberForm, RelationshipLine
components/story/                      → StoryCard, StoryForm, StoryDetail, VoteButtons, CommentSection
components/profile/                    → ProfileHeader, ProfileBio, ProfileStats, ProfileStoryList
components/connections/                → ConnectionRequestCard, ConnectionList, SendRequestForm
components/notifications/              → NotificationItem, NotificationList
components/forms/                      → all standalone form components
lib/db.ts                              → Mongoose connection singleton
lib/auth.ts                            → signToken, verifyToken, setAuthCookie, clearAuthCookie, requireAuth
lib/utils.ts                           → cn() and shared pure helpers
lib/validations/                       → all Zod schemas
lib/helpers/                           → formatDate, truncate, inferInverseRelationship, resolveRelationshipLabel
models/User.ts                         → User model
models/FamilyMember.ts                 → FamilyMember model
models/FamilyRelationship.ts           → FamilyRelationship model
models/ConnectionRequest.ts            → ConnectionRequest model
models/Story.ts                        → Story model
models/Vote.ts                         → Vote model
models/Comment.ts                      → Comment model
models/Notification.ts                 → Notification model
hooks/                                 → custom React hooks (prefix: use)
context/AuthContext.tsx                → current user session context
types/                                 → global TypeScript DTO types and interfaces
middleware.ts                          → JWT cookie verification, protect (root) routes
public/                                → static assets

## DATABASE MODELS

### User
_id, username (unique, lowercase), email (unique), passwordHash, displayName,
bio, avatarUrl, coverUrl, dateOfBirth, gender,
createdAt, updatedAt

### FamilyMember
_id, treeOwner (ref: User),
linkedUser (ref: User, optional — set if this member is a registered user),
displayName, avatarUrl, dateOfBirth, dateOfDeath (optional), gender, bio,
isAlive (boolean),
createdAt, updatedAt
NOTE: If linkedUser is set, displayName and avatarUrl should reflect the linked user's profile.

### FamilyRelationship
_id, treeOwner (ref: User),
fromMember (ref: FamilyMember),
toMember (ref: FamilyMember),
relationshipType (enum: father|mother|son|daughter|spouse|brother|sister|grandfather|grandmother|grandson|granddaughter|uncle|aunt|nephew|niece|cousin),
isConfirmed (boolean — true when both sides are registered users and connection accepted),
createdAt

### ConnectionRequest
_id, sender (ref: User), receiver (ref: User),
relationshipType (same enum as FamilyRelationship),
status (enum: pending|accepted|rejected),
createdAt, updatedAt
NOTE: On acceptance, create confirmed FamilyRelationship entries in both users' trees.

### Story
_id, author (ref: User),
title, content (text),
mediaUrls (string[]),
visibility (enum: public|relatives),
upvotesCount (number, default 0),
downvotesCount (number, default 0),
commentsCount (number, default 0),
createdAt, updatedAt

### Vote
_id, user (ref: User), story (ref: Story),
type (enum: up|down),
createdAt
NOTE: One vote per user per story. Switching vote type updates the existing document.

### Comment
_id, author (ref: User), story (ref: Story),
content, createdAt
NOTE: Flat comments only in v1. No nested replies.

### Notification
_id, recipient (ref: User), actor (ref: User),
type (enum: connection_request|connection_accepted|story_upvote|story_comment|story_downvote),
story (ref: Story, optional),
connectionRequest (ref: ConnectionRequest, optional),
isRead (boolean, default false),
createdAt

## CUSTOM AUTH RULES
JWT signed with AUTH_SECRET, stored in httpOnly, secure, sameSite=strict cookie named "token".
Never store JWT in localStorage or sessionStorage.
JWT payload shape: { userId: string, username: string, iat: number, exp: number }
Token expiry: 7 days.
lib/auth.ts exports: signToken(payload), verifyToken(token), setAuthCookie(res, token), clearAuthCookie(res), requireAuth(request).
requireAuth(request) extracts and verifies the token cookie. Returns the decoded payload or throws a 401 NextResponse.
middleware.ts reads the "token" cookie, verifies it, redirects unauthenticated users to /login.
Protected: all app/(root)/** routes.
Public: app/(auth)/**, app/api/auth/register, app/api/auth/login.

## API ROUTE RULES
All route handlers: export async function GET/POST/PATCH/DELETE(request: Request)
First line of every protected route: const payload = await requireAuth(request)
First line of every route: await connectDB()
Never return raw Mongoose documents. Always use .lean() and strip: passwordHash, __v.
Return shapes:
  List:   { data: T[], total: number, page: number, hasMore: boolean }
  Single: { data: T }
  Error:  { error: string }
All list endpoints paginated with query params: page (number), limit (max 20).

## FAMILY TREE LOGIC
inferInverseRelationship(type) in lib/helpers/ must return the correct inverse:
  father → son/daughter (based on gender of the other member)
  mother → son/daughter
  spouse → spouse
  brother → brother/sister
  grandfather → grandson/granddaughter
  etc.
When adding a relationship A → B, always auto-create the inverse B → A in the same transaction.
When rendering the tree, use a graph layout. Suggest using a canvas or SVG-based approach in components/tree/FamilyTreeCanvas.tsx.
Generation levels: position members by generation. User is generation 0. Parents are -1. Grandparents are -2. Children are +1.

## VOTE LOGIC
One Vote document per (user, story) pair. Enforce unique compound index on [user, story].
POST /api/stories/[id]/vote with { type: "up" | "down" }:
  - If no existing vote: create Vote, increment Story.upvotesCount or downvotesCount
  - If existing vote with same type: delete Vote (toggle off), decrement count
  - If existing vote with different type: update Vote type, decrement old count, increment new count
Always return updated { upvotesCount, downvotesCount, userVote: "up" | "down" | null }

## CONNECTION REQUEST LOGIC
A user cannot send a connection request to themselves.
A user cannot send a duplicate pending request to the same receiver.
On acceptance: create FamilyRelationship in both sender's and receiver's trees with isConfirmed: true.
On acceptance: create a connection_accepted Notification for the sender.
On rejection: update status to rejected. No relationship created.

## STORY VISIBILITY
public: visible to all users in the global feed.
relatives: visible only to users who have a confirmed FamilyRelationship with the story author.
Feed API must filter by visibility based on the requesting user's confirmed relationships.

## COMPONENT RULES
Default to Server Components.
Add "use client" only when using: hooks, browser APIs, event handlers, useState, useEffect.
Never add "use client" to layout files.
Never use useEffect for data fetching. Use TanStack Query in Client Components.
Use React.Suspense with skeleton fallbacks for all async Server Components.
Use loading.tsx for route-level loading states.
Lazy load heavy components (especially FamilyTreeCanvas) with next/dynamic and ssr: false.

## DATA FETCHING
Server Components: direct Mongoose queries after connectDB(), with auth from cookies().
Client Components: TanStack Query calling API routes.
All TanStack Query mutations must invalidate relevant query keys on success.

## FORMS
Always use React Hook Form with Zod resolver.
Always show inline field errors via ShadCN FormMessage.
Validate on client with Zod. Re-validate on server.

## TYPESCRIPT RULES
Strict mode on. Always type parameters and return values.
Never use `any`. Use `unknown` and narrow.
Use `type` for unions. Use `interface` for object shapes.
Define DTO types for every model: UserDTO, FamilyMemberDTO, StoryDTO, CommentDTO, NotificationDTO.
DTO types never include passwordHash or __v.

## STYLING RULES
Tailwind utility classes only.
Use cn() from @/lib/utils for conditional classes.
Mobile-first: base → sm → md → lg → xl.
Dark mode via Tailwind dark: variants.
Never hardcode colors. Use ShadCN tokens:
  bg-background, text-foreground, border, muted, muted-foreground,
  primary, primary-foreground, secondary, destructive, accent, card.

## NAMING CONVENTIONS
Components:      PascalCase           FamilyTreeCanvas.tsx, StoryCard.tsx
Pages:           lowercase            page.tsx, layout.tsx
Hooks:           camelCase + use      useStoryFeed.ts, useMyTree.ts
Utils/helpers:   camelCase            inferInverseRelationship.ts, formatDate.ts
Types/DTOs:      PascalCase           StoryDTO.ts, FamilyMemberDTO.ts
Zod schemas:     camelCase + Schema   createStorySchema.ts, sendConnectionSchema.ts
Mongoose models: PascalCase           User.ts, Story.ts (in models/)
Context:         PascalCase + Context AuthContext.tsx

## IMPORT ORDER
1. React and Next.js
2. Third-party libraries
3. Internal aliases (@/lib, @/models, @/components, @/hooks, @/context, @/types)
4. Type-only imports

## ABSOLUTE RULES — NEVER VIOLATE
Never use <img>. Always use <Image /> from next/image.
Never edit files inside components/ui/.
Never store JWT in localStorage or sessionStorage.
Never call mongoose.connect() outside lib/db.ts.
Never import a Mongoose model without calling connectDB() first.
Never return raw Mongoose documents. Always .lean() and strip sensitive fields.
Never skip Zod validation on any user input.
Never expose passwordHash in any API response.
Never use useEffect for data fetching.
Never use console.log in non-debug code.
Never store secrets in code. Use .env.local.
Never install a package without checking the existing stack.
FamilyTreeCanvas must always be loaded with next/dynamic and ssr: false.
Vote logic must always use the compound index upsert pattern, never create duplicate votes.

## ENVIRONMENT VARIABLES
MONGODB_URI
AUTH_SECRET
UPLOADTHING_SECRET
UPLOADTHING_APP_ID
NEXT_PUBLIC_APP_URL

## FEATURE BUILD ORDER
For every new feature follow this sequence:
1. Mongoose model in models/ (if needed)
2. TypeScript DTO types in types/
3. Zod validation schema in lib/validations/
4. API route with requireAuth + connectDB + Zod re-validation
5. TanStack Query hook in hooks/ (if client-side)
6. UI components
7. Wire UI to query hook or server logic
8. Loading skeleton, Suspense boundary, error state

## CURRENT FEATURE STATUS
project-setup: done
shadcn-installed: done
auth-register-login: pending
user-profile: pending
family-tree-view: pending
add-family-member: pending
add-relationship: pending
connection-request: pending
story-create: pending
story-feed: pending
story-vote: pending
story-comment: pending
relatives-only-visibility: pending
notifications: pending
explore-search: pending
image-upload: pending
dark-mode: pending