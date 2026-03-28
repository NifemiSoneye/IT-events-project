import { type Attendee } from "../types";
interface attendeeProps {
  attendees: Attendee[];
}
import { Link } from "react-router-dom";
import { getInitials } from "../utils";

const Attendees = ({ attendees }: attendeeProps) => {
  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    return `${local.slice(0, 3)}***@${domain}`;
  };
  return (
    <div
      className="bg-[#1a1a1a] pt-[2rem] p-[1rem] text-white lg:pb-5"
      id="attendees"
    >
      <h1 className="text-center font-bold text-3xl lg:text-left lg:text-4xl">
        Attendees
      </h1>
      <p className="font-semibold text-xl pt-3 lg:text-2xl">
        Who else is coming?
      </p>
      <p className="font-semibold text-xl">
        <span>{attendees.length}</span> people registered:
      </p>
      <div className="lg:grid lg:grid-cols-3 lg:gap-3">
        {attendees.length > 0 ? (
          attendees.map((a) => (
            <div
              key={a.id}
              className="bg-[#515151] p-[0.5rem] rounded-lg border  my-[1rem]"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white font-semibold flex-shrink-0 mx-5">
                  {getInitials(a.username)}
                </div>
                <div>
                  <p className="font-semibold text-md">{a.username}</p>
                  <p>{maskEmail(a.email)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="font-semibold text-md mt-5 lg:col-span-3 lg:text-lg">
            Be the first to register!!
          </p>
        )}
      </div>
      <Link to="/admin" className="text-gray-400 font-semibold hover:underline">
        Admin Page
      </Link>
    </div>
  );
};

export default Attendees;
