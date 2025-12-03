---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - docs/prd.md
  - docs/ux-design-specification.md
  - docs/asset-organization-guide.md
workflowType: 'architecture'
lastStep: 0
project_name: 'gmao-mvp-v1'
user_name: 'Bernardo'
date: '2025-12-03'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The project entails 42 core functional requirements spanning a comprehensive GMAO system. Key architectural drivers include:
- **User & Access:** Role-based (Operario, Técnico, Supervisor, Admin) access control with secure, persistent authentication. User "Capabilities" (N1-N5) are attributes defining technical skill level, influencing assignment and workflow, but not direct authorization.
- **Asset Management:** Hierarchical and multi-dimensional asset structure (Parent-Child, Families, Systems) requiring flexible data modeling.
- **Order Management:** Diverse creation flows (Reactive, Direct, External N5) and complex state transitions (NL -> OT).
- **Visual Planning (Canvas):** A collaborative Kanban board with Drag & Drop functionality. *Note: Real-time movement is replaced by periodic refresh or "revalidation on focus" strategies.*
- **Inventory & Procurement:** Real-time stock management, automated alerts, purchase order generation, and rotable component handling.
- **Execution:** Mobile-optimized interfaces for technicians, including time tracking, spare parts consumption, and validation workflows.
- **Compliance:** Tracking legal compliance and linking Non-Conformities to corrective actions.

**Non-Functional Requirements:**
- **Performance:** Critical dashboards load < 2s; Canvas updates via optimistic UI / polling (latency requirements relaxed from strict <500ms sync).
- **Security:** Strict RBAC (Role-Based Access Control) with Row Level Security (RLS) at the database layer. Capabilities (N1-N5) are user attributes, not direct authorization criteria.
- **Platform:** Online-first architecture, deployable as a TWA/PWA on industrial Android devices.
- **Usability:** High-contrast, "glove-friendly" UI with large touch targets (>44px).
- **Reliability:** 99.9% availability; automated daily backups.

**Scale & Complexity:**
The project exhibits **Medium-High** complexity. Removing strict real-time sync reduces infrastructure complexity significantly, though domain logic (assets/inventory) and granular access management (Role + Capability as an attribute for workflow) remain complex.

- Primary domain: **Industrial Web Application (SaaS-like)**
- Complexity level: **Medium-High**
- Estimated architectural components: **12-15** (Auth, Asset Service, Order Service, Canvas Engine, Inventory Service, Notification Service, Analytics, etc.)

### Technical Constraints & Dependencies

- **Stack:** Next.js + Supabase (implied from "What Makes This Special").
- **UI Framework:** Tailwind CSS + Shadcn/UI (from UX Spec).
- **Connectivity:** Online-first (Standard REST/RPC calls).
- **Devices:** Industrial Android tablets/mobiles and Desktop workstations.

### Cross-Cutting Concerns Identified

- **Data Freshness:** Implementing robust caching and revalidation strategies (e.g., React Query / SWR) to ensure users see up-to-date data without WebSockets.
- **Authorization:** Pure RBAC (Role-Based Access Control) for feature and data access. Capabilities (N1-N5) are user profile attributes, used for business logic like task assignment, not for gatekeeping access.
- **Auditability:** Tracking all state changes in Orders and Inventory.
- **Notification System:** Multi-channel (Push, Email, In-app) alerts.
- **Data Consistency:** Ensuring integrity between Inventory and Order modules.

## Starter Template Evaluation

### Primary Technology Domain

**Full-Stack Web Application (Next.js + Supabase)**
Based on the requirement for a "Modern Industrial SaaS" with online-first capabilities, secure RBAC, and high performance, a tightly integrated Next.js + Supabase stack is the optimal choice.

### Starter Options Considered

**1. `Codelab-Davis/next-shadcn-tailwind-supabase`**
*   **Pros:** Includes Next.js 15 (latest), App Router, Shadcn UI, and Supabase integration out-of-the-box. Very clean structure.
*   **Cons:** Less opinionated about SaaS features (subscriptions, teams) than dedicated SaaS starters.
*   **Verdict:** **Strong Candidate** for a custom-built industrial application where we need full control over the domain logic (Assets, OTs) rather than generic SaaS features.

