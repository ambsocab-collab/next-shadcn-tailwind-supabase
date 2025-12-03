# GMAO-MVP-V1 - Epic Breakdown

**Author:** Bernardo
**Date:** 2025-12-03
**Project Level:** Medium-High
**Target Scale:** Industrial MVP

---

## Overview

This document provides the complete epic and story breakdown for **gmao-mvp-v1**, decomposing the requirements from the [PRD](./prd.md) into implementable stories. It integrates technical decisions from [Architecture](./architecture.md) and interaction patterns from [UX Design](./ux-design-specification.md).

**Strategy:** The project will be delivered in **10 Value-Based Epics** that progressively build the system from a solid foundation to advanced analytics.

**Living Document Notice:** This is the initial version. It will be updated continuously as implementation details are refined.

---

## Functional Requirements Inventory

| ID | Description | Category |
| :--- | :--- | :--- |
| **FR0** | Landing Page Corporativa de acceso y presentación | User Account |
| **FR1** | Gestión de Roles (Operario, Técnico, Supervisor, Admin) | User Account |
| **FR2** | Gestión de Capacidades Técnicas (N1-N5) | User Account |
| **FR3** | Invitación de usuarios y flujo de registro | User Account |
| **FR4** | Autenticación persistente y segura (Supabase) | User Account |
| **FR5** | Estructura de Activos Multidimensional (Jerarquía, Familia, Sistema) | Asset Mgmt |
| **FR6** | Ficha técnica e historial de activos | Asset Mgmt |
| **FR7** | Búsqueda predictiva de activos (Nombre, Código, QR) | Asset Mgmt |
| **FR8** | Flujo Reactivo: Notificaciones de Línea (NL) Móvil | Order Mgmt |
| **FR9** | Flujo Directo: Creación de OT (Preventivas/Mejoras) | Order Mgmt |
| **FR10** | Flujo Externo: Asignación a Empresas Externas | Order Mgmt |
| **FR11** | Conversión NL -> OT (Individual y Canvas) | Order Mgmt |
| **FR12** | Canvas Visual (Tablero Kanban) | Visual Planning |
| **FR13** | Asignación Drag & Drop en Canvas | Visual Planning |
| **FR14** | Estados en tiempo real en Canvas | Visual Planning |
| **FR15** | Filtros visuales en Canvas (Línea, Prioridad, Técnico) | Visual Planning |
| **FR16** | Vista "Mis Órdenes" optimizada para móvil | Execution |
| **FR17** | Registro de trabajo (Diagnóstico, Tiempo, Repuestos) | Execution |
| **FR18** | Flujo de Solicitud de Cierre y Validación Supervisor | Execution |
| **FR19** | Gestión de Bloqueos de OT | Execution |
| **FR20** | Catálogo de Repuestos Estructurado | Inventory |
| **FR21** | Descuento automático de stock en OT | Inventory |
| **FR22** | Alertas de stock mínimo | Inventory |
| **FR23** | Gestión de Entradas (Recepción controlada) | Inventory |
| **FR24** | Notificaciones Push/Email críticas | Notifications |
| **FR25** | Notificaciones accionables | Notifications |
| **FR26** | Calendario de Cumplimiento Legal | Compliance |
| **FR27** | Registro de No Conformidades (NC) | Compliance |
| **FR28** | Flujo NC -> OT | Compliance |
| **FR29** | Bloqueo de cierre de NC hasta validar OT | Compliance |
| **FR30** | Repositorio documental legal por activo | Compliance |
| **FR31** | Sustitución de Rotables (Componentes) | Advanced |
| **FR32** | Ciclo de Recuperación de Rotables | Advanced |
| **FR33** | Gestión centralizada de necesidades de compra | Procurement |
| **FR34** | Generación de Órdenes de Compra (OC) | Procurement |
| **FR35** | Regularización manual de stock (Auditada) | Data/Admin |
| **FR36** | Carga Masiva de Activos y Repuestos (CSV) | Data/Admin |
| **FR37** | Exportación de datos a CSV | Data/Admin |
| **FR38** | Permisos Granulares por usuario | Data/Admin |
| **FR39** | Dashboard de KPIs (MTTR, MTBF, etc.) | Analytics |
| **FR40** | Modo TV / Kiosco para planta | Analytics |
| **FR41** | Bitácora de actividad en OT | Collaboration |

