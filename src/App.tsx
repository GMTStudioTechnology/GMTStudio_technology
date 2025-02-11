import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/layout/MainPage";
import Projects from "./components/layout/Projects"; // Importing Projects component
import A from "./components/UI/Hidden/a"
import AboutUs from "./components/layout/AboutUs";
//import AI from "./components/UI/Cool_item/input"
import Input from "./components/UI/Cool_item/input"
import OnlineTools from "./components/layout/onlineTools"
import News from "./components/layout/News";
import News1 from "./components/UI/News/News1"
import News2 from "./components/UI/News/News2"
import News3 from "./components/UI/News/News3"
import News4 from "./components/UI/News/News4"
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
          <Route path="/news" element={<News />} />
          <Route path="/a" element={<A />} />
          <Route path="/news1" element={<News1 />} />
          <Route path="/news2" element={<News2 />} />
          <Route path="/news3" element={<News3 />} />
          <Route path="/news4" element={<News4 />} />
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