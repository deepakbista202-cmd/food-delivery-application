
import React from "react";
import { useNavigate } from "react-router-dom";

const Favorites = ({
  favorites,
  removeFromFavorites,
  addToCart,
}) => {
  const navigate = useNavigate();

  // =========================
  // EMPTY FAVORITES
  // =========================

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites">

        <h1>
          My Favorites ❤️
        </h1>

        <hr />

        <h2>
          No favorite foods yet 😔
        </h2>

        <p>
          Add your favorite food
          items from the menu.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/restaurants")
          }
        >
          🍽️ Browse Restaurants
        </button>

      </div>
    );
  }


  // =========================
  // FAVORITES
  // =========================

  return (
    <div className="favorites">

      <h1>
        My Favorites ❤️
      </h1>

      <p>
        Your favorite food items
      </p>

      <hr />


      <div className="favorite-container">

        {favorites.map((food) => (

          <div
            className="favorite-card"
            key={food.id}
          >

            {/* IMAGE */}

            <img
              src={food.image}
              alt={food.name}
              width="200"
            />


            {/* FOOD DETAILS */}

            <h2>
              {food.name}
            </h2>


            <p>
              🍽️ {food.category}
            </p>


            <h3>
              ₹{food.price}
            </h3>


            <p>
              🏪 {food.restaurantName}
            </p>


            {/* ADD TO CART */}

            <button
              type="button"
              onClick={() => {
                addToCart(food);

                alert(
                  `${food.name} added to cart 🛒`
                );
              }}
            >
              🛒 Add to Cart
            </button>


            {" "}


            {/* REMOVE */}

            <button
              type="button"
              onClick={() => {

                removeFromFavorites(
                  food.id
                );

                alert(
                  `${food.name} removed from favorites 💔`
                );
              }}
            >
              💔 Remove
            </button>


            <br />
            <br />


            {/* VIEW MENU */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/menu/${food.restaurantId}`
                )
              }
            >
              🍽️ View Restaurant Menu
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Favorites;

