import React from "react";

const HotelDetail = ({ hotel, activity }) => {
  if (!hotel) return <p>Hotel not found</p>;

  return (
    <div
      style={{
        padding: "1.5rem",
        maxWidth: "600px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>{hotel.name}</h2>
      <p>
        <strong>Location:</strong> {hotel.location}
      </p>
      <p>
        <strong>Category:</strong> {hotel.category}
      </p>
      <p>
        <strong>Price per Night:</strong> ₹{hotel.pricePerNight}
      </p>
      <p>
        <strong>Rating:</strong> {hotel.rating} ⭐
      </p>
      <p>
        <strong>Amenities:</strong> {hotel.amenities.join(", ")}
      </p>

      <hr style={{ margin: "1rem 0" }} />

      <h3>📊 Activity Stats</h3>
      <p>👁 Visits: {activity?.visits ?? 0}</p>
      <p>📝 Draft Bookings: {activity?.draftBookings ?? 0}</p>
      <p>✅ Completed Bookings: {activity?.completedBookings ?? 0}</p>
    </div>
  );
};

export default HotelDetail;
