// notification_app_fe/src/services/api.ts
import axios from 'axios';

const BASE_URL = 'http://4.224.186.213/evaluation-service';

// Use the credentials you received earlier
const CREDENTIALS = {
    clientID: "a47031de-6553-4ea1-b498-bf1a3195954a",
    clientSecret: "KukmmWdEJwrThXxa"
};

/**
 * Fetches the Bearer Token
 */
export const getAuthToken = async (): Promise<string | null> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth`, CREDENTIALS);
        return response.data.access_token;
    } catch (error) {
        console.error("Authentication failed:", error);
        return null;
    }
};

/**
 * Fetches notifications
 */
export const fetchNotifications = async (token: string, page = 1, limit = 10, type = "") => {
    try {
        const response = await axios.get(`${BASE_URL}/notifications`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page,
                limit,
                notification_type: type || undefined
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};