import { type Attendee } from "./types";

interface adminProps {
  attendees: Attendee[];
  handleDelete: (id: number) => void;
}
const AdminPage = ({ attendees, handleDelete }: adminProps) => {
  return <div></div>;
};

export default AdminPage;
