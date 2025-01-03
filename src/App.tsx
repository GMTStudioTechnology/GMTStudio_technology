import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/layout/MainPage";
import Hero from "./components/UI/Hero";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/hero" element={<Hero />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;