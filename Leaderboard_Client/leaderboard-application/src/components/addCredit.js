import React, { useState } from "react";
import API from "../api/api";
import "../style/addCredit.css";
import Swal from 'sweetalert2';

const AddCredits = ({ flipTo, users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [crediting, setCrediting] = useState(false);

  const handleCredit = async () => {
    if (!selectedUser) return;

    try {
      setCrediting(true);
      const res = await API.post(`/claim/${selectedUser._id}`);

      Swal.fire({
        icon: "success",
        title: "Points Added!",
        text: `${res.data.points} points added to ${res.data.user.name}`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });

      setTimeout(() => {
        setSelectedUser(null);
        flipTo("leaderboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while crediting points.",
      });
    } finally {
      setCrediting(false);
    }
  };

  return (
    <div className="add-credit-panel">
      <h2>⚡ Select a User to Add Credit</h2>
      <div className="user-grid">
        {users.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          return (
            <div
              key={user._id}
              className={`user-credit-card ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="user-info">
                <h4>{user.name}</h4>
                <p className="point">{user.totalPoints} pts</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedUser && (
        <div className="credit-action">
          <button
            className="glow-button"
            onClick={handleCredit}
            disabled={crediting}
          >
            {crediting ? "Crediting..." : `Add Credit to ${selectedUser.name}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCredits;
