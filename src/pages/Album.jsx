import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Player from "../components/Player";
import AlbumContent from "../components/AlbumContent";

function Album() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Header />
        <AlbumContent />
      </div>

      <Player />
    </div>
  );
}

export default Album;
