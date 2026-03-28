import { BrowserRouter, Routes, Route } from "react-router";
import WatchPage from "../features/watch/WatchPage";
import PlaylistsPage from "../features/playlists/PlaylistsPage";
import Navbar from "../components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<WatchPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
