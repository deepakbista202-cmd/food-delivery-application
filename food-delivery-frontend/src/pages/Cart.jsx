
import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) => {
  const navigate = useNavigate();

  // =========================
  // FOOD TOTAL
  // =========================

  const foodTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );


  // =========================
  // DELIVERY FEE
  // =========================

  const deliveryFee =
    cart.length > 0
      ? Number(cart[0].deliveryFee || 0)
      : 0;


  // =========================
  // FINAL AMOUNT
  // =========================

  const finalAmount =
    foodTotal + deliveryFee;


  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="cart">

        <h1>
          Your Cart 🛒
        </h1>

        <hr />

        <h2>
          Your cart is empty 😔
        </h2>

        <p>
          Add some delicious food
          to your cart.
        </p>

        <button
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
  // CART
  // =========================

  return (
    <div className="cart">

      <h1>
        Your Cart 🛒
      </h1>


      {/* RESTAURANT */}

      <h2>
        🏪 {cart[0].restaurantName}
      </h2>

      <hr />


      {/* CART ITEMS */}

      {cart.map((item) => (

        <div
          className="cart-item"
          key={item.id}
        >

          {/* IMAGE */}

          <img
            src={item.image}
            alt={item.name}
            width="150"
          />


          {/* FOOD NAME */}

          <h2>
            {item.name}
          </h2>


          <p>
            🍽️ {item.category}
          </p>


          {/* PRICE */}

          <p>
            Price: ₹{item.price}
          </p>


          {/* QUANTITY */}

          <div>

            <button
              type="button"
              onClick={() =>
                decreaseQuantity(item.id)
              }
            >
              −
            </button>

            <span>
              {" "}
              {item.quantity}{" "}
            </span>

            <button
              type="button"
              onClick={() =>
                increaseQuantity(item.id)
              }
            >
              +
            </button>

          </div>


          {/* SUBTOTAL */}

          <p>
            Subtotal: ₹
            {Number(item.price || 0) *
              Number(item.quantity || 0)}
          </p>


          {/* REMOVE */}

          <button
            type="button"
            onClick={() =>
              removeItem(item.id)
            }
          >
            🗑️ Remove
          </button>

          <hr />

        </div>

      ))}


      {/* ========================= */}
      {/* ORDER SUMMARY */}
      {/* ========================= */}

      <div className="cart-summary">

        <h2>
          Order Summary 🧾
        </h2>

        <p>
          🍔 Food Total: ₹
          {foodTotal}
        </p>

        <p>
          🚚 Delivery Fee: ₹
          {deliveryFee}
        </p>

        <hr />

        <h2>
          💰 Grand Total: ₹
          {finalAmount}
        </h2>

      </div>


      <br />


      {/* ========================= */}
      {/* BUTTONS */}
      {/* ========================= */}

      <button
        type="button"
        onClick={() =>
          navigate("/restaurants")
        }
      >
        🍽️ Continue Shopping
      </button>


      {" "}


      <button
        type="button"
        onClick={() =>
          navigate("/checkout")
        }
      >
        💳 Proceed to Checkout
      </button>

    </div>
  );
};

export default Cart;

