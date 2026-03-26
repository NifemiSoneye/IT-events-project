import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import { useState } from "react";
import { type Attendee } from "./types";
import useLocalStorage from "./hook/useLocalStorage";
function App() {
  const [attendees, setAttendees] = useLocalStorage<Attendee[]>(
    "attendees",
    [],
  );
  const handleRegister = (formData: Omit<Attendee, "id">) => {
    setAttendees((prev) => [...prev, { id: Date.now(), ...formData }]);
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
      </Route>
    </Routes>
  );
}

export default App;
