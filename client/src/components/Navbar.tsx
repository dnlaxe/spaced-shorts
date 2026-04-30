import { useEffect, useState } from "react";
import { Link } from "react-router";
import { helloWorld } from "../api/client";

export default function Navbar() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getMessage() {
      const data = await helloWorld();
      setMessage(data.message);
    }

    getMessage();
  }, []);

  return (
    <nav className="flex justify-between items-center border-b px-4 py-2">
      <h1>SpacedShorts</h1>
      <div className="flex gap-4">
        <Link to="/playlists">Playlists</Link>
      </div>
      <div>{message}</div>
    </nav>
  );
}
