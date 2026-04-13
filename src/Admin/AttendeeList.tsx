import { type Attendee } from "../types";
import { getInitials } from "../utils";
import { Link } from "react-router-dom";

interface AttendeeListProps {
  attendee: Attendee;
}

const AttendeeList = ({ attendee }: AttendeeListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-[#2e2e2e] border border-[#3f3f3f] rounded-xl p-4 my-3 w-full ">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-green-700 text-white text-sm font-bold">
            {getInitials(attendee.username)}
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate max-w-[180px]">
              {attendee.username}
            </p>
            <p className="text-gray-400 text-xs truncate max-w-[180px]">
              {attendee.email}
            </p>
          </div>
        </div>
        <span className="flex-shrink-0 inline-flex items-center gap-1.5 bg-green-900/40 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full border border-green-700/40">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Registered
        </span>
      </div>

      <div className="border-t border-[#3f3f3f] mb-4" />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">
            Phone
          </p>
          <p className="text-gray-200 text-sm truncate">
            {attendee.phoneNumber || "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">
            Registered
          </p>
          <p className="text-gray-200 text-sm">
            {formatDate(attendee.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/admin/${attendee.id}`}
          className="flex-1 py-1.5 text-sm rounded-lg border border-[#4a4a4a] text-gray-300 hover:bg-[#3a3a3a] hover:text-white transition-colors justify-center flex"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(attendee.id)}
          className="flex-1 py-1.5 text-sm rounded-lg border border-red-900/50 text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AttendeeList;
