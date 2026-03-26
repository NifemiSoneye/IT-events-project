import UserForm from "./UserForm";
import { type Attendee } from "./types";

interface userProps {
  attendees: Attendee[];
  handleRegister: (formData: Omit<Attendee, "id">) => void;
}
const UserPage = ({ attendees, handleRegister }: userProps) => {
  const arrowIcon = new URL("./assets/right-arrow.png", import.meta.url).href;
  const groupImg = new URL("./assets/group.png", import.meta.url).href;
  const talkImg = new URL("./assets/talk.png", import.meta.url).href;
  return (
    <div className=" min-h-screen ">
      <section className="min-h-screen pt-[3rem] bg-[#121212] px-[1rem]">
        <p className="text-green-700 py-[2rem] text-[1rem] font-semibold">
          Lagos Island , Lagos . April 28th 2026
        </p>
        <p className="text-white text-[2rem] text-wrap pr-[10rem] pb-[2rem]">
          Tech Meetup 2026
        </p>
        <p className="text-gray-500 font-bold pb-[2rem]">
          Connect with the sharpest minds in tech . A 2 days retreat involving
          talks and real conversations
        </p>
        <p className="text-gray-500 font-bold pb-[2rem]">
          Register now to book your place at the best tech meetup of the year .
          Dont miss out on this incredible opportunity
        </p>
        <a
          href=""
          className="bg-green-700 flex items-center justify-center text-[1.5rem] border border-transparent rounded-3xl p-[0.5rem] mb-[1rem]"
        >
          Register Now{" "}
          <span>
            <img
              src={arrowIcon}
              alt="arrow"
              className="h-[30px] w-[30px] pt-[0.25rem] "
            />
          </span>
        </a>
        <a
          href=""
          className="flex items-center text-white justify-center text-[1.5rem] border border-white rounded-3xl p-[0.5rem] mt-[1.5rem]"
        >
          Learn More
        </a>
      </section>
      <section className="min-h-screen bg-slate-300 px-[1rem]">
        <h1 className="text-center text-[2rem] font-semibold ">
          ABOUT THE EVENT
        </h1>
        <div className="flex flex-col items-center my-[1rem]">
          <img
            src={groupImg}
            alt="group"
            className="h-[200px] w-[300px] mb-[1rem] border border-black rounded-md"
          />
          <img
            src={talkImg}
            alt="group"
            className="h-[200px] w-[300px] border border-black rounded-md"
          />
        </div>
        <h2 className="text-center font-bold my-[1rem]">
          Where builders meet and ideas land.
        </h2>
        <p className="text-black font-semibold">
          This is a gathering for technology professionals and enthusiasts to
          network, share knowledge, and collaborate on topics like coding, AI,
          and startup growth
        </p>
        <p className="mt-[1rem] font-bold">Agenda</p>
        <div className="grid grid-cols-[1fr_2fr] bg-white border border-transparent rounded-md p-[0.5rem] mt-[0.5rem]">
          <p>9:00 AM</p>
          <p>Registration & breakfast</p>
        </div>
        <div className="grid grid-cols-[1fr_2fr] bg-white border border-transparent rounded-md p-[0.5rem] mt-[0.5rem]">
          <p>10:00 AM</p>
          <p>Opening keynote</p>
        </div>
        <div className="grid grid-cols-[1fr_2fr] bg-white border border-transparent rounded-md p-[0.5rem] mt-[0.5rem]">
          <p>11:30 AM</p>
          <p>Workshop : Building with AI</p>
        </div>
        <div className="grid grid-cols-[1fr_2fr] bg-white border border-transparent rounded-md p-[0.5rem] mt-[0.5rem]">
          <p>2:00 PM</p>
          <p>Panel : Fullstack careers</p>
        </div>
        <div className="grid grid-cols-[1fr_2fr] bg-white border border-transparent rounded-md p-[0.5rem] mt-[0.5rem]">
          <p>4:30 PM</p>
          <p>Closing & after-party</p>
        </div>
        <p className="mt-[1rem] font-bold">Speaker Info</p>
        <p className="text-black font-semibold">
          Our keynote speaker is Amara Nwosu, Senior Engineer at Google with
          over 10 years of experience building scalable systems across Africa
          and Europe. She has led teams that have shipped products used by
          millions, and is passionate about growing the next generation of
          African engineers. At Tech Meetup 2026, she will be sharing insights
          on building production-ready APIs and navigating a global tech career
          from Lagos
        </p>
      </section>
      <UserForm attendees={attendees} handleRegister={handleRegister} />
    </div>
  );
};

export default UserPage;
