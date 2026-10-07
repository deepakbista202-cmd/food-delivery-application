
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();

  // =========================
  // SAVED PROFILE
  // =========================

  const savedProfile =
    localStorage.getItem("foodieProfile");

  const profileData = savedProfile
    ? JSON.parse(savedProfile)
    : {};


  // =========================
  // CUSTOMER DETAILS
  // =========================

  const [name, setName] = useState(
    profileData.name || ""
  );

  const [phone, setPhone] = useState(
    profileData.phone || ""
  );

  const [address, setAddress] = useState(
    profileData.address || ""
  );


  // =========================
  // PAYMENT
  // =========================

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [paymentCompleted, setPaymentCompleted] =
    useState(false);

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] = useState("");


  // =========================
  // COUPON
  // =========================

  const [coupon, setCoupon] = useState("");

  const [discount, setDiscount] =
    useState(0);

  const [couponMessage, setCouponMessage] =
    useState("");


  // =========================
  // AVAILABLE COUPONS
  // =========================

  const coupons = {
    WELCOME50: {
      type: "flat",
      value: 50,
      minimumOrder: 299,
    },

    FOODIE100: {
      type: "flat",
      value: 100,
      minimumOrder: 499,
    },

    SAVE20: {
      type: "percentage",
      value: 20,
      minimumOrder: 399,
    },
  };


  // =========================
  // EMPTY CART
  // =========================

  if (!cart || cart.length === 0) {
    return (
      <div className="checkout">

        <h1>
          Checkout 🛒
        </h1>

        <hr />

        <h2>
          Your cart is empty 😔
        </h2>

        <p>
          Please add some food before
          going to checkout.
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

  const deliveryFee = Number(
    cart[0].deliveryFee || 0
  );


  // =========================
  // SUBTOTAL
  // =========================

  const subtotal =
    foodTotal + deliveryFee;


  // =========================
  // FINAL AMOUNT
  // =========================

  const finalAmount = Math.max(
    subtotal - discount,
    0
  );


  // =========================
  // APPLY COUPON
  // =========================

  const applyCoupon = () => {

    const enteredCoupon =
      coupon.trim().toUpperCase();

    if (!enteredCoupon) {

      setCouponMessage(
        "Please enter a coupon code."
      );

      setDiscount(0);

      return;
    }


    const selectedCoupon =
      coupons[enteredCoupon];


    if (!selectedCoupon) {

      setCouponMessage(
        "❌ Invalid coupon code."
      );

      setDiscount(0);

      return;
    }


    if (
      foodTotal <
      selectedCoupon.minimumOrder
    ) {

      setCouponMessage(
        `❌ Minimum order for ${enteredCoupon} is ₹${selectedCoupon.minimumOrder}.`
      );

      setDiscount(0);

      return;
    }


    let calculatedDiscount = 0;


    if (
      selectedCoupon.type === "flat"
    ) {

      calculatedDiscount =
        selectedCoupon.value;

    } else if (
      selectedCoupon.type ===
      "percentage"
    ) {

      calculatedDiscount =
        (foodTotal *
          selectedCoupon.value) /
        100;
    }


    calculatedDiscount = Math.min(
      calculatedDiscount,
      foodTotal
    );


    setDiscount(
      Math.round(calculatedDiscount)
    );


    setCouponMessage(
      `✅ ${enteredCoupon} applied successfully!`
    );
  };


  // =========================
  // VALIDATE CUSTOMER DETAILS
  // =========================

  const validateCustomerDetails = () => {

    if (!name.trim()) {

      alert(
        "Please enter your name."
      );

      return false;
    }


    if (phone.length !== 10) {

      alert(
        "Please enter a valid 10-digit phone number."
      );

      return false;
    }


    if (!address.trim()) {

      alert(
        "Please enter your delivery address."
      );

      return false;
    }


    return true;
  };


  // =========================
  // UPI PAYMENT
  // =========================

  const handleUpiPayment = () => {

    if (!upiId.trim()) {

      alert(
        "Please enter your UPI ID."
      );

      return;
    }


    if (!upiId.includes("@")) {

      alert(
        "Please enter a valid UPI ID."
      );

      return;
    }


    alert(
      "Processing UPI payment... 📱"
    );


    setTimeout(() => {

      setPaymentCompleted(true);

      alert(
        "UPI Payment Successful! ✅"
      );

    }, 1500);
  };


  // =========================
  // CARD PAYMENT
  // =========================

  const handleCardPayment = () => {

    const cleanCardNumber =
      cardNumber.replace(/\s/g, "");


    if (
      cleanCardNumber.length !== 16
    ) {

      alert(
        "Please enter a valid 16-digit card number."
      );

      return;
    }


    if (expiry.length !== 5) {

      alert(
        "Please enter expiry in MM/YY format."
      );

      return;
    }


    if (cvv.length !== 3) {

      alert(
        "Please enter a valid 3-digit CVV."
      );

      return;
    }


    alert(
      "Processing card payment... 💳"
    );


    setTimeout(() => {

      setPaymentCompleted(true);

      alert(
        "Card Payment Successful! ✅"
      );

    }, 1500);
  };


  // =========================
  // PLACE ORDER
  // =========================

  const placeOrder = (e) => {

    e.preventDefault();


    // Validate customer
    if (!validateCustomerDetails()) {
      return;
    }


    // Validate online payment
    if (
      paymentMethod === "UPI" ||
      paymentMethod === "Card"
    ) {

      if (!paymentCompleted) {

        alert(
          "Please complete the payment first."
        );

        return;
      }
    }


    // Get old orders
    const savedOrders =
      localStorage.getItem(
        "foodieOrders"
      );


    const orders = savedOrders
      ? JSON.parse(savedOrders)
      : [];


    // Create new order
    const newOrder = {

      id: Date.now(),

      date:
        new Date().toLocaleString(),

      restaurantId:
        cart[0].restaurantId,

      restaurantName:
        cart[0].restaurantName,

      items: cart.map((item) => ({
        ...item,
      })),

      foodTotal: foodTotal,

      deliveryFee: deliveryFee,

      subtotal: subtotal,

      coupon:
        discount > 0
          ? coupon.trim().toUpperCase()
          : null,

      discount: discount,

      finalAmount: finalAmount,

      customerName:
        name.trim(),

      phone: phone,

      address:
        address.trim(),

      paymentMethod:
        paymentMethod,

      paymentStatus:
        paymentMethod ===
        "Cash on Delivery"
          ? "Pending"
          : "Paid",

      status:
        "Order Placed",
    };


    // Add new order
    const updatedOrders = [
      ...orders,
      newOrder,
    ];


    // Save orders
    localStorage.setItem(
      "foodieOrders",
      JSON.stringify(
        updatedOrders
      )
    );


    // Save profile information
    localStorage.setItem(
      "foodieProfile",
      JSON.stringify({
        name: name.trim(),
        phone: phone,
        address: address.trim(),
      })
    );


    // Clear cart
    clearCart();


    alert(
      "Order placed successfully! 🎉"
    );


    // Go to orders
    navigate("/orders");
  };


  // =========================
  // JSX
  // =========================

  return (
    <div className="checkout">

      <h1>
        Checkout 💳
      </h1>


      <h2>
        🏪 {cart[0].restaurantName}
      </h2>

      <hr />


      {/* ORDER SUMMARY */}

      <h2>
        Order Summary 🧾
      </h2>


      {cart.map((item) => (

        <div key={item.id}>

          <p>
            {item.name} ×{" "}
            {item.quantity}
          </p>

          <p>
            ₹
            {Number(item.price || 0) *
              Number(item.quantity || 0)}
          </p>

        </div>

      ))}


      <hr />


      <p>
        🍔 Food Total: ₹
        {foodTotal}
      </p>


      <p>
        🚚 Delivery Fee: ₹
        {deliveryFee}
      </p>


      <p>
        🧾 Subtotal: ₹
        {subtotal}
      </p>


      {/* COUPON */}

      <hr />

      <h2>
        🎁 Apply Coupon
      </h2>


      <input
        type="text"
        placeholder="Enter coupon code"
        value={coupon}
        onChange={(e) => {

          setCoupon(
            e.target.value.toUpperCase()
          );

          setDiscount(0);

          setCouponMessage("");
        }}
      />


      {" "}


      <button
        type="button"
        onClick={applyCoupon}
      >
        Apply
      </button>


      {couponMessage && (

        <p>
          {couponMessage}
        </p>

      )}


      {discount > 0 && (

        <p>
          🎉 Discount: -₹
          {discount}
        </p>

      )}


      <h2>
        💰 Grand Total: ₹
        {finalAmount}
      </h2>


      <hr />


      {/* DELIVERY DETAILS */}

      <h2>
        Delivery Details 🏠
      </h2>


      <form onSubmit={placeOrder}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />


        <br />
        <br />


        <input
          type="tel"
          placeholder="10-digit Phone Number"
          value={phone}
          maxLength={10}
          onChange={(e) =>
            setPhone(
              e.target.value.replace(
                /\D/g,
                ""
              )
            )
          }
        />


        <br />
        <br />


        <textarea
          placeholder="Enter complete delivery address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          rows="5"
          cols="40"
        />


        <br />
        <br />


        {/* PAYMENT */}

        <h2>
          Payment Method 💳
        </h2>


        <label>

          <input
            type="radio"
            value="Cash on Delivery"
            checked={
              paymentMethod ===
              "Cash on Delivery"
            }
            onChange={() => {

              setPaymentMethod(
                "Cash on Delivery"
              );

              setPaymentCompleted(
                false
              );
            }}
          />

          Cash on Delivery 💵

        </label>


        <br />


        <label>

          <input
            type="radio"
            value="UPI"
            checked={
              paymentMethod === "UPI"
            }
            onChange={() => {

              setPaymentMethod("UPI");

              setPaymentCompleted(
                false
              );
            }}
          />

          UPI 📱

        </label>


        <br />


        <label>

          <input
            type="radio"
            value="Card"
            checked={
              paymentMethod === "Card"
            }
            onChange={() => {

              setPaymentMethod("Card");

              setPaymentCompleted(
                false
              );
            }}
          />

          Credit / Debit Card 💳

        </label>


        <br />
        <br />


        {/* UPI */}

        {paymentMethod === "UPI" && (

          <div>

            <h3>
              📱 UPI Payment
            </h3>


            <input
              type="text"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) =>
                setUpiId(
                  e.target.value
                )
              }
            />


            <br />
            <br />


            <button
              type="button"
              onClick={
                handleUpiPayment
              }
              disabled={
                paymentCompleted
              }
            >
              {paymentCompleted
                ? "✅ Payment Successful"
                : `Pay ₹${finalAmount}`}
            </button>

          </div>

        )}


        {/* CARD */}

        {paymentMethod === "Card" && (

          <div>

            <h3>
              💳 Card Payment
            </h3>


            <input
              type="text"
              placeholder="16-digit Card Number"
              value={cardNumber}
              maxLength={16}
              onChange={(e) =>
                setCardNumber(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
            />


            <br />
            <br />


            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              maxLength={5}
              onChange={(e) =>
                setExpiry(
                  e.target.value
                )
              }
            />


            {" "}


            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              maxLength={3}
              onChange={(e) =>
                setCvv(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
            />


            <br />
            <br />


            <button
              type="button"
              onClick={
                handleCardPayment
              }
              disabled={
                paymentCompleted
              }
            >
              {paymentCompleted
                ? "✅ Payment Successful"
                : `Pay ₹${finalAmount}`}
            </button>

          </div>

        )}


        <br />
        <br />


        {/* PLACE ORDER */}

        <button type="submit">

          {paymentMethod ===
          "Cash on Delivery"
            ? "✅ Place Order"
            : paymentCompleted
            ? "✅ Place Order"
            : "🔒 Complete Payment First"}

        </button>

      </form>

    </div>
  );
};

export default Checkout;

