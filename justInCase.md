const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
  
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/books`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("Response data:", response.data);

        // The API returns an array directly
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        console.error("Full error:", err);
        setError(`Failed to load books: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;
  if (books.length === 0) return <div>No books found</div>;



  single book component

import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios(`${import.meta.env.VITE_API_BASE_URL}/books/${id}`)
      .then((data) => {
        setBook(data.data.book);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load book. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="single-book-container">Loading...</div>;
  }

  if (error) {
    return <div className="single-book-container error">{error}</div>;
  }

  if (!book) {
    return <div className="single-book-container">Book not found.</div>;
  }

  return (
    <div className="single-book-container">
      <h2>{book.title}</h2>
      <img src={book.coverimage} alt={book.title || "Book cover"} />
      <p>{book.description}</p>
      <p>
        <Link to="/login">Login</Link> to checkout this book
      </p>
    </div>
  );
}

export default SingleBook;


Account Component OG useEffect

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
        setBooks(response.data.books || []);
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