---

## Epic Structure Plan

The project is structured into 10 Epics designed to deliver incremental user value:

1.  **Epic 1: Foundation & Authentication** (FR0, FR1, FR3, FR4, NFR3, NFR5)
    *   _Value:_ Users can securely access the system via a branded portal.
2.  **Epic 2: Asset Management Core** (FR5, FR6, FR7, FR36)
    *   _Value:_ Admins can structure the factory digital twin; Users can find equipment.
3.  **Epic 3: Inventory & Procurement Foundation** (FR20, FR23, FR33, FR34, FR35, FR36)
    *   _Value:_ Full control over spare parts, stock levels, and purchasing.
4.  **Epic 4: Reactive Maintenance Flow (The "Operator Loop")** (FR8, FR24, FR25)
    *   _Value:_ Operators can report breakdowns immediately from mobile.
5.  **Epic 5: Visual Planning & Order Management** (FR9, FR11, FR12, FR13, FR14, FR15)
    *   _Value:_ Supervisors can organize work and convert requests into orders.
6.  **Epic 6: Technician Execution & Collaboration** (FR16, FR17, FR18, FR19, FR21, FR41, FR2)
    *   _Value:_ Technicians can execute work, track time/parts, and communicate.
7.  **Epic 7: Advanced Maintenance & Compliance** (FR26, FR27, FR28, FR29, FR30, FR31, FR32)
    *   _Value:_ Legal compliance management and complex rotable flows.
8.  **Epic 8: External Provider Management** (FR10, FR38)
    *   _Value:_ Seamless integration of 3rd party maintenance providers.
9.  **Epic 9: Data Administration & Export** (FR37, FR38)
    *   _Value:_ Bulk data tools and granular permission control.
10. **Epic 10: Analytics & Visual Management** (FR39, FR40)
    *   _Value:_ Real-time visibility into plant performance for management.

---

## Epic 1: Foundation & Authentication

**Goal:** Establish the technical foundation, secure access control, and the branded entry point for the system.
**Prerequisites:** None (Greenfield start)

### Story 1.1: Project Initialization & Core Setup
**As a** Developer,
**I want** to initialize the project with the selected stack (Next.js, Supabase, Shadcn/UI),
**So that** we have a stable, standardized environment for development.

**Acceptance Criteria:**
**Given** the repository is empty
**When** I initialize the project using `Codelab-Davis/next-shadcn-tailwind-supabase` starter
**Then** the folder structure follows the Architecture `lib/`, `app/`, `components/` pattern
**And** TypeScript, ESLint, and Prettier are configured
**And** Tailwind CSS and Shadcn/UI are installed and working
**And** I can run the app locally on port 3000

**Technical Notes:**
- Use Next.js 15 (App Router).
- Configure `lib/supabase/client.ts` and `server.ts` with environment variables.
- Set up `global.css` with the "Industrial UI" color tokens defined in UX (Slate-950, Indigo-600).

### Story 1.2: Database Schema & RLS Foundation
**As a** System Architect,
**I want** to deploy the initial user and role schema to Supabase,
**So that** we can manage user identities and permissions securely.

**Acceptance Criteria:**
**Given** a fresh Supabase project
**When** I run the initial migration script
**Then** `user_profiles` table exists linked to `auth.users`
**And** `roles` enum exists ('operario', 'tecnico', 'supervisor', 'admin', 'display')
**And** `capabilities` table exists (for N1-N5 levels)
**And** RLS policies are enabled: Users can read their own profile; Admins can read all.

**Technical Notes:**
- Create `handle_new_user` trigger to auto-create profile on signup.
- Follow naming conventions: `snake_case` for DB.
- Seed initial Admin user.

### Story 1.3: Landing Page (Public Entry)
**As a** Company Employee,
**I want** to see a professional Landing Page when I visit the domain,
**So that** I understand what the tool is and where to log in.

**Acceptance Criteria:**
**Given** I am an unauthenticated user
**When** I visit the root URL
**Then** I see the branded Landing Page (UX Section 5.2 - Auth & Public)
**And** I see the "GMAO Industrial" logo and value proposition
**And** I see a clear "Acceso a Plataforma" (Login) button
**And** The design uses `Slate-950` background and `Indigo-600` accents

**Technical Notes:**
- Implement as a public route in Next.js.
- Component: `app/page.tsx`.
- Ensure responsive design for mobile/desktop.

