// src/pages/AnalyticsPage.js
import React, { useState, useEffect } from "react";
import { fetchAnalytics } from "../api/analyticsAPI"; // API logic
import Navbar from "../components/Navbar";
import AnalyticsChart from "../components/analytics/AnalyticsChart";

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const data = await fetchAnalytics();
        setAnalyticsData(data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };

    getAnalyticsData();
  }, []);

  if (!analyticsData) return <div>Loading...</div>;

  // Data format transformation for charts
  const mostBookedHotels = analyticsData.mostBookedHotels.map((hotel) => ({
    name: hotel.hotel.name,
    value: hotel.count,
  }));

  const popularCities = analyticsData.popularCities.map((city) => ({
    name: city._id,
    value: city.count,
  }));

  const mostBookedCategories = analyticsData.mostBookedCategories.map(
    (category) => ({
      name: category._id,
      value: category.count,
    })
  );

  return (
    <div className="analytics-page">
      <Navbar />
      <div className="analytics-content">
        <h1>Hotel Analytics</h1>

        {/* Most Booked Hotels - Display as a Chart */}
        <h3>Most Booked Hotels</h3>
        <AnalyticsChart data={mostBookedHotels} chartType="bar" />

        {/* Display List of Most Booked Hotels */}
        <ul>
          {analyticsData.mostBookedHotels.map((hotel) => (
            <li key={hotel._id}>
              {hotel.hotel.name} - {hotel.count} bookings
            </li>
          ))}
        </ul>

        {/* Total Bookings */}
        <h3>Total Bookings</h3>
        <p>{analyticsData.totalBookings} total bookings</p>

        {/* Popular Cities - Display as a Chart */}
        <h3>Popular Cities</h3>
        <AnalyticsChart data={popularCities} chartType="bar" />

        {/* Display List of Popular Cities */}
        <ul>
          {analyticsData.popularCities.map((city) => (
            <li key={city._id}>
              {city._id} - {city.count} bookings
            </li>
          ))}
        </ul>

        {/* Most Booked Categories - Display as a Chart */}
        <h3>Most Booked Categories</h3>
        <AnalyticsChart data={mostBookedCategories} chartType="bar" />

        {/* Display List of Most Booked Categories */}
        <ul>
          {analyticsData.mostBookedCategories.map((category) => (
            <li key={category._id}>
              {category._id} - {category.count} bookings
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsPage;
