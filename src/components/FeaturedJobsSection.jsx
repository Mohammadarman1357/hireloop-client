
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Briefcase, ArrowRight } from "@gravity-ui/icons";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 2,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 3,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 4,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 5,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 6,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[11px] w-[11px]"
      aria-hidden="true"
    >
      <path d="M12 2.5a7 7 0 0 0-7 7c0 5.1 7 12 7 12s7-6.9 7-12a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[11px] w-[11px]"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.7 15.2v1.3h-1.5v-1.3c-1.3-.2-2.3-.9-2.7-2.1l1.5-.6c.3.8 1 1.2 2 1.2 1 0 1.6-.4 1.6-1.1 0-.6-.4-.9-1.8-1.2-1.8-.4-2.8-1.1-2.8-2.6 0-1.3.9-2.3 2.2-2.6V6.8h1.5v1.3c1.1.2 1.9.8 2.3 1.8l-1.5.6c-.3-.6-.8-.9-1.6-.9-.9 0-1.4.4-1.4 1 0 .6.4.9 1.8 1.2 1.8.4 2.8 1.1 2.8 2.6 0 1.4-.9 2.4-2.4 2.8Z" />
    </svg>
  );
}

function JobBadge({ icon, children }) {
  return (
    <span className="inline-flex h-[24px] items-center gap-[6px] rounded-full bg-[#222222] px-[9px] text-[10px] font-medium tracking-wide text-white/90">
      <span className="text-[#e9a4f5]">{icon}</span>
      {children}
    </span>
  );
}

export default function FeaturedJobsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black px-5 py-[75px] text-white sm:px-8 sm:py-[85px] lg:py-[85px]">

      <div className="mx-auto max-w-[1350px]">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-[42px] flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <div className="mb-[17px] flex items-center gap-[10px]">
            <span className="h-[5px] w-[5px] bg-[#6054ff]" />

            <span className="font-mono text-[12px] font-normal tracking-[0.5px] text-white/70">
              SMART JOB DISCOVERY
            </span>

            <span className="h-[5px] w-[5px] bg-[#6054ff]" />
          </div>

          {/* Heading */}
          <h2 className="max-w-[550px] text-[30px] font-medium leading-[1.2] tracking-[-1.2px] text-white sm:text-[36px] md:text-[40px]">
            The roles you'd never
            <br />
            find by searching
          </h2>
        </motion.div>

        {/* Job Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
        >
          {jobs.map((job) => (
            <motion.article
              key={job.id}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.25 },
              }}
              className="group flex min-h-[240px] flex-col rounded-[16px] border border-white/[0.025] bg-[#151515] p-[20px] transition-colors duration-300 hover:border-[#6054ff]/30 hover:bg-[#191919] sm:min-h-[240px] lg:min-h-[240px]"
            >
              {/* Job Title */}
              <h3 className="text-[20px] font-medium leading-tight tracking-[-0.5px] text-white">
                {job.title}
              </h3>

              {/* Description */}
              <p className="mt-[11px] max-w-[280px] text-[11px] font-normal leading-[1.65] text-white/55">
                {job.description}
              </p>

              {/* Job Details */}
              <div className="mt-[20px] flex flex-wrap items-center gap-[6px]">

                <JobBadge icon={<LocationIcon />}>
                  {job.location}
                </JobBadge>

                <JobBadge icon={<Briefcase className="h-[11px] w-[11px]" />}>
                  {job.type}
                </JobBadge>

                <JobBadge icon={<PriceIcon />}>
                  {job.salary}
                </JobBadge>

              </div>

              {/* Apply Now */}
              <Link
                href="/jobs"
                className="mt-auto inline-flex w-fit items-center gap-[7px] pt-[24px] text-[11px] font-medium text-white transition-colors duration-200 hover:text-[#a69fff]"
              >
                Apply Now

                <ArrowRight className="h-[13px] w-[13px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-[26px] flex justify-center"
        >
          <Link
            href="/jobs"
            className="inline-flex h-[40px] items-center justify-center rounded-[9px] bg-white px-[17px] text-[12px] font-medium text-black transition-all duration-300 hover:bg-[#6054ff] hover:text-white active:scale-[0.97]"
          >
            View all job openings
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