### Story 1.4: Login & Authentication Flow
**As a** User,
**I want** to log in securely with my email and password,
**So that** I can access my personalized dashboard.

**Acceptance Criteria:**
**Given** I am on the Login page
**When** I enter valid credentials and click "Entrar"
**Then** I am authenticated via Supabase Auth
**And** I am redirected to the dashboard corresponding to my role
**And** My session persists even if I close the browser (FR4)

**Technical Notes:**
- Use Shadcn Form + Zod validation for email/password.
- Implement `lib/auth/actions.ts` for server-side login.
- Handle error states (invalid credentials) with Toast notifications.

### Story 1.5: User Profile & Password Management
**As a** User,
**I want** to view my profile and change my password,
**So that** I can keep my account secure.

**Acceptance Criteria:**
**Given** I am logged in
**When** I navigate to "Mi Perfil"
**Then** I see my Name, Role, and Avatar
**And** I can update my password using a secure form
**And** I cannot change my own Role or Capability level (ReadOnly)

**Technical Notes:**
- Reuse Auth layout.
- Update `user_profiles` via Server Action.
- Enforce password strength rules (Zod schema).

- Update `user_profiles` via Server Action.
- Enforce password strength rules (Zod schema).

---

## Epic 2: Asset Management Core

**Goal:** Create the digital twin of the factory (Assets) to enable all maintenance operations.
**Prerequisites:** Epic 1 (Foundation)

### Story 2.1: Asset Database Schema & Services
**As a** System Architect,
**I want** to implement the multi-dimensional asset database structure,
**So that** we can support the complex Hierarchy, Families, and Systems required.

**Acceptance Criteria:**
**Given** the database is ready
**When** I run the migration
**Then** `assets` table exists with self-referencing `parent_id` (FR5)
**And** `asset_families` and `systems` tables exist
**And** `asset_status` enum exists ('operativo', 'parada_planificada', 'averia', 'baja')
**And** RLS policies allow Read-All, Write-Admin/Supervisor

**Technical Notes:**
- Implements Recursive CTEs for hierarchy traversal (Architecture decision).
- Create `lib/data/assets.ts` service functions.

### Story 2.2: Asset Tree Explorer (Navigation)
**As a** User,
**I want** to browse assets using a hierarchical tree view,
**So that** I can easily locate a specific machine or component.

**Acceptance Criteria:**
**Given** I am on the "Activos" page
**When** I expand a Factory area
**Then** I see the Lines and Machines within it
**And** I can drill down indefinitely (Parent -> Child -> Sub-component)
**And** The tree loads efficiently (lazy loading children)

**Technical Notes:**
- Use a recursive React component (`AssetTreeNode`).
- Implement "Semáforo" status indicators on tree nodes (UX 2.2).

### Story 2.3: Asset Detail View & History
**As a** Technician,
**I want** to see the technical details and history of a machine,
**So that** I have context before starting a repair.

**Acceptance Criteria:**
**Given** I select an asset
**When** I view its detail page
**Then** I see its Technical Specs (Model, Serial, Install Date) (FR6)
**And** I see a list of recent Work Orders (History)
**And** I see attached documents (PDF manuals)

**Technical Notes:**
- Tabbed interface: General | History | Docs.
- Reusable `WorkOrderList` component (filtered by asset).

### Story 2.4: Predictive Asset Search
**As a** User,
**I want** to find an asset by typing part of its name or code,
**So that** I don't have to navigate the entire tree manually.

**Acceptance Criteria:**
**Given** I am using the global search bar
**When** I type "Bomb"
**Then** I see results like "Bomba Agua L1", "Bomba Aceite L2" (FR7)
**And** Clicking a result takes me to its Detail View

**Technical Notes:**
- Implement `ilike` search or Full Text Search in Supabase.
- Debounced input (300ms).

### Story 2.5: Bulk Asset Import Tool
**As an** Admin,
**I want** to upload a CSV file with the asset inventory,
**So that** I can populate the system quickly without manual entry.

**Acceptance Criteria:**
**Given** I have a CSV matching the template
**When** I upload it via the "Importar Activos" admin panel
**Then** The system validates the structure and parent IDs
**And** Records are created in bulk (FR36)
**And** I receive a success report or error log

