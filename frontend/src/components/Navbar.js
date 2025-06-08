import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      {user ? (
        <>
          <Link to="/bookings">My Bookings</Link> |{" "}
          <Link to="/book">Book Hotel</Link> |{" "}
          <Link to="/recommendations">Recommendations</Link> |{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
