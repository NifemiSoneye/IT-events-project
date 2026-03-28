import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const menuIcon = new URL("../assets/icon-hamburger.svg", import.meta.url)
    .href;
  const [mobileNav, setMobileNav] = useState(false);
  const closeIcon = new URL("../assets/icon-close.svg", import.meta.url).href;
  const navLinks = ["about", "register", "attendees"];
  const mobileLinkBase =
    "relative pb-2 text-white text-2xl py-4 px-6 hover:text-green-400 border-b border-gray-600";
  return (
    <div className=" flex justify-between min-h-[10vh] items-center px-[1rem]  backdrop-blur-md fixed top-0 left-0 w-full  border-b border-gray-600 bg-[#111113]/60 z-50">
      <p className="text-green-600 font-semibold">Tech Meetup Event</p>
      <div className="hidden lg:flex">
        <Link
          to={"about"}
          smooth={true}
          duration={700}
          offset={-80}
          className="text-white px-2 hover:underline hover:cursor-pointer scroll-smooth"
        >
          About
        </Link>
        <Link
          to={"register"}
          smooth={true}
          duration={700}
          offset={-80}
          className="text-white px-2 hover:underline hover:cursor-pointer scroll-smooth"
        >
          Register
        </Link>
        <Link
          to={"attendees"}
          smooth={true}
          duration={700}
          offset={-80}
          className="text-white px-2 hover:underline hover:cursor-pointer scroll-smooth"
        >
          Attendees
        </Link>
        <RouterLink
          to="/admin"
          className="text-white px-2 hover:underline hover:cursor-pointer"
        >
          Admin
        </RouterLink>
      </div>
      <img
        src={menuIcon}
        alt="hamburger icon"
        className="lg:hidden cursor-pointer"
        onClick={() => setMobileNav(true)}
      />
      <div
        className={`lg:hidden flex flex-col w-[70vw] h-screen fixed top-0 right-0  z-40 backdrop-blur-[40.8px] +shadow-xl bg-[#0c0c0e] transition-transform duration-300 ease-in-out capitalize ${
          mobileNav ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <div className="flex justify-end pt-[1rem] pr-[1rem] pb-24">
          <img
            src={closeIcon}
            alt="close"
            className="h-[30px] w-[30px]"
            onClick={() => setMobileNav(false)}
          />
        </div>
        {navLinks.map((link) => (
          <Link
            key={link}
            to={link}
            smooth={true}
            duration={700}
            offset={-80}
            className={mobileLinkBase}
            onClick={() => setMobileNav(false)} // close menu on click
          >
            {link}
          </Link>
        ))}
        <RouterLink to="/admin" className={mobileLinkBase}>
          Admin
        </RouterLink>
      </div>
      {mobileNav && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}
    </div>
  );
};

export default Nav;
