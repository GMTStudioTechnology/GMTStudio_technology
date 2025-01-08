import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/layout/MainPage";
import Projects from "./components/UI/Projects"; // Importing Projects component
import Preview from "./components/layout/preview";
import AboutUs from "../src/components/UI/AboutUs";
//import AI from "./components/UI/Cool_item/input"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;