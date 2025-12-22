import { Link } from "react-router";
import "./NotFoundPage.css";
import { Header } from "../components/Header";
export function NotFoundPage() {
  return (
    <>
	<title>404 - Page Not Found</title>
	<link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
	<Header />
      <div className="notfoundpage-container">
        <p className="notfoundpage-container">The page you are looking for does not exist.</p>
      </div>
    </>
  );
}
