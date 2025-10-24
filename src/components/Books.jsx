import { useEffect, useState } from "react";
import BookCardList from "./BookCardList";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [booksToDisplay, setBooksToDisplay] = useState([]);
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
          setBooksToDisplay(response.data);
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

  const handleBookSearch = (e) => {
    const searchResults = books.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setBooksToDisplay(searchResults);
  };

  return (
    <div className="book-page">
      <div>
        Search For Book: <input type="text" onChange={handleBookSearch} />
      </div>
      <BookCardList books={booksToDisplay} />
    </div>
  );
}

export default Books;
