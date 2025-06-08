import axios from "axios";

export const fetchAnalytics = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/analytics/most-booked"
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching analytics:", err);
    throw new Error("Failed to fetch analytics");
  }
};
