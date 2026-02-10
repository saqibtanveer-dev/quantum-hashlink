"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
            setPending(false);
            setState({
              success: "Your message has been sent!",
              errors: initialState.errors,
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
          },
          () => {
            setPending(false);
            setState({
              success: false,
              errors: initialState.errors,
            });
          }
        );
    } catch {
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
    <form onSubmit={sendEmail} className="space-y-5">
      <FormField label="Name" error={state.errors.name}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={state.errors.name ? "border-destructive" : ""}
        />
      </FormField>
      <FormField label="Email" error={state.errors.email}>
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={state.errors.email ? "border-destructive" : ""}
        />
      </FormField>
      <FormField label="Phone" error={state.errors.phone}>
        <Input
          type="number"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          className={state.errors.phone ? "border-destructive" : ""}
        />
      </FormField>
      <FormField label="Message" error={state.errors.message}>
        <Textarea
          rows={6}
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className={`resize-none ${state.errors.message ? "border-destructive" : ""}`}
        />
      </FormField>

      <p className="text-sm text-muted-foreground">
        If you are here to apply for a course, please do it on our{" "}
        <Link className="font-bold text-primary underline" href="/enrollment">
          enrollment
        </Link>{" "}
        page.
      </p>

      <div>
        <Button type="submit" className="w-full" size="lg" disabled={pending}>
          {state.success && <CheckCircle className="size-5 text-green-400" />}
          {pending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            "Send Message"
          )}
        </Button>
        {state.success && (
          <p className="mt-4 text-center text-sm text-green-600">{state.success}</p>
        )}
        {state.success === false && (
          <p className="mt-4 text-center text-sm text-destructive">Something went wrong!</p>
        )}
      </div>
    </form>
  );
}

export default ContactForm;

const FormField = ({ label, error, children }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {children}
    {error && <p className="text-sm text-destructive">{error}</p>}
  </div>
);
