
"use client";

import { motion } from "motion/react";
import {
    Magnifier,
    ChartLine,
    Briefcase,
    Bookmark,
    MagicWand,
    FileText,
    Target,
    ArrowUpRight,
} from "@gravity-ui/icons";

const features = [
    {
        title: "Smart Search",
        description:
            "Find your ideal job with advanced filters.",
        icon: Magnifier,
    },
    {
        title: "Salary Insights",
        description:
            "Get real salary data to negotiate confidently.",
        icon: ChartLine,
    },
    {
        title: "Top Companies",
        description:
            "Apply to vetted companies that are hiring.",
        icon: Briefcase,
    },
    {
        title: "Saved Jobs",
        description:
            "Manage jobs and favorites on your dashboard.",
        icon: Bookmark,
    },
    {
        title: "One-Click Apply",
        description:
            "Simplify your job applications for an easier process!",
        icon: MagicWand,
    },
    {
        title: "Resume Builder",
        description:
            "Create professional resumes with modern templates.",
        icon: FileText,
    },
    {
        title: "Skill-Based Matching",
        description:
            "Discover jobs that match your skills and experience.",
        icon: Target,
    },
    {
        title: "Career Growth Resources",
        description:
            "Boost your career with quick interview tips.",
        icon: ArrowUpRight,
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: "easeOut",
        },
    },
};

export default function FeaturesSection() {
    return (
        <section
            id="features"
            className="relative w-full min-w-0 overflow-hidden bg-[#141414] px-5 py-20 text-white sm:px-8 md:py-24 lg:py-28"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7 }}
                    className="mb-12 text-center md:mb-16"
                >
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-1.5 w-1.5 bg-[#7462FF]" />

                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-300">
                            Features Job
                        </span>

                        <span className="h-1.5 w-1.5 bg-[#7462FF]" />
                    </div>

                    <h2 className="mx-auto max-w-lg text-3xl font-medium leading-[1.15] tracking-[-0.045em] sm:text-4xl md:text-[42px]">
                        Everything you need
                        <br />
                        to succeed
                    </h2>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-9"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                variants={itemVariants}
                                className="group flex items-start gap-4"
                            >
                                {/* Icon Box */}
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.04 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 18,
                                    }}
                                    className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[6px] border border-white/[0.08] bg-gradient-to-b from-black to-[#191919] shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:border-[#7462FF]/40 group-hover:shadow-[0_0_20px_rgba(116,98,255,0.12)]"
                                >
                                    <Icon
                                        className="h-[21px] w-[21px] text-[#E9B8F5] transition-colors duration-300 group-hover:text-[#927FFF]"
                                    />
                                </motion.div>

                                {/* Feature Content */}
                                <div className="min-w-0 pt-[1px]">
                                    <h3 className="mb-1.5 text-[13px] font-medium leading-5 tracking-[-0.02em] text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="max-w-[190px] text-[11px] font-normal leading-[1.65] text-[#A3A3A3]">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
