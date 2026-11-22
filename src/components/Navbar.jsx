
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

// =================================
// Navigation Links
// =================================

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

// =================================
// Reusable Get Started Button
// =================================

function GetStartedButton({ onClick, fullWidth = false }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.035,
              y: -2,
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.97,
            }
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      onClick={onClick}
      className={`group relative flex h-11 ${
        fullWidth ? "w-full" : "w-auto"
      } items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-600/30`}
    >
      {/* Shine Effect */}
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

      <span className="relative z-10">
        Get Started
      </span>
    </motion.button>
  );
}

// =================================
// Navbar Component
// =================================

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const router = useRouter();

  const user = session?.user;

  // =================================
  // Sign Out Handler
  // =================================

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your HireLoop account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#F97316",
      cancelButtonColor: "#374151",
      background: "#171923",
      color: "#ffffff",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl border border-white/10",
        confirmButton: "rounded-lg px-6 py-2.5",
        cancelButton: "rounded-lg px-6 py-2.5",
      },
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Signing Out...",
        text: "Please wait a moment.",
        background: "#171923",
        color: "#ffffff",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await signOut();

      await Swal.fire({
        icon: "success",
        title: "Signed Out!",
        text: "You have successfully signed out.",
        confirmButtonColor: "#F97316",
        background: "#171923",
        color: "#ffffff",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      router.push("/auth/signin");
      router.refresh();

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sign Out Failed",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#F97316",
        background: "#171923",
        color: "#ffffff",
      });
    }
  };

  // =================================
  // Get Started Handler
  // =================================

  const handleGetStarted = () => {
    setIsMenuOpen(false);
    router.push("/get-started");
  };

  // =================================
  // Navbar UI
  // =================================

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="mx-auto bg-[#1d1d1dc7] px-4 sm:px-5">

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

          {/* ================================= */}
          {/* Desktop Navigation */}
          {/* ================================= */}

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
              {user ? (
                <>
                  <span>
                    Hi, {user?.name}
                  </span>

                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    href="/auth/signin"
                    className="ml-2"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-[#7568ff] transition-colors hover:text-[#968dff]"
                >
                  Sign In
                </Link>
              )}
            </li>

            {/* Get Started */}
            <li>
              <GetStartedButton
                onClick={handleGetStarted}
              />
            </li>

          </ul>

          {/* ================================= */}
          {/* Mobile Menu Toggle */}
          {/* ================================= */}

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

        {/* ================================= */}
        {/* Mobile Navigation */}
        {/* ================================= */}

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

              {/* Sign In */}
              <li>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-xs font-medium text-[#968dff] hover:bg-white/5"
                >
                  Sign In
                </Link>
              </li>

              {/* Get Started */}
              <li className="pt-2">
                <GetStartedButton
                  fullWidth
                  onClick={handleGetStarted}
                />
              </li>

            </ul>
          </div>
        )}

      </div>
    </nav>
  );
}
