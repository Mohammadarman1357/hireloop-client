
"use client";

import { motion } from "motion/react";

const stats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="4" y="7" width="14" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <circle cx="17" cy="17" r="4" />
        <path d="m20 20 2 2" />
      </svg>
    ),
  },
  {
    value: "12K",
    label: "Companies",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M3 21V10h7v11" />
        <path d="M10 21V4h7v17" />
        <path d="M17 13h4v8h-4" />
        <path d="M6 14h1M6 17h1M13 8h1M13 12h1M13 16h1" />
      </svg>
    ),
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="10" cy="10" r="8" />
        <circle cx="10" cy="8" r="2.5" />
        <path d="M5.5 15a5 5 0 0 1 9 0" />
        <path d="m16 16 5 5" />
      </svg>
    ),
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="m12 3 2.2 5.1 5.5.5-4.2 3.7 1.3 5.4-4.8-2.9-4.8 2.9 1.3-5.4-4.2-3.7 5.5-.5L12 3Z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function StatsSection() {
  return (
    <section className="relative isolate min-h-[700px] w-full overflow-hidden bg-black text-white">

      {/* Globe Background */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/globe.png')",
        }}
      />

      {/* Dark Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-black/40"
      />

      {/* Purple Atmospheric Glow */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-[25%] z-[2] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[140px]"
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-8">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 pt-[270px] text-center sm:pt-[285px]"
        >
          <h2 className="mx-auto max-w-[650px] text-3xl font-normal leading-[1.35] tracking-tight text-white/75 sm:text-[30px] lg:text-[40px]">
            Assisting over{" "}
            <span className="font-medium text-white">
              15,000 job seekers
            </span>
            <br />
            find their dream positions.
          </h2>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative z-20 mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:absolute lg:left-1/2 lg:top-[410px] lg:mt-0 lg:w-[calc(100%-80px)] lg:max-w-[1040px] lg:-translate-x-1/2 lg:grid-cols-4 lg:gap-5"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{
                y: -7,
                borderColor: "rgba(96,84,255,0.5)",
                boxShadow: "0px 12px 35px rgba(96,84,255,0.13)",
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
              className="group flex min-h-[175px] flex-col justify-between rounded-[13px] border border-white/[0.09] bg-gradient-to-br from-[#050505] via-[#0c0c0c] to-[#1b1b1b] p-5 transition-colors duration-300 hover:border-[#6054ff]/40 hover:shadow-[0_0_30px_rgba(96,84,255,0.12)] sm:min-h-[190px] sm:p-5 lg:h-[200px] lg:min-h-0 lg:p-[19px]"
            >
              {/* Icon */}
              <motion.div
                whileHover={{
                  y: -4,
                  rotate: 5,
                  scale: 1.12,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="text-white"
              >
                {stat.icon}
              </motion.div>

              {/* Statistic */}
              <div className="space-y-2">
                <motion.h3
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[42px] font-medium leading-none tracking-tight text-white sm:text-[46px] lg:text-[48px]"
                >
                  {stat.value}
                </motion.h3>

                <p className="text-[13px] font-normal text-white/90 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
