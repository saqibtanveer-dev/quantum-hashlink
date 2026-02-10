import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Customtypewriter from "./Customtypewriter";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-linear-to-b from-white via-gray-50 to-white pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <Badge variant="secondary" className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
              Software Development Studio
            </Badge>
            <h1 className="mb-6 min-h-[2.5em] text-4xl font-bold leading-tight text-gray-900 md:min-h-[2.5em] md:text-5xl lg:text-6xl">
              <Customtypewriter
                words={[
                  "Innovative Solutions",
                  "Secure Systems",
                  "AI-Powered Apps",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h1>
            <p className="mb-10 text-lg leading-relaxed text-body-color">
              We build modern, scalable, and efficient software tailored to
              your business goals. From startups to enterprises — we craft
              technology that grows with you.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="text-base">
                <Link href="#contact">
                  Get Started
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="#features">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:h-[460px] lg:w-[460px]">
            <Image src="/images/hero/9796308.png" alt="Quantum HashLink - Modern software development solutions" fill priority sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 460px" className="object-contain" />
          </div>
        </div>
      </div>
      <HeroBackground />
    </section>
  );
};

export default Hero;
