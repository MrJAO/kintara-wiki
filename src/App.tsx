import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HuntingCalculator from "./pages/HuntingCalculator";
import KintaraClub from "./pages/KintaraClub";
import CombatStrategy from "./pages/CombatStrategy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hunting-calculator" element={<HuntingCalculator />} />
        <Route path="/kintara-club/:videoName" element={<KintaraClub />} />
        <Route path="/combat-strategy/:videoName" element={<CombatStrategy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;