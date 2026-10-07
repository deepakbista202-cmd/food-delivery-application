
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({
  user,
  favorites,
  logoutUser,
}) => {
  const navigate = useNavigate();

  // Get orders
  const savedOrders =
    localStorage.getItem("foodieOrders");

  const orders = savedOrders
    ? JSON.parse(savedOrders)
    : [];

  // Calculate total amount spent
  const totalSpent = orders.reduce(
    (total, order) =>
      total + Number(order.finalAmount || 0),
    0
  );

  // Saved profile details
  const savedProfile =
    localStorage.getItem("foodieProfile");

  const profileData = savedProfile
    ? JSON.parse(savedProfile)
    : {};

  const [phone, setPhone] = useState(
    profileData.phone || ""
  );

  const [address, setAddress] = useState(
    profileData.address || ""
  );

  const [isEditing, setIsEditing] =
    useState(false);

  // Save profile
  const saveProfile = () => {
    const updatedProfile = {
  name: user?.name || "",
  phone: phone,
  address: address,
};
    localStorage.setItem(
      "foodieProfile",
      JSON.stringify(updatedProfile)
    );

    setIsEditing(false);

    alert(
      "Profile updated successfully! ✅"
    );
  };

  // Logout
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="profile">

      <h1>
        My Profile 👤
      </h1>

      <hr />

      {/* Personal Information */}

      <h2>
        Personal Information
      </h2>

      <p>
        👤 Name: {user?.name || "User"}
      </p>

      <p>
        📧 Email: {user?.email || "Not available"}
      </p>

      {/* Phone */}

      {isEditing ? (

        <div>

          <p>
            📱 Phone Number
          </p>

          <input
            type="tel"
            value={phone}
            maxLength="10"
            placeholder="Enter 10-digit phone number"
            onChange={(e) =>
              setPhone(
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
          />

        </div>

      ) : (

        <p>
          📱 Phone:{" "}
          {phone || "Not added"}
        </p>

      )}

      {/* Address */}

      {isEditing ? (

        <div>

          <p>
            🏠 Delivery Address
          </p>

          <textarea
            value={address}
            placeholder="Enter your delivery address"
            rows="4"
            cols="40"
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
          />

        </div>

      ) : (

        <p>
          🏠 Address:{" "}
          {address || "Not added"}
        </p>

      )}

      <br />

      {/* Edit / Save */}

      {isEditing ? (

        <div>

          <button
            onClick={saveProfile}
          >
            💾 Save Profile
          </button>

          {" "}

          <button
            onClick={() =>
              setIsEditing(false)
            }
          >
            Cancel
          </button>

        </div>

      ) : (

        <button
          onClick={() =>
            setIsEditing(true)
          }
        >
          ✏️ Edit Profile
        </button>

      )}

      <hr />

      {/* Activity */}

      <h2>
        My Foodie Activity 📊
      </h2>

      <p>
        📦 Total Orders:{" "}
        {orders.length}
      </p>

      <p>
        ❤️ Favorite Foods:{" "}
        {favorites.length}
      </p>

      <p>
        💰 Total Amount Spent: ₹
        {totalSpent}
      </p>

      <hr />

      {/* Navigation */}

      <button
        onClick={() =>
          navigate("/orders")
        }
      >
        📦 View My Orders
      </button>

      {" "}

      <button
        onClick={() =>
          navigate("/favorites")
        }
      >
        ❤️ View Favorites
      </button>

      <br />
      <br />

      {/* Logout */}

      <button
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </div>
  );
};

export default Profile;
