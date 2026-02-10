"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import menuData from "./menuData";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setSticky(window.scrollY >= 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <header
      className={`left-0 top-0 z-40 w-full transition-all ${
        sticky
          ? "fixed z-9999 bg-white/80 shadow-sticky backdrop-blur-sm"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/qhl_logo_no_text.png"
              alt="Quantum HashLink"
              width={36}
              height={36}
            />
            <span className="hidden text-base font-bold text-gray-900 sm:inline-block">
              Quantum HashLink
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {menuData.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-accent hover:text-foreground"
                }`}
              >
                {item.title}
              </Link>
            ))}
            <Button asChild size="sm" className="ml-3">
              <Link href="#contact">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Image src="/qhl_logo_no_text.png" alt="Quantum HashLink" width={28} height={28} />
                  Quantum HashLink
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
                {menuData.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-accent"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
                <Button asChild className="mt-4" onClick={() => setOpen(false)}>
                  <Link href="#contact">Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
