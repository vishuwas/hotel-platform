import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BookHotel = () => {
  const { token } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [status, setStatus] = useState("draft"); // "draft" or "completed"
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hotels");
        setHotels(res.data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      }
    };
    fetchHotels();
  }, []);

  const handleBooking = async (status) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        { hotelId: selectedHotel, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`${status === "draft" ? "Draft" : "Booking"} successful!`);
      setTimeout(() => navigate("/bookings"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div>
      <h2>Book a Hotel</h2>
      {message && <p>{message}</p>}
      <select
        onChange={(e) => setSelectedHotel(e.target.value)}
        value={selectedHotel}
      >
        <option value="">-- Select a hotel --</option>
        {hotels.map((hotel) => (
          <option key={hotel._id} value={hotel._id}>
            {hotel.name}
          </option>
        ))}
      </select>

      <div>
        <label>
          <input
            type="radio"
            value="draft"
            checked={status === "draft"}
            onChange={() => setStatus("draft")}
          />
          Save for Later (Draft)
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            checked={status === "completed"}
            onChange={() => setStatus("completed")}
          />
          Complete Booking
        </label>
      </div>

      <button onClick={handleBooking} disabled={!selectedHotel}>
        {status === "draft" ? "Save for Later" : "Book Now"}
      </button>
    </div>
  );
};

export default BookHotel;