**2. `vercel/nextjs-subscription-payments` (now `nextjs/saas-starter`)**
*   **Pros:** Excellent for generic SaaS (Stripe, Auth, Subscriptions pre-built).
*   **Cons:** "End of life" repo status (replaced by saas-starter); heavy boilerplate for features we might not need (complex subscription tiers) while missing the core industrial UI focus.
*   **Verdict:** Too generic; we need more custom data modeling for assets.

**3. `michaeltroya/supa-next-starter`**
*   **Pros:** Good integration of TanStack Query and Testing tools.
*   **Cons:** Slightly older stack versions in some references; less focus on the specific Shadcn/Tailwind integration we want.
*   **Verdict:** Good backup, but Option 1 is more aligned with our UI stack needs.

### Selected Starter: `Codelab-Davis/next-shadcn-tailwind-supabase`

**Rationale for Selection:**
This starter provides the exact "Golden Stack" defined in our requirements (Next.js + Supabase + Tailwind + Shadcn) without unnecessary bloat. It gives us a modern, type-safe foundation (TypeScript, ESLint) and the correct UI library pre-configured, which saves significant setup time for the "Industrial UI" system. It allows us to build our custom Asset and Order management logic on a clean slate rather than fighting against a pre-built SaaS subscription model.

**Initialization Command:**

