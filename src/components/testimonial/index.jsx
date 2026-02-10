"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination, Autoplay } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SectionTitle from "../Common/SectionTitle";

const testimonials = [
  {
    name: "Sarah Collins",
    designation: "Startup Founder",
    message:
      "Quantum Hashlink turned our MVP idea into a fully functional product in just six weeks. Their communication was crystal clear, the code quality was impressive, and they understood the startup mindset better than any team we've worked with.",
  },
  {
    name: "Rohan Mehta",
    designation: "Product Manager",
    message:
      "We hired Quantum Hashlink to modernize our internal logistics platform, and they exceeded expectations. The team's deep knowledge of Next.js and React saved us months of development time and gave us a far more scalable codebase.",
  },
  {
    name: "Amina Yousuf",
    designation: "eCommerce Entrepreneur",
    message:
      "From UI/UX design to backend architecture, Quantum Hashlink delivered a seamless eCommerce experience for our brand. Our site speed and sales both improved drastically after launch.",
  },
  {
    name: "Daniel Kim",
    designation: "SaaS CTO",
    message:
      "The Quantum Hashlink team built us a custom AI dashboard integrated with multiple APIs and nailed it. Their ability to break down complex requirements into actionable, efficient code was exactly what we needed.",
  },
];

const QuoteIcon = () => (
  <svg className="mb-4 h-8 w-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

export default function TestimonialSlider() {
  return (
    <section className="section-spacing">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          subtitle="Testimonials"
          title="What Our Clients Say"
          paragraph="Real feedback from the teams and founders we have worked with."
          center
        />

        <Swiper
          grabCursor
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="testimonial-swiper pb-12!"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Card className="flex h-full flex-col border-gray-100 shadow-sm">
                <CardContent className="flex flex-1 flex-col p-6">
                  <QuoteIcon />
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-body-color">
                    {testimonial.message}
                  </p>
                  <Separator className="mb-5" />
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-xs text-body-color">{testimonial.designation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
