
"use client";

import React, { useMemo, useState } from "react";
import { Chip, Table, Button, Input } from "@heroui/react";

import {
    motion,
    AnimatePresence,
    useReducedMotion,
} from "motion/react";

import {
    Magnifier,
    Eye,
    Pencil,
    TrashBin,
    Briefcase,
    Calendar,
    MapPin,
    CirclePlus,
    Xmark,
} from "@gravity-ui/icons";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const MotionDiv = motion.div;
const MotionButton = motion.button;

// ========================================
// TABLE COLUMNS
// ========================================

const columns = [
    { id: "title", name: "JOB TITLE" },
    { id: "jobType", name: "JOB TYPE" },
    { id: "location", name: "LOCATION" },
    { id: "deadline", name: "DEADLINE" },
    { id: "status", name: "STATUS" },
    { id: "actions", name: "ACTIONS" },
];

// ========================================
// STATUS CONFIGURATION
// ========================================

const statusConfig = {
    active: {
        label: "Active",
        color: "success",
    },
    new: {
        label: "New",
        color: "default",
    },
    draft: {
        label: "Draft",
        color: "warning",
    },
    rejected: {
        label: "Rejected",
        color: "danger",
    },
    closed: {
        label: "Closed",
        color: "default",
    },
    pending: {
        label: "Pending",
        color: "warning",
    },
    paused: {
        label: "Paused",
        color: "default",
    },
};

// ========================================
// MOTION VARIANTS
// ========================================

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 18,
    },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            delay: index * 0.07,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

// ========================================
// MAIN COMPONENT
// ========================================

// Optional prop:
// Pass an async delete function from the parent
// when your backend delete API is ready.

