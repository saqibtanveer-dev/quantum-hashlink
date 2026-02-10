import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <section className="section-spacing bg-primary">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Let's Build Something Great Together
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          Get in touch with us to start your project or schedule a free consultation. We're here to turn your vision into reality.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-white text-base text-primary hover:bg-gray-50"
          >
            <Link href="/contact">
              Get Started
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-transparent text-base text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/#features">Explore Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