**Technical Notes:**
- Use `react-dropzone` + `papaparse` on client.
- Transactional insert via Supabase RPC to ensure integrity.

---

## Epic 3: Inventory & Procurement Foundation

**Goal:** Establish robust control over spare parts and stock levels required for work execution.
**Prerequisites:** Epic 1 (Foundation)

### Story 3.1: Spare Parts Catalog & Schema
**As a** Supervisor,
**I want** to manage a structured catalog of spare parts,
**So that** we have a single source of truth for materials.

**Acceptance Criteria:**
**Given** the `spare_parts` table is created
**When** I access the "Repuestos" section
**Then** I can see a list of parts with Code, Description, Stock, and Min Stock
**And** I can create new parts with these fields (FR20)

**Technical Notes:**
- Table: `spare_parts` (id, code, name, current_stock, min_stock, location).
- Table: `stock_movements` (audit log).

### Story 3.2: Stock Movements & Audit Log
**As a** Manager,
**I want** all stock changes to be recorded immutably,
**So that** I can trace inventory discrepancies.

**Acceptance Criteria:**
**Given** stock is added or removed
**When** the transaction occurs
**Then** a record is written to `stock_movements`
**And** the `current_stock` in `spare_parts` updates atomically
**And** I can view the movement history in the Part Detail view

**Technical Notes:**
- Use Supabase Database Function (RPC) `adjust_stock(part_id, delta, reason)` to guarantee atomicity.

### Story 3.3: Stock Receipt (Entradas)
**As a** Technician,
**I want** to register the arrival of new material,
**So that** the stock levels reflect reality.

**Acceptance Criteria:**
**Given** I have physical parts to enter
**When** I use the "Recepción" form
**Then** I can select the part and enter quantity
**And** I must link it to an Order or mark as "Initial Load" (FR23)
**And** Stock increases immediately

**Technical Notes:**
- Validation: quantity > 0.

### Story 3.4: Manual Stock Regularization
**As a** Supervisor,
**I want** to manually correct stock levels when I find a discrepancy,
**So that** the system matches physical reality.

**Acceptance Criteria:**
**Given** I have the "Regularize" permission (FR35)
**When** I use the "Ajuste de Stock" action on a part
**Then** I must select a Reason (Rotura, Pérdida, Inventario)
**And** The correction is logged in movements

**Technical Notes:**
- Permission check: `can_regularize_stock` (FR38).

### Story 3.5: Purchase Needs & Order Generation
**As a** Procurement Manager,
**I want** to see all items below minimum stock and generate orders,
**So that** we can replenish inventory efficiently.

**Acceptance Criteria:**
**Given** parts are below `min_stock`
**When** I view "Necesidades de Compra" (FR33)
**Then** I see a list of critical items
**And** I can select items and click "Generar OC" (FR34)
**And** A PDF/Record of the Order is created

**Technical Notes:**
- New tables: `purchase_orders` and `purchase_order_lines`.

---

## Epic 4: Reactive Maintenance Flow ("Operator Loop")

**Goal:** Enable operators to report issues instantly via mobile.
**Prerequisites:** Epic 1, Epic 2 (Assets)

### Story 4.1: Operator Mobile Home (TWA)
**As an** Operator,
**I want** a simplified mobile home screen,
**So that** I can access my key actions quickly with gloves.

**Acceptance Criteria:**
**Given** I log in as 'Operario' on mobile
**When** the app loads
**Then** I see huge buttons for "Reportar Avería" and "Mis Avisos" (UX Flujo A)
**And** Navigation is minimal (Bottom Bar)

**Technical Notes:**
- PWA Manifest setup for installability.
- Mobile-first CSS (large touch targets).

### Story 4.2: Create Line Notification (NL)
**As an** Operator,
**I want** to report a breakdown in fewer than 5 taps,
**So that** I don't waste time on the line.

**Acceptance Criteria:**
**Given** I tap "Reportar Avería"
**When** I select the Asset -> Select Symptom -> Click Send
**Then** A "Notification" (NL) is created in the system (FR8)
**And** I see a success animation
**And** Supervisors are notified

**Technical Notes:**
- Wizard UI pattern.
- Creation creates a `work_order` with type='notification' and status='pending_review'.

### Story 4.3: Urgent Notifications (Push/Email)
**As a** Supervisor,
**I want** to receive an alert when a critical line stops,
**So that** I can react immediately.

