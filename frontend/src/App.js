import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Bookings from "./pages/Bookings";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import BookHotel from "./pages/BookHotel";
import Recommendations from "./pages/Recommendations";
import AdminBookings from "./pages/AdminBookings";
import AnalyticsPage from "./pages/AnalyticsPage";
import HotelsPage from "./pages/HotelsPage";
import HotelDetailPage from "./pages/Hotel/HotelDetailPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/book" element={<BookHotel />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
