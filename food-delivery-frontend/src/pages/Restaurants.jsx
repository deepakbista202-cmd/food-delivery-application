
import React, { useEffect, useState } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

const Restaurants = ({
  favorites = [],
  toggleFavorite,
}) => {
  const [searchParams] =
    useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  // =========================
  // UPDATE SEARCH FROM URL
  // =========================

  useEffect(() => {
    setSearch(
      searchParams.get("search") || ""
    );
  }, [searchParams]);


  // =========================
  // GET REVIEWS
  // =========================

  const savedReviews =
    localStorage.getItem(
      "foodieReviews"
    );

  const reviews = savedReviews
    ? JSON.parse(savedReviews)
    : [];


  // =========================
  // RESTAURANTS
  // =========================

  const restaurants = [
    {
      id: 1,
      name: "Pizza Paradise",
      cuisine: "Pizza, Italian",
      rating: "4.5",
      time: "25-30 min",
      deliveryFee: 40,
      minimumOrder: 199,
      items: 15,
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 2,
      name: "Burger House",
      cuisine: "Burgers, Fast Food",
      rating: "4.3",
      time: "20-25 min",
      deliveryFee: 30,
      minimumOrder: 149,
      items: 12,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 3,
      name: "Spice Kitchen",
      cuisine: "Indian, Biryani",
      rating: "4.6",
      time: "30-35 min",
      deliveryFee: 50,
      minimumOrder: 249,
      items: 20,
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 4,
      name: "Noodle Point",
      cuisine: "Chinese, Noodles",
      rating: "4.2",
      time: "25-30 min",
      deliveryFee: 35,
      minimumOrder: 179,
      items: 14,
      image:
        "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    },
  ];


  // =========================
  // GET RESTAURANT REVIEWS
  // =========================

  const getRestaurantReviews = (
    restaurantId
  ) => {
    return reviews.filter(
      (review) =>
        Number(review.restaurantId) ===
        Number(restaurantId)
    );
  };


  // =========================
  // CALCULATE RATING
  // =========================

  const getRestaurantRating = (
    restaurantId
  ) => {
    const restaurantReviews =
      getRestaurantReviews(
        restaurantId
      );

    if (
      restaurantReviews.length === 0
    ) {
      return null;
    }

    const totalRating =
      restaurantReviews.reduce(
        (total, review) =>
          total +
          Number(
            review.restaurantRating || 0
          ),
        0
      );

    return (
      totalRating /
      restaurantReviews.length
    ).toFixed(1);
  };


  // =========================
  // CHECK FAVORITE
  // =========================

  const isFavorite = (restaurant) => {
    return favorites.some(
      (item) =>
        item.id === restaurant.id
    );
  };


  // =========================
  // SEARCH
  // =========================

  const filteredRestaurants =
    restaurants.filter(
      (restaurant) =>
        `${restaurant.name} ${restaurant.cuisine}`
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );


  return (
    <div className="restaurants">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <h1>
        Popular Restaurants 🍽️
      </h1>

      <p>
        Find your favorite restaurant
        and order delicious food.
      </p>


      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <input
        type="text"
        placeholder="Search restaurant or cuisine 🔍"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />


      <br />
      <br />


      {/* ========================= */}
      {/* RESTAURANTS */}
      {/* ========================= */}

      <div className="restaurant-container">

        {filteredRestaurants.length >
        0 ? (

          filteredRestaurants.map(
            (restaurant) => {

              const restaurantReviews =
                getRestaurantReviews(
                  restaurant.id
                );

              const customerRating =
                getRestaurantRating(
                  restaurant.id
                );

              return (
                <div
                  className="restaurant-card"
                  key={restaurant.id}
                >

                  {/* IMAGE */}

                  <div className="restaurant-image">

                    <img
                      src={restaurant.image}
                      alt={
                        restaurant.name
                      }
                    />

                  </div>


                  {/* INFO */}

                  <div className="restaurant-info">

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                      }}
                    >

                      <h2>
                        {restaurant.name}
                      </h2>


                      {/* FAVORITE */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleFavorite(
                            restaurant
                          )
                        }
                        title={
                          isFavorite(
                            restaurant
                          )
                            ? "Remove Favorite"
                            : "Add Favorite"
                        }
                      >
                        {isFavorite(
                          restaurant
                        )
                          ? "❤️"
                          : "🤍"}
                      </button>

                    </div>


                    <p>
                      🍽️{" "}
                      {restaurant.cuisine}
                    </p>


                    {/* RATING */}

                    {customerRating ? (

                      <p>
                        ⭐ Customer Rating:{" "}
                        {customerRating}/5
                        {" "}
                        (
                        {
                          restaurantReviews.length
                        }{" "}
                        review
                        {
                          restaurantReviews.length !==
                          1
                            ? "s"
                            : ""
                        }
                        )
                      </p>

                    ) : (

                      <p>
                        ⭐ Rating:{" "}
                        {restaurant.rating}/5
                      </p>

                    )}


                    <p>
                      🕒{" "}
                      {restaurant.time}
                    </p>

                    <p>
                      🚚 Delivery Fee: ₹
                      {
                        restaurant.deliveryFee
                      }
                    </p>

                    <p>
                      💰 Minimum Order: ₹
                      {
                        restaurant.minimumOrder
                      }
                    </p>

                    <p>
                      🍴{" "}
                      {restaurant.items}{" "}
                      food items
                    </p>


                    {/* REVIEWS */}

                    {restaurantReviews.length >
                      0 && (

                      <div>

                        <h3>
                          💬 Customer Reviews
                        </h3>

                        {restaurantReviews.map(
                          (review) => (

                            <div
                              key={
                                review.id
                              }
                            >

                              <p>
                                {"⭐".repeat(
                                  Number(
                                    review.restaurantRating ||
                                      0
                                  )
                                )}
                              </p>

                              {review.comment ? (

                                <p>
                                  "
                                  {
                                    review.comment
                                  }
                                  "
                                </p>

                              ) : (

                                <p>
                                  Customer left
                                  a rating without
                                  a comment.
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


                    {/* VIEW MENU */}

                    <Link
                      to={`/menu/${restaurant.id}`}
                    >

                      <button>
                        View Menu 🍔
                      </button>

                    </Link>

                  </div>

                </div>
              );
            }
          )

        ) : (

          <div>

            <h2>
              No restaurants found 😔
            </h2>

            <p>
              Try searching for another
              restaurant or cuisine.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Restaurants;

