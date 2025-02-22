"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const teamMembers = [
  { id: 1, name: "John Doe", role: "CEO", image: "/images/blog/blog-01.jpg", size: "large", linkedin: "#", twitter: "#", github: "#" },
  { id: 2, name: "Jane Smith", role: "CTO", image: "/images/blog/blog-01.jpg", size: "large", linkedin: "#", twitter: "#", github: "#" },
  { id: 3, name: "Michael Brown", role: "Lead Dev", image: "/images/blog/blog-01.jpg", size: "large", linkedin: "#", twitter: "#", github: "#" },
  { id: 4, name: "Emily Johnson", role: "Designer", image: "/images/blog/blog-01.jpg", size: "large", linkedin: "#", twitter: "#", github: "#" },
  { id: 5, name: "David Wilson", role: "Project Manager", image: "/images/blog/blog-01.jpg", size: "large", linkedin: "#", twitter: "#", github: "#" }
];

export default function Team() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount), behavior: "smooth" });
    }
  };

  useEffect(() => {
    // if(scrollRef && scrollRef.current){
    //   const { scrollLeft, clientWidth } = scrollRef.current;
    //   scrollRef.current.scrollTo({left: 40})
    // }
  })
  

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-light relative flex justify-center">
      <div className="container px-6 text-center">
        <SectionTitle
          title="Meet Our Team"
          paragraph="The creative minds behind Quantum"
          center
          mb="80px"
        />

      <div className="flex gap-8 justify-center items-start ">
      {/* ceo */}
      <div className="w-fit h-[35rem] flex flex-col items-center bg-white shadow-md rounded-lg py-6 lg:min-w-[40%]">
      {/* Left Side - Image */}
      <div className="px-4">
        <Image
          src="/images/blog/blog-01.jpg" // Replace with actual CEO image URL
          alt="CEO"
          width={600}
          height={600}
          className="rounded-md"
        />
      </div>

      {/* Right Side - Details */}
      <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left pt-4">
        <h2 className="text-2xl font-semibold text-gray-800">Professor Who </h2>
        <p className="text-lg text-gray-600">CEO, Quantum HashLink</p>
        <p className="text-sm text-gray-500 mt-2">
          A visionary leader with 15+ years in the tech industry, driving
          innovation and business growth.
        </p>
        <div className="flex justify-center md:justify-start space-x-4 mt-3">
          <a href="#"target="_blank" className="text-xl text-blue-400">
          <FaLinkedin />
          </a>
          <a href="#"target="_blank" className="text-xl text-blue-400">
          <FaTwitter />
          </a>
        </div>
      </div>
    </div>

        {/* Scrollable Team Container */}
        <div className="relative lg:max-w-[40%] h-[33rem]">

          {/* Scrollable Team Members */}
          <div ref={scrollRef} className="flex space-x-6 overflow-x-scroll no-scrollbar scroll-smooth pb-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className={`relative min-w-56 p-2 bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all 
                ${member.size === "large" ? "col-span-1 row-span-2 w-64 h-96" : 
                   member.size === "horizontal" ? "col-span-2 row-span-1 w-64 h-48" : 
                   member.size === "medium" ? "w-52 h-72" : 
                   "w-40 h-56"}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image */}
                <Image src={member.image} alt={member.name} width={500} height={400} className="object-right-top object-cover w-full h-full rounded-sm" />

                {/* Overlay + Social Icons */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-end opacity-0 hover:opacity-100 transition">
                  <div className="text-white text-lg font-bold">{member.name}</div>
                  <div className="text-gray-300 text-sm">{member.role}</div>
                  <div className="flex space-x-3 mt-2 mb-4">
                    <a href={member.linkedin} target="_blank" className="text-white text-xl hover:text-blue-400">
                      <FaLinkedin />
                    </a>
                    <a href={member.twitter} target="_blank" className="text-white text-xl hover:text-blue-400">
                      <FaTwitter />
                    </a>
                    <a href={member.github} target="_blank" className="text-white text-xl hover:text-blue-400">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Scrollable Team Members */}
          <div ref={scrollRef} className="flex space-x-6 overflow-x-scroll no-scrollbar scroll-smooth">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className={`relative min-w-56 p-2 bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all 
                ${member.size === "large" ? "col-span-1 row-span-2 w-64 h-36" : 
                   member.size === "horizontal" ? "col-span-2 row-span-1 w-64 h-48" : 
                   member.size === "medium" ? "w-52 h-72" : 
                   "w-40 h-56"}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image */}
                <Image src={member.image} alt={member.name} width={500} height={400} className="object-right-top object-cover w-full h-full rounded-sm" />

                {/* Overlay + Social Icons */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-end opacity-0 hover:opacity-100 transition">
                  <div className="text-white text-lg font-bold">{member.name}</div>
                  <div className="text-gray-300 text-sm">{member.role}</div>
                  <div className="flex space-x-3 mt-2 mb-4">
                    <a href={member.linkedin} target="_blank" className="text-white text-xl hover:text-blue-400">
                      <FaLinkedin />
                    </a>
                    <a href={member.twitter} target="_blank" className="text-white text-xl hover:text-blue-400">
                      <FaTwitter />
                    </a>
                    <a href={member.github} target="_blank" className="text-white text-xl hover:text-blue-400">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
