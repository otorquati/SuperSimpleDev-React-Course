import { Link } from "react-router";
import "./NotFoundPage.css";
export function NotFoundPage() {
  return (
    <>
      <div className="notfoundpage-container">
        <div className="notfoundpage-header">
          <h1>404 - Page Not Found</h1>
        </div>
        <p className="notfoundpage-container">The page you are looking for does not exist.</p>
	  <button className="btn-home">
	  <Link to="/" className="notfoundpage-home-link">Go back to Home Page</Link>
	  </button>
      </div>
    </>
  );
}
