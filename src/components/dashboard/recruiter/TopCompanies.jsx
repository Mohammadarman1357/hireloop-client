
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Briefcase, MapPin } from "@gravity-ui/icons";

const containerVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.12,
        },
    },
};

const headerVariants = {
    hidden: {
        opacity: 0,
        y: 12,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

const companyVariants = {
    hidden: {
        opacity: 0,
        x: 15,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

const TopCompanies = ({
    companies = [],
    viewAllHref = "/dashboard/recruiter/companies",
}) => {
    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="min-w-0 space-y-4"
        >
            {/* Section Header */}

            <motion.div
                variants={headerVariants}
                className="flex items-center justify-between gap-4"
            >
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                    My Top Companies
                </h2>

                <Link
                    href={viewAllHref}
                    className="shrink-0 text-xs font-medium text-white/70 transition-colors duration-300 hover:text-violet-400 sm:text-sm"
                >
                    View all
                </Link>
            </motion.div>

            {/* Companies Container */}

            <motion.div
                variants={headerVariants}
                className="rounded-xl border border-white/[0.08] bg-[#18181b] p-4 sm:p-3"
            >
                {/* Company List */}

                <div className="space-y-2">
                    {companies.length > 0 ? (
                        companies.map((company, index) => (
                            <motion.div
                                key={company.id}
                                variants={companyVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                transition={{
                                    delay: index * 0.08,
                                }}
                                whileHover={{
                                    x: 3,
                                    transition: {
                                        duration: 0.2,
                                    },
                                }}
                                className="group flex items-center gap-3 rounded-lg border border-transparent p-2.5 transition-colors duration-300 hover:border-white/[0.07] hover:bg-white/[0.025]"
                            >
                                {/* Company Logo */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.85,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        delay: index * 0.08,
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: {
                                            duration: 0.2,
                                        },
                                    }}
                                    className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#252529]"
                                >
                                    {company.logo ? (
                                        <img
                                            src={company.logo}
                                            alt={`${company.name} logo`}
                                            className="size-full object-contain p-2"
                                        />
                                    ) : (
                                        <span className="text-base font-bold text-white">
                                            {company.initials ||
                                                company.name
                                                    ?.slice(0, 2)
                                                    .toUpperCase()}
                                        </span>
                                    )}
                                </motion.div>

                                {/* Company Information */}

                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-sm font-semibold text-white transition-colors duration-200 group-hover:text-indigo-300">
                                        {company.name}
                                    </h3>

                                    <div className="mt-1 flex min-w-0 items-center gap-1 text-xs text-white/40">
                                        <span className="truncate">
                                            {company.industry}
                                        </span>

                                        <span className="shrink-0 text-white/20">
                                            •
                                        </span>

                                        <span className="flex min-w-0 items-center gap-1 truncate">
                                            <MapPin className="size-3 shrink-0" />
                                            <span className="truncate">
                                                {company.location}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Active Jobs */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        delay: index * 0.08 + 0.1,
                                    }}
                                    className="shrink-0 text-right"
                                >
                                    <div className="flex items-center justify-end gap-1.5">
                                        <Briefcase className="size-3 text-indigo-400" />

                                        <p className="text-sm font-bold tabular-nums text-white">
                                            {company.activeJobs}
                                        </p>
                                    </div>

                                    <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-white/35">
                                        Active Jobs
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            variants={companyVariants}
                            className="py-10 text-center text-sm text-white/40"
                        >
                            No companies found.
                        </motion.div>
                    )}
                </div>

                {/* View All Button */}

                <motion.div
                    variants={headerVariants}
                    className="mt-4 border-t border-white/[0.07] pt-4"
                >
                    <Link
                        href={viewAllHref}
                        className="group flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 text-xs font-semibold text-white/60 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-300"
                    >
                        View All Companies

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default TopCompanies;
