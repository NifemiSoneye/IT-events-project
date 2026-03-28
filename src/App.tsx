import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import { type Attendee } from "./types";
import useLocalStorage from "./hook/useLocalStorage";
import EditForm from "./EditForm";
import AdminLayout from "./AdminLayout";
import ScrollToTop from "./scrollToTop";
function App() {
  const [attendees, setAttendees] = useLocalStorage<Attendee[]>(
    "attendees",
    [],
  );
  const handleRegister = (formData: Omit<Attendee, "id" | "createdAt">) => {
    setAttendees((prev) => [
      ...prev,
      { id: Date.now(), createdAt: new Date().toISOString(), ...formData },
    ]);
  };
  const handleEdit = (
    id: string,
    formData: Omit<Attendee, "id" | "createdAt">,
  ) => {
    setAttendees((prev) =>
      prev.map((a) => (a.id === Number(id) ? { ...a, ...formData } : a)),
    );
  };
  const handleDelete = (id: number) => {
    setAttendees((prev) => prev.filter((a) => a.id !== id));
  };
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <UserPage attendees={attendees} handleRegister={handleRegister} />
            }
          />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <AdminPage attendees={attendees} handleDelete={handleDelete} />
            }
          />
          <Route
            path=":id"
            element={<EditForm attendees={attendees} handleEdit={handleEdit} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
