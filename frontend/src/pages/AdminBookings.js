import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminBookings = () => {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to fetch admin bookings."
        );
      }
    };

    fetchAllBookings();
  }, [token]);

  return (
    <div>
      <h2>All Bookings (Admin View)</h2>
      {error && <p>{error}</p>}
      {bookings.map((booking) => (
        <div key={booking._id}>
          <p>
            <strong>User:</strong> {booking.user?.name || "N/A"} <br />
            <strong>Hotel:</strong> {booking.hotel?.name || "N/A"} <br />
            <strong>Status:</strong> {booking.status}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AdminBookings;
