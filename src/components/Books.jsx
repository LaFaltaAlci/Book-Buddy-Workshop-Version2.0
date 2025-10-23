import { useEffect, useState } from "react";
import BookCardList from "./BookCardList";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
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

  return (
    <div className="book-page">
      <BookCardList books={books}/>
    </div>
  );
}

export default Books;
