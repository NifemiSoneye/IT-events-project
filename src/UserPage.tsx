import UserForm from "./UserForm";
import { type Attendee } from "./types";
import About from "./About";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
interface userProps {
  attendees: Attendee[];
  handleRegister: (formData: Omit<Attendee, "id" | "createdAt">) => void;
}
const UserPage = ({ attendees, handleRegister }: userProps) => {
  const name: string[] = "Tech Meetup 2026".split("");
  const heroImg = new URL("./assets/hero-image.jpg", import.meta.url).href;

  return (
    <div className=" min-h-screen ">
      <section className="min-h-screen pt-[3rem]  bg-[#121212] px-[1rem] lg:grid  lg:pb-[20vh] grid-cols-[1.5fr_1fr] lg:px-[1.5rem]">
        <div className="lg:mr-[10vw]">
          <p className="text-green-700 py-[2rem] text-[1rem] font-semibold lg:text-[1.5rem]">
            Lagos Island , Lagos . April 28th 2026
          </p>
          <motion.h1 className="text-white text-[2rem] text-wrap lg:pr-[10rem] pb-[2rem] lg:text-[3rem]">
            {name.map((letter, index) => (
              <motion.span
                key={index}
                className=""
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1, // delay per letter
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-gray-500 font-bold pb-[1.5rem] lg:pb-3 lg:text-[1.5rem]">
            Connect with the sharpest minds in tech both home and abroad.
          </p>
          <p className="text-gray-500 font-bold pb-[1.5rem] lg:pb-3 lg:text-[1.5rem]">
            A 2 days retreat involving talks and real conversations.
          </p>
          <p className="text-gray-500 font-bold pb-[1.5rem] lg:text-[1.5rem]">
            Register now to book your place at the best tech meetup of the year
            . Dont miss out on this incredible opportunity.
          </p>
          <div className="lg:flex lg:items-center lg:mt-auto">
            <Link
              to={"register"}
              smooth={true}
              duration={1000}
              offset={-80}
              className="bg-green-700 flex items-center justify-center text-[1.5rem] border border-transparent rounded-3xl p-[0.5rem] mb-[1rem] lg:mb-0 lg:mr-[3vw] lg:min-w-[20vw] hover:cursor-pointer"
            >
              Register Now
            </Link>
            <Link
              to={"about"}
              smooth={true}
              duration={700}
              offset={-80}
              className="flex items-center text-white justify-center text-[1.5rem] border border-white rounded-3xl p-[0.5rem] mt-[1.5rem] lg:mt-0 lg:min-w-[20vw] hover:cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8, type: "spring" }}
        >
          <img
            src={heroImg}
            alt="hero"
            className="hidden lg:block w-[70vh] h-[70vh] object-cover border border-transparent rounded-full ml-[5vw]"
          />
        </motion.div>
      </section>
      <About />
      <UserForm attendees={attendees} handleRegister={handleRegister} />
    </div>
  );
};

export default UserPage;
