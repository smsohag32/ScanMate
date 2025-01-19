import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const MainLayout = () => {
   return (
      <div>
         <Outlet />
         <Toaster
            position="top-center"
            richColors
         />
         <Footer />
      </div>
   );
};

export default MainLayout;
