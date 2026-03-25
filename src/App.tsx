import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UserPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
