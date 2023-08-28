import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const Layout = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center border-b shadow-md">
        <div className="w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/1">
          <Header />
        </div>
      </div>
      <div className="content flex justify-center min-h-screen">
        <div className="w-full mb-8 sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/1 2xl:w-1/1">
          <Outlet />
        </div>
      </div>
      <div className="left-0 flex justify-center bg-gray-100 p-5">
        <Footer />
      </div>
    </div>
  );
};
