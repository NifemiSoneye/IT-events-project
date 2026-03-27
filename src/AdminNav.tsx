import React from "react";

const AdminNav = () => {
  return (
    <div className="bg-black flex justify-between min-h-[10vh] items-center px-[1rem] ">
      <p className="text-green-600 font-semibold">Tech Meetup Event</p>
      <div className="border border-transparent rounded-3xl bg-[#202020] text-white p-2">
        <p>Admin</p>
      </div>
    </div>
  );
};

export default AdminNav;
