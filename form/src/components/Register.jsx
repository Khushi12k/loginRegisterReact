import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function Bcrypt_Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState(
    localStorage.getItem("storedData") !== null
      ? JSON.parse(localStorage.getItem("storedData"))
      : []
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const BcryptPassword = {...data,
      password: hashedPassword,
    };

    setUsers([...users, BcryptPassword]);
    setData({
      name: "",
      username: "",
      email: "",
      password: "",
    });

    navigate("/login");
  }

  useEffect(() => {
    localStorage.setItem("storedData", JSON.stringify(users));
  }, [users]);

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

       
        <br />

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
}