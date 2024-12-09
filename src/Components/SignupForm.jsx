import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../slice/authSlice";
import { useNavigate } from "react-router";

const Signup = () => {
    const navigate=useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const userData = { firstName, lastName, email, password };
    dispatch(signup(userData));
    navigate("/login");
    alert("Signup successful!");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-violet-600 to-indigo-600">
    <form
      onSubmit={handleSignup}
      className="w-full max-w-md bg-gradient-to-r from-indigo-400 to-cyan-400 p-6 rounded shadow-md custom-shadow"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Signup
      </button>
    </form>
  </div>
  
  );
};

export default Signup;
