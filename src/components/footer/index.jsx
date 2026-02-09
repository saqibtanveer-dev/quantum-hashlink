"use client";
import Image from "next/image";
import Link from "next/link";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterLinks from "./FooterLinks";
import FooterDecorations from "./FooterDecorations";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white pt-16 md:pt-20 lg:pt-24 px-4 lg:px-20 flex justify-center">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-8 flex items-start">
                  <Image
                    src="/qhl_logo.png"
                    alt="Quantum HashLink Logo"
                    width={80}
                    height={80}
                  />
                  <p className="mt-[15px] font-bold">Quantum_HashLink</p>
                </Link>
                <p className="mb-9 text-base leading-relaxed text-body-color">
                  Jadoon Hostel, University Road, Near University Of Haripur.
                </p>
                <FooterSocialLinks />
              </div>
            </div>
            <FooterLinks />
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent"></div>
        </div>
        <FooterDecorations />
      </footer>
    </>
  );
};

export default Footer;
