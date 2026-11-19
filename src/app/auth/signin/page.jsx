
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

import {
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  LogoFacebook,
  LogoApple,
} from "@gravity-ui/icons";

import { signIn } from "@/lib/auth-client";
import { BsGoogle } from "react-icons/bs";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await signIn.email({
        email: normalizedEmail,
        password,
        callbackURL: "/",
      });

      if (response.error) {
        setErrorMessage(
          response.error.message ||
            "Something went wrong. Please try again."
        );
        return;
      }

      setSuccessMessage(
        "Welcome back! You are now signed in."
      );

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);

    } catch (error) {
      setErrorMessage(
        error.message || "Unable to connect. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent text-[13px] text-white placeholder:text-white/30 outline-none";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-4 py-10">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.08] blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-[300px] w-full bg-gradient-to-t from-white/[0.025] to-transparent" />
      </div>

      {/* Signin Card */}
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-[420px] overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#111111] shadow-[0_25px_100px_rgba(0,0,0,0.65)]"
        >

          {/* Top gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[190px] bg-gradient-to-b from-[#555d68]/40 via-[#252a35]/20 to-transparent" />

          {/* Blue border glow */}
          <div className="pointer-events-none absolute inset-y-[110px] left-0 w-px bg-gradient-to-b from-transparent via-blue-500/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-[110px] right-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />

          <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-11">

            {/* Heading */}
            <div className="mb-8 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[32px] font-medium tracking-[-1.2px] text-white"
              >
                Welcome Back
              </motion.h1>

              <p className="mx-auto mt-2 max-w-[300px] text-[12px] leading-[1.7] text-white/50">
                Sign in to your account and seamlessly continue managing your projects, ideas, and progress.
              </p>
            </div>

            {/* Signin Form */}
            <form onSubmit={handleSubmit} className="space-y-[10px]">

              {/* Email */}
              <div className="flex h-[43px] items-center gap-3 rounded-full border border-white/[0.10] bg-[#0d0d0d] px-4 transition-all focus-within:border-blue-500/60 focus-within:ring-1 focus-within:ring-blue-500/20">
                <Envelope className="h-3.5 w-3.5 shrink-0 text-white/40" />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={isLoading}
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div className="flex h-[43px] items-center gap-3 rounded-full border border-white/[0.10] bg-[#0d0d0d] px-4 transition-all focus-within:border-blue-500/60 focus-within:ring-1 focus-within:ring-blue-500/20">
                <Lock className="h-3.5 w-3.5 shrink-0 text-white/40" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={isLoading}
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 text-white/40 transition hover:text-blue-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlash className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Error and Success Messages */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p
                      role="alert"
                      className="rounded-lg border border-red-500/20 bg-red-500/[0.08] px-3 py-2 text-[11px] text-red-400"
                    >
                      {errorMessage}
                    </p>
                  </motion.div>
                )}

                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p
                      role="status"
                      className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-2 text-[11px] text-emerald-400"
                    >
                      {successMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-5 flex h-[44px] w-full items-center justify-center rounded-full bg-[#242424] text-[13px] font-medium text-white transition-all duration-300 hover:bg-[#303030] hover:shadow-[0_0_25px_rgba(37,99,235,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Please wait..." : "Sign in"}
              </button>

            </form>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-[10px] text-white/30">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-white/[0.08]" />
            </div>

            {/* Social Authentication */}
            <div className="flex items-center justify-center gap-8">

              <button
                type="button"
                className="text-[13px] flex items-center rounded-full bg-[#242424] text-white transition-all duration-300 hover:bg-[#303030] hover:shadow-[0_0_25px_rgba(37,99,235,0.12)] px-2 py-1 gap-2"
              >
                <LogoFacebook />
                <span>Facebook</span>
              </button>

              <button
                type="button"
                className="text-[13px] flex items-center rounded-full bg-[#242424] text-white transition-all duration-300 hover:bg-[#303030] hover:shadow-[0_0_25px_rgba(37,99,235,0.12)] px-2 py-1 gap-2"
              >
                <BsGoogle />
                <span>Google</span>
              </button>

              <button
                type="button"
                className="text-[13px] flex items-center rounded-full bg-[#242424] text-white transition-all duration-300 hover:bg-[#303030] hover:shadow-[0_0_25px_rgba(37,99,235,0.12)] px-2 py-1 gap-2"
              >
                <LogoApple />
                <span>Apple</span>
              </button>

            </div>

            {/* Navigate to Signup */}
            <div className="mt-6 text-center">
              <p className="text-[11px] text-white/45">
                Don't have an account?

                <button
                  type="button"
                  onClick={() => router.push("/auth/signup")}
                  className="ml-1 text-blue-400 underline underline-offset-2 transition hover:text-blue-300"
                >
                  Sign up
                </button>
              </p>
            </div>

          </div>

          {/* Bottom glow */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        </motion.section>
      </AnimatePresence>
    </main>
  );
}
