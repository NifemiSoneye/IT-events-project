import { type Attendee } from "../types";
import { useParams } from "react-router-dom";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EditProps {
  attendees: Attendee[];
  handleEdit: (
    id: string,
    formData: Omit<Attendee, "id" | "createdAt">,
  ) => void;
}

const EditForm = ({ attendees, handleEdit }: EditProps) => {
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
  const { id } = useParams();
  const attendee = attendees.find((a) => a.id === Number(id));
  if (!attendee) return <p>Attendee not found</p>;
  const [formData, setFormData] = useState<Omit<Attendee, "id" | "createdAt">>({
    username: attendee.username,
    phoneNumber: attendee.phoneNumber,
    email: attendee.email,
  });
  const validUsername = USERNAME_REGEX.test(formData.username);
  const validEmail = EMAIL_REGEX.test(formData.email);
  const validPhoneNumber = PHONE_REGEX.test(formData.phoneNumber);
  let canSubmit;

  if (validUsername && validPhoneNumber && validEmail) {
    canSubmit = true;
  } else {
    canSubmit = false;
  }

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    handleEdit(id, formData);
    setFormData({
      username: "",
      email: "",
      phoneNumber: "",
    });
    navigate("/admin");
  };
  return (
    <div className="min-h-screen py-[1rem]  bg-[#303030] text-white ">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="px-[1rem] flex justify-center items-center flex-col">
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
                  Enter a valid Email
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
              Edit Attendee
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditForm;
