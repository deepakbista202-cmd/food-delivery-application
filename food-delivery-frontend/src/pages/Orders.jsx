
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Load orders and reviews
  useEffect(() => {
    const savedOrders =
      localStorage.getItem("foodieOrders");

    const savedReviews =
      localStorage.getItem("foodieReviews");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Automatically update order status
  useEffect(() => {
    if (orders.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      setOrders((currentOrders) => {
        const updatedOrders =
          currentOrders.map((order) => {

            // Do not change cancelled or delivered orders
            if (
              order.status === "Cancelled" ||
              order.status === "Delivered"
            ) {
              return order;
            }

            let newStatus = order.status;

            if (
              order.status === "Order Placed"
            ) {
              newStatus = "Preparing";
            } else if (
              order.status === "Preparing"
            ) {
              newStatus = "Out for Delivery";
            } else if (
              order.status === "Out for Delivery"
            ) {
              newStatus = "Delivered";
            }

            return {
              ...order,
              status: newStatus,
            };
          });

        localStorage.setItem(
          "foodieOrders",
          JSON.stringify(updatedOrders)
        );

        return updatedOrders;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [orders.length]);

  // Cancel order
  const cancelOrder = (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    const updatedOrders = orders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              status: "Cancelled",
            }
          : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "foodieOrders",
      JSON.stringify(updatedOrders)
    );

    alert(
      "Order cancelled successfully ❌"
    );
  };

  // Check whether order has been reviewed
  const hasReviewed = (orderId) => {
    return reviews.some(
      (review) =>
        String(review.orderId) ===
        String(orderId)
    );
  };

  // Get status step
  const getStatusStep = (status) => {
    if (status === "Order Placed") {
      return 1;
    }

    if (status === "Preparing") {
      return 2;
    }

    if (status === "Out for Delivery") {
      return 3;
    }

    if (status === "Delivered") {
      return 4;
    }

    // Cancelled
    return 0;
  };

  return (
    <div className="orders">

      <h1>
        My Orders 📦
      </h1>

      {orders.length === 0 ? (

        <div>

          <h2>
            No orders yet 😔
          </h2>

          <p>
            Your orders will appear here
            after you place an order.
          </p>

        </div>

      ) : (

        <div>

          {orders.map((order) => {

            const currentStep =
              getStatusStep(
                order.status
              );

            return (
              <div
                className="order-card"
                key={order.id}
              >

                {/* Order Header */}

                <h2>
                  Order #{order.id}
                </h2>

                <p>
                  📅 {order.date}
                </p>

                <p>
                  🏪 Restaurant:{" "}
                  {order.restaurantName}
                </p>

                <hr />

                {/* Ordered Items */}

                <h3>
                  🍔 Ordered Items
                </h3>

                {order.items.map(
                  (item) => (
                    <div
                      key={item.id}
                    >

                      <p>
                        {item.name} ×{" "}
                        {item.quantity}
                      </p>

                      <p>
                        ₹
                        {Number(item.price) *
                          Number(item.quantity)}
                      </p>

                    </div>
                  )
                )}

                <hr />

                {/* Price Details */}

                <h3>
                  🧾 Price Details
                </h3>

                <p>
                  Food Total: ₹
                  {order.foodTotal}
                </p>

                <p>
                  Delivery Fee: ₹
                  {order.deliveryFee}
                </p>

                {/* Coupon */}

                {order.discount > 0 && (
                  <p>
                    🎁 Coupon Discount: -₹
                    {order.discount}
                  </p>
                )}

                <h2>
                  Total: ₹
                  {order.finalAmount}
                </h2>

                <hr />

                {/* Delivery Details */}

                <h3>
                  🏠 Delivery Details
                </h3>

                <p>
                  👤 Name:{" "}
                  {order.customerName}
                </p>

                <p>
                  📱 Phone:{" "}
                  {order.phone}
                </p>

                <p>
                  📍 Address:{" "}
                  {order.address}
                </p>

                <p>
                  💳 Payment:{" "}
                  {order.paymentMethod}
                </p>

                <hr />

                {/* Current Status */}

                <h2>
                  Current Status
                </h2>

                <h2>

                  {order.status ===
                    "Order Placed"
                    ? "📦"
                    : order.status ===
                      "Preparing"
                    ? "👨‍🍳"
                    : order.status ===
                      "Out for Delivery"
                    ? "🛵"
                    : order.status ===
                      "Delivered"
                    ? "✅"
                    : "❌"}

                  {" "}

                  {order.status}

                </h2>

                {/* Cancelled Message */}

                {order.status ===
                  "Cancelled" && (
                  <p>
                    ❌ This order has been
                    cancelled.
                  </p>
                )}

                {/* Progress */}

                {order.status !==
                  "Cancelled" && (
                  <div>

                    <p>
                      {currentStep >= 1
                        ? "✅"
                        : "⭕"}{" "}
                      Order Placed
                    </p>

                    <p>
                      ↓
                    </p>

                    <p>
                      {currentStep >= 2
                        ? "✅"
                        : "⭕"}{" "}
                      Preparing
                    </p>

                    <p>
                      ↓
                    </p>

                    <p>
                      {currentStep >= 3
                        ? "✅"
                        : "⭕"}{" "}
                      Out for Delivery
                    </p>

                    <p>
                      ↓
                    </p>

                    <p>
                      {currentStep >= 4
                        ? "✅"
                        : "⭕"}{" "}
                      Delivered
                    </p>

                  </div>
                )}

                {/* Cancel Button */}

                {order.status ===
                  "Order Placed" && (
                  <div>

                    <button
                      onClick={() =>
                        cancelOrder(
                          order.id
                        )
                      }
                    >
                      ❌ Cancel Order
                    </button>

                  </div>
                )}

                {/* Review */}

                {order.status ===
                  "Delivered" && (
                  <div>

                    <hr />

                    {hasReviewed(
                      order.id
                    ) ? (

                      <button disabled>
                        ✅ Reviewed
                      </button>

                    ) : (

                      <Link
                        to={`/review/${order.id}`}
                      >
                        <button>
                          ⭐ Rate & Review
                          Order
                        </button>
                      </Link>

                    )}

                  </div>
                )}

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default Orders;

