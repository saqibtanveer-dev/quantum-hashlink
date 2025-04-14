"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import {
  EffectCoverflow,
  Pagination,
  Mousewheel,
} from "swiper/modules";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";

export default function App() {
  return (
    <section className="py-8 md:py-10 lg:py-14">
    <div>
      <SectionTitle title="Don't take our words, take there's" paragraph="" center={true} mb="0px" />
    </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        mousewheel={true}
        initialSlide={1}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Mousewheel]}
        className="mySwiper container"
      >
        <SwiperSlide>
          <div className="bg-pink-500 py-4 px-6 rounded-md h-[400px] text-white flex flex-col text-center items-center">
            {/* <div className='absolute w-full h-full top-0 left-0 rounded-xl bg-gradient-to-r from-transparent to-gray-800 opacity-25'/> */}
            <Image
              width={124}
              height={80}
              src="/images/testimonial/1.webp"
              alt="img"
              className="w-16 h-16 rounded-full mb-4 shadow-md"
            />
            <h3 className="text-xl font-semibold">Ahmed</h3>
            <p className="text-xs">Small Business Owner</p>
            <p className="mt-4">
              Working with this team felt like having our own in-house
              developers. They understood our vision and delivered a clean,
              fast, and modern solution.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-pink-500 py-4 px-6 rounded-md h-[400px] text-white flex flex-col text-center items-center pt-12">
            {/* <div className='absolute w-full h-full top-0 left-0 rounded-xl bg-gradient-to-r from-transparent to-gray-800 opacity-25'/> */}
            <Image
              width={124}
              height={80}
              src="/images/testimonial/2.webp"
              alt="img"
              className="w-16 h-16 rounded-full mb-4 shadow-md"
            />
            <h3 className="text-xl font-semibold">John</h3>
            <p className="text-xs">Startup Founder</p>
            <p className="mt-4">
              They built our mobile app quickly and handled everything from
              design to deployment. The UI was smooth, and performance exceeded
              expectations
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-pink-500 py-4 px-6 rounded-md h-[400px] text-white flex flex-col text-center items-center pt-12">
            {/* <div className='absolute w-full h-full top-0 left-0 rounded-xl bg-gradient-to-r from-transparent to-gray-800 opacity-25'/> */}
            <Image
              width={124}
              height={80}
              src="/images/testimonial/3.webp"
              alt="img"
              className="w-16 h-16 rounded-full mb-4 shadow-md"
            />
            <h3 className="text-xl font-semibold">David</h3>
            <p className="text-xs">Product Manager</p>
            <p className="mt-4">
              We needed custom software for internal operations, and they nailed
              it. Great communication, timely delivery, and excellent
              post-launch support.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-pink-500 py-4 px-6 rounded-md h-[400px] text-white flex flex-col text-center items-center pt-12">
            {/* <div className='absolute w-full h-full top-0 left-0 rounded-xl bg-gradient-to-r from-transparent to-gray-800 opacity-25'/> */}
            <Image
              width={124}
              height={80}
              src="/images/testimonial/3.webp"
              alt="img"
              className="w-16 h-16 rounded-full mb-4 shadow-md"
            />
            <h3 className="text-xl font-semibold">Hira</h3>
            <p className="text-xs">Marketing Lead</p>
            <p className="mt-4">
              Professional, talented, and dedicated. Their attention to detail
              and ability to turn ideas into reality helped us launch with
              confidence.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
