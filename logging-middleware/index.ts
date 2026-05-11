/**
 * Log function to send application logs to the evaluation server.
 * Must be called from the frontend app to track events and errors.
 */

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export const Log = async (
    stack: string, 
    level: LogLevel, 
    pkg: string, 
    message: string, 
    token: string
) => {
    const LOG_URL = "http://4.224.186.213/evaluation-service/logs";

    const payload = {
        stack: stack,    // e.g., "frontend"
        level: level,    // e.g., "info"
        package: pkg,    // e.g., "NotificationList"
        message: message
    };

    try {
        const response = await fetch(LOG_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Essential: The server requires the Bearer token for this endpoint
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            // If the server rejects the log, we fall back to console
            console.warn(`Remote logging failed: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("Critical error in logging middleware:", error);
    }
};