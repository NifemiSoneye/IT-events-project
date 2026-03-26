const Nav = () => {
  const menuIcon = new URL("./assets/icon-hamburger.svg", import.meta.url).href;
  return (
    <div className="bg-black flex justify-between min-h-[10vh] items-center px-[1rem] ">
      <p className="text-green-600 font-semibold">Tech Meetup Event</p>
      <img src={menuIcon} alt="hamburger icon" />
    </div>
  );
};

export default Nav;
