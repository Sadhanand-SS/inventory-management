Product Inventory Management App (React)

This project is a vendor-focused inventory management application built with React, React Router, and Context API.
It is designed as an internal tool, not a public-facing site.

The goal of this project is learning-by-building with correct architecture, not just feature completion.

📌 Core Purpose

Vendors can manage their own products

Admin can see all vendors’ products

Authentication is required for all meaningful actions

No anonymous browsing experience is intended

🧱 Tech Stack

React (JavaScript, not TypeScript)

React Router

Context API

Vite

No backend (dummy data only)

🗂 Folder Structure (Key Files)
check the FileStructure.txt

🔐 Authentication Design
AuthContext (AuthContext.jsx)

Single source of truth: user

Derived flag: isAuthenticated

Public API:

login({ username, password })

logout()

signup(data)

All auth actions return:

{ success: boolean, error?: string }

Important Rules

UI never calls setUser directly

All auth state changes go through auth actions

AuthContext does not handle UI or routing

🔁 useAuth Hook (useAuth.js)

Wrapper around useContext(AuthContext)

Throws error if used outside AuthProvider

Used by Header and Pages

🧭 Routing \& Providers (main.jsx)

Provider order is intentional:

ThemeProvider
└── AuthProvider
└── InventoryProvider
└── App



This ensures:

Theme applies globally

Auth is available to inventory

Inventory can later depend on auth (vendor filtering)

🔔 Notification System (Important Pattern)
Design Choice

No NotificationContext

Notifications are route-scoped flash messages

Passed via navigate(path, { state })

Pattern Used

Action triggers navigation + message

Login success

Logout success

Product add/delete

Destination page renders notification

InventoryPage renders inventory-related messages

LoginPage renders auth-related messages

Route state is consumed and cleared

navigate(location.pathname, { replace: true, state: null });



This ensures:

Notification shows once

No repetition on refresh

No global state pollution

📄 Pages
LoginPage (LoginPage.jsx)

Controlled form with object state:

{ username, password }



Uses useAuth().login

Handles:

Login success → navigate to /inventory with notification

Login failure → Notification (error)

Also consumes logout notification via route state

Owns Notification rendering for /login

InventoryPage (InventoryPage.jsx)

Main working page after login

Consumes login success notifications

Clears route state after display

Uses InventoryContext

Future: vendor-based filtering

🧩 Header (Header.jsx)

Auth-aware UI

Shows:

Login button when logged out

Username + Logout when logged in

Logout flow:

Calls logout()

Navigates to /login with notification

Header does not render notifications

🧠 Key Architectural Decisions (Locked)

❌ No global NotificationContext (yet)

❌ No auth logic in UI components

❌ No anonymous inventory browsing

✅ Route-state used for flash messages

✅ Destination page owns notification rendering

✅ AuthContext only manages auth state

✅ InventoryContext only manages product data

🚧 Current Status
Completed

AuthContext (login / logout / signup)

Header auth-aware UI

LoginPage with notifications

InventoryPage notification handling

Route-state flash notification pattern

Notification component reused correctly

Next Possible Steps

Add route guards (RequireAuth)

Remove mock login from Header

Vendor-based inventory filtering

Signup page

Admin role behavior

“This is a React vendor inventory app.
AuthContext and route-state notifications are implemented.
Please read the README.md first.”

This will fully restore context.

✨ Final Note

This project prioritizes:

clarity over cleverness

correct ownership of state

patterns that scale when needed, not before

all the code files are given in the code context you can access them.



The goal is not just to build features, but to build correct mental models.



────────────────────────────────────────────────────────

📈 Project Progress Update (After Initial README)



This section documents changes and additions made AFTER the initial README

was written. The original content above remains unchanged by design.



────────────────────────────────────────────────────────



🧭 Updated Application Flow



Authentication Flow

\- User must login at `/login`

\- Based on role:

&nbsp; - Admin → redirected to `/vendors`

&nbsp; - Vendor → redirected to `/inventory/:vendorId`

\- No anonymous access is allowed anywhere in the app



Authorization Flow (Route Guards)

\- RequireAuth

&nbsp; - Protects all authenticated routes

\- RequireAdmin

