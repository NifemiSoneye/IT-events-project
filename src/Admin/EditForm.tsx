import { type Attendee } from "../types";
import { useParams } from "react-router-dom";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAttendeeQuery } from "../features/attendees/attendeesApiSlice";
import { selectAllAttendees } from "../features/attendees/attendeesApiSlice";
import { useUpdateAttendeeMutation } from "../features/attendees/attendeesApiSlice";
import { ClipLoader } from "react-spinners";
const EditForm = () => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 50 }, // start off invisible & below
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  useGetAttendeeQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const attendees = useSelector(selectAllAttendees);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.05,
  });
  const USERNAME_REGEX = /^[A-Za-z]{3,}(\s[A-Za-z]{2,})*$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^(?:\+234|0)[789][01]\d{8}$/;
  const { id } = useParams();
  const attendee = attendees.find((a) => a.id === id);

  const [updateAttendee, { isLoading }] = useUpdateAttendeeMutation();
  const [username, setUsername] = useState(attendee?.username ?? "");
  const [email, setEmail] = useState(attendee?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(attendee?.phoneNumber ?? "");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef<HTMLDivElement>(null);
  const validUsername = USERNAME_REGEX.test(username);
  const validEmail = EMAIL_REGEX.test(email);
  const validPhoneNumber = PHONE_REGEX.test(phoneNumber);

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
  let canSubmit;

  if (validUsername && validPhoneNumber && validEmail) {
    canSubmit = true;
  } else {
    canSubmit = false;
  }

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateAttendee({ id, username, email, phoneNumber }).unwrap();
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      navigate("/admin");
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
  if (!attendee) return <p>Attendee not found</p>;
  return (
    <div className="min-h-screen py-[1rem]  bg-[#303030] text-white ">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="px-[1rem] flex justify-center items-center flex-col">
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
          <h1 className="text-center text-3xl font-bold">Edit attendee</h1>
          <p className="font-semibold text-xl my-[1rem]">
            Edit selected attendee :
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-[#515151] p-[1rem] border border-transparent rounded-xl lg:w-[35vw] w-full md:w-[70vw]"
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
                  Enter a valid name
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
                  Enter a valid Email
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
                canSubmit && !isLoading
                  ? "bg-green-500 flex items-center justify-center text-[1.5rem] border border-transparent rounded-3xl p-[0.5rem] mb-[1rem] w-[100%]"
                  : "bg-green-300 flex items-center justify-center text-[1.5rem] border border-transparent rounded-3xl p-[0.5rem] mb-[1rem] w-[100%]"
              }
              disabled={!canSubmit || isLoading}
            >
              {isLoading ? <ClipLoader color={"#FFF"} /> : "Edit Attendee"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditForm;
