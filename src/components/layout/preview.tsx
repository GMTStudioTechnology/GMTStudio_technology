import Navbar from "../UI/Navigation_bar";
import Hero from "../UI/MainPage/Hero";
// import Project from "../UI/Projects"
import Intro from "../UI/MainPage/intro";
import Testimonial from "../UI/MainPage/Testimonial";

const MainPage: React.FC = () => {
  return (
    <div className="bg-black">
      <Navbar />
        <div className ="pt-24">
          <Hero/>
        </div>
        <Intro text="Experience well enhanced tools at GMTStudio" />
      <Testimonial />
    </div>

  );
};
export default MainPage;