import Blog from "@/components/blog";
import Features from "@/components/Features";
import Hero from "@/components/hero"
import Team from "@/components/team";
import Video from "@/components/video";
import Testimonial from "../components/testimonial";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Team />
      <Projects />
      <Video />
      <Blog />
      <Testimonial />
    </>
  );
}
