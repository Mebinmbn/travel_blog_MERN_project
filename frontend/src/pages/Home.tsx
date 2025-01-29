import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-[#4fc9fa] max-w-full min-h-screen overflow-hidden">
      <Navbar />
      <div className=" w-full max-w-7xl mx-auto gap-2 p-10 pt-20 min-h-screen">
        <div className="w-full h-screen col-span-4 bg-gray-100 mb-2 drop-shadow-lg"></div>
      </div>
    </div>
  );
}

export default Home;
