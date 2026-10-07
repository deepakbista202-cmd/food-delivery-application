
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Review = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Get orders from localStorage
  const savedOrders =
    localStorage.getItem("foodieOrders");

  const orders = savedOrders
    ? JSON.parse(savedOrders)
    : [];

  // Find the selected order
  const order = orders.find(
    (item) =>
      String(item.id) === String(orderId)
  );

  // Get existing reviews
  const savedReviews =
    localStorage.getItem("foodieReviews");

  const existingReviews = savedReviews
    ? JSON.parse(savedReviews)
    : [];

  // Check if already reviewed
  const alreadyReviewed =
    existingReviews.some(
      (review) =>
        String(review.orderId) ===
        String(orderId)
    );

  const [restaurantRating, setRestaurantRating] =
    useState(0);

  const [foodRatings, setFoodRatings] =
    useState({});

  const [comment, setComment] =
    useState("");

  // Order not found
  if (!order) {
    return (
      <div className="review">

        <h1>Order Not Found ❌</h1>

        <p>
          We couldn't find this order.
        </p>

        <button
          onClick={() =>
            navigate("/orders")
          }
        >
          ← Back to Orders
        </button>

      </div>
    );
  }

  // Prevent duplicate reviews
  if (alreadyReviewed) {
    return (
      <div className="review">

        <h1>
          Already Reviewed ✅
        </h1>

        <p>
          You have already submitted a
          review for this order.
        </p>

        <h3>
          Order #{order.id}
        </h3>

        <button
          onClick={() =>
            navigate("/orders")
          }
        >
          ← Back to Orders
        </button>

      </div>
    );
  }

  // Select restaurant rating
  const handleRestaurantRating = (
    rating
  ) => {
    setRestaurantRating(rating);
  };

  // Select food rating
  const handleFoodRating = (
    foodId,
    rating
  ) => {
    setFoodRatings((previousRatings) => ({
      ...previousRatings,
      [foodId]: rating,
    }));
  };

  // Submit review
  const submitReview = (e) => {
    e.preventDefault();

    // Restaurant rating required
    if (restaurantRating === 0) {
      alert(
        "Please give a restaurant rating ⭐"
      );
      return;
    }

    // Check again for duplicate review
    const latestReviews =
      localStorage.getItem(
        "foodieReviews"
      );

    const reviews = latestReviews
      ? JSON.parse(latestReviews)
      : [];

    const reviewExists =
      reviews.some(
        (review) =>
          String(review.orderId) ===
          String(orderId)
      );

    if (reviewExists) {
      alert(
        "This order has already been reviewed."
      );

      navigate("/orders");
      return;
    }

    // Create review
    const newReview = {
      id: Date.now(),

      orderId: order.id,

      restaurantId:
        order.restaurantId,

      restaurantName:
        order.restaurantName,

      restaurantRating:
        restaurantRating,

      foodRatings:
        foodRatings,

      comment:
        comment.trim(),

      date:
        new Date().toLocaleString(),
    };

    // Save review
    const updatedReviews = [
      ...reviews,
      newReview,
    ];

    localStorage.setItem(
      "foodieReviews",
      JSON.stringify(
        updatedReviews
      )
    );

    alert(
      "Review submitted successfully! ⭐"
    );

    navigate("/orders");
  };

  return (
    <div className="review">

      <h1>
        Rate Your Order ⭐
      </h1>

      <h2>
        {order.restaurantName}
      </h2>

      <p>
        Order #{order.id}
      </p>

      <hr />

      <form
        onSubmit={submitReview}
      >

        {/* Restaurant Rating */}

        <h2>
          How was the restaurant?
        </h2>

        <div>

          {[1, 2, 3, 4, 5].map(
            (star) => (
              <button
                type="button"
                key={star}
                onClick={() =>
                  handleRestaurantRating(
                    star
                  )
                }
              >
                {star <=
                restaurantRating
                  ? "⭐"
                  : "☆"}
              </button>
            )
          )}

        </div>

        <p>
          Restaurant Rating:{" "}
          {restaurantRating}/5
        </p>

        <hr />

        {/* Food Rating */}

        <h2>
          Rate Your Food 🍔
        </h2>

        {order.items.map(
          (food) => (

            <div
              key={food.id}
            >

              <h3>
                {food.name}
              </h3>

              <div>

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() =>
                        handleFoodRating(
                          food.id,
                          star
                        )
                      }
                    >
                      {star <=
                      (foodRatings[
                        food.id
                      ] || 0)
                        ? "⭐"
                        : "☆"}
                    </button>
                  )
                )}

              </div>

              <p>
                Food Rating:{" "}
                {foodRatings[
                  food.id
                ] || 0}/5
              </p>

            </div>
          )
        )}

        <hr />

        {/* Comment */}

        <h2>
          Tell us about your experience 💬
        </h2>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          placeholder="Write your review here..."
          rows="5"
          cols="50"
        />

        <br />
        <br />

        <button
          type="submit"
        >
          ⭐ Submit Review
        </button>

      </form>

    </div>
  );
};

export default Review;

