import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 py-2">
      <Link to="/">Spaced Shorts</Link>
      <div className="flex gap-4">
        <Link to="/playlists">Playlists</Link>
      </div>
    </nav>
  );
}
