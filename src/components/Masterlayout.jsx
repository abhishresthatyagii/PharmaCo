import { Outlet } from "react-router-dom";
import MoleculesBackground from "./MoleculesBackground";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import CourseAlert from "./CourseAlert";

const MasterLayout = () => {
  return (
    <div className="relative">
      {/* Persistent animated background */}
      <MoleculesBackground />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar at top */}
        <Navbar />

        {/* Page content */}
        <main className="flex-grow">
          <CourseAlert />
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MasterLayout;
