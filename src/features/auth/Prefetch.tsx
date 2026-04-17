import { store } from "../../app/store";
import { attendeesApiSlice } from "../attendees/attendeesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      attendeesApiSlice.util.prefetch("getAttendee", undefined, {
        ifOlderThan: 60,
      }),
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
