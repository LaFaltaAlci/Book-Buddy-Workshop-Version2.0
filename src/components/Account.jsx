import { useEffect, useState } from "react";
import axios from "axios";

function Account({ token }) {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Token:", token);
        console.log(
          "API URL:",
          `${import.meta.env.VITE_API_BASE_URL}/users/me`
        );

        if (!token) {
          setError("No authentication token");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("User response:", response.data);

        setUser(response.data);
        setBooks(response.data.reservations || []);
        setError(null);
      } catch (err) {
        console.error("Full error:", err);
        console.error("Error response:", err.response);
        setError(`Failed to load account: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleReturnBook = async (id) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/reservations/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (result.data.deletedReservation) {
        const bookData = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setBooks(bookData.data.reservations);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div>Loading account...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data</div>;

  return (
    <div>
      <h2>My Account</h2>
      <p>
        {user?.firstname} {user?.lastname}
      </p>
      <p>{user?.email}</p>
      {books.map((reservation) => (
        <div
          className="book-card"
          key={reservation.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>{reservation.book?.title}</h2>
          <img
            src={reservation.book?.coverimage}
            alt={reservation.book?.title}
          />
          <button onClick={() => handleReturnBook(reservation.id)}>
            Return book
          </button>
        </div>
      ))}
    </div>
  );
}

export default Account;
