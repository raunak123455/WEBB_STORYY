// LoginModal.js
import React, { useState } from "react";
import "./LoginModel.css"; // Optional: Add styles for the modal
import Vector from "../assets/Vector.jpg";
import axios from "axios";
import { useUser } from "./UserContext";

const LoginModal = ({ isOpen, onClose, onLoginSuccess, loggedIn }) => {
  if (isOpen === false || loggedIn === true) return null; // Don't render if modal is not open

  const [password, setPassword] = useState("");
  const { name, setname, setUserId } = useUser();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log(name);
    console.log(password);
    console.log(loggedIn);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          name,
          password,
        }
      );
      console.log(response.data.message); // You can handle the response as needed

      if (response.data.message === "sucess") {
        // Corrected comparison
        // Call the function to update the logged-in state in Header
        onLoginSuccess();
      } else {
        // Set error message if login fails
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("There was an error!", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <img
          onClick={onClose}
          className="vector"
          src={Vector}
          alt="Description of the image"
        />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Use onSubmit on the form */}
          <div className="email-container">
            <label className="email">Username:</label>
            <input
              value={name}
              required
              placeholder="Enter the username"
              onChange={(e) => setname(e.target.value)} // Fixed function name (SetUserName -> setUserName)
            />
          </div>
          <div className="email-container">
            <label className="password">Password:</label>
            <input
              type="password"
              required
              placeholder="Enter the password"
              onChange={(e) => setPassword(e.target.value)} // Fixed function name (SetPassword -> setPassword)
            />
          </div>
          {/* Display error message here */}
          <p style={{ color: "red" }}>{error}</p>{" "}
          {/* Set color for visibility */}
          <button className="register" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
