import BookCard from "./BookCard";
// import { Link } from "react-router";

function BookCardList({ books }) {
  return (
    <div className="book-card-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookCardList;
