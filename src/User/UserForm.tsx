import { useState } from "react";
import { type Attendee } from "../types";
import Attendees from "./Attendees";
import { motion, useInView, type Variants } from "framer-motion";
import { useCreateAttendeeMutation } from "../features/attendees/attendeesApiSlice";
import { useRef } from "react";
import { create } from "framer-motion/m";
import { ClipLoader } from "react-spinners";
const successIcon = new URL("../assets/icon-thank-you.svg", import.meta.url)
  .href;
const UserForm = () => {
  const [createAttendee, { isLoading, isSuccess, isError, error }] =
    useCreateAttendeeMutation();
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
  const errRef = useRef<HTMLDivElement>(null);
  const USERNAME_REGEX = /^[A-Za-z]{3,}(\s[A-Za-z]{2,})*$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^(?:\+234|0)[789][01]\d{8}$/;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAttendee({ username, email, phoneNumber }).unwrap();
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setSuccess(true);
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef?.current?.focus();
    }
  };
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMsg("");
    setUsername(e.target.value);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMsg("");
    setEmail(e.target.value);
  };
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMsg("");
    setPhoneNumber(e.target.value);
  };
  const validUsername = USERNAME_REGEX.test(username);
  const validEmail = EMAIL_REGEX.test(email);
  const validPhoneNumber = PHONE_REGEX.test(phoneNumber);
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
            <p
              ref={errRef}
              className={
                errMsg
                  ? "inline-block bg-transparent text-[#b22222] p-1 mb-[0.5em] my-5 font-bold text-2xl"
                  : "hidden"
              }
              aria-live="assertive"
            >
              {errMsg}
            </p>
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
                      !validUsername && username.length > 0
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
                    !validUsername && username.length > 0
                      ? "border-red-600 focus:border-red-600"
                      : username.length === 0
                        ? "border-transparent"
                        : "border-green-500"
                  }`}
                  value={username}
                  onChange={handleUserInput}
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
                      !validEmail && email.length > 0
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
                    !validEmail && email.length > 0
                      ? "border-red-600 focus:border-red-600"
                      : email.length === 0
                        ? "border-transparent"
                        : "border-green-500"
                  }`}
                  value={email}
                  onChange={handleEmailInput}
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
                      !validPhoneNumber && phoneNumber.length > 0
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
                    !validPhoneNumber && phoneNumber.length > 0
                      ? "border-red-600 focus:border-red-600"
                      : phoneNumber.length === 0
                        ? "border-transparent"
                        : "border-green-500"
                  }`}
                  value={phoneNumber}
                  onChange={handlePhoneInput}
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
                {isLoading ? <ClipLoader color={"#FFF"} /> : "Register Now"}
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
          <Attendees />
        </motion.div>
      </div>
    </>
  );
};

export default UserForm;