**Acceptance Criteria:**
**Given** an NL is created with "Parada de Máquina"
**When** the record is saved
**Then** I receive a Browser Push Notification and/or Email (FR24)
**And** Clicking it takes me to the Notification detail

**Technical Notes:**
- Use Supabase Edge Functions for email sending (Resend/SendGrid).
- Web Push API for browser notifications.

---

## Epic 5: Visual Planning & Order Management

**Goal:** Empower supervisors to manage the backlog using the visual Canvas.
**Prerequisites:** Epic 2, Epic 4

### Story 5.1: Direct Work Order Creation
**As a** Supervisor,
**I want** to create a Preventive or Improvement OT directly,
**So that** I can schedule work not coming from breakdowns.

**Acceptance Criteria:**
**Given** I use the "Nueva OT" button
**When** I fill the details (Asset, Type, Priority, Description)
**Then** A new OT is created with status 'pending_planning' (FR9)

**Technical Notes:**
- Reuses Asset Search component.

### Story 5.2: The Planning Canvas (Board)
**As a** Supervisor,
**I want** to see all OTs and NLs on a Kanban board,
**So that** I can visualize the workload.

**Acceptance Criteria:**
**Given** I access the "Planificación" page
**When** the board loads
**Then** I see columns for "Nuevas NL", "Pendiente", "En Progreso", "Bloqueado" (FR12)
**And** Cards show Priority color and Asset name

**Technical Notes:**
- Use `dnd-kit` or `react-beautiful-dnd`.
- Polling every 30s for updates (or "Refresh" button).

### Story 5.3: NL to OT Conversion & Drag-Assignment
**As a** Supervisor,
**I want** to assign an NL to a technician by dragging it,
**So that** it becomes an active Work Order.

**Acceptance Criteria:**
**Given** an NL in "Nuevas" column
**When** I drag it to a Technician's swimlane/column
**Then** The NL converts to OT (FR11)
**And** Status updates to 'assigned'
**And** Assigned User is updated to that technician (FR13)

**Technical Notes:**
- Optimistic UI update for drag action.

### Story 5.4: Advanced Canvas Filters
**As a** Supervisor,
**I want** to filter the board by Production Line or Urgency,
**So that** I can focus on critical areas.

**Acceptance Criteria:**
**Given** the board is full of cards
**When** I select "Línea 1" in the filter
**Then** Only cards related to assets in Line 1 are shown (FR15)

**Technical Notes:**
- Client-side filtering for speed if dataset < 500 items.

---

## Epic 6: Technician Execution & Collaboration

**Goal:** Provide technicians with tools to execute work, track resources, and close orders.
**Prerequisites:** Epic 3 (Inventory), Epic 5 (Orders)

### Story 6.1: "My Work" Mobile View
**As a** Technician,
**I want** a list of orders assigned specifically to me,
**So that** I know what to do next.

**Acceptance Criteria:**
**Given** I log in as Technician
**When** I access "Mis Órdenes"
**Then** I see a prioritized list of assigned cards (FR16)
**And** I can filter by "Hoy" / "Futuro"

**Technical Notes:**
- Sort by Priority DESC, Date ASC.

### Story 6.2: Execution & Time Tracking
**As a** Technician,
**I want** to log my diagnosis and time spent,
**So that** we have accurate records.

**Acceptance Criteria:**
**Given** I am working on an OT
**When** I open the execution view
**Then** I can enter "Diagnosis" and "Actions Taken" text (FR17)
**And** I can manually input "Hours Spent"

**Technical Notes:**
- Simple number input for hours (MVP). Start/Stop timer is post-MVP.

### Story 6.3: Spare Parts Consumption
**As a** Technician,
**I want** to scan/select a part and use it in the OT,
**So that** it is deducted from stock and costed to the order.

**Acceptance Criteria:**
**Given** I used a bearing
**When** I add "Rodamiento X" to the OT materials list
**Then** Stock is reduced by 1 (FR21)
**And** The part is linked to the OT consumption table

**Technical Notes:**
- Reuses Stock Movement logic (Epic 3).

### Story 6.4: Blocking & Collaboration (Bitácora)
**As a** Technician,
**I want** to block an OT if I lack parts and leave a note,
**So that** the next shift knows why it's stopped.

