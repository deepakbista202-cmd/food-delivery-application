
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Menu = ({
  addToCart,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
}) => {
  const { restaurantId } = useParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // =========================
  // GET REVIEWS
  // =========================

  const savedReviews =
    localStorage.getItem("foodieReviews");

  const reviews = savedReviews
    ? JSON.parse(savedReviews)
    : [];


  // =========================
  // RESTAURANT MENUS
  // =========================

  const menus = {
    1: {
      restaurant: "Pizza Paradise",
      deliveryFee: 40,

      foods: [
        {
          id: 101,
          name: "Margherita Pizza",
          category: "Pizza",
          price: 249,
          image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 102,
          name: "Cheese Burst Pizza",
          category: "Pizza",
          price: 299,
          image:
            "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 103,
          name: "Farmhouse Pizza",
          category: "Pizza",
          price: 349,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },

    2: {
      restaurant: "Burger House",
      deliveryFee: 30,

      foods: [
        {
          id: 201,
          name: "Cheese Burger",
          category: "Burger",
          price: 199,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 202,
          name: "Chicken Burger",
          category: "Burger",
          price: 249,
          image:
            "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 203,
          name: "Double Patty Burger",
          category: "Burger",
          price: 299,
          image:
            "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },

    3: {
      restaurant: "Spice Kitchen",
      deliveryFee: 50,

      foods: [
        {
          id: 301,
          name: "Chicken Biryani",
          category: "Biryani",
          price: 299,
          image:
            "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 302,
          name: "Mutton Biryani",
          category: "Biryani",
          price: 399,
          image:
            "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 303,
          name: "Paneer Butter Masala",
          category: "Indian",
          price: 249,
          image:
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },

    4: {
      restaurant: "Noodle Point",
      deliveryFee: 35,

      foods: [
        {
          id: 401,
          name: "Veg Noodles",
          category: "Chinese",
          price: 179,
          image:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 402,
          name: "Chicken Noodles",
          category: "Chinese",
          price: 229,
          image:
            "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 403,
          name: "Schezwan Noodles",
          category: "Chinese",
          price: 249,
          image:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  };


  // =========================
  // SELECT MENU
  // =========================

  const selectedMenu = menus[restaurantId];

  if (!selectedMenu) {
    return (
      <div className="menu">

        <h1>
          Food Menu 🍽️
        </h1>

        <p>
          Please select a restaurant
          to view its menu.
        </p>

      </div>
    );
  }


  // =========================
  // FOOD RATINGS
  // =========================

  const getFoodRatings = (foodId) => {
    const ratings = [];

    reviews.forEach((review) => {

      if (review.foodRatings) {

        const rating =
          review.foodRatings[foodId];

        if (rating) {
          ratings.push(
            Number(rating)
          );
        }
      }
    });

    return ratings;
  };


  // =========================
  // AVERAGE FOOD RATING
  // =========================

  const getFoodRating = (foodId) => {

    const ratings =
      getFoodRatings(foodId);

    if (ratings.length === 0) {
      return null;
    }

    const total = ratings.reduce(
      (sum, rating) =>
        sum + rating,
      0
    );

    return (
      total / ratings.length
    ).toFixed(1);
  };


  // =========================
  // FOOD REVIEWS
  // =========================

  const getFoodReviews = (foodId) => {

    return reviews.filter(
      (review) =>
        review.foodRatings &&
        review.foodRatings[foodId]
    );
  };


  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All",
    ...new Set(
      selectedMenu.foods.map(
        (food) => food.category
      )
    ),
  ];


  // =========================
  // SEARCH + CATEGORY FILTER
  // =========================

  const filteredFoods =
    selectedMenu.foods.filter(
      (food) => {

        const searchText =
          `${food.name} ${food.category}`;

        const matchesSearch =
          searchText
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          category === "All" ||
          food.category === category;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (food) => {

    addToCart({
      ...food,

      restaurantId: restaurantId,

      restaurantName:
        selectedMenu.restaurant,

      deliveryFee:
        selectedMenu.deliveryFee,
    });

    alert(
      `${food.name} added to cart 🛒`
    );
  };


  // =========================
  // FAVORITE
  // =========================

  const handleFavorite = (food) => {

    if (isFavorite(food.id)) {

      removeFromFavorites(food.id);

      alert(
        `${food.name} removed from favorites 💔`
      );

    } else {

      addToFavorites({
        ...food,

        restaurantId: restaurantId,

        restaurantName:
          selectedMenu.restaurant,

        deliveryFee:
          selectedMenu.deliveryFee,
      });

      alert(
        `${food.name} added to favorites ❤️`
      );
    }
  };


  return (
    <div className="menu">

      {/* ========================= */}
      {/* RESTAURANT HEADER */}
      {/* ========================= */}

      <h1>
        {selectedMenu.restaurant} 🍽️
      </h1>

      <p>
        🚚 Delivery Fee: ₹
        {selectedMenu.deliveryFee}
      </p>


      <br />


      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <input
        type="text"
        placeholder="Search food 🔍"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />


      <br />
      <br />


      {/* ========================= */}
      {/* CATEGORIES */}
      {/* ========================= */}

      <div className="category-buttons">

        {categories.map((item) => (

          <button
            key={item}
            onClick={() =>
              setCategory(item)
            }
          >
            {item}
          </button>

        ))}

      </div>


      <br />


      {/* ========================= */}
      {/* FOOD ITEMS */}
      {/* ========================= */}

      <div className="food-container">

        {filteredFoods.length > 0 ? (

          filteredFoods.map((food) => {

            const foodRating =
              getFoodRating(food.id);

            const foodReviews =
              getFoodReviews(food.id);

            const favorite =
              isFavorite(food.id);

            return (

              <div
                className="food-card"
                key={food.id}
              >

                {/* IMAGE */}

                <div className="food-image">

                  <img
                    src={food.image}
                    alt={food.name}
                  />

                </div>


                {/* FOOD NAME */}

                <h2>
                  {food.name}
                </h2>


                {/* CATEGORY */}

                <p>
                  🍽️ {food.category}
                </p>


                {/* PRICE */}

                <h3>
                  ₹{food.price}
                </h3>


                {/* RATING */}

                {foodRating ? (

                  <p>
                    ⭐ Customer Rating:{" "}
                    {foodRating}/5
                    {" "}
                    ({foodReviews.length}{" "}
                    review
                    {foodReviews.length !== 1
                      ? "s"
                      : ""}
                    )
                  </p>

                ) : (

                  <p>
                    ⭐ No ratings yet
                  </p>

                )}


                {/* CUSTOMER REVIEWS */}

                {foodReviews.length > 0 && (

                  <div>

                    <h3>
                      💬 Customer Reviews
                    </h3>

                    {foodReviews.map(
                      (review) => (

                        <div
                          key={review.id}
                        >

                          <p>
                            {"⭐".repeat(
                              Number(
                                review
                                  .foodRatings[
                                  food.id
                                ]
                              )
                            )}
                          </p>

                          {review.comment ? (

                            <p>
                              "{review.comment}"
                            </p>

                          ) : (

                            <p>
                              Customer left a
                              rating without a
                              comment.
                            </p>

                          )}

                          <small>
                            {review.date}
                          </small>

                          <hr />

                        </div>

                      )
                    )}

                  </div>

                )}


                {/* ADD TO CART */}

                <button
                  type="button"
                  onClick={() =>
                    handleAddToCart(food)
                  }
                >
                  Add to Cart 🛒
                </button>


                <br />
                <br />


                {/* FAVORITE */}

                <button
                  type="button"
                  onClick={() =>
                    handleFavorite(food)
                  }
                >
                  {favorite
                    ? "💔 Remove Favorite"
                    : "❤️ Add to Favorites"}
                </button>

              </div>

            );
          })

        ) : (

          <h2>
            No food items found 😔
          </h2>

        )}

      </div>

    </div>
  );
};

export default Menu;
