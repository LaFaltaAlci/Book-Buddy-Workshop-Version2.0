import { Link } from "react-router"

function Navigations() {
  return (
    <nav>
        <Link to="/">See All Books</Link>
        <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navigations