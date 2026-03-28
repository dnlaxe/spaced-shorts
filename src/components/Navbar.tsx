import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Watch</Link>
      <Link to="/playlists">Playlists</Link>
    </nav>
  );
}
