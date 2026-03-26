import { type Attendee } from "./types";
interface attendeeProps {
  attendees: Attendee[];
}

const Attendees = ({ attendees }: attendeeProps) => {
  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    return `${local.slice(0, 3)}***@${domain}`;
  };
  const getInitials = (fullName: string): string => {
    // Trim leading/trailing spaces and split the string by one or more spaces
    const namesArray = fullName.trim().split(/\s+/);

    if (namesArray.length === 0) {
      return "";
    }

    // Get the first initial
    let initials = namesArray[0].charAt(0).toUpperCase();

    // If there is more than one name, get the last initial
    if (namesArray.length > 1) {
      initials += namesArray[namesArray.length - 1].charAt(0).toUpperCase();
    }

    return initials;
  };
  return (
    <div className="bg-white mt-[2rem] p-[1rem]">
      <h1 className="text-center font-bold text-3xl">Attendees</h1>
      <p className="font-semibold text-xl">Wanna Know Who else is coming?</p>
      <p className="font-semibold text-xl">
        <span>{attendees.length}</span> people registered:
      </p>
      {attendees.length > 0 ? (
        attendees.map((a) => (
          <div
            key={a.id}
            className="bg-gray-200 p-[0.5rem] rounded-lg border outline-none focus:outline-none my-[1rem]"
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
        <p className="font-semibold text-md mt-5">Be the first to register!!</p>
      )}
    </div>
  );
};

export default Attendees;
