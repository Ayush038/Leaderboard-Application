import API from "../api/api";
import React, { useState } from "react";
import "../style/AddUser.css";
import Swal from 'sweetalert2';

const AddUser = ({ flipTo }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (withCredit) => {
    if (!name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Name Required',
        text: 'Please enter a user name',
      });
      return;
    }

    setLoading(true);

    const payload = { name };

    if (withCredit) {
      payload.initialCredit = Math.floor(Math.random() * 10) + 1;
    }

    try {
      await API.post("/users", payload);
      Swal.fire({
        icon: 'success',
        title: 'User Added!',
        text: withCredit
          ? `User "${name}" created with ${payload.initialCredit} points.`
          : `User "${name}" created successfully.`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      });

      setName("");
      setTimeout(() => {
        flipTo("leaderboard");
      }, 700);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.msg || "Something went wrong while adding the user.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-form">
      <h2>➕ Add New User</h2>

      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="button-group">
        <button
          disabled={loading}
          className="glow-button"
          onClick={() => handleSubmit(false)}
        >
          Add User
        </button>
        <button
          disabled={loading}
          className="glow-button"
          onClick={() => handleSubmit(true)}
        >
          Add & Credit
        </button>
      </div>
    </div>
  );
};

export default AddUser;
