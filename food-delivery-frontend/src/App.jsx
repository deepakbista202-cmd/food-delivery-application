
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Review from "./pages/Review";

import "./styles/App.css";

function App() {
  // =========================
  // Logged-in User
  // =========================

  const savedUser = localStorage.getItem(
    "foodieLoggedInUser"
  );

  const [user, setUser] = useState(
    savedUser ? JSON.parse(savedUser) : null
  );

  // =========================
  // Favorites
  // =========================

  const savedFavorites = localStorage.getItem(
    "foodieFavorites"
  );

  const [favorites, setFavorites] = useState(
    savedFavorites
      ? JSON.parse(savedFavorites)
      : []
  );

  // =========================
  // Cart
  // =========================

  const [cart, setCart] = useState([]);

  // =========================
  // Add To Cart
  // =========================

  const addToCart = (food) => {
    if (cart.length > 0) {
      const currentRestaurant =
        cart[0].restaurantId;

      if (
        String(currentRestaurant) !==
        String(food.restaurantId)
      ) {
        const confirmChange = window.confirm(
          `Your cart contains items from ${cart[0].restaurantName}.\n\n` +
          `Do you want to clear the cart and add this item from ${food.restaurantName}?`
        );

        if (!confirmChange) {
          return;
        }

        setCart([
          {
            ...food,
            quantity: 1,
          },
        ]);

        return;
      }
    }

    const existingItem = cart.find(
      (item) => item.id === food.id
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ]);
    }
  };

  // =========================
  // Increase Quantity
  // =========================

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // =========================
  // Decrease Quantity
  // =========================

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // =========================
  // Remove Cart Item
  // =========================

  const removeItem = (id) => {
    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );
  };

  // =========================
  // Clear Cart
  // =========================

  const clearCart = () => {
    setCart([]);
  };

  // =========================
  // Cart Count
  // =========================

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // =========================
  // Login
  // =========================

  const loginUser = (userData) => {
    setUser(userData);

    localStorage.setItem(
      "foodieLoggedInUser",
      JSON.stringify(userData)
    );
  };

  // =========================
  // Logout
  // =========================

  const logoutUser = () => {
    setUser(null);

    localStorage.removeItem(
      "foodieLoggedInUser"
    );
  };

  // =========================
  // Add Favorite
  // =========================

  const addToFavorites = (food) => {
    const alreadyFavorite =
      favorites.some(
        (item) => item.id === food.id
      );

    if (alreadyFavorite) {
      return;
    }

    const updatedFavorites = [
      ...favorites,
      food,
    ];

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "foodieFavorites",
      JSON.stringify(updatedFavorites)
    );
  };

  // =========================
  // Remove Favorite
  // =========================

  const removeFromFavorites = (id) => {
    const updatedFavorites =
      favorites.filter(
        (item) => item.id !== id
      );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "foodieFavorites",
      JSON.stringify(updatedFavorites)
    );
  };

  // =========================
  // Check Favorite
  // =========================

  const isFavorite = (id) => {
    return favorites.some(
      (item) => item.id === id
    );
  };

  return (
    <BrowserRouter>

      {/* ONLY ONE NAVBAR */}
      <Navbar
        user={user}
        logoutUser={logoutUser}
        cartCount={cartCount}
        favoriteCount={favorites.length}
      />

      {/* Application Routes */}
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Restaurants */}
        <Route
          path="/restaurants"
          element={<Restaurants />}
        />

        {/* Menu */}
        <Route
          path="/menu"
          element={
            <Menu
              addToCart={addToCart}
              addToFavorites={addToFavorites}
              removeFromFavorites={
                removeFromFavorites
              }
              isFavorite={isFavorite}
            />
          }
        />

        {/* Restaurant Menu */}
        <Route
          path="/menu/:restaurantId"
          element={
            <Menu
              addToCart={addToCart}
              addToFavorites={addToFavorites}
              removeFromFavorites={
                removeFromFavorites
              }
              isFavorite={isFavorite}
            />
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={
                increaseQuantity
              }
              decreaseQuantity={
                decreaseQuantity
              }
              removeItem={removeItem}
            />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <Login
              loginUser={loginUser}
            />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            user ? (
              <Checkout
                cart={cart}
                clearCart={clearCart}
              />
            ) : (
              <Login
                loginUser={loginUser}
              />
            )
          }
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={
            user ? (
              <Orders />
            ) : (
              <Login
                loginUser={loginUser}
              />
            )
          }
        />

        {/* Favorites */}
        <Route
          path="/favorites"
          element={
            user ? (
              <Favorites
                favorites={favorites}
                removeFromFavorites={
                  removeFromFavorites
                }
                addToCart={addToCart}
              />
            ) : (
              <Login
                loginUser={loginUser}
              />
            )
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            user ? (
              <Profile
                user={user}
                favorites={favorites}
                logoutUser={logoutUser}
              />
            ) : (
              <Login
                loginUser={loginUser}
              />
            )
          }
        />

        {/* Review */}
        <Route
          path="/review/:orderId"
          element={
            user ? (
              <Review />
            ) : (
              <Login
                loginUser={loginUser}
              />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

