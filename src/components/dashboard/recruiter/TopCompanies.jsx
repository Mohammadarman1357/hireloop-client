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
            className="min-w-0 space-y-6"
        >

            {/* Section Header */}
            <motion.div
                variants={headerVariants}
                className="flex items-center justify-between gap-4"
            >

                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    My Top Companies
                </h2>

                <Link
                    href={viewAllHref}
                    className="shrink-0 text-sm font-medium text-white transition-colors duration-300 hover:text-violet-400"
                >
                    View all
                </Link>

            </motion.div>


            {/* Companies Container */}
            <motion.div
                variants={headerVariants}
                className="rounded-2xl border border-white/15 bg-[#1c1c1e] p-5 sm:p-7"
            >

                {/* Company List */}
                <div className="space-y-7">

                    {companies.length > 0 ? (

                        companies.map((company, index) => (

                            <motion.div
                                key={company.id}
                                variants={companyVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    delay: index * 0.08,
                                }}
                                whileHover={{
                                    x: 4,
                                    transition: { duration: 0.2 },
                                }}
                                className="flex items-center gap-4"
                            >

                                {/* Company Logo */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.35,
                                        delay: index * 0.08,
                                    }}
                                    whileHover={{
                                        scale: 1.06,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#303033]"
                                >

                                    {company.logo ? (
                                        <img
                                            src={company.logo}
                                            alt={`${company.name} logo`}
                                            className="h-full w-full object-contain p-2"
                                        />
                                    ) : (
                                        <span className="text-lg font-bold text-white">
                                            {company.initials ||
                                                company.name?.slice(0, 2).toUpperCase()}
                                        </span>
                                    )}

                                </motion.div>


                                {/* Company Information */}
                                <div className="min-w-0 flex-1">

                                    <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                                        {company.name}
                                    </h3>

                                    <p className="mt-1 truncate text-sm text-gray-400">
                                        {company.industry} • {company.location}
                                    </p>

                                </div>


                                {/* Active Jobs */}
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.35,
                                        delay: index * 0.08 + 0.1,
                                    }}
                                    className="shrink-0 text-right"
                                >

                                    <p className="text-lg font-bold text-white">
                                        {company.activeJobs}
                                    </p>

                                    <p className="mt-1 text-[11px] font-semibold uppercase text-gray-400">
                                        Active Jobs
                                    </p>

                                </motion.div>

                            </motion.div>

                        ))

                    ) : (

                        <motion.div
                            variants={companyVariants}
                            className="py-10 text-center text-sm text-gray-400"
                        >
                            No companies found.
                        </motion.div>

                    )}

                </div>


                {/* View All Button */}
                <motion.div
                    variants={headerVariants}
                    className="mt-8"
                >
                    <Link
                        href={viewAllHref}
                        className="flex w-full items-center justify-center rounded-xl border border-white/20 px-5 py-4 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-violet-500 hover:bg-violet-500/10 hover:text-white"
                    >
                        View All Companies
                    </Link>
                </motion.div>

            </motion.div>

        </motion.section>
    );
};

export default TopCompanies;
