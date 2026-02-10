import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <section id="contact" className="section-spacing bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ContactInfo />
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
