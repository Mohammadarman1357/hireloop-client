
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession,signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  // console.log("Session data in Navbar : ", session, "Is Pending : ",isPending);
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <nav className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-xl bg-[#1d1d1d] px-4 sm:px-5">

        <header className="flex h-[60px] items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            aria-label="HireLoop home"
            className="relative flex h-9 w-[100px] shrink-0 items-center"
          >
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              fill
              priority
              sizes="100px"
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-5 md:flex lg:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-[#7568ff]"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Divider */}
            <li
              aria-hidden="true"
              className="h-4 w-px bg-white/50"
            />

            {/* Sign In */}
            <li>

              {user ?
                <>
                  <span>Hi, {user?.name} </span>
                  <Button onClick={handleSignOut} variant="ghost" href="/auth/signin"
                    className="ml-2">
                    Sign Out
                  </Button>
                </>
                :
                <Link
                  href="/auth/signin"
                  className=" text-[#7568ff] transition-colors hover:text-[#968dff]"
                >
                  Sign In
                </Link>
              }

            </li>

            {/* Get Started */}
            <li>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-lg bg-[#6054ff] px-4 py-2 font-medium text-[18px] text-white transition-all duration-200 hover:bg-[#5145ed]"
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>

        </header>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 py-3 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-xs text-white/90 transition-colors hover:bg-white/5 hover:text-[#968dff]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="my-1 border-t border-white/10" />

              <li>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-xs font-medium text-[#968dff] hover:bg-white/5"
                >
                  Sign In
                </Link>
              </li>

              <li className="pt-2">
                <Link
                  href="/get-started"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-9 w-full items-center justify-center rounded-lg bg-[#6054ff] text-xs font-medium text-white transition-colors hover:bg-[#5145ed]"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}

      </div>
    </nav>
  );
}
