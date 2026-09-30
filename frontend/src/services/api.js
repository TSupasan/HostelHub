const API_URL = "http://localhost:5000";

export const checkBackend = async () => {
    const response = await fetch(API_URL);
    return response.json();
};