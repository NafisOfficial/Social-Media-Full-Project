# CLAUDE.md

## PROJECT
Type: Social media web application
Framework: Next.js 16, App Router, TypeScript strict mode
UI: ShadCN UI, Tailwind CSS v4
Package manager: pnpm
Auth: Custom token-based authentication (JWT, httpOnly cookies)
DB: MongoDB via Mongoose
State: TanStack Query (server state), React Context (light client state)
Validation: Zod (always both client and server)
Forms: React Hook Form + Zod resolver
Uploads: UploadThing

## FOLDER STRUCTURE
app/(auth)/                      → login, register pages (public only)
app/(root)/feed/                 → home feed
app/(root)/profile/[username]/   → user profile
app/(root)/post/[id]/            → single post view
app/(root)/messages/             → direct messages
app/(root)/notifications/        → notifications
app/(root)/explore/              → search and explore
app/api/auth/register/           → POST register new user
app/api/auth/login/              → POST login, issue JWT in httpOnly cookie
app/api/auth/logout/             → POST clear auth cookie
app/api/auth/me/                 → GET current authenticated user
app/api/posts/                   → GET list, POST create
app/api/posts/[id]/              → GET one, PATCH update, DELETE
app/api/posts/[id]/like/         → POST toggle like
app/api/posts/[id]/comments/     → GET, POST comments
app/api/users/[username]/        → GET user profile
app/api/users/[username]/follow/ → POST toggle follow
app/api/notifications/           → GET notifications
app/api/messages/                → GET, POST messages
app/api/upload/                  → POST media upload via UploadThing
components/ui/                   → ShadCN generated (NEVER EDIT)
components/shared/               → reusable cross-feature components
components/layout/               → Navbar, Sidebar, Footer, MobileNav
components/feed/                 → feed-specific components
components/post/                 → PostCard, PostForm, PostDetail, PostActions
components/profile/              → ProfileHeader, ProfileBio, ProfileStats
components/forms/                → all form components
lib/db.ts                        → Mongoose connection singleton
lib/auth.ts                      → JWT sign, verify, cookie helpers
lib/utils.ts                     → cn() utility and shared pure helpers
lib/validations/                 → all Zod schemas
lib/helpers/                     → pure utility functions (formatDate, truncate, etc.)
models/                          → all Mongoose models (User, Post, Comment, etc.)
hooks/                           → custom React hooks (prefix: use)
context/                         → React Context providers
types/                           → global TypeScript types and interfaces
middleware.ts                    → route protection via JWT cookie check
public/                          → static assets

## MONGOOSE CONNECTION
lib/db.ts must implement a singleton pattern to prevent multiple connections in dev.
Use a global cached connection: check global.__mongoose before calling mongoose.connect().
Always call connectDB() at the top of every API route handler and Server Action.
Never import models without calling connectDB() first.

## MONGOOSE MODELS
Define all models in models/ directory, one file per model.
Always check if model is already compiled: mongoose.models.User || mongoose.model("User", schema)
Export the model as default.

## DATABASE MODELS
User: _id, username (unique), email (unique), passwordHash, bio, avatarUrl, coverUrl, createdAt, updatedAt
Post: _id, content, mediaUrls[], author (ref: User), likesCount, commentsCount, createdAt, updatedAt
Like: _id, user (ref: User), post (ref: Post), createdAt
Comment: _id, content, author (ref: User), post (ref: Post), createdAt
Follow: _id, follower (ref: User), following (ref: User), createdAt
Notification: _id, type (enum: like|comment|follow|mention), recipient (ref: User), actor (ref: User), post (ref: Post, optional), isRead, createdAt
Message: _id, content, sender (ref: User), receiver (ref: User), isRead, createdAt

