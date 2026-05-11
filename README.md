# Campus Notifications Microservice | Roll No: 110723105032

This repository contains the Frontend Evaluation project for the Campus Notification System. It is built using **React**, **TypeScript**, and **Material UI**, featuring a custom priority engine and remote logging integration.

---

## 🚀 Quick Start

### 1. Installation

Navigate to the frontend directory and install dependencies:

```bash
cd notification_app_fe
npm install
```

### 2. Run the App

Launch the development server:

```bash
npm run dev
```

The app will be accessible at:

```txt
http://localhost:5173
```

---

## 🏗️ Project Architecture

The project is structured to ensure separation of concerns and high maintainability:

- `/src/services/api.ts`
  - Centralized API service using Axios.
  - Handles OAuth2 Bearer token retrieval and notification fetching.

- `/src/utils/priorityLogic.ts`
  - The "Priority Engine" that implements the Stage 1 sorting rules.

- `/src/components/NotificationCard.tsx`
  - A reusable, styled Material UI component for displaying notification data.

- `/logging-middleware.ts`
  - A root-level utility used to sync frontend events with the remote evaluation server.

---

## ✅ Core Requirements Fulfilled

### 1. Logic: Priority Inbox (Stage 1)

I developed a sorting algorithm that prioritizes notifications based on the following hierarchy:

1. Placement (**Highest Priority**)
2. Result
3. Event (**Lowest Priority**)

#### Tie-breaking Rule

If two notifications share the same priority level, the system displays the most recent one first based on the timestamp.

The Priority View is limited to the **Top 10 items**.

---

### 2. UI/UX: Material Design (Stage 2)

- **Theming**
  - Clean, professional layout using Material UI `Paper` and `Box` components.

- **Color Coding**
  - Red for Placement
  - Orange for Results
  - Blue for Events

- **Interactive State**
  - Notifications transition to a "read" state (reduced opacity) upon user interaction.

- **Persistence**
  - Read/Unread status is persisted in the browser's `localStorage`.

---

### 3. Remote Logging

Integrated a middleware that logs key application lifecycle events:

- Authentication Success
- Data Fetching Success
- Error boundaries for API failures

---

## 🛠️ Technical Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend Library |
| TypeScript | Type Safety & Predictability |
| Material UI (MUI) | Styling & Components |
| Vite | Build Tool & Dev Server |
| Axios | API Communication |

---

## 👤 Student Information

- **Roll Number:** 110723105032  
- **Evaluation Track:** Frontend Development  
- **Submission Date:** May 11, 2026
