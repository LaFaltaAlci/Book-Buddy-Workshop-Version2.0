import { Link } from "react-router";

function BookCard({ book }) {
  return (
    <div>
      <Link to={`/book/${book.id}`} className="book-card">
        <h2>{book.title}</h2>
        <img src={book.coverimage} alt={book.title} />
      </Link>
    </div>
  );
}

export default BookCard;
