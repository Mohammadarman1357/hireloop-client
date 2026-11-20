
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

import {
  Envelope,
  Lock,
  Person,
  Eye,
  EyeSlash,
  LogoFacebook,
  LogoApple,
} from "@gravity-ui/icons";

import { signUp } from "@/lib/auth-client";
import { BsGoogle } from "react-icons/bs";
import Swal from "sweetalert2";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const showErrorAlert = (message) => {
      setErrorMessage(message);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: message,
        confirmButtonText: "Try Again",
        confirmButtonColor: "#F97316",
        background: "#171923",
        color: "#ffffff",
        customClass: {
          popup: "rounded-2xl border border-white/10",
          confirmButton: "rounded-lg px-6 py-2.5",
        },
      });
    };

    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      showErrorAlert("Please enter your full name.");
      return;
    }

    if (!normalizedEmail) {
      showErrorAlert("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      showErrorAlert("Password must be at least 8 characters.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await signUp.email({
        name: name.trim(),
        email: normalizedEmail,
        password,
        role,
        callbackURL: "/",
      });

      if (response.error) {
        showErrorAlert(
          response.error.message ||
          "Something went wrong. Please try again."
        );
        return;
      }

      setSuccessMessage("Your account has been created successfully!");

      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to HireLoop! Your account has been created successfully.",
        confirmButtonText: "Get Started",
        confirmButtonColor: "#F97316",
        background: "#171923",
        color: "#ffffff",
        timer: 2500,
        timerProgressBar: true,
        customClass: {
          popup: "rounded-2xl border border-white/10",
          confirmButton: "rounded-lg px-6 py-2.5",
        },
      });

      router.push("/");
      router.refresh();

    } catch (error) {
      showErrorAlert(
        error.message || "Unable to connect. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent text-[13px] text-white placeholder:text-white/30 outline-none";

  return (


    <main
      className="
    relative flex min-h-screen items-center justify-center
    overflow-hidden bg-[#090909] px-4 py-10
    bg-[url('/images/authbg.png')]
    bg-cover bg-center bg-no-repeat
  "
    >
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/[0.08] blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-[300px] w-full bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Card Wrapper */}
      <div className="relative isolate z-10 mx-auto w-full max-w-[420px]">

        {/* Floating Orange Orb */}
        <motion.div
          className="
        pointer-events-none absolute -left-12 -top-12 z-0
        h-40 w-40 rounded-full
        bg-orange-500/70 blur-[65px]
      "
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Blue Orb */}
        <motion.div
          className="
        pointer-events-none absolute -bottom-12 -right-10 z-0
        h-48 w-48 rounded-full
        bg-blue-500/70 blur-[75px]
      "
          animate={{
            x: [0, -20, 15, 0],
            y: [0, 15, -10, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Small Floating Orb */}
        <motion.div
          className="
        pointer-events-none absolute -right-8 top-1/2 z-0
        h-24 w-24 rounded-full
        bg-orange-400/50 blur-[50px]
      "
          animate={{
            y: [0, -25, 15, 0],
            opacity: [0.4, 0.8, 0.5, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Signup Card */}
        <AnimatePresence mode="wait">
          <motion.section
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
          group relative z-10 isolate w-full overflow-hidden
          rounded-[26px]
          border border-white/[0.22]
          bg-[#11141c]/55
          backdrop-blur-[35px]
          shadow-[0_25px_100px_rgba(0,0,0,0.45)]
          ring-1 ring-white/[0.06]
          transition-all duration-500
          hover:border-white/[0.30]
          hover:shadow-[0_30px_110px_rgba(0,0,0,0.55)]
        "
          >
            {/* Main Glass Surface */}
            <div
              className="
            pointer-events-none absolute inset-0 z-0
            rounded-[26px]
            bg-gradient-to-br
            from-white/[0.16]
            via-white/[0.035]
            to-white/[0.01]
          "
            />

            {/* Top Glass Reflection */}
            <div
              className="
            pointer-events-none absolute inset-x-0 top-0 z-0
            h-[160px]
            bg-gradient-to-b
            from-white/[0.18]
            via-white/[0.05]
            to-transparent
          "
            />

            {/* Orange Glass Highlight */}
            <div
              className="
            pointer-events-none absolute -left-24 -top-24 z-0
            h-64 w-64 rounded-full
            bg-orange-400/[0.08] blur-[75px]
          "
            />

            {/* Blue Glass Highlight */}
            <div
              className="
            pointer-events-none absolute -right-24 -bottom-24 z-0
            h-72 w-72 rounded-full
            bg-blue-400/[0.12] blur-[80px]
          "
            />

            {/* Top Edge Reflection */}
            <div
              className="
            pointer-events-none absolute inset-x-8 top-0 z-20
            h-px
            bg-gradient-to-r
            from-transparent via-white/70 to-transparent
          "
            />

            {/* Glass Border */}
            <div
              className="
            pointer-events-none absolute inset-0 z-20
            rounded-[26px]
            border border-white/[0.08]
          "
            />

            {/* Left Border Glow */}
            <div
              className="
            pointer-events-none absolute inset-y-[110px] left-0 z-20
            w-px
            bg-gradient-to-b
            from-transparent via-blue-200/60 to-transparent
          "
            />

            {/* Right Border Glow */}
            <div
              className="
            pointer-events-none absolute inset-y-[110px] right-0 z-20
            w-px
            bg-gradient-to-b
            from-transparent via-white/30 to-transparent
          "
            />

            {/* Card Content */}
            <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-11">

              {/* Heading */}
              <div className="mb-8 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                text-[32px] font-medium
                tracking-[-1.2px] text-white
                drop-shadow-sm
              "
                >
                  Create account
                </motion.h1>

                <p
                  className="
                mx-auto mt-2 max-w-[300px]
                text-[12px] leading-[1.7] text-white/70
              "
                >
                  Create your HireLoop account and start connecting with opportunities.
                </p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-[10px]">

                {/* Name */}
                <div
                  className="
                group/input flex h-[43px] items-center gap-3
                rounded-full border border-white/20
                bg-black/[0.16] px-4
                shadow-inner shadow-white/[0.04]
                transition-all duration-300
                hover:border-white/35 hover:bg-white/[0.10]
                focus-within:border-blue-200/70
                focus-within:bg-white/[0.14]
                focus-within:ring-2 focus-within:ring-blue-300/20
              "
                >
                  <Person
                    className="
                  h-3.5 w-3.5 shrink-0 text-white/60
                  transition-colors
                  group-focus-within/input:text-blue-200
                "
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    disabled={isLoading}
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div
                  className="
                group/input flex h-[43px] items-center gap-3
                rounded-full border border-white/20
                bg-black/[0.16] px-4
                shadow-inner shadow-white/[0.04]
                transition-all duration-300
                hover:border-white/35 hover:bg-white/[0.10]
                focus-within:border-blue-200/70
                focus-within:bg-white/[0.14]
                focus-within:ring-2 focus-within:ring-blue-300/20
              "
                >
                  <Envelope
                    className="
                  h-3.5 w-3.5 shrink-0 text-white/60
                  transition-colors
                  group-focus-within/input:text-blue-200
                "
                  />

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
                <div
                  className="
                group/input flex h-[43px] items-center gap-3
                rounded-full border border-white/20
                bg-black/[0.16] px-4
                shadow-inner shadow-white/[0.04]
                transition-all duration-300
                hover:border-white/35 hover:bg-white/[0.10]
                focus-within:border-blue-200/70
                focus-within:bg-white/[0.14]
                focus-within:ring-2 focus-within:ring-blue-300/20
              "
                >
                  <Lock
                    className="
                  h-3.5 w-3.5 shrink-0 text-white/60
                  transition-colors
                  group-focus-within/input:text-blue-200
                "
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    disabled={isLoading}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                  shrink-0 text-white/60
                  transition-all duration-200
                  hover:scale-110 hover:text-blue-200
                  active:scale-95
                "
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeSlash className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Role Selection */}
                <div
                  className="
                flex flex-col gap-4 rounded-2xl
                border border-white/15
                bg-white/[0.06] p-4
                backdrop-blur-xl
              "
                >
                  <Label>Select Role :</Label>

                  <RadioGroup
                    onChange={(value) => setRole(value)}
                    defaultValue="seeker"
                    name="role"
                    orientation="horizontal"
                  >
                    <Radio value="seeker">
                      <Radio.Content>
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        Job Seeker
                      </Radio.Content>
                    </Radio>

                    <Radio value="recruiter">
                      <Radio.Content>
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        Recruiter
                      </Radio.Content>
                    </Radio>
                  </RadioGroup>
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
                        className="
                      rounded-xl border border-red-300/30
                      bg-red-500/[0.14] px-3 py-2
                      text-[11px] text-red-100 backdrop-blur-xl
                    "
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
                        className="
                      rounded-xl border border-emerald-200/30
                      bg-emerald-500/[0.14] px-3 py-2
                      text-[11px] text-emerald-100 backdrop-blur-xl
                    "
                      >
                        {successMessage}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.015, y: -2 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  className="
                relative mt-5 flex h-[46px] w-full
                items-center justify-center overflow-hidden
                rounded-full border border-white/25
                bg-white/[0.20]
                text-[13px] font-semibold text-white
                shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                backdrop-blur-xl
                transition-all duration-300
                hover:border-white/40 hover:bg-white/[0.28]
                hover:shadow-[0_8px_30px_rgba(96,165,250,0.20)]
                disabled:cursor-not-allowed disabled:opacity-50
              "
                >
                  <span className="relative z-10">
                    {isLoading ? "Please wait..." : "Create account"}
                  </span>

                  <div
                    className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-b from-white/20 to-transparent
                "
                  />
                </motion.button>

              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/20" />

                <span
                  className="
                whitespace-nowrap text-[10px]
                font-medium tracking-[1.2px] text-white/55
              "
                >
                  OR CONTINUE WITH
                </span>

                <div className="h-px flex-1 bg-white/20" />
              </div>

              {/* Social Authentication */}
              <div className="flex flex-wrap items-center justify-center gap-3">

                {/* Facebook */}
                <motion.button
                  type="button"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                flex items-center gap-2 rounded-full
                border border-white/20
                bg-white/[0.12] px-3 py-2
                text-[12px] text-white/90
                backdrop-blur-xl
                transition-all duration-300
                hover:border-white/35 hover:bg-white/[0.22]
                hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]
              "
                >
                  <LogoFacebook className="h-3.5 w-3.5" />
                  <span>Facebook</span>
                </motion.button>

                {/* Google */}
                <motion.button
                  type="button"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                flex items-center gap-2 rounded-full
                border border-white/20
                bg-white/[0.12] px-3 py-2
                text-[12px] text-white/90
                backdrop-blur-xl
                transition-all duration-300
                hover:border-white/35 hover:bg-white/[0.22]
                hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]
              "
                >
                  <BsGoogle className="h-3.5 w-3.5" />
                  <span>Google</span>
                </motion.button>

                {/* Apple */}
                <motion.button
                  type="button"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                flex items-center gap-2 rounded-full
                border border-white/20
                bg-white/[0.12] px-3 py-2
                text-[12px] text-white/90
                backdrop-blur-xl
                transition-all duration-300
                hover:border-white/35 hover:bg-white/[0.22]
                hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]
              "
                >
                  <LogoApple className="h-3.5 w-3.5" />
                  <span>Apple</span>
                </motion.button>

              </div>

              {/* Navigate to Signin */}
              <div className="mt-7 text-center">
                <p className="text-[11px] text-white/70">
                  Already have an account?

                  <button
                    type="button"
                    onClick={() => router.push("/auth/signin")}
                    className="
                  ml-1 font-medium text-blue-200
                  underline underline-offset-4
                  transition-colors duration-200
                  hover:text-white
                "
                  >
                    Sign in
                  </button>
                </p>
              </div>

            </div>

            {/* Bottom Glass Reflection */}
            <div
              className="
            pointer-events-none absolute bottom-0 left-1/2 z-20
            h-px w-2/3 -translate-x-1/2
            bg-gradient-to-r from-transparent
            via-blue-200/70 to-transparent
          "
            />

          </motion.section>
        </AnimatePresence>
      </div>
    </main>


  );
}
