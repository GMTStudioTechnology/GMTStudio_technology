import Navbar from "../UI/Navigation_bar";
import Hero from "../UI/Hero";
import Project from "../UI/Projects"
const MainPage: React.FC = () => {
  return (
    <div className="bg-black">
      <Navbar />
    <div className ="pt-24">
      <Hero/>
      </div>
    <Project />
    </div>
  );
};
export default MainPage;