import { Outlet } from "react-router-dom";
// import Navbar from "../components/NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#313131] font-[Pretendard]">
      <div className="w-full flex flex-col min-h-screen relative">
        <main className="flex-grow bg-[#f5f5f5]">
          <Outlet />
        </main>
        {/* <Navbar /> */}
      </div>
    </div>
  );
};

export default RootLayout;