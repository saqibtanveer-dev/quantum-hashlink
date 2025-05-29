"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import { EffectCoverflow, Pagination, Mousewheel } from "swiper/modules";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";

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
      "We hired Quantum Hashlink to modernize our internal logistics platform, and they exceeded expectations. The team’s deep knowledge of Next.js and React saved us months of development time and gave us a far more scalable codebase.",
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

export default function TestimonialSlider() {
  return (
    <section className="py-8 md:py-10 lg:py-14">
      <div>
        <SectionTitle
          title="Don't take our words, take theirs"
          paragraph=""
          center={true}
          mb="0px"
        />
      </div>

      <Swiper
        effect="coverflow"
        grabCursor
        mousewheel
        initialSlide={1}
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination
        modules={[EffectCoverflow, Pagination, Mousewheel]}
        className="mySwiper container"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
          <div className="bg-pink-500 py-4 px-6 rounded-md h-[400px] text-white flex flex-col justify-center text-center items-center">
            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
            <p className="text-xs">{testimonial.designation}</p>
            <p className="mt-4 px-4 text-justify">
              {testimonial.message}
            </p>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
