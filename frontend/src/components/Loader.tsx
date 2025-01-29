import { GridLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-500 ">
      <GridLoader color="#bc7833" loading={true} size={15} />
    </div>
  );
}

export default Loader;
