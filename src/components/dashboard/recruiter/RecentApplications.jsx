
"use client";

import Link from "next/link";
import { motion } from "motion/react";

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

const rowVariants = {
    hidden: {
        opacity: 0,
        x: -12,
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

const statusStyles = {
    Interviewing:
        "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",

    New:
        "bg-zinc-500/20 text-white border-zinc-500/60",

    Reviewing:
        "bg-amber-500/15 text-amber-500 border-amber-500/30",

    Rejected:
        "bg-red-500/15 text-red-500 border-red-500/30",

    Accepted:
        "bg-blue-500/15 text-blue-400 border-blue-500/30",

    Shortlisted:
        "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

const RecentApplications = ({
    applications = [],
    viewAllHref = "/dashboard/recruiter/applications",
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
                    Recent Applications
                </h2>

                <Link
                    href={viewAllHref}
                    className="shrink-0 text-xs font-medium text-white/70 transition-colors duration-300 hover:text-violet-400 sm:text-sm"
                >
                    View all
                </Link>
            </motion.div>

            {/* Applications Table */}

            <motion.div
                variants={headerVariants}
                className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#18181b]"
            >
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-collapse text-left">

                        {/* Table Header */}

                        <thead>
                            <tr className="border-b border-white/[0.08] bg-white/[0.025]">
                                {[
                                    "Candidate Name",
                                    "Role",
                                    "Date Applied",
                                    "Experience",
                                    "Status",
                                ].map((heading, index) => (
                                    <th
                                        key={heading}
                                        className="px-4 py-4 text-xs font-semibold tracking-wide text-white/40 sm:px-5"
                                    >
                                        <motion.span
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.35,
                                                delay: index * 0.07,
                                            }}
                                            className="inline-block"
                                        >
                                            {heading}
                                        </motion.span>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Table Body */}

                        <tbody>
                            {applications.length > 0 ? (
                                applications.map((application, index) => (
                                    <motion.tr
                                        key={application.id}
                                        variants={rowVariants}
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
                                            backgroundColor:
                                                "rgba(255,255,255,0.035)",
                                            transition: {
                                                duration: 0.2,
                                            },
                                        }}
                                        className="border-b border-white/[0.06] last:border-0"
                                    >
                                        {/* Candidate */}

                                        <td className="pl-4 py-4">
                                            <div className="flex items-center gap-3">
                                                {application.avatar ? (
                                                    <motion.img
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.8,
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
                                                        src={application.avatar}
                                                        alt={application.name}
                                                        className="size-8 shrink-0 rounded-full border border-white/10 object-cover"
                                                    />
                                                ) : (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.8,
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
                                                        className="size-8 shrink-0 rounded-full border border-white/10 bg-[#303033]"
                                                    />
                                                )}

                                                <span className="whitespace-nowrap text-sm font-semibold text-white">
                                                    {application.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Role */}

                                        <td className="px-3 py-4">
                                            <span className="whitespace-nowrap text-sm text-white/60">
                                                {application.role}
                                            </span>
                                        </td>

                                        {/* Date */}

                                        <td className="px-3 py-4">
                                            <span className="whitespace-nowrap text-sm text-white/55">
                                                {application.dateApplied}
                                            </span>
                                        </td>

                                        {/* Experience */}

                                        <td className="px-3 py-4">
                                            <span className="whitespace-nowrap text-sm text-white/55">
                                                {application.experience}
                                            </span>
                                        </td>

                                        {/* Status */}

                                        <td className="px-3 py-3">
                                            <motion.span
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
                                                    delay: index * 0.08 + 0.1,
                                                }}
                                                className={`
                                                    inline-flex items-center justify-center
                                                    whitespace-nowrap rounded-full border
                                                    px-2.5 py-1 text-[11px] font-semibold
                                                    ${statusStyles[application.status] || statusStyles.New}
                                                `}
                                            >
                                                {application.status}
                                            </motion.span>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-12 text-center text-sm text-white/40"
                                    >
                                        No applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default RecentApplications;
