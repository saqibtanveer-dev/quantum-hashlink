import Image from "next/image";
import Customtypewriter from "./Customtypewriter";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative flex justify-center z-10 overflow-hidden bg-gradient-to-br from-white via-pink-50 to-primary pb-16 pt-[100px] md:pb-[120px] md:pt-[200px] xl:pb-[180px] xl:pt-[100px] 2xl:pb-[200px] 2xl:pt-[110px]"
      >
        <div className="container px-4 sm:px-12 lg:px-8 py-20">
          <div className="flex flex-wrap">
            <div className="w-full px-4 grid grid-cols-1 gap-y-8 sm:gap-y-12 sm:grid-cols-2 sm:px-0 place-items-center lg:place-items-center">
              <div className="max-w-[600px] text-start">
                <h1 className="mb-5 text-3xl text-center sm:text-left font-bold leading-tight text-black sm:leading-tight md:text-4xl lg:text-5xl md:leading-tight">
                  Quantum HashLink |<br />
                  <Customtypewriter
                    words={[
                      "Innovative Solutions",
                      "Secure Transactions",
                      "AI-Powered Systems",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </h1>
                <p className="mb-12 w-96 sm:w-auto text-center sm:justify-center sm:text-left px-8 sm:px-0 text-base !leading-relaxed text-gray-900 sm:text-lg md:text-xl">
                  We build modern, scalable, and efficient software tailored to
                  your business goals. From startups to enterprises — we craft
                  technology that grows with you.
                </p>
                <div className="sm:flex justify-center sm:justify-start gap-4 hidden">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition bg-primary rounded-md hover:bg-opacity-90"
                  >
                    Get Started
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition"
                  >
                    Explore Services
                  </a>
                </div>
              </div>
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[500px] lg:h-[500px] col-span-1 lg:block -mt-12 sm:mt-0">
                <Image src="/images/hero/9796308.png" alt="Hero illustration" fill />
              </div>
            </div>
          </div>
        </div>
        <HeroBackground />
      </section>
    </>
  );
};

export default Hero;
