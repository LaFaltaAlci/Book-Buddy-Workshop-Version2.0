import {Routes, Route} from "react-router"
import Account from "./components/Account";
import Books from "./components/Books";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";


export default function App() {
  return (
  <>
  <h1>
    Bookbuddy
  </h1>
  <Navigations />
  <Routes>
    <Route path="/" element={<Books />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/book" element={<SingleBook />} />
    <Route path="/account" element={<Account />} />
    <Route path="*" element={<Books />} />
  </Routes>
  </>
  );
}
