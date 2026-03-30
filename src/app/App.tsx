import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import WatchPage from "../features/watch/WatchPage";
import PlaylistsPage from "../features/playlists/PlaylistsPage";
import Navbar from "../components/Navbar";

function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/watch";

  return (
    <div className="h-dvh flex flex-col">
      <div className={hideNavbar ? "hidden md:block" : ""}>
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto flex flex-col flex-1 w-full">
        <Routes>
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
