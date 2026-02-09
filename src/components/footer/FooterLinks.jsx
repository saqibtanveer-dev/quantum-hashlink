import Link from "next/link";

const linkSections = [
  {
    title: "Useful Links",
    colClass: "w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Courses", href: "/enrollment" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Terms",
    colClass: "w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12",
    links: [
      { label: "TOS", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Refund Policy", href: "/" },
    ],
  },
  {
    title: "Support & Help",
    colClass: "w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12",
    links: [
      { label: "Open Support Ticket", href: "/contact" },
      { label: "Terms of Use", href: "/" },
      { label: "About", href: "/about" },
    ],
  },
];

const FooterLinks = () => (
  <>
    {linkSections.map((section) => (
      <div key={section.title} className={section.colClass}>
        <div className="mb-12 lg:mb-16">
          <h2 className="mb-10 text-xl font-bold text-black">
            {section.title}
          </h2>
          <ul>
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </>
);

export default FooterLinks;
