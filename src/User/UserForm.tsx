import { useState } from "react";
import { type Attendee } from "../types";
import Attendees from "./Attendees";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
interface userProps {
  attendees: Attendee[];
  handleRegister: (formData: Omit<Attendee, "id" | "createdAt">) => void;
}
const successIcon = new URL("../assets/icon-thank-you.svg", import.meta.url)
  .href;
const UserForm = ({ attendees, handleRegister }: userProps) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 50 }, // start off invisible & below
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.05,
  });
  const USERNAME_REGEX = /^[A-Za-z]{3,}(\s[A-Za-z]{2,})*$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^(?:\+234|0)[789][01]\d{8}$/;
  const [formData, setFormData] = useState<Omit<Attendee, "id" | "createdAt">>({
    username: "",
    phoneNumber: "",
    email: "",
  });
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(formData);
    setFormData({
      username: "",
      email: "",
      phoneNumber: "",
    });
    setSuccess(true);
  };
  const validUsername = USERNAME_REGEX.test(formData.username);
  const validEmail = EMAIL_REGEX.test(formData.email);
  const validPhoneNumber = PHONE_REGEX.test(formData.phoneNumber);
  let canSubmit;

  if (validUsername && validPhoneNumber && validEmail) {
    canSubmit = true;
  } else {
    canSubmit = false;
  }
  return (
    <>
      <div className="bg-[#303030]">
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div
            className="px-[1rem] flex justify-center flex-col items-center py-[1rem]  bg-[#303030] text-white min-h-fit 
          "
            id="register"
          >
            <h1 className="text-center text-3xl font-bold">Register</h1>
            <p className="font-semibold text-xl my-[1rem]">
              Secure your spot here :
            </p>
            <form
              onSubmit={handleSubmit}
              className="bg-[#515151] p-[1rem] border border-transparent rounded-xl lg:w-[30vw] md:w-[70vw] w-full"
            >
              <div className="flex flex-col mb-[1rem]">
                <div className="flex justify-between">
                  <label
                    htmlFor="full name"
                    className="text-white text-xl font-semibold"
                  >
                    Full name
                  </label>
                  <p
                    className={
                      !validUsername && formData.username.length > 0
                        ? "text-red-500 text-md font-semibold"
                        : "hidden"
                    }
                  >
                    Invalid name
                  </p>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className={`bg-gray-200 p-[0.5rem] rounded-lg border outline-none focus:outline-none text-black font-semibold ${
                    !validUsername && formData.username.length > 0
                      ? "border-red-600 focus:border-red-600"
                      : formData.username.length === 0
                        ? "border-transparent"
                        : "border-green-500"
                  }`}
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col mb-[1rem]">
                <div className="flex justify-between">
                  <label
                    htmlFor="full name"
                    className="text-white text-xl font-semibold"
                  >
                    Email Address
                  </label>
                  <p
                    className={
                      !validEmail && formData.email.length > 0
                        ? "text-red-500 text-md font-semibold"
                        : "hidden"
                    }
                  >
                    Invalid Email
                  </p>
                </div>
                <input
                  type="text"
                  required
                  placeholder="you@gmail.com"
                  className={`bg-gray-200 p-[0.5rem] rounded-lg border outline-none focus:outline-none text-black font-semibold ${
                    !validEmail && formData.email.length > 0
                      ? "border-red-600 focus:border-red-600"
                      : formData.email.length === 0
                        ? "border-transparent"
                        : "border-green-500"
                  }`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col mb-[1rem]">
                <div className="flex justify-between">
                  <label
                    htmlFor="full name"
                    className="text-white text-xl font-semibold"
                  >
                    Phone Number
                  </label>
                  <p
                    className={
                      !validPhoneNumber && formData.phoneNumber.length > 0
                        ? "text-red-500 text-md font-semibold text-nowrap"
                        : "hidden"
                    }
                  >
                    Invalid Phone Number
                  </p>
                </div>
                <input
                  type="text"
                  required
                  placeholder="+234"
                  className={`bg-gray-200 p-[0.5rem] rounded-lg border outline-none focus:outline-none text-black font-semibold ${
                    !validPhoneNumber && formData.phoneNumber.length > 0
                      ? "border-red-600 focus:border-red-600"
                      : formData.phoneNumber.length === 0
                        ? "border-transparent"
                        : "border-green-500"
                  }`}
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>
              <button
                className={
                  canSubmit
                    ? "bg-green-500 flex items-center justify-center text-[1.5rem] border border-transparent rounded-3xl p-[0.5rem] mb-[1rem] w-[100%]"
                    : "bg-green-300 flex items-center justify-center text-[1.5rem] border border-transparent rounded-3xl p-[0.5rem] mb-[1rem] w-[100%]"
                }
                disabled={!canSubmit}
              >
                Register Now
              </button>
            </form>
            {success && (
              <div
                className="fixed inset-0 z-30 bg-black/50 flex justify-center items-center"
                onClick={() => setSuccess(false)}
              >
                <div
                  className="bg-[#303030] rounded-xl p-8 flex flex-col items-center gap-4 text-white max-w-sm w-[90vw]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={successIcon} alt="success" className="h-16 w-16" />
                  <h2 className="text-2xl font-bold">You're registered!</h2>
                  <p className="text-gray-400 text-center">
                    See you at the meetup 🎉
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-green-600 px-6 py-2 rounded-3xl font-semibold hover:bg-green-700 w-full"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
          <Attendees attendees={attendees} />
        </motion.div>
      </div>
    </>
  );
};

export default UserForm;
