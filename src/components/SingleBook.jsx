import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function SingleBook({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/books/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("Book data:", response.data);
        setBook(response.data); // Changed from response.data.book
      } catch (err) {
        console.error("Error fetching book:", err);
        setError(`Failed to load book: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  const handleCheckout = async () => {
    try {
      const data = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/books/${id}`,
        { available: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data);
      if (data.data.book) {
        setBook(data.data.book);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="single-book-container">
      <h2>{book?.title}</h2>
      <img src={book?.coverimage} alt={book?.title} />
      <p>{book?.description}</p>
      <p>
        {!token && (
          <>
            <Link to="/login">Login</Link> to checkout this book.
          </>
        )}
        {token &&
          (book?.available ? (
            <button onClick={handleCheckout}>Checkout book</button>
          ) : (
            <p>Book Checked Out</p>
          ))}
      </p>
    </div>
  );
}

export default SingleBook;
