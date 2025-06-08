import axios from "axios";

export const fetchRecommendations = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/recommendations",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT Token from localStorage
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    throw new Error("Failed to fetch recommendations");
  }
};
