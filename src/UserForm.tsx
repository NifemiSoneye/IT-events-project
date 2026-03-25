import React, { useEffect } from "react";
import { useState } from "react";
import { type Attendee } from "./types";

interface userProps {
  attendees: Attendee[];
  handleRegister: (formData: Omit<Attendee, "id">) => void;
}

const UserForm = ({ attendees, handleRegister }: userProps) => {
  const USERNAME_REGEX = /^[A-Za-z]{3,20}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^(?:\+234|0)[789][01]\d{8}$/;
  const arrowIcon = new URL("./assets/right-arrow.png", import.meta.url).href;
  const [formData, setFormData] = useState<Omit<Attendee, "id">>({
    username: "",
    phoneNumber: "",
    email: "",
  });
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validUsername, setValidUsername] = useState<boolean>(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(formData);
    setFormData({
      username: "",
      email: "",
      phoneNumber: "",
    });
  };
  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(formData.username));
    setValidEmail(EMAIL_REGEX.test(formData.email));
    setValidPhoneNumber(PHONE_REGEX.test(formData.phoneNumber));
  }, [formData.username, formData.email, formData.phoneNumber]);
  let canSubmit;

  if (validUsername && validPhoneNumber && validEmail) {
    canSubmit = true;
  } else {
    canSubmit = false;
  }
  return (
    <div className="min-h-screen mt-[1rem]">
      <h1 className="text-center text-3xl font-bold">Register</h1>
      <p className="font-semibold text-xl my-[1rem]">Secure your spot here :</p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-[1rem] border border-transparent rounded-xl"
      >
        <div className="flex flex-col mb-[1rem]">
          <label htmlFor="full name" className="text-gray-500 text-xl">
            Full name
          </label>
          <input
            type="text"
            required
            placeholder="Your name"
            className="bg-gray-200 p-[0.5rem] border border-transparent rounded-lg"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-[1rem]">
          <label htmlFor="email" className="text-gray-500 text-xl">
            Email Address
          </label>
          <input
            type="text"
            required
            placeholder="you@gmail.com"
            className="bg-gray-200 p-[0.5rem] border border-transparent rounded-lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-[1rem]">
          <label htmlFor="full name" className="text-gray-500 text-xl">
            Phone Number
          </label>
          <input
            type="text"
            required
            placeholder="+234"
            className="bg-gray-200 p-[0.5rem] border border-transparent rounded-lg"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </div>
        <button
          className="bg-green-500 flex items-center justify-center text-[1.5rem] border border-transparent rounded-3xl p-[0.5rem] mb-[1rem] w-[100%]"
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
  );
};

export default UserForm;
