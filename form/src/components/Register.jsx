import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [users, setUsers] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!data.name || !data.username || !data.email || !data.phone || !data.password) {
      alert("Please fill all fields");
      return;
    }

  
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = { ...data, password: hashedPassword };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    localStorage.setItem("userData", JSON.stringify(updatedUsers));

    alert("Registration successful!");
    setData({
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
    });

    navigate("/login");
  };

  return (
    <>
      <h2>Register Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Register</button>
        <br /><br />

        <p>
          <Link to="/login">Already have an account? Login</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
