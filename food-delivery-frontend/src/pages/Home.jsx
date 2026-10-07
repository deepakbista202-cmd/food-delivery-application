
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* =========================
          Hero Section
      ========================= */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-tag">
            🍔 Delicious food, delivered fast
          </span>

          <h1>
            Your favorite food,
            <br />
            delivered to your door.
          </h1>

          <p>
            Discover the best restaurants around you
            and order your favorite meals with just a
            few clicks.
          </p>

          <div className="hero-buttons">

            <Link
              to="/restaurants"
              className="primary-btn"
            >
              🍽️ Explore Restaurants
            </Link>

            <Link
              to="/menu"
              className="secondary-btn"
            >
              View Menu
            </Link>

          </div>

        </div>

        <div className="hero-image">

          <div className="food-circle">
            🍕
          </div>

          <div className="floating-card card-one">
            ⭐ 4.9 Rating
          </div>

          <div className="floating-card card-two">
            🚴 Fast Delivery
          </div>

        </div>

      </section>


      {/* =========================
          Categories
      ========================= */}

      <section className="categories-section">

        <div className="section-heading">
          <span>Explore</span>
          <h2>What are you craving?</h2>
          <p>
            Choose from a variety of delicious
            food categories.
          </p>
        </div>

        <div className="category-grid">

          <Link
            to="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍕
            </div>
            <h3>Pizza</h3>
            <p>Cheesy & delicious</p>
          </Link>

          <Link
            to="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍔
            </div>
            <h3>Burgers</h3>
            <p>Juicy & tasty</p>
          </Link>

          <Link
            to="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍜
            </div>
            <h3>Noodles</h3>
            <p>Hot & flavorful</p>
          </Link>

          <Link
            to="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍛
            </div>
            <h3>Indian</h3>
            <p>Authentic flavors</p>
          </Link>

          <Link
            to="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍰
            </div>
            <h3>Desserts</h3>
            <p>Sweet & delicious</p>
          </Link>

          <Link
            to="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🥤
            </div>
            <h3>Drinks</h3>
            <p>Cool & refreshing</p>
          </Link>

        </div>

      </section>


      {/* =========================
          Why Choose Us
      ========================= */}

      <section className="features-section">

        <div className="section-heading">
          <span>Why Foodie?</span>
          <h2>Everything you need for a great meal</h2>
        </div>

        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🚀
            </div>

            <h3>Fast Delivery</h3>

            <p>
              Get your favorite food delivered
              quickly and safely.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🍴
            </div>

            <h3>Great Variety</h3>

            <p>
              Explore hundreds of dishes from
              different restaurants.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔒
            </div>

            <h3>Secure Payment</h3>

            <p>
              Enjoy safe and secure payment
              options for every order.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ❤️
            </div>

            <h3>Your Favorites</h3>

            <p>
              Save your favorite dishes and
              order them anytime.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          CTA Section
      ========================= */}

      <section className="home-cta">

        <div className="cta-content">

          <h2>
            Hungry? Let's fix that! 🍔
          </h2>

          <p>
            Order delicious food from your
            favorite restaurants today.
          </p>

          <Link
            to="/restaurants"
            className="cta-button"
          >
            Order Now →
          </Link>

        </div>

      </section>


      {/* =========================
          Footer
      ========================= */}

      <footer className="home-footer">

        <div className="footer-content">

          <div>
            <h3>🍴 Foodie</h3>
            <p>
              Good food. Good mood.
            </p>
          </div>

          <div>
            <p>
              © 2026 Foodie. All rights reserved.
            </p>
          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;

