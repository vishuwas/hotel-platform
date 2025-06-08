import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Recommendations = () => {
  const { token } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          "http://localhost:5000/api/recommendations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.recommendedHotels) {
          setHotels(res.data.recommendedHotels);
          setMessage(res.data.message || "");
        } else {
          setMessage(res.data.message || "No recommendations found.");
        }
      } catch (err) {
        setError("Error fetching recommendations.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [token]);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
        <h2>Recommended Hotels</h2>
        {loading && <p>Loading recommendations...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && hotels.length === 0 && (
          <p>No recommendations available.</p>
        )}
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
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{hotel.name}</h3>
              <p>
                <strong>Location:</strong> {hotel.location}
              </p>
              <p>
                <strong>Category:</strong> {hotel.category}
              </p>
              <p>
                <strong>Price:</strong> ₹{hotel.pricePerNight}
              </p>
              <p>
                <strong>Rating:</strong> {hotel.rating || "Not rated"} ⭐
              </p>
              <p>
                <em>{hotel.amenities?.join(", ")}</em>
              </p>
            </div>
          ))}
        </div>
        {message && !loading && (
          <p style={{ marginTop: "1rem", fontStyle: "italic" }}>{message}</p>
        )}
      </div>
    </>
  );
};

export default Recommendations;
