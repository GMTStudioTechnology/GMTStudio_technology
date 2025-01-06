import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/layout/MainPage";
import Preview from "./components/layout/preview";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;