**Acceptance Criteria:**
**Given** I cannot finish
**When** I change status to "Bloqueado"
**Then** I am prompted to select a reason (e.g., "Falta Repuesto")
**And** I can leave a comment in the "Bitácora" chat (FR41)

**Technical Notes:**
- Chat implemented as a simple comment feed table linked to OT.

---

## Epic 7: Advanced Maintenance & Compliance

**Goal:** Manage legal obligations and complex component lifecycles.
**Prerequisites:** Epic 2, Epic 5

### Story 7.1: Compliance Calendar
**As a** Safety Manager,
**I want** a calendar view of expiring certifications,
**So that** we avoid fines and risks.

**Acceptance Criteria:**
**Given** assets have "Legal Expiration Dates"
**When** I view the Compliance Calendar
**Then** I see assets marked red if expired or yellow if expiring soon (FR26)

**Technical Notes:**
- New table `asset_compliance`.

### Story 7.2: Non-Conformity (NC) Workflow
**As a** Quality Manager,
**I want** to open a Non-Conformity and link it to an OT,
**So that** the issue is tracked until resolved.

**Acceptance Criteria:**
**Given** I create an NC
**When** I link it to an OT for repair
**Then** The NC cannot be closed until the OT is "Validated" (FR29)

**Technical Notes:**
- State machine enforcement between NC and OT.

### Story 7.3: Rotable Component Swap
**As a** Technician,
**I want** to swap a broken motor for a new one,
**So that** the broken one is sent to repair, not scrapped.

**Acceptance Criteria:**
**Given** I am replacing a rotable part
**When** I select "Sustitución" action
**Then** Stock of New decreases by 1
**And** Stock of "Broken/Recoverable" increases by 1
**And** A "Repair Request" is auto-generated for the broken unit (FR31, FR32)

**Technical Notes:**
- Complex transaction logic.

---

## Epic 8: External Provider Management

**Goal:** Integrate external contractors into the digital flow.
**Prerequisites:** Epic 5

### Story 8.1: Provider Registry
**As an** Admin,
**I want** to register external companies,
**So that** we can assign work to them.

**Acceptance Criteria:**
**Given** I am Admin
**When** I go to "Proveedores"
**Then** I can CRUD provider companies (Name, Email, Speciality)

**Technical Notes:**
- Table `providers`.

### Story 8.2: External Assignment Flow (N5)
**As a** Supervisor,
**I want** to assign an OT to an external provider,
**So that** they are notified (via email) and the OT moves to "Externo".

**Acceptance Criteria:**
**Given** an OT requires specialized work
**When** I assign it to "Provider X"
**Then** Status changes to 'external_pending'
**And** It appears in the "Externo" column on Canvas (FR10)

**Technical Notes:**
- Email notification to provider contact.

---

## Epic 9: Data Administration & Export

**Goal:** Provide power tools for data management and bulk operations.
**Prerequisites:** Epic 2, Epic 3

### Story 9.1: Bulk Data Import (Expanded)
**As an** Admin,
**I want** to import Repuestos and User Lists via CSV,
**So that** initial setup is fast.

**Acceptance Criteria:**
**Given** CSV templates
**When** uploaded
**Then** System parses and creates records safely (FR36)

**Technical Notes:**
- Extend logic from Story 2.5.

### Story 9.2: CSV Export
**As a** Manager,
**I want** to export the Work Order history to Excel,
**So that** I can do custom analysis.

**Acceptance Criteria:**
**Given** a list of OTs
**When** I click "Export CSV"
**Then** A file downloads containing all visible columns (FR37)

**Technical Notes:**
- Use `papaparse` unparse or backend generation.

### Story 9.3: Granular Permissions UI
**As an** Admin,
**I want** to toggle specific permissions for a user (e.g., "Can Validate"),
**So that** I can override their default role.

**Acceptance Criteria:**
**Given** a user profile
**When** I toggle "Allow Stock Regularization"
**Then** That user gains the capability regardless of role (FR38)

**Technical Notes:**
- Update RLS/Application logic to check `user_permissions` table override.

---

## Epic 10: Analytics & Visual Management

**Goal:** Visualize performance for decision making.
**Prerequisites:** Data generation from previous epics

### Story 10.1: KPI Dashboard
**As a** Manager,
**I want** to see MTTR and MTBF graphs,
**So that** I know if we are improving.

**Acceptance Criteria:**
**Given** history of OTs
**When** I view the Dashboard
**Then** I see calculated metrics for the selected period (FR39)

