"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

import ModalVideo from "react-modal-video";

const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative z-10 py-8 md:py-10 lg:py-14 flex justify-center">
      <div className="container">
        <SectionTitle
          title="We are ready to help"
          paragraph="We are a passionate team of developers, designers, and problem-solvers building impactful digital products. As a fresh tech startup, we bring energy, agility, and innovation to every project. Our goal is to help businesses thrive in the digital age with smart software solutions."
          center
          mb="80px"
        />

        <div className="flex">
          <div className="w-full">
            <div
              className="mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <Image src="/images/video/video.jpg" alt="video image" fill />
                <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                  <button
                    aria-label="video play button"
                    onClick={() => setOpen(true)}
                    className="flex h-[70px] w-[70px] items-center justify-center cursor-pointer z-10 rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                  >
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      className="fill-current"
                    >
                      <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="absolute h-full w-full flex items-center justify-center">
      <ModalVideo
        allowFullScreen
        channel="youtube"
        autoplay={true}
        start={true}
        isOpen={isOpen}
        videoId="jDLuJLoaA_g"
        onClose={() => setOpen(false)}
      />
    </div>

      <div className="absolute bottom-0 left-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
