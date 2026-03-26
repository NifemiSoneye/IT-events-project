import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-[#111315] p-[1rem] flex-col items-center justify-center flex text-white font-semibold text-sm relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-green-400 opacity-40 blur-md"></div>
      <p>&copy; 2025 TechMeetup April 28th 2026</p>
      <p>Built with React , Tailwind and Typescript</p>
      <div className="flex justify-center gap-6 mt-6">
        <a
          href="https://github.com/NifemiSoneye"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="text-2xl hover:text-green-400 transition-colors" />
        </a>
        <a
          href="https://www.linkedin.com/in/nifemi-soneye-07269b347/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="text-2xl hover:text-green-400 transition-colors" />
        </a>
        <a href="https://x.com/AFCNIFEMI" target="_blank" rel="noreferrer">
          <FaTwitter className="text-2xl hover:text-green-400 transition-colors" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
