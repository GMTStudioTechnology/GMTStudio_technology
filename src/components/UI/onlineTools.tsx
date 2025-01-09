import Navbar from "../UI/Navigation_bar";
import List from "../UI/Cool_item/List";

const OnlineTools: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pt-20">
        <h1 className="text-2xl mb-4 sm:text-4xl md:text-6xl lg:text-8xl">GMTStudio Online tools </h1>
        <p className="text-lg mb-8 sm:text-lg md:text-xl lg:text-2xl">We put the Thinklink components ( not functional one ) at here due to the fact that we haven't develop any of it </p>
        <List />
      </div>
    </div>
  );
};

export default OnlineTools;