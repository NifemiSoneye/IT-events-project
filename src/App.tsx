import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import { type Attendee } from "./types";
import useLocalStorage from "./hook/useLocalStorage";
import EditForm from "./EditForm";
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
  const handleDelete = (id: number) => {
    setAttendees((prev) => prev.filter((a) => a.id !== id));
  };
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <UserPage attendees={attendees} handleRegister={handleRegister} />
          }
        />
        <Route
          path="admin"
          element={
            <AdminPage attendees={attendees} handleDelete={handleDelete} />
          }
        />
        <Route
          path=":id"
          element={
            <EditForm attendees={attendees} />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
