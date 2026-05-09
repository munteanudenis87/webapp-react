import { Link } from "react-router-dom"

function Header() {

  return (
    <nav className="navbar bg-body-tertiary mb-4">
      <div className="container-fluid justify-content-start">
          <Link className="navbar-brand" to="/">Movies</Link>
          <Link className="btn btn-sm btn-secondary" to="/movies/create">Create Movie</Link>
      </div>
    </nav>
  )
}

export default Header