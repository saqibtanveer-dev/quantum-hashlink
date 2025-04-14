"use client";
import Link from "next/link";
import React from "react";

const Cta = () => {
  return (
    <section className="relative overflow-hidden bg-primary text-white py-8 md:py-16 lg:py-24">
      {/* Decorative SVG Backgrounds */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute -top-20 -left-20 w-[300px] opacity-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            d="M46.2,-68.1C57.8,-60.3,64.7,-45.3,68.4,-30.6C72.1,-15.8,72.6,-1.3,66.8,10.9C61.1,23.1,49.2,32.9,37.1,43.5C25.1,54.1,12.5,65.4,-1.6,67.3C-15.6,69.1,-31.1,61.6,-45.5,51.1C-60,40.6,-73.3,27.1,-74.2,13.1C-75.2,-1,-63.7,-15.5,-52.3,-26.5C-40.9,-37.4,-29.6,-44.8,-17.3,-53.2C-5,-61.5,8.4,-70.1,22.8,-71.2C37.1,-72.3,51.5,-65.8,46.2,-68.1Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="absolute bottom-0 right-0 w-[300px] opacity-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            d="M45.4,-59.5C59.5,-47.3,71.7,-34.3,76.3,-19.2C81,-4,78.1,13.1,68.3,27.4C58.5,41.8,41.7,53.5,24.1,60.3C6.5,67,-12,68.8,-28.5,62.7C-44.9,56.6,-59.2,42.7,-67.4,26.1C-75.6,9.5,-77.6,-10,-69.2,-26.4C-60.9,-42.9,-42.2,-56.3,-23.3,-64.8C-4.3,-73.4,14.8,-77.1,31.9,-70.7C49.1,-64.4,64.4,-48.9,45.4,-59.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Let’s Build Something <br className="hidden md:block" />
          Great Together
        </h2>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Get in touch with us to start your project or schedule a free consultation. We’re here to turn your vision into reality.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="#"
            className="inline-block bg-white text-primary px-6 py-3 rounded-md text-base font-semibold hover:bg-opacity-90 transition-all"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="inline-block border-2 border-white text-white px-6 py-3 rounded-md text-base font-semibold hover:bg-white hover:text-primary transition-all"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
