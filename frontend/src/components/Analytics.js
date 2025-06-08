import React, { useState, useEffect } from "react";
import axios from "axios";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/analytics");
        setAnalyticsData(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analyticsData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Hotel Analytics</h2>

      <h3>Most Booked Hotels</h3>
      <ul>
        {analyticsData.mostBookedHotels.map((hotel) => (
          <li key={hotel._id}>
            {hotel.hotel.name} - {hotel.count} bookings
          </li>
        ))}
      </ul>

      <h3>Total Bookings</h3>
      <p>{analyticsData.totalBookings} total bookings</p>

      <h3>Popular Cities</h3>
      <ul>
        {analyticsData.popularCities.map((city) => (
          <li key={city._id}>
            {city._id} - {city.count} bookings
          </li>
        ))}
      </ul>

      <h3>Most Booked Categories</h3>
      <ul>
        {analyticsData.mostBookedCategories.map((category) => (
          <li key={category._id}>
            {category._id} - {category.count} bookings
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
