export interface Notification {
    id: string;
    Type: "Placement" | "Result" | "Event";
    Message: string;
    Timestamp: string;
}

const TYPE_WEIGHTS: Record<string, number> = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
};

/**
 * Sorts notifications based on the Stage 1 priority rules:
 * 1. Weight (Type)
 * 2. Recency (Timestamp)
 */
export const getPriorityNotifications = (notifications: Notification[], limit: number = 10): Notification[] => {
    return [...notifications].sort((a, b) => {
        const weightA = TYPE_WEIGHTS[a.Type] || 0;
        const weightB = TYPE_WEIGHTS[b.Type] || 0;

        if (weightB !== weightA) {
            return weightB - weightA;
        }

        // Tie-breaker: Newest first
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    }).slice(0, limit);
};