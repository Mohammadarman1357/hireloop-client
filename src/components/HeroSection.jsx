
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Magnifier } from "@gravity-ui/icons";
import { motion } from "motion/react";

const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
];

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

export default function HeroSection() {
    const router = useRouter();

    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (jobTitle.trim()) {
            params.set("query", jobTitle.trim());
        }

        if (location.trim()) {
            params.set("location", location.trim());
        }

        router.push(
            `/jobs${params.toString() ? `?${params.toString()}` : ""}`
        );
    };

    const handleTrendingClick = (position) => {
        setJobTitle(position);
    };

    return (
        <section className="relative h-[570px] sm:h-[540px] lg:h-[520px] w-full overflow-hidden bg-transparent text-white">

            {/* Dark Background Gradient - Fully Transparent at Bottom */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(30,30,32,0.85) 0%, rgba(0,0,0,0.96) 25%, rgba(0,0,0,0.65) 42%, rgba(0,0,0,0.25) 52%, transparent 62%)",
                }}
            />

            {/* Main Content */}
            <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col items-center px-5 pt-[100px] sm:px-8 sm:pt-[100px] lg:pt-[101px]">
                {/* Job Count Badge */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="relative flex items-center justify-center"
                >

                    {/* Horizontal Lines */}
                    <div className="absolute right-full top-1/2 hidden h-px w-16 -translate-y-1/2 bg-gradient-to-l from-white/20 to-transparent sm:block md:w-20" />

                    <div className="absolute left-full top-1/2 hidden h-px w-16 -translate-y-1/2 bg-gradient-to-r from-white/20 to-transparent sm:block md:w-20" />

                    <div className="relative inline-flex h-[49px] items-center gap-3 rounded-full border border-white/[0.13] bg-gradient-to-b from-[#171717] to-[#090909] px-5 shadow-[0_5px_25px_rgba(0,0,0,0.5)] sm:px-6">

                        <span className="text-[21px]" aria-hidden="true">
                            💼
                        </span>

                        <span className="font-mono text-[17px] font-bold tracking-wide text-white sm:text-[19px]">
                            50,000+
                        </span>

                        <span className="whitespace-nowrap font-mono text-[13px] tracking-[1px] text-white/50 sm:text-[16px] sm:tracking-[1.5px]">
                            NEW JOBS THIS MONTH
                        </span>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="mt-[35px] text-center"
                >
                    <motion.h1
                        variants={fadeUp}
                        className="text-[38px] font-semibold leading-[1.15] tracking-[-1.5px] text-white sm:text-[48px] md:text-[56px] lg:text-[58px]"
                    >
                        Find Your Dream Job Today
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mt-5 max-w-[760px] text-[15px] font-normal leading-[1.7] text-white/65 sm:text-[18px] md:text-[20px]"
                    >
                        HireLoop connects top talent with world-class companies. Browse
                        thousands of curated opportunities and land your next role – faster.
                    </motion.p>
                </motion.div>

                {/* Job Search Form */}
                <motion.form
                    onSubmit={handleSearch}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-[48px] flex w-full max-w-[802px] flex-col gap-3 rounded-[17px] border border-white/[0.17] bg-[#111111] p-2 shadow-[0_10px_50px_rgba(0,0,0,0.4)] sm:h-[66px] sm:flex-row sm:items-center sm:gap-0 sm:rounded-[17px] sm:p-[8px]"
                >

                    {/* Job Title Input */}
                    <div className="flex h-[48px] min-w-0 flex-1 items-center gap-3 px-3 sm:h-full sm:px-4">
                        <Magnifier className="h-6 w-6 shrink-0 text-white" />

                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Job title, skill or company"
                            aria-label="Job title, skill or company"
                            className="h-full w-full min-w-0 bg-transparent text-[14px] text-white outline-none placeholder:text-white/60 sm:text-[15px]"
                        />
                    </div>

                    {/* Divider */}
                    <div className="mx-2 hidden h-[25px] w-px bg-white/15 sm:block" />

                    <div className="mx-3 h-px bg-white/10 sm:hidden" />

                    {/* Location Input */}
                    <div className="flex h-[48px] min-w-0 flex-1 items-center gap-3 px-3 sm:h-full sm:px-4">

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 shrink-0 text-white"
                            aria-hidden="true"
                        >
                            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                            <circle cx="12" cy="10" r="2.5" />
                        </svg>

                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location or Remote"
                            aria-label="Job location or remote"
                            className="h-full w-full min-w-0 bg-transparent text-[14px] text-white outline-none placeholder:text-white/60 sm:text-[15px]"
                        />
                    </div>

                    {/* Search Button */}
                    <motion.button
                        type="submit"
                        aria-label="Search jobs"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 25px rgba(96,84,255,0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-[49px] w-full shrink-0 items-center justify-center rounded-[13px] bg-[#6054ff] text-white transition-colors duration-300 hover:bg-[#5145ed] sm:h-[49px] sm:w-[49px]"
                    >
                        <Magnifier className="h-7 w-7" />
                    </motion.button>
                </motion.form>

                {/* Trending Positions */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mt-[24px] flex w-full flex-wrap items-center justify-center gap-2"
                >

                    <motion.span
                        variants={fadeUp}
                        className="mr-2 text-[14px] text-white/65 sm:text-[15px]"
                    >
                        Trending Position
                    </motion.span>

                    {trendingPositions.map((position) => (
                        <motion.button
                            key={position}
                            variants={fadeUp}
                            type="button"
                            onClick={() => handleTrendingClick(position)}
                            whileHover={{
                                y: -3,
                                scale: 1.04,
                            }}
                            whileTap={{
                                scale: 0.96,
                            }}
                            className={`rounded-full border px-3 py-[7px] text-[12px] font-normal transition-all duration-200 sm:text-[13px] ${jobTitle === position
                                    ? "border-[#6054ff]/60 bg-[#6054ff]/20 text-white"
                                    : "border-white/[0.12] bg-[#202020] text-white/90 hover:border-[#6054ff]/50 hover:bg-[#292547]"
                                }`}
                        >
                            {position}
                        </motion.button>
                    ))}

                </motion.div>
            </div>
        </section>
    );
}
