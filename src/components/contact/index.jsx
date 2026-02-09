import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactFormDecorations from "./ContactDecorations";

const Contact = () => {
  return (
    <>
      <section id="contact" className="relative z-10 overflow-hidden bg-white py-20 lg:py-[120px] mx-auto px-4">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap lg:justify-between">
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
              <ContactInfo />
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="relative rounded-lg bg-white p-8 shadow-lg-2 sm:p-12">
                <ContactForm />
                <ContactFormDecorations />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