&nbsp; - Admin-only access:

&nbsp;   - `/vendors`

&nbsp;   - `/vendors/:vendorId`

\- RequireVendor

&nbsp; - Vendor-only access:

&nbsp;   - `/inventory/:vendorId`

\- Unauthorized access redirects to `/unauthorized`

&nbsp; - User is NOT auto-logged out

&nbsp; - Page is informational only



────────────────────────────────────────────────────────



🏢 Vendor Domain (Admin Only)



New Capabilities

\- Admin can:

&nbsp; - View list of vendors (`/vendors`)

&nbsp; - Add vendors

&nbsp; - Delete vendors

&nbsp; - Navigate to vendor detail page



Vendor Detail Page (`/vendors/:vendorId`)

\- Centralized admin workspace for a single vendor

\- Contains:

&nbsp; - VendorSummary

&nbsp;   - Displays full vendor details

&nbsp;   - Edit vendor details (only here)

&nbsp; - InventoryPage

&nbsp;   - Shows products belonging ONLY to this vendor



Design Decisions

\- Vendor editing is NOT allowed on `/vendors`

\- Vendor editing is centralized in VendorDetailPage

\- VendorContext handles data + validation only

\- UI and routing logic are kept out of context



Vendor Validation

\- vendorHelper.js introduced

\- Validates vendor object shape for:

&nbsp; - Add vendor

&nbsp; - Update vendor

\- Validation is frontend-only (no backend yet)



────────────────────────────────────────────────────────



📦 Inventory Domain (Vendor-Scoped)



Major Change

\- Inventory is ALWAYS vendor-scoped

\- There is no global inventory view



Inventory Access

\- Vendor:

&nbsp; - `/inventory/:vendorId`

\- Admin:

&nbsp; - Accesses inventory only via `/vendors/:vendorId`



InventoryPage Responsibilities

\- Resolves activeVendorId from:

&nbsp; - route param OR

&nbsp; - parent prop (admin flow)

\- Filters products by vendorId at page level

\- Injects vendorId on product ADD

\- Preserves vendorId on product EDIT

\- No role logic inside InventoryContext



Product Shape (Finalized)

\- Product object shape is now locked:



&nbsp; {

&nbsp;   id,

&nbsp;   vendorId,

&nbsp;   name,

&nbsp;   price,

&nbsp;   quantity,

&nbsp;   category

&nbsp; }



Product Validation

\- helpers.js renamed to inventoryHelper.js

\- Validation enforces:

&nbsp; - Required fields

&nbsp; - vendorId presence for add/edit



────────────────────────────────────────────────────────



🧠 Architecture Refinements



Contexts

\- AuthContext

&nbsp; - Auth state only

\- VendorContext

&nbsp; - Vendor CRUD + validation

\- InventoryContext

&nbsp; - Product CRUD + validation



Important Rule:

Contexts do NOT:

\- Handle routing

\- Handle authorization

\- Handle UI state



Pages decide intent.

Contexts validate and mutate data.



────────────────────────────────────────────────────────



🔔 Notification Pattern (Extended)



\- Notification system retained as route-scoped

\- Notifications are now used for:

&nbsp; - Vendor add/update/delete

&nbsp; - Product add/update/delete

&nbsp; - Auth flows

\- No NotificationContext introduced

\- Notifications are cleared after display



────────────────────────────────────────────────────────



⚙️ React Hooks Usage (Current)



useRef

\- Used for DOM focus:

&nbsp; - ProductForm

&nbsp; - VendorForm

\- Used only for imperative or non-UI concerns

\- No misuse as state replacement



useCallback / useMemo

\- Not yet applied

\- Planned as a learning phase after core logic stabilized



────────────────────────────────────────────────────────



🚧 Current State of the Project



✔ Authentication \& Authorization complete  

✔ Vendor management complete (Admin)  

✔ Vendor-scoped inventory complete  

✔ Validation layers in place  

✔ Route guards implemented  

✔ No persistence (by design)  



Next Planned Steps

\- Learn and apply useCallback

\- Learn and apply useMemo

\- Backend integration (ASP.NET Core, EF, PostgreSQL)

\- UI enhancement using Material UI



────────────────────────────────────────────────────────



