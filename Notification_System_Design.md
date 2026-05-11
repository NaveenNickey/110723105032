# Campus Notifications Microservice Design

## Stage 1: Priority Notification Logic
To ensure students see the most critical information first, I implemented a multi-tiered sorting algorithm:

1. **Weighting System**: I assigned numerical weights to notification types:
   - `Placement`: 3 (Highest)
   - `Result`: 2
   - `Event`: 1 (Lowest)
2. **Chronological Tie-breaking**: When types are identical, the system compares ISO 8601 timestamps to prioritize the most recent data.
3. **Efficiency**: The sorting runs in $O(N \log N)$ time. For production scalability with millions of notifications, we could implement a **Min-Heap** of size 10 to keep the "Priority Inbox" updated in $O(1)$ lookup time.

## Stage 2: Frontend Architecture
- **Framework**: React with TypeScript for type safety.
- **Styling**: Material UI (MUI) for a professional, responsive layout.
- **State Management**: React `useState` and `useEffect` for data fetching; `localStorage` to persist "Read/Unread" status.
- **Logging**: Integrated a custom middleware to track API failures and user interactions.