import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

function Register({ setToken, token }) {
  const [newUserData, setNewUserData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newUserData.password && newUserData.email) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/register`,
          newUserData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
      } catch (err) {
        console.error("Error details:", err.response?.data);
        console.error("Full error:", err);
      }
    } else {
      console.log("Missing email or password");
    }
  };

  const handleInput = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  if (token) {
    navigate("/account");
  }
  return (
    <div className="register-container">
      <h2>Register Here</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input type="text" name="firstname" onChange={handleInput} />
        </label>
        <label>
          Last Name
          <input type="text" name="lastname" onChange={handleInput} />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInput} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleInput} />
        </label>
        <button>Register Now!</button>
      </form>
    </div>
  );
}

export default Register;
