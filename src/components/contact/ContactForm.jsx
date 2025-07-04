"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { BiLoader } from "react-icons/bi";
import Link from "next/link";

const initialState = {
  success: "",
  errors: { name: "", email: "", phone: "", message: "" },
};

function ContactForm() {
  const form = useRef();
  const [state, setState] = useState(initialState);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [pending, setPending] = useState(false);

  const validate = (fieldValues = formData) => {
    const errors = { ...state.errors };

    if ("name" in fieldValues) {
      errors.name =
        fieldValues.name.trim().length < 3
          ? "Name must be at least 3 characters long"
          : "";
    }
    if ("email" in fieldValues) {
      errors.email = !fieldValues.email.includes("@") ? "Email is invalid" : "";
    }
    if ("phone" in fieldValues) {
      errors.phone =
        fieldValues.phone.trim().length < 7
          ? "Phone must be at least 7 digits"
          : "";
    }
    if ("message" in fieldValues) {
      errors.message =
        fieldValues.message.trim().length < 20
          ? "Message must be at least 20 characters"
          : "";
    }

    setState((prev) => ({ ...prev, errors }));
    return errors;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setPending(true);

    const errors = validate();
    if (Object.values(errors).some((msg) => msg)) {
      setPending(false);
      return;
    }

    try {
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          }
        )
        .then(
          () => {
            // console.log("SUCCESS!");
            setPending(false);
            setState({
              success: "Your message has been sent!",
              errors: initialState.errors,
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
          },
          (error) => {
            // console.log("FAILED...", error);
            setPending(false);
            setState({
              success: false,
              errors: initialState.errors,
            });
          }
        );
    } catch (err) {
      // console.error(err);
      setPending(false);
      setState({
        success: "Failed to send message. Try again.",
        errors: initialState.errors,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    validate({ [name]: value });
  };

  return (
    <form onSubmit={sendEmail}>
      <ContactInputBox
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        error={state.errors.name}
      />
      <ContactInputBox
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        error={state.errors.email}
      />
      <ContactInputBox
        type="number"
        name="phone"
        placeholder="Your Phone"
        value={formData.phone}
        onChange={handleChange}
        error={state.errors.phone}
      />
      <ContactTextArea
        row="6"
        placeholder="Your Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={state.errors.message}
      />
      <p className="pb-4 text-gray-700">If you are here to apply for a course, Please do it on our <Link className="text-blue-800 underline font-bold" href={'enrollment'}>enrollment</Link> page</p>
      <div>
        <button
          type="submit"
          className="w-full flex gap-4 justify-center rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
        >
          {state.success && (
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-green-600"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9 10L12.2581 12.4436C12.6766 12.7574 13.2662 12.6957 13.6107 12.3021L20 5"
                    stroke="#33363F"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M21 12C21 13.8805 20.411 15.7137 19.3156 17.2423C18.2203 18.7709 16.6736 19.9179 14.893 20.5224C13.1123 21.1268 11.187 21.1583 9.38744 20.6125C7.58792 20.0666 6.00459 18.9707 4.85982 17.4789C3.71505 15.987 3.06635 14.174 3.00482 12.2945C2.94329 10.415 3.47203 8.56344 4.51677 6.99987C5.56152 5.4363 7.06979 4.23925 8.82975 3.57685C10.5897 2.91444 12.513 2.81996 14.3294 3.30667"
                    stroke="#33363F"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </motion.div>
          )}
          {pending ? (
            <BiLoader className="animate-spin w-6 h-6" />
          ) : (
            "Send Message"
          )}
        </button>
        {state.success && (
          <p className="text-green-600 mt-4 text-center">{state.success}</p>
        )}
        {state.success === false && (
          <p className="text-red-600 mt-4 text-center">Something went wrong!</p>
        )}
      </div>
    </form>
  );
}

export default ContactForm;

const ContactTextArea = ({
  row,
  placeholder,
  name,
  value,
  onChange,
  error,
}) => (
  <div className="mb-6">
    <textarea
      rows={row}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
    />
    {error && <p className="text-red-700 text-sm my-2">{error}</p>}
  </div>
);

const ContactInputBox = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
}) => (
  <div className="mb-6">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full rounded border ${
        error ? "border-red-700" : "border-stroke"
      } px-[14px] py-3 text-base text-body-color outline-none focus:border-primary`}
    />
    {error && <p className="text-red-700 text-sm my-2 ml-2">{error}</p>}
  </div>
);
