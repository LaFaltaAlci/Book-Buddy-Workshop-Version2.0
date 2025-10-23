import { Routes, Route } from "react-router";
import Account from "./components/Account";
import Books from "./components/Books";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";
import { useState, useEffect } from "react";

export default function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  return (
    <>
      <h1>Bookbuddy</h1>
      <Navigations token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} token={token} />}
        />
        <Route
          path="/register"
          element={<Register setToken={setToken} token={token} />}
        />
        <Route path="/book/:id" element={<SingleBook token={token} />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Books />} />
      </Routes>
    </>
  );
}