**Technical Notes:**
- Heavy SQL aggregation queries. Use materialized views if slow.
- `recharts` for visualization.

### Story 10.2: TV / Kiosk Mode
**As a** Manager,
**I want** a high-contrast, rotating view for the workshop TV,
**So that** everyone sees the plant status.

**Acceptance Criteria:**
**Given** I log in as 'display' user
**When** I access the system
**Then** It enters a full-screen carousel of dashboards (FR40)
**And** It auto-refreshes data

**Technical Notes:**
- Carousel component.
- "Dark Mode High Contrast" theme.

- Carousel component.
- "Dark Mode High Contrast" theme.

---

## FR Coverage Matrix

| FR ID | Description | Covered By |
| :--- | :--- | :--- |
| **FR0** | Landing Page Corporativa | Story 1.3 |
| **FR1** | Gestión de Roles | Story 1.2, 1.4 |
| **FR2** | Gestión de Capacidades Técnicas | Story 1.2 |
| **FR3** | Invitación de usuarios | Story 1.2 (Seed/Trigger) |
| **FR4** | Autenticación persistente | Story 1.4 |
| **FR5** | Estructura de Activos Multidimensional | Story 2.1, 2.2 |
| **FR6** | Ficha técnica e historial | Story 2.3 |
| **FR7** | Búsqueda predictiva | Story 2.4 |
| **FR8** | Flujo Reactivo (NL) | Story 4.2 |
| **FR9** | Flujo Directo (OT) | Story 5.1 |
| **FR10** | Flujo Externo | Story 8.2 |
| **FR11** | Conversión NL -> OT | Story 5.3 |
| **FR12** | Canvas Visual | Story 5.2 |
| **FR13** | Asignación Drag & Drop | Story 5.3 |
| **FR14** | Estados en tiempo real | Story 5.2 (Polling) |
| **FR15** | Filtros visuales | Story 5.4 |
| **FR16** | Vista "Mis Órdenes" | Story 6.1 |
| **FR17** | Registro de trabajo | Story 6.2 |
| **FR18** | Flujo de Cierre | Story 6.2 (Status change) |
| **FR19** | Gestión de Bloqueos | Story 6.4 |
| **FR20** | Catálogo de Repuestos | Story 3.1 |
| **FR21** | Descuento stock en OT | Story 6.3 |
| **FR22** | Alertas stock mínimo | Story 3.5 |
| **FR23** | Gestión de Entradas | Story 3.3 |
| **FR24** | Notificaciones Push/Email | Story 4.3 |
| **FR25** | Notificaciones accionables | Story 4.3 |
| **FR26** | Calendario Cumplimiento | Story 7.1 |
| **FR27** | Registro NC | Story 7.2 |
| **FR28** | Flujo NC -> OT | Story 7.2 |
| **FR29** | Bloqueo cierre NC | Story 7.2 |
| **FR30** | Repositorio documental | Story 2.3 (Docs tab) |
| **FR31** | Sustitución Rotables | Story 7.3 |
| **FR32** | Ciclo Recuperación | Story 7.3 |
| **FR33** | Gestión necesidades compra | Story 3.5 |
| **FR34** | Generación OC | Story 3.5 |
| **FR35** | Regularización stock | Story 3.4 |
| **FR36** | Carga Masiva | Story 2.5, 9.1 |
| **FR37** | Exportación CSV | Story 9.2 |
| **FR38** | Permisos Granulares | Story 9.3 |
| **FR39** | Dashboard KPIs | Story 10.1 |
| **FR40** | Modo TV / Kiosco | Story 10.2 |
| **FR41** | Bitácora OT | Story 6.4 |

---

## Summary

The breakdown results in **10 Epics** and **32 Detailed User Stories**.

**Key Metrics:**
- **FR Coverage:** 100% (42/42 Requirements mapped).
- **Architecture Alignment:** All major services (Assets, Inventory, Auth, Notifications) have corresponding DB structures and logic defined in stories.
- **UX Alignment:** Critical flows (Mobile Operator, Canvas Supervisor) are explicitly detailed in stories 4.1, 4.2, 5.2, and 5.3.

**Next Steps:**
Proceed to **Sprint Planning** to select the initial batch of stories (Recommended: Epic 1 + part of Epic 2) for the first iteration.
