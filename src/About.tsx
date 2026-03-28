import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const groupImg = new URL("./assets/group.png", import.meta.url).href;
  const talkImg = new URL("./assets/talk.png", import.meta.url).href;
  const variants: Variants = {
    hidden: { opacity: 0, x: -50 }, // start off invisible & below
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.2,
  });
  return (
    <section
      className="min-h-screen bg-[#202020] px-[1rem] text-white py-3 "
      id="about"
    >
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="lg:grid grid-cols-[1.5fr_1fr]"
      >
        <div>
          <h1 className="text-center text-[2rem] font-semibold lg:text-left lg:text-[3rem]">
            ABOUT THE EVENT
          </h1>
          <div className="flex flex-col items-center my-[1rem] lg:hidden md:flex-row md:items-center md:justify-around">
            <img
              src={groupImg}
              alt="group"
              className="h-[200px] w-[300px] mb-[1rem] border border-black rounded-md md:mb-0"
            />
            <img
              src={talkImg}
              alt="group"
              className="h-[200px] w-[300px] border border-black rounded-md"
            />
          </div>
          <h2 className="text-center font-bold my-[1rem] lg:text-left lg:ml-10 lg:text-xl">
            Where builders meet and ideas land.
          </h2>
          <p className=" font-semibold lg:ml-10">
            This is a gathering for technology professionals and enthusiasts to
            network, share knowledge, and collaborate on topics like coding, AI,
            and startup growth
          </p>
          <p className="mt-[1rem] font-bold lg:ml-10">Agenda</p>
          <div className="grid grid-cols-[1fr_2fr] bg-[#393939] border border-transparent rounded-md p-[0.5rem] mt-[0.5rem] text-black lg:ml-10">
            <p className="text-green-500">9:00 AM</p>
            <p className="text-white">Registration & breakfast</p>
          </div>
          <div className="grid grid-cols-[1fr_2fr] bg-[#393939] border border-transparent rounded-md p-[0.5rem] mt-[0.5rem] text-black lg:ml-10">
            <p className="text-green-500">10:00 AM</p>
            <p className="text-white">Opening keynote</p>
          </div>
          <div className="grid grid-cols-[1fr_2fr] bg-[#393939] border border-transparent rounded-md p-[0.5rem] mt-[0.5rem] text-black lg:ml-10">
            <p className="text-green-500">11:30 AM</p>
            <p className="text-white">Workshop:Building with AI</p>
          </div>
          <div className="grid grid-cols-[1fr_2fr] bg-[#393939] border border-transparent rounded-md p-[0.5rem] mt-[0.5rem] text-black lg:ml-10">
            <p className="text-green-500">2:00 PM</p>
            <p className="text-white">Panel : Fullstack careers</p>
          </div>
          <div className="grid grid-cols-[1fr_2fr] bg-[#393939] border border-transparent rounded-md p-[0.5rem] mt-[0.5rem] text-black lg:ml-10">
            <p className="text-green-500">4:30 PM</p>
            <p className="text-white">Closing & after-party</p>
          </div>
          <p className="mt-[1rem] font-bold lg:ml-10">Speaker Info</p>
          <p className=" font-semibold lg:ml-10">
            Our keynote speaker is Amara Nwosu, Senior Engineer at Google with
            over 10 years of experience building scalable systems across Africa
            and Europe. She has led teams that have shipped products used by
            millions, and is passionate about growing the next generation of
            African engineers. At Tech Meetup 2026, she will be sharing insights
            on building production-ready APIs and navigating a global tech
            career from Lagos
          </p>
        </div>
        <div>
          <img
            src={talkImg}
            alt="group"
            className="border border-black rounded-2xl lg:object-cover w-[70vh] h-[85vh] hidden lg:block ml-[5vw] mt-[1rem] shadow-lg "
          />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
