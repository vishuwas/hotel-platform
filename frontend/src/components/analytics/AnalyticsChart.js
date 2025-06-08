import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import axios from "axios";

const AnalyticsChart = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/analytics/most-booked"
        );

        // Check if the response has the data we need
        if (res.data && res.data.mostBookedHotels) {
          setAnalyticsData(res.data.mostBookedHotels);
        } else {
          setError("No analytics data available.");
        }
      } catch (error) {
        console.error("Error fetching analytics data", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchAnalytics();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (analyticsData.length === 0) {
    return <div>Loading chart...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={analyticsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hotel.name">
          <LabelList dataKey="hotel.name" position="insideBottom" />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8">
          {/* Optional: Add labels on the bars */}
          <LabelList position="top" fill="#000" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsChart;
