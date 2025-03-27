import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/layout/MainPage";
import Projects from "./components/layout/Projects"; // Importing Projects component
import A from "./components/UI/Hidden/a"
import AboutUs from "./components/layout/AboutUs";
//import AI from "./components/UI/Cool_item/input"
import Input from "./components/UI/Cool_item/input"
import OnlineTools from "./components/layout/onlineTools"
import './app.css'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div className="App">
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/onlinetools" element={<OnlineTools />} />
          <Route path="/a" element={<A />} />
        </Routes>
      </div>

    </Router>
    <Input/>
    <Analytics />
    <SpeedInsights />
    </div>
  );
}

export default App;