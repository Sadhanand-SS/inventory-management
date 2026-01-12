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

🧭 Routing & Providers (main.jsx)

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