```bash
git clone https://github.com/Codelab-Davis/next-shadcn-tailwind-supabase.git gmao-mvp-v1
cd gmao-mvp-v1
pnpm install
# (Then configure .env.local with Supabase credentials)
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- **TypeScript:** Enforced for type safety (critical for our complex data models).
- **Next.js 15 (App Router):** Uses React Server Components for performance.

**Styling Solution:**
- **Tailwind CSS:** Utility-first for rapid custom styling.
- **Shadcn/UI:** Accessible, component-based UI system (Radix UI primitives).

**Build Tooling:**
- **Turbopack:** For faster local development iteration.

**Code Organization:**
- **Modular Structure:** Separates `components` (UI), `app` (Routes), and `lib` (Utilities/Supabase Client).

**Development Experience:**
- **ESLint + Prettier:** Standardized code formatting.
- **Supabase Types:** Auto-generation of TypeScript types from the database schema.

**Note:** Project initialization using this command should be the first implementation story.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 key areas where consistency is paramount: Naming, Structure, Format, Communication, and Process.

### Naming Patterns

**Database Naming Conventions (Supabase/PostgreSQL):**
*   **Tables:** `snake_case` (lowercase), plural (e.g., `user_profiles`, `work_orders`).
*   **Columns:** `snake_case` (lowercase) (e.g., `first_name`, `created_at`).
*   **Foreign Keys:** `snake_case` (lowercase) (e.g., `user_id`, `asset_id`).
*   **Indexes:** `idx_table_column` (e.g., `idx_user_profiles_email`).

**API Naming Conventions (Next.js):**
*   **Endpoints:** `kebab-case` (lowercase). Plural for collections (e.g., `/api/work-orders`), singular for specific resources (e.g., `/api/work-orders/:id`).
*   **Route Parameters:** `kebab-case` (e.g., `/api/work-orders/[work-order-id]`).
*   **Query Parameters:** `camelCase` (e.g., `?status=open&assigneeId=123`).

**Code Naming Conventions (TypeScript/React):**
*   **React Components:** `PascalCase` (e.g., `UserCard`, `WorkOrderCanvas`). Files named identically (e.g., `UserCard.tsx`).
*   **Functions:** `camelCase` (e.g., `getUserData`, `calculateMTTR`).
*   **Variables:** `camelCase` (e.g., `userId`, `isLoading`).
*   **Constants:** `SCREAMING_SNAKE_CASE` (e.g., `MAX_CANVAS_ITEMS`).
*   **Types/Interfaces:** `PascalCase` (e.g., `User`, `WorkOrderState`).

### Structure Patterns

**Project Organization:**
*   **Tests:** Co-located with source files, using `.test.ts` suffix (e.g., `UserCard.tsx`, `UserCard.test.tsx`).
*   **Components:**
    *   **Generic/UI:** `components/ui` (Shadcn) or `components/common`.
    *   **Domain-Specific:** Co-located within feature folder (e.g., `app/dashboard/components/WorkOrderCard`).
*   **Utilities:** `lib/utils` for generic helpers; domain-specific helpers co-located with feature.
*   **Services:**
    *   **Supabase:** `lib/supabase` for client config & auth.
    *   **Data Access:** `lib/data` for domain data functions (e.g., `lib/data/assets.ts`).

**File Structure Patterns:**
*   Follow Next.js App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).

### Format Patterns

**API Response Formats:**
*   **Success:** Direct data return (e.g., `{ "id": 1, "name": "Bernardo" }` or `[...]`). Avoid wrappers.
*   **Error:** Consistent object: `{ "error": { "message": "...", "code": "...", "details": {...} } }`.
*   **Dates:** ISO 8601 UTC strings (e.g., `"2025-12-03T10:30:00.000Z"`).

**Data Exchange Formats:**
*   **JSON Fields:** `camelCase` (e.g., `firstName`).
*   **Booleans:** `true` / `false`.
*   **Null Handling:** Use `null` for optional fields with no value; avoid `undefined` in serialized data.

### Communication Patterns

**Event System Patterns:**
*   **MVP:** No explicit event system beyond state management.
*   **Future:** If needed, `camelCase` event names and minimalist payloads.

**State Management Patterns:**
*   **Updates:** Immutable state updates.
*   **Zustand Actions:** `camelCase` naming (e.g., `setSidebarOpen`).
*   **Selectores:** Use selectors to optimize performance.
*   **TanStack Query:** Strategic use of `invalidateQueries` for server data freshness and `setQueryData` for optimistic updates.

### Process Patterns

**Error Handling Patterns:**
*   **UI:** React `Error Boundaries` for critical sections.
*   **User Messages:** Clear, actionable messages via Toast/Alert components.
*   **Logging:** Log all server errors with context; log client errors caught by boundaries.

**Loading State Patterns:**
*   **Global:** Only for initial route loads/blocking transitions.
*   **Local:** Contextual indicators (skeletons, spinners) for most interactions.
*   **Nomenclatura:** `isLoading`, `isFetching`, `isSubmitting`.

**Validation Patterns:**
*   **Schemas:** Zod schemas defined in `lib/schemas`, shared between frontend and backend.
*   **Client-side:** React Hook Form + Zod for immediate feedback (`onSubmit`, `onBlur`).
*   **Server-side:** Strict re-validation of all inputs in Server Actions/API Routes.
*   **UI:** Inline validation messages using Shadcn Form components.

### Enforcement Guidelines

**All AI Agents MUST:**
*   Adhere strictly to the defined naming conventions for all new code.
*   Place files in the designated structure locations (`lib/data`, feature folders, etc.).
*   Use `date-fns` for all date manipulation and formatting.
*   Implement Zod validation for all forms and API inputs.

**Pattern Enforcement:**
*   Code reviews (self-correction by agents) should verify these patterns.
*   Violations should be corrected immediately upon detection.

### Pattern Examples

**Good Examples:**
*   `const userProfile = await supabase.from('user_profiles').select('*');` (Correct DB & Variable naming)
*   `export const WorkOrderCard = () => { ... }` (Correct Component naming)
*   `import { format } from 'date-fns';` (Correct Date library)

**Anti-Patterns:**
*   `const User_Profile = ...` (Incorrect variable naming)
*   `function get_user_data() { ... }` (Incorrect function naming)
*   Using `moment.js` or native `Date` formatting manually.
*   Directly mutating Zustand state.



