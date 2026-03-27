import UserForm from "./UserForm";
import { type Attendee } from "./types";
import About from "./About";

interface userProps {
  attendees: Attendee[];
  handleRegister: (formData: Omit<Attendee, "id">) => void;
}
const UserPage = ({ attendees, handleRegister }: userProps) => {
  const arrowIcon = new URL("./assets/right-arrow.png", import.meta.url).href;

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
          Register Now
        </a>
        <a
          href=""
          className="flex items-center text-white justify-center text-[1.5rem] border border-white rounded-3xl p-[0.5rem] mt-[1.5rem]"
        >
          Learn More
        </a>
      </section>
      <About />
      <UserForm attendees={attendees} handleRegister={handleRegister} />
    </div>
  );
};

export default UserPage;
