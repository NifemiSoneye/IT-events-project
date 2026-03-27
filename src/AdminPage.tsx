import { type Attendee } from "./types";
import AttendeeList from "./AttendeeList";
import { useState, useEffect } from "react";

interface adminProps {
  attendees: Attendee[];
  handleDelete: (id: number) => void;
}
const AdminPage = ({ attendees, handleDelete }: adminProps) => {
  const [searchResults, setSearchResults] = useState<Attendee[]>([]);
  const [search, setSearch] = useState("");
  const today = new Date().toDateString();

  const registeredToday = attendees.filter(
    (a) => new Date(a.createdAt).toDateString() === today,
  ).length;
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);

    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute(s) ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour(s) ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day(s) ago`;
  };
  const latestAttendee = attendees.length
    ? [...attendees].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0]
    : null;
  useEffect(() => {
    const finalResults = attendees.filter((a) =>
      a.username.toLowerCase().includes(search.toLowerCase()),
    );
    setSearchResults(finalResults);
  }, [search, attendees]);
  return (
    <div className="min-h-screen pt-[3rem] bg-[#121212] px-[1rem] text-white">
      <h1 className="font-bold text-2xl">Manage attendees</h1>
      <p className="text-green-700 py-[1rem] text-[1rem] font-semibold">
        Lagos Island , Lagos . April 28th 2026
      </p>
      <div>
        <div className="flex justify-between">
          <div className="bg-[#303030] py-4 pl-4 min-w-[35vw] border border-transparent rounded-xl">
            <p className="text-gray-400 text-lg">Registered</p>
            <p className="font-semibold text-2xl text-green-500">
              {attendees.length}
            </p>
            <p>Total</p>
          </div>
          <div className="bg-[#303030] pr-10 py-4 pl-4 min-w-[35vw] border border-transparent rounded-xl">
            <p className="text-gray-400 text-lg">Spots Length</p>
            <p className="font-semibold text-2xl text-green-500">
              {100 - attendees.length}
            </p>
            <p>of 100</p>
          </div>
        </div>
        <div className="bg-[#303030] pr-10 py-4 pl-4 min-w-[35vw] border border-transparent rounded-xl my-5">
          <p className="text-gray-400 text-lg">Registered today</p>
          <p className="font-semibold text-2xl text-green-500">
            {registeredToday}
          </p>
          <p className="">
            {latestAttendee
              ? getTimeAgo(latestAttendee.createdAt)
              : "No registrations yet"}
          </p>
        </div>
      </div>
      <input
        type="text"
        className="bg-[#303030] w-[90vw]  text-white p-[1rem] pl-[5rem] lg:w-[30vw] rounded-md light:bg-white shadow-md light:text-[#808080ff]"
        placeholder="Search for an attendee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-2">
        {searchResults.length > 0
          ? searchResults.map((attendee) => (
              <AttendeeList
                key={attendee.id}
                attendee={attendee}
                handleDelete={handleDelete}
              />
            ))
          : "No Attendee found"}
      </div>
    </div>
  );
};

export default AdminPage;
