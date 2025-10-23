import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Login({ token, setToken }) {
  const [UserData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserData.password && UserData.email) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/login`,
          UserData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(handleSubmit);
      } catch (err) {
        console.error("Error details:", err.response?.data);
        console.error("Full error:", err);
      }
    }
  };

  const handleInput = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  if (token) {
    navigate("/account");
  }
  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInput} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleInput} />
        </label>
        <button>Login</button>
        <p>
          Dont have an account? <Link to="/register">Register now.</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
