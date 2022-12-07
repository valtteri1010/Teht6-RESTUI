import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Urheilijoidentiedot from "./components/Urheilijoidentiedot";
import MuokkaaUrheilija from "./components/MuokkaaUrheilija";
import LisaaUrheilija from "./components/LisaaUrheilija";

import "bootstrap/dist/css/bootstrap.css";

import GlobalState from "./context/GlobalState";
function App() {
  return (
    <GlobalState>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Urheilijoidentiedot />} />
              <Route path="/muokkaa/:id" element={<MuokkaaUrheilija />} />
              <Route path="/lisaa" element={<LisaaUrheilija />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GlobalState>
  );
}

export default App;
