
import React from "react";
import { Link } from "react-router-dom";

function Navbar({
  user,
  logoutUser,
  cartCount,
  favoriteCount,
}) {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          🍴 Foodie
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/restaurants">
          Restaurants
        </Link>

        <Link to="/menu">
          Menu
        </Link>

        <Link to="/favorites">
          ❤️ Favorites ({favoriteCount})
        </Link>

        <Link to="/cart">
          🛒 Cart ({cartCount})
        </Link>

        {user ? (
          <>
            <Link to="/orders">
              Orders
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            <button
              className="logout-button"
              onClick={logoutUser}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;

