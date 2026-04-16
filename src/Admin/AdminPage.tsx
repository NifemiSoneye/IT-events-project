import { type Attendee } from "../types";
import AttendeeList from "./AttendeeList";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAttendeeQuery } from "../features/attendees/attendeesApiSlice";
import { ClipLoader } from "react-spinners";
import { selectAllAttendees } from "../features/attendees/attendeesApiSlice";
import { useSelector } from "react-redux";
import { useGetAnalyticsQuery } from "../features/attendees/attendeesApiSlice";

const AdminPage = () => {
  const { data: analytics } = useGetAnalyticsQuery(undefined);
  const { isLoading, isSuccess, isError, error } = useGetAttendeeQuery(
    undefined,
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );
  const attendees = useSelector(selectAllAttendees);

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
  const [search, setSearch] = useState("");
  const today = new Date().toDateString();
  const searchResults =
    attendees?.filter((a) =>
      a.username.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];
  if (isLoading) return <ClipLoader color={"#FFF"} />;
  return (
    <div className="min-h-screen pt-[3rem] bg-[#121212] px-[1rem] text-white pb-[3rem]">
      <h1 className="font-bold text-2xl">Manage attendees</h1>
      <p className="text-green-700 py-[1rem] text-[1rem] font-semibold">
        Lagos Island , Lagos . April 28th 2026
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-[#303030] py-4 pl-4 border border-transparent rounded-xl">
          <p className="text-gray-400 text-lg">Registered</p>
          <p className="font-semibold text-2xl text-green-500">
            {analytics?.totalCount}
          </p>
          <p>Total</p>
        </div>

        <div className="bg-[#303030] py-4 pl-4 border border-transparent rounded-xl">
          <p className="text-gray-400 text-lg">Spots Left</p>
          <p className="font-semibold text-2xl text-green-500">
            {100 - attendees.length}
          </p>
          <p>of 100</p>
        </div>

        <div className="bg-[#303030] py-4 pl-4 pr-4 border border-transparent rounded-xl col-span-2 lg:col-span-1">
          <p className="text-gray-400 text-lg">Registered today</p>
          <p className="font-semibold text-2xl text-green-500">
            {analytics?.todayCount}
          </p>
          <p>
            Last:{" "}
            {analytics?.latestAttendee
              ? getTimeAgo(analytics.latestAttendee.createdAt)
              : "No registrations yet"}
          </p>
        </div>
      </div>

      <input
        type="text"
        className="bg-[#303030] w-full text-white p-[1rem] pl-[5rem] lg:w-[35vw] rounded-md light:bg-white shadow-md light:text-[#808080ff]"
        placeholder="Search for an attendee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-2 lg:grid lg:grid-cols-3 lg:gap-4">
        {searchResults.length > 0 ? (
          searchResults.map((attendee) => (
            <AttendeeList key={attendee.id} attendee={attendee} />
          ))
        ) : (
          <p className="text-gray-400 col-span-3">
            {search
              ? "No attendee matches your search"
              : "No attendees registered yet"}
          </p>
        )}
      </div>
      <Link to="/" className="text-gray-400 font-semibold hover:underline">
        Home Page
      </Link>
    </div>
  );
};

export default AdminPage;
