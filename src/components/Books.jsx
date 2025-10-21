import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_BASE_URL}/books`)
      .then((data) => {
        console.log(data.data.books);
        setBooks(data.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {books.map((book) => {
        <BookCard key={book.id} book={book} />;
      })}
    </div>
  );
}

export default Books;
