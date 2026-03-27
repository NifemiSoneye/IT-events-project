import { Link } from "react-scroll";

const Nav = () => {
  const menuIcon = new URL("./assets/icon-hamburger.svg", import.meta.url).href;
  return (
    <div className="bg-black flex justify-between min-h-[10vh] items-center px-[1rem] ">
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
      </div>
      <img src={menuIcon} alt="hamburger icon" className="lg:hidden" />
    </div>
  );
};

export default Nav;
