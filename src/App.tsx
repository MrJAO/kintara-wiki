import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HuntingCalculator from "./pages/HuntingCalculator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hunting-calculator" element={<HuntingCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