## CUSTOM AUTH RULES
JWT is signed with AUTH_SECRET and stored in an httpOnly, secure, sameSite=strict cookie named "token".
Never store JWT in localStorage or sessionStorage.
JWT payload shape: { userId: string, username: string, iat: number, exp: number }
Token expiry: 7 days.
lib/auth.ts must export: signToken(payload), verifyToken(token), setAuthCookie(res, token), clearAuthCookie(res).
middleware.ts reads the "token" cookie, calls verifyToken, redirects to /login if invalid or missing.
Protected routes: all app/(root)/** paths.
Public routes: app/(auth)/**, app/api/auth/register, app/api/auth/login.

## API ROUTE AUTH PATTERN
Every protected API route must:
1. Extract token from cookies().get("token")
2. Call verifyToken(token)
3. Return 401 if token missing or invalid
4. Proceed with verified userId from token payload

Use this helper in every protected route:
  const payload = await requireAuth(request) // throws 401 if unauthorized
Define requireAuth() in lib/auth.ts.

## API ROUTE RULES
All routes use Next.js Route Handler format: export async function GET/POST/PATCH/DELETE(request: Request)
Always call connectDB() as the first line.
Always return NextResponse.json() with appropriate HTTP status.
Never return raw Mongoose documents. Always call .lean() or .toObject() and strip sensitive fields.
Never expose: passwordHash, __v, or internal Mongoose fields.
Return shape for lists: { data: T[], total: number, page: number, hasMore: boolean }
Return shape for single: { data: T }
Return shape for errors: { error: string }
Paginate all list endpoints using: page (number), limit (number, max 20).

## SERVER ACTIONS
Use Server Actions for form submissions from Server Components only.
Every Server Action returns: { success: boolean, data?: T, error?: string }
Always call connectDB() and re-validate Zod schema inside the action.
Always call requireAuth() inside protected actions.

## COMPONENT RULES
Default to Server Components.
Add "use client" only when using: hooks, browser APIs, event handlers, useState, useEffect.
Never add "use client" to layout files.
Never use useEffect for data fetching. Use TanStack Query in Client Components.
Use React.Suspense with skeleton fallbacks for all async Server Components.
Use loading.tsx for route-level loading states.
Lazy load heavy components with next/dynamic.

## DATA FETCHING
Server Components: fetch via internal API routes using cookies for auth forwarding, or direct Mongoose queries.
Client Components: TanStack Query (useQuery, useMutation) calling API routes.
All mutations via TanStack Query must invalidate relevant query keys on success.

## REACT CONTEXT
Use React Context only for lightweight global state: current user session, theme.
Create context in context/ directory.
Never use Context for server data — that belongs to TanStack Query.

## FORMS
Always use React Hook Form with Zod resolver.
Always show inline field errors via ShadCN FormMessage.
Validate on client with Zod. Re-validate on server inside API route or Server Action.

## TYPESCRIPT RULES
Strict mode is on.
Always type all function parameters and return values explicitly.
Never use `any`. Use `unknown` and narrow types.
Use `type` for unions and primitives.
Use `interface` for object shapes.
Define a lean DTO type for every Mongoose model for use in API responses (e.g., UserDTO, PostDTO).

## STYLING RULES
Tailwind utility classes only. No custom CSS unless no Tailwind alternative exists.
Use cn() from @/lib/utils for conditional class merging.
Mobile-first responsive: base → sm → md → lg → xl.
Dark mode via Tailwind dark: variants. ShadCN handles theme via CSS variables.
Never hardcode color values. Always use ShadCN theme tokens:
  bg-background, text-foreground, border, muted, muted-foreground,
  primary, primary-foreground, secondary, destructive, accent, card.

## NAMING CONVENTIONS
Components:     PascalCase           PostCard.tsx, UserAvatar.tsx
Pages:          lowercase            page.tsx, layout.tsx
Hooks:          camelCase + use      useCurrentUser.ts, useFeed.ts
Utils:          camelCase            formatDate.ts, truncateText.ts
Types/DTOs:     PascalCase           User.ts, PostDTO.ts
Zod schemas:    camelCase + Schema   createPostSchema.ts, loginSchema.ts
Mongoose models: PascalCase         User.ts, Post.ts (in models/)
Context:        PascalCase + Context AuthContext.tsx, ThemeContext.tsx

## IMPORT ORDER
1. React and Next.js imports
2. Third-party libraries
3. Internal aliases (@/lib, @/models, @/components, @/hooks, @/context, @/types)
4. Type-only imports (import type ...)

## ABSOLUTE RULES — NEVER VIOLATE
Never use <img>. Always use <Image /> from next/image.
Never edit any file inside components/ui/. That directory is ShadCN managed.
Never store JWT in localStorage or sessionStorage. httpOnly cookie only.
Never call mongoose.connect() directly outside of lib/db.ts.
Never import a Mongoose model without calling connectDB() first.
Never return Mongoose documents directly. Always use .lean() and strip sensitive fields.
Never skip Zod validation on any user input.
Never use console.log in non-debug code.
Never store secrets in code. All secrets in .env.local only.
Never use useEffect for data fetching.
Never install a new package without checking it is not already covered by the stack.

## ENVIRONMENT VARIABLES
MONGODB_URI
AUTH_SECRET
UPLOADTHING_SECRET
UPLOADTHING_APP_ID
NEXT_PUBLIC_APP_URL

## FEATURE BUILD ORDER
When building any new feature always follow this sequence:
1. Mongoose model in models/ (if new model needed)
2. TypeScript DTO types in types/
3. Zod validation schema in lib/validations/
4. API route or Server Action with auth check and DB logic
5. TanStack Query hook in hooks/ (if client-side)
6. UI components
7. Wire UI to query hook or Server Action
8. Add loading skeleton, Suspense boundary, and error state

## CURRENT FEATURE STATUS
project-setup: done
shadcn-installed: done
auth-register-login: pending
user-profile: pending
create-post: pending
feed: pending
like-comment: pending
follow-system: pending
notifications: pending
messaging: pending
explore-search: pending
image-upload: pending
dark-mode: pending