// Backend API Configuration
export const API_BASE_URL = "http://localhost:5000/api";

// Check if backend is available
export const checkBackendConnection = async () => {
  try {
    const response = await fetch("http://localhost:5000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Backend connection failed:", error);
    return false;
  }
};
