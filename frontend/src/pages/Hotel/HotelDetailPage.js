import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import HotelDetail from "./HotelDetail";

const HotelDetailPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const [hotelRes, activityRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/hotels/${id}`),
          axios.get(`http://localhost:5000/api/activity/stats/${id}`),
        ]);

        setHotel(hotelRes.data);
        setActivity(activityRes.data);
      } catch (err) {
        console.error("Error fetching hotel or activity data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [id]);

  return (
    <>
      <Navbar />
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading hotel details...</p>
      ) : (
        <HotelDetail hotel={hotel} activity={activity} />
      )}
    </>
  );
};

export default HotelDetailPage;
