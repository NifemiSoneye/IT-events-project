import React, { useEffect } from "react";
import { useState } from "react";
import { type Attendee } from "./types";
import Attendees from "./Attendees";
interface userProps {
  attendees: Attendee[];
  handleRegister: (formData: Omit<Attendee, "id">) => void;
}

const UserForm = ({ attendees, handleRegister }: userProps) => {
  const USERNAME_REGEX = /^[A-Za-z]{2,}(\s[A-Za-z]{2,})*$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^(?:\+234|0)[789][01]\d{8}$/;
  const arrowIcon = new URL("./assets/right-arrow.png", import.meta.url).href;
  const [formData, setFormData] = useState<Omit<Attendee, "id">>({
    username: "",
    phoneNumber: "",
    email: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(formData);
    setFormData({
      username: "",
      email: "",
      phoneNumber: "",
    });
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
    <div className="min-h-screen pt-[1rem]  bg-slate-300 ">
      <div className="px-[1rem]">
        <h1 className="text-center text-3xl font-bold">Register</h1>
        <p className="font-semibold text-xl my-[1rem]">
          Secure your spot here :
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-[1rem] border border-transparent rounded-xl"
        >
          <div className="flex flex-col mb-[1rem]">
            <div className="flex justify-between">
              <label
                htmlFor="full name"
                className="text-gray-500 text-xl font-semibold"
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
                Enter a valid name
              </p>
            </div>
            <input
              type="text"
              required
              placeholder="Your name"
              className={`bg-gray-200 p-[0.5rem] rounded-lg border outline-none focus:outline-none ${
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
                className="text-gray-500 text-xl font-semibold"
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
                Enter a valid Email
              </p>
            </div>
            <input
              type="text"
              required
              placeholder="you@gmail.com"
              className={`bg-gray-200 p-[0.5rem] rounded-lg border outline-none focus:outline-none ${
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
                className="text-gray-500 text-xl font-semibold"
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
                Enter a valid Phone Number
              </p>
            </div>
            <input
              type="text"
              required
              placeholder="+234"
              className={`bg-gray-200 p-[0.5rem] rounded-lg border outline-none focus:outline-none ${
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
            Register Now{" "}
            <span>
              <img
                src={arrowIcon}
                alt="arrow"
                className="h-[30px] w-[30px] pt-[0.25rem] "
              />
            </span>
          </button>
        </form>
      </div>
      <Attendees attendees={attendees} />
    </div>
  );
};

export default UserForm;
