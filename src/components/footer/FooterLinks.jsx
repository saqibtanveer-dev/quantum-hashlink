import Link from "next/link";

const linkSections = [
  {
    title: "Useful Links",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Courses", href: "/enrollment" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  {
    title: "Support & Help",
    links: [
      { label: "Contact Support", href: "/contact" },
      { label: "Enrollment", href: "/enrollment" },
      { label: "Our Projects", href: "/#projects" },
    ],
  },
];

const FooterLinks = () => (
  <>
    {linkSections.map((section) => (
      <div key={section.title}>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-900">
          {section.title}
        </h3>
        <ul className="space-y-3">
          {section.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-body-color transition hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);

export default FooterLinks;
