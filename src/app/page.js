import dynamic from "next/dynamic";
import Features from "@/components/Features";
import Hero from "@/components/hero";
import Team from "@/components/team";
import Cta from "@/components/cta";
import FeaturedBlogs from "@/components/blog";

const Video = dynamic(() => import("@/components/video"));
const Testimonial = dynamic(() => import("../components/testimonial"));
const Projects = dynamic(() => import("@/components/projects"));
const Contact = dynamic(() => import("@/components/contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Projects />
      <Video />
      <Testimonial />
      <Team />
      <FeaturedBlogs />
      <Cta />
      <Contact />
    </>
  );
}
