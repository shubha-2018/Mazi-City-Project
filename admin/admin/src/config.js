// Backend API Configuration
export const API_BASE_URL = "https://mazi-city-project-1.onrender.com/api";

// Check if backend is available
export const checkBackendConnection = async () => {
  try {
    const response = await fetch("https://mazi-city-project-1.onrender.com", {
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