const RecruiterJobsTable = ({
    jobs = [],
    onDeleteJob,
}) => {
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const [search, setSearch] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // ========================================
    // SEARCH FILTER
    // ========================================

    const filteredJobs = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return jobs;

        return jobs.filter((job) =>
            [
                job.title,
                job.category,
                job.jobType,
                job.city,
                job.country,
                job.status,
            ]
                .filter(Boolean)
                .some((value) =>
                    String(value).toLowerCase().includes(query)
                )
        );
    }, [jobs, search]);

    // ========================================
    // STATISTICS
    // ========================================

    const stats = useMemo(
        () => [
            {
                label: "Total Jobs",
                value: jobs.length,
                icon: Briefcase,
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-400",
            },
            {
                label: "Active Jobs",
                value: jobs.filter(
                    (job) => job.status?.toLowerCase() === "active"
                ).length,
                icon: Briefcase,
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-400",
            },
            {
                label: "Draft Jobs",
                value: jobs.filter(
                    (job) => job.status?.toLowerCase() === "draft"
                ).length,
                icon: Pencil,
                iconBg: "bg-amber-500/10",
                iconColor: "text-amber-400",
            },
            {
                label: "Closed Jobs",
                value: jobs.filter(
                    (job) => job.status?.toLowerCase() === "closed"
                ).length,
                icon: Calendar,
                iconBg: "bg-rose-500/10",
                iconColor: "text-rose-400",
            },
        ],
        [jobs]
    );

    // ========================================
    // DATE FORMATTER
    // ========================================

    const formatDate = (date) => {
        if (!date) return "Not specified";

        const parsedDate = new Date(`${date}T00:00:00`);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // ========================================
    // GET STATUS
    // ========================================

    const getStatus = (status) => {
        const normalized = String(status || "pending").toLowerCase();

        return (
            statusConfig[normalized] || {
                label:
                    normalized.charAt(0).toUpperCase() +
                    normalized.slice(1),
                color: "default",
            }
        );
    };

    // ========================================
    // SWEET ALERT CONFIGURATION
    // ========================================

    const showAlert = (options) => {
        return Swal.fire({
            ...options,

            background: "#18181b",
            color: "#ffffff",

            buttonsStyling: false,
            heightAuto: false,

            backdrop: "rgba(5, 5, 10, 0.78)",

            showClass: {
                popup: "animate__animated animate__fadeInUp animate__faster",
            },

            hideClass: {
                popup: "animate__animated animate__fadeOutDown animate__faster",
            },

            customClass: {
                popup: "w-[min(92vw,440px)] rounded-2xl border border-white/10 bg-[#18181b] p-6 shadow-2xl",
                title: "text-xl font-bold tracking-tight text-white",
                htmlContainer: "mt-2 text-sm leading-6 text-zinc-400",
                actions: "mt-6 gap-3",
                confirmButton:
                    "rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500",
                cancelButton:
                    "rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/10",
            },
        });
    };

    // ========================================
    // ESCAPE HTML
    // ========================================

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (char) => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            };

            return entities[char];
        });
    }

    // ========================================
    // VIEW JOB
    // ========================================

    const handleView = (job) => {
        router.push(`/dashboard/recruiter/jobs/${job._id}`);
    };

    // ========================================
    // EDIT JOB CONFIRMATION
    // ========================================

    const handleEdit = async (job) => {
        try {
            const result = await showAlert({
                icon: "question",
                iconColor: "#818cf8",

                title: "Ready to make changes?",

                html: `
                    <div class="space-y-3 text-left">
                        <p class="text-sm text-zinc-400">
                            You're about to edit this job posting:
                        </p>

                        <div class="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">
                            <p class="text-sm font-semibold text-white">
                                ${escapeHtml(job.title || "Untitled Job")}
                            </p>
                        </div>

                        <p class="text-xs text-zinc-500">
                            You can update the job details on the next page.
                        </p>
                    </div>
                `,

                showCancelButton: true,
                confirmButtonText: "Continue to Edit",
                cancelButtonText: "Maybe Later",

                reverseButtons: true,
                focusConfirm: false,
            });

            if (result.isConfirmed) {
                router.push(
                    `/dashboard/recruiter/jobs/${job._id}/edit`
                );
            }
        } catch (error) {
            console.error("Edit confirmation error:", error);
        }
    };

    // ========================================
    // DELETE JOB CONFIRMATION
    // ========================================

    const handleDelete = async (job) => {
        if (isProcessing) return;

        try {
            const result = await showAlert({
                icon: "warning",
                iconColor: "#fb7185",

                title: "Delete this job?",

                html: `
                    <div class="space-y-3 text-left">
                        <p class="text-sm text-zinc-400">
                            Are you sure you want to delete this job posting?
                        </p>

                        <div class="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3">
                            <p class="text-sm font-semibold text-white">
                                ${escapeHtml(job.title || "Untitled Job")}
                            </p>
                        </div>

                        <p class="text-xs text-rose-400">
                            This action cannot be undone.
                        </p>
                    </div>
                `,

                showCancelButton: true,
                confirmButtonText: "Yes, Delete Job",
                cancelButtonText: "Keep Job",

                confirmButtonColor: "#e11d48",
                reverseButtons: true,
                focusCancel: true,
            });

            if (!result.isConfirmed) return;

            // Do not pretend the job was deleted.
            // Connect your actual backend delete function here.

            if (typeof onDeleteJob !== "function") {
                await showAlert({
                    icon: "info",
                    iconColor: "#818cf8",
                    title: "Delete API not connected",
                    text: "The confirmation works, but the backend delete function still needs to be connected.",
                    confirmButtonText: "Got it",
                });

                return;
            }

            setIsProcessing(true);

            await onDeleteJob(job._id);

            await showAlert({
                icon: "success",
                iconColor: "#34d399",
                title: "Job deleted!",
                text: "The job posting has been deleted successfully.",
                showConfirmButton: false,
                timer: 1700,
            });

            router.refresh();
        } catch (error) {
            console.error("Delete job error:", error);

            await showAlert({
                icon: "error",
                iconColor: "#fb7185",
                title: "Deletion failed",
                text:
                    error?.message ||
                    "Something went wrong. Please try again.",
                confirmButtonText: "Try Again",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // ========================================
    // RENDER
    // ========================================

    return (
        <MotionDiv
            initial={
                shouldReduceMotion
                    ? false
                    : {
                          opacity: 0,
                          y: 20,
                      }
            }
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto w-full max-w-7xl space-y-7"
        >
            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Manage Jobs
                    </h1>

                    <p className="mt-2 text-sm text-white/45">
                        Manage, track and organize all your job postings.
                    </p>
                </div>

                {/* POST A JOB BUTTON */}

                <MotionButton
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
                    onClick={() =>
                        router.push("/dashboard/recruiter/jobs/new")
                    }
                    className="group relative flex w-fit items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-600/30"
                >
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <CirclePlus className="relative size-4.5" />

                    <span className="relative">
                        Post a Job
                    </span>
                </MotionButton>
            </div>

            {/* ================================= */}
            {/* STATISTICS CARDS */}
            {/* ================================= */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <MotionDiv
                            key={stat.label}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={
                                shouldReduceMotion
                                    ? undefined
                                    : {
                                          y: -5,
                                      }
                            }
                            className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#18181b] p-4 transition-colors duration-300 hover:border-white/15 sm:p-5"
                        >
                            <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-white/[0.025] blur-2xl transition-all duration-500 group-hover:bg-white/[0.06]" />

                            <div className="relative flex items-center justify-between gap-2">
                                <p className="text-xs font-medium text-white/45 sm:text-sm">
                                    {stat.label}
                                </p>

                                <div
                                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
                                >
                                    <Icon
                                        className={`size-4 ${stat.iconColor}`}
                                    />
                                </div>
                            </div>

                            <motion.p
                                key={stat.value}
                                initial={
                                    shouldReduceMotion
                                        ? false
                                        : {
                                              opacity: 0,
                                              y: 8,
                                          }
                                }
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{ duration: 0.35 }}
                                className="relative mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl"
                            >
                                {stat.value}
                            </motion.p>
                        </MotionDiv>
                    );
                })}
            </div>

            {/* ================================= */}
            {/* JOB TABLE */}
            {/* ================================= */}

            <MotionDiv
                initial={
                    shouldReduceMotion
                        ? false
                        : {
                              opacity: 0,
                              y: 15,
                          }
                }
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: shouldReduceMotion ? 0 : 0.45,
                    delay: shouldReduceMotion ? 0 : 0.2,
                }}
                className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#18181b]"
            >
                {/* TABLE HEADER */}

                <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] p-4 sm:flex-row sm:items-center sm:p-5">
                    <div>
                        <h2 className="text-base font-semibold text-white">
                            All Job Postings
                        </h2>

                        <p className="mt-1 text-xs text-white/40">
                            Showing {filteredJobs.length} of {jobs.length} jobs
                        </p>
                    </div>

                    {/* SEARCH BAR */}

                    <div className="w-full sm:max-w-[300px]">
                        <div className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-[#202023] px-3 transition-colors duration-200 hover:border-white/15 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/10">
                            <Magnifier className="size-4 shrink-0 text-white/40" />

                            <Input
                                type="text"
                                aria-label="Search jobs"
                                placeholder="Search by title, location..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                variant="secondary"
                                className="h-full min-w-0 flex-1 border-0 bg-transparent px-1 text-sm text-white shadow-none outline-none placeholder:text-white/35 hover:bg-transparent focus:bg-transparent focus:outline-none focus:ring-0"
                            />

                            <AnimatePresence>
                                {search && (
                                    <MotionDiv
                                        initial={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setSearch("")}
                                            aria-label="Clear search"
                                            className="flex size-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                                        >
                                            <Xmark className="size-4" />
                                        </button>
                                    </MotionDiv>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* ================================= */}
                {/* TABLE CONTENT */}
                {/* ================================= */}

                <div className="w-full overflow-x-auto">
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content
                                aria-label="Recruiter job management table"
                                className="min-w-[850px]"
                            >
                                <Table.Header>
                                    {columns.map((column) => (
                                        <Table.Column
                                            key={column.id}
                                            id={column.id}
                                            isRowHeader={column.id === "title"}
                                        >
                                            {column.name}
                                        </Table.Column>
                                    ))}
                                </Table.Header>

                                <Table.Body>
                                    <Table.Collection items={filteredJobs}>
                                        {(job) => {
                                            const status = getStatus(job.status);
                                            const normalizedStatus = String(
                                                job.status || "pending"
                                            ).toLowerCase();

                                            return (
                                                <Table.Row key={String(job._id)}>
                                                    {/* JOB TITLE */}

                                                    <Table.Cell>
                                                        <div className="flex flex-col gap-1">
                                                            <span className="font-semibold text-white transition-colors duration-200 hover:text-blue-400">
                                                                {job.title}
                                                            </span>

                                                            <span className="text-xs text-white/40">
                                                                {job.category ||
                                                                    "Uncategorized"}
                                                            </span>
                                                        </div>
                                                    </Table.Cell>

                                                    {/* JOB TYPE */}

                                                    <Table.Cell>
                                                        <span className="text-sm text-white/65">
                                                            {job.jobType ||
                                                                "Not specified"}
                                                        </span>
                                                    </Table.Cell>

                                                    {/* LOCATION */}

                                                    <Table.Cell>
                                                        <div className="flex items-center gap-1.5 text-sm text-white/60">
                                                            <MapPin className="size-3.5 shrink-0 text-white/35" />

                                                            <span>
                                                                {[
                                                                    job.city,
                                                                    job.country,
                                                                ]
                                                                    .filter(Boolean)
                                                                    .join(", ") ||
                                                                    "Remote"}
                                                            </span>
                                                        </div>
                                                    </Table.Cell>

                                                    {/* DEADLINE */}

                                                    <Table.Cell>
                                                        <span className="text-sm text-white/55">
                                                            {formatDate(
                                                                job.deadline
                                                            )}
                                                        </span>
                                                    </Table.Cell>

                                                    {/* STATUS BADGE */}

                                                    <Table.Cell>
                                                        <Chip
                                                            color={status.color}
                                                            size="sm"
                                                            variant="soft"
                                                            className={
                                                                normalizedStatus ===
                                                                "new"
                                                                    ? "border border-white/10 bg-white/[0.05] text-white"
                                                                    : normalizedStatus ===
                                                                      "rejected"
                                                                    ? "border border-rose-500/20"
                                                                    : ""
                                                            }
                                                        >
                                                            <Chip.Label>
                                                                {status.label}
                                                            </Chip.Label>
                                                        </Chip>
                                                    </Table.Cell>

                                                    {/* ACTION BUTTONS */}

                                                    <Table.Cell>
                                                        <div className="flex items-center gap-1">
                                                            {/* VIEW */}

                                                            <MotionDiv
                                                                whileHover={
                                                                    shouldReduceMotion
                                                                        ? undefined
                                                                        : {
                                                                              scale: 1.12,
                                                                          }
                                                                }
                                                                whileTap={
                                                                    shouldReduceMotion
                                                                        ? undefined
                                                                        : {
                                                                              scale: 0.9,
                                                                          }
                                                                }
                                                            >
                                                                <Button
                                                                    isIconOnly
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    aria-label="View job details"
                                                                    className="text-white/45 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                                                                    onPress={() =>
                                                                        handleView(
                                                                            job
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye className="size-4" />
                                                                </Button>
                                                            </MotionDiv>

                                                            {/* EDIT */}

                                                            <MotionDiv
                                                                whileHover={
                                                                    shouldReduceMotion
                                                                        ? undefined
                                                                        : {
                                                                              scale: 1.12,
                                                                          }
                                                                }
                                                                whileTap={
                                                                    shouldReduceMotion
                                                                        ? undefined
                                                                        : {
                                                                              scale: 0.9,
                                                                          }
                                                                }
                                                            >
                                                                <Button
                                                                    isIconOnly
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    aria-label="Edit job"
                                                                    className="text-white/45 transition-colors hover:bg-indigo-500/10 hover:text-indigo-400"
                                                                    onPress={() => {
                                                                        void handleEdit(
                                                                            job
                                                                        );
                                                                    }}
                                                                >
                                                                    <Pencil className="size-4" />
                                                                </Button>
                                                            </MotionDiv>

                                                            {/* DELETE */}

                                                            <MotionDiv
                                                                whileHover={
                                                                    shouldReduceMotion
                                                                        ? undefined
                                                                        : {
                                                                              scale: 1.12,
                                                                          }
                                                                }
                                                                whileTap={
                                                                    shouldReduceMotion
                                                                        ? undefined
                                                                        : {
                                                                              scale: 0.9,
                                                                          }
                                                                }
                                                            >
                                                                <Button
                                                                    isIconOnly
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    aria-label="Delete job"
                                                                    isDisabled={
                                                                        isProcessing
                                                                    }
                                                                    className="text-white/45 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                                                                    onPress={() =>
                                                                        handleDelete(
                                                                            job
                                                                        )
                                                                    }
                                                                >
                                                                    <TrashBin className="size-4" />
                                                                </Button>
                                                            </MotionDiv>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        }}
                                    </Table.Collection>
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>

                    {/* ================================= */}
                    {/* EMPTY STATE */}
                    {/* ================================= */}

                    <AnimatePresence mode="wait">
                        {filteredJobs.length === 0 && (
                            <MotionDiv
                                key={search ? "search-empty" : "empty"}
                                initial={{
                                    opacity: 0,
                                    y: 12,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -8,
                                }}
                                transition={{ duration: 0.25 }}
                                className="flex flex-col items-center justify-center px-5 py-16 text-center"
                            >
                                <MotionDiv
                                    animate={
                                        shouldReduceMotion
                                            ? undefined
                                            : {
                                                  y: [0, -5, 0],
                                              }
                                    }
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="flex size-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]"
                                >
                                    <Briefcase className="size-6 text-white/35" />
                                </MotionDiv>

                                <h3 className="mt-5 font-semibold text-white">
                                    {search
                                        ? "No jobs found"
                                        : "No jobs posted yet"}
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-white/40">
                                    {search
                                        ? "We couldn't find any jobs matching your search. Try a different keyword."
                                        : "Start building your team by publishing your first job opening."}
                                </p>

                                {search && (
                                    <Button
                                        size="sm"
                                        variant="flat"
                                        className="mt-5"
                                        onPress={() => setSearch("")}
                                    >
                                        Clear Search
                                    </Button>
                                )}
                            </MotionDiv>
                        )}
                    </AnimatePresence>
                </div>
            </MotionDiv>
        </MotionDiv>
    );
};

export default RecruiterJobsTable;
