"use server";
import { contactSchema } from "./schema";
import { Resend } from "resend";

export async function sendEmail(preState, formData) {
  try {
  const formDataObj = Object.fromEntries(formData);
  const validateData = contactSchema.safeParse(formDataObj);

  if (!validateData.success) {
    const { name, email, phone, message } =
      validateData.error.flatten().fieldErrors;

    return {
      success: "",
      errors: {
        name,
        email,
        phone,
        message,
      },
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "quantumhashlink@gmail.com",
    subject: `${formDataObj.name} want to contact quantum`,
    html: `<p>Congrats on sending your <strong>first email</strong>!</p>`,
  });

  return {
    success: "done",
  };
} catch (error) {
  return {
    success: "",
    errors: {
      name: "",
      email: "",
      phone: "",
      message: "Something went wrong!",
    },
  };
}
}
