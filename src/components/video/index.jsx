"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import "react-modal-video/css/modal-video.css";
import ModalVideo from "react-modal-video";

const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="section-spacing bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          subtitle="About Us"
          title="We Are Ready to Help"
          paragraph="We are a passionate team of developers, designers, and problem-solvers building impactful digital products. Our goal is to help businesses thrive in the digital age with smart software solutions."
          center
        />

        <div className="relative mx-auto max-w-[770px] overflow-hidden rounded-xl shadow-sm">
          <div className="relative aspect-video">
            <Image src="/images/video/video.jpg" alt="Quantum HashLink team introduction video" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                aria-label="Play video"
                onClick={() => setOpen(true)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition hover:bg-white hover:scale-110"
              >
                <svg width="16" height="18" viewBox="0 0 16 18" className="ml-1 fill-current">
                  <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalVideo
        allowFullScreen
        channel="youtube"
        autoplay={true}
        start={true}
        isOpen={isOpen}
        videoId="jDLuJLoaA_g"
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default Video;
