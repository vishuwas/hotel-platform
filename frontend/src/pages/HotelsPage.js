import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHotels = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/hotels");
      setHotels(res.data);
    } catch (err) {
      setError("Failed to load hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading hotels...
      </p>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        <p>{error}</p>
        <button
          onClick={fetchHotels}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "4px",
            color: "white",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
        <h2>Available Hotels</h2>

        {hotels.length === 0 ? (
          <p>No hotels found at the moment.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
                }}
              >
                <h3>
                  <Link
                    to={`/hotels/${hotel._id}`}
                    style={{ textDecoration: "none", color: "#007bff" }}
                  >
                    {hotel.name}
                  </Link>
                </h3>
                <p>
                  <strong>Location:</strong> {hotel.location}
                </p>
                <p>
                  <strong>Price:</strong> ₹{hotel.pricePerNight}
                </p>
                <p>
                  <strong>Rating:</strong> {hotel.rating || "Not rated"} ⭐
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HotelsPage;
