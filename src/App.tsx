import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/layout/MainPage";
import Projects from "./components/UI/Projects"; // Importing Projects component
import Preview from "./components/layout/preview";
import AboutUs from "../src/components/UI/AboutUs";
//import AI from "./components/UI/Cool_item/input"
import Input from "./components/UI/Cool_item/input"
import OnlineTools from "./components/UI/onlineTools"
import News from "./components/UI/News";
import News1 from "./components/UI/News/News1"
import News2 from "./components/UI/News/News2"
import News3 from "./components/UI/News/News3"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Computer from "./components/UI/Hidden/Computer"
function App() {
  return (
    <div className="App">
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/onlinetools" element={<OnlineTools />} />
          <Route path="/computer" element={<Computer />} />
          <Route path="/news" element={<News />} />
          
          <Route path="/news1" element={<News1 />} />
          <Route path="/news2" element={<News2 />} />
          <Route path="/news3" element={<News3 />} />
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