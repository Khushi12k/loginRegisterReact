import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  
  const users = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : [];

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (users.length === 0) {
      alert("No users found. Please register first.");
      return;
    }


    const user = users.find((obj) => obj.email === data.email);

    if (!user) {
      alert("User not found. Please register.");
      return;
    }


    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      alert("Invalid password");
      return;
    }


    navigate("/home");
  }

  return (
    <>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
        <br /><br />

        <p>
          <Link to="/">Don't have an account? Register</Link>
        </p>
      </form>
    </>
  );
};

export default Login;