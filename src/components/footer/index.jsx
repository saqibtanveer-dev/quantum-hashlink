"use client";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white pb-8 pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-3">
              <Image
                src="/qhl_logo.png"
                alt="Quantum HashLink Logo"
                width={36}
                height={36}
              />
              <span className="text-lg font-bold text-gray-900">Quantum HashLink</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-body-color">
              Jadoon Hostel, University Road, Near University of Haripur.
            </p>
            <FooterSocialLinks />
          </div>
          <FooterLinks />
        </div>
        <Separator className="my-8" />
        <p className="text-center text-sm text-body-color">
          &copy; {new Date().getFullYear()} Quantum HashLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
