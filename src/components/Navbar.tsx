import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center border-b px-4 py-2">
      <h1>SpacedShorts</h1>
      <div className="flex gap-4">
        <Link to="/playlists">Playlists</Link>
      </div>
    </nav>
  );
}
