import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import UserPage from "./User/UserPage";
import AdminPage from "./Admin/AdminPage";
import EditForm from "./Admin/EditForm";
import AdminLayout from "./Admin/AdminLayout";
import ScrollToTop from "./ScrollToTop";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import Prefetch from "./features/auth/Prefetch";
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Prefetch />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<UserPage />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminPage />} />
                <Route path=":id" element={<EditForm />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
