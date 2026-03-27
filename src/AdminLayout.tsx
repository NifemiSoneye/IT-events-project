import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <div>
      <AdminNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
