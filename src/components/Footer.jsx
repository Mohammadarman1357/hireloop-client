"use client";

import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/company" },
      { label: "Salary data", href: "/salary" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guidelines" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/armanhabib.17",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://pin.it/7HwreILek",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.83-.17-2.1.04-3 .18-.8 1.16-4.93 1.16-4.93s-.3-.6-.3-1.49c0-1.39.81-2.43 1.82-2.43.86 0 1.28.65 1.28 1.43 0 .87-.55 2.17-.84 3.38-.24 1.01.51 1.83 1.5 1.83 1.8 0 3.18-1.9 3.18-4.65 0-2.43-1.74-4.13-4.22-4.13-2.88 0-4.57 2.16-4.57 4.4 0 .87.34 1.8.76 2.3.08.1.09.19.07.3l-.28 1.13c-.04.18-.15.22-.34.13-1.27-.59-2.06-2.43-2.06-3.91 0-3.19 2.32-6.12 6.69-6.12 3.51 0 6.25 2.5 6.25 5.84 0 3.48-2.19 6.28-5.23 6.28-1.02 0-1.98-.53-2.31-1.15l-.63 2.4c-.23.88-.85 1.98-1.26 2.65A10 10 0 1 0 12 2Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammadarman1",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.5 8.2a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM4.9 9.6h3.2v9.8H4.9V9.6Zm5.2 0h3v1.3h.1a3.3 3.3 0 0 1 3-1.7c3.2 0 3.8 2.1 3.8 4.8v5.4h-3.2v-4.8c0-1.2 0-2.8-1.7-2.8s-1.9 1.3-1.9 2.7v4.9h-3.1V9.6Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#030303] text-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-14 sm:px-10 lg:px-[68px] lg:pb-10 lg:pt-[54px]">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_2fr] md:gap-10 lg:grid-cols-[1.55fr_2fr]">

          {/* Brand Section */}
          <div className="flex flex-col items-start">

            {/* Logo */}
            <Link
              href="/"
              aria-label="HireLoop home"
              className="relative mb-6 block h-[45px] w-[170px]"
            >
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                fill
                priority
                sizes="170px"
                className="object-contain object-left"
              />
            </Link>

            {/* Description */}
            <p className="max-w-[330px] text-[15px] font-normal leading-[1.9] text-[#494949] sm:text-base">
              The AI-native career platform. Built for
              people who take their work seriously.
            </p>
          </div>

          {/* Footer Navigation */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8">

            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-7 text-[15px] font-medium text-[#39308f] sm:text-base">
                  {group.title}
                </h3>

                <ul className="flex flex-col gap-[17px]">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-normal text-[#494949] transition-colors duration-200 hover:text-white sm:text-base"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 flex flex-col gap-8 md:mt-[82px] md:flex-row md:items-center md:justify-between">

          {/* Social Media */}
          <div className="flex items-center gap-[9px]">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`flex h-[45px] w-[45px] items-center justify-center rounded-[11px] transition-all duration-200 hover:-translate-y-1 ${
                  social.name === "Pinterest"
                    ? "bg-[#342d91] text-[#8580a8] hover:bg-[#443bb8]"
                    : "bg-[#0d0d0d] text-[#777777] hover:bg-[#202020] hover:text-white"
                }`}
              >
                <span className="h-[26px] w-[26px]">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright and Legal Links */}
          <div className="flex flex-col gap-4 text-sm text-[#414141] sm:flex-row sm:flex-wrap sm:items-center sm:gap-7">

            <p >
              &copy; Copyright 2026 - Hire Loop
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-1">
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms & Policy
              </Link>

              <span aria-hidden="true">-</span>

              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Guideline
              </Link>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
