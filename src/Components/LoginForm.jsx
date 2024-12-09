import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slice/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }));
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (

    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-violet-600 to-indigo-600">
  <form
    onSubmit={handleLogin}
    className="w-full max-w-md bg-gradient-to-r from-indigo-400 to-cyan-400 p-6 rounded shadow-md  custom-shadow"
  >
    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border rounded mb-4"
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 border rounded mb-4"
      required
    />
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
    >
      Login
    </button>
  </form>
</div>

  );
};

export default Login;
