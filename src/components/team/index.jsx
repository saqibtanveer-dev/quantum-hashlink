"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import Image from "next/image";

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

  return (
    <section className="py-16 bg-gray-100 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Meet Our Team</h2>
        <p className="text-gray-600 mt-4">
          The creative minds behind <span className="font-semibold text-[#b5246c]">Quantum Hashlink</span>.
        </p>

      <div className="w-full max-w-[100%] mx-auto flex flex-col md:flex-row bg-white shadow-md rounded-lg py-6 mt-16">
      {/* Left Side - Image */}
      <div className="px-4">
        <Image
          src="/images/blog/blog-01.jpg" // Replace with actual CEO image URL
          alt="CEO"
          width={600}
          height={600}
          className=""
        />
      </div>

      {/* Right Side - Details */}
      <div className="flex-1 md:ml-6 mt-4 md:mt-0 text-center md:text-left pt-4">
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
        <div className="relative mt-10">
          {/* Left Scroll Button */}
          {/* <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-700 bg-white p-3 rounded-full shadow-md hover:bg-gray-200">
            <BsArrowLeftCircle size={30} />
          </button> */}

          {/* Scrollable Team Members */}
          <div ref={scrollRef} className="flex space-x-6 overflow-x-scroll no-scrollbar scroll-smooth px-10 py-4">
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
                <Image src={member.image} alt={member.name} width={500} height={400} className="object-right-top object-cover w-full h-full" />

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

          {/* Right Scroll Button */}
          {/* <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-700 bg-white p-3 rounded-full shadow-md hover:bg-gray-200">
            <BsArrowRightCircle size={30} />
          </button> */}
        </div>
      </div>
    </section>
  );
}
