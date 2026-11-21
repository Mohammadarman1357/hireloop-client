
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button, Form, Input, Switch, TextArea } from "@heroui/react";
import Swal from "sweetalert2";

const categories = [
    "Technology",
    "Design & Creative",
    "Marketing",
    "Sales",
    "Finance & Accounting",
    "Human Resources",
    "Engineering",
    "Customer Support",
    "Education",
    "Healthcare",
    "Other",
];

const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
];

const currencies = [
    { label: "USD ($)", value: "USD" },
    { label: "BDT (৳)", value: "BDT" },
    { label: "EUR (€)", value: "EUR" },
    { label: "GBP (£)", value: "GBP" },
    { label: "INR (₹)", value: "INR" },
];

const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#202023] px-4 py-3 text-sm text-white placeholder:text-gray-500 shadow-none outline-none transition-all hover:border-white/20 focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20";

const labelClass =
    "mb-2 block text-sm font-medium text-gray-300";

const pageVariants = {
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
            staggerChildren: 0.08,
        },
    },
};

const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 15,
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

function SelectField({
    label,
    name,
    value,
    options,
    placeholder,
    onChange,
    required = false,
}) {
    return (
        <div className="min-w-0">

            <label
                htmlFor={name}
                className={labelClass}
            >
                {label}
            </label>

            <div className="relative">

                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`${inputClass} min-h-[46px] appearance-none pr-10`}
                >

                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => {
                        const item =
                            typeof option === "string"
                                ? {
                                    label: option,
                                    value: option,
                                }
                                : option;

                        return (
                            <option
                                key={item.value}
                                value={item.value}
                                className="bg-[#202023] text-white"
                            >
                                {item.label}
                            </option>
                        );
                    })}

                </select>

                {/* Dropdown Arrow */}
                <span className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-gray-400" />

            </div>

        </div>
    );
}

export default function PostNewJobPage() {

    const [isRemote, setIsRemote] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState("");


    const [formData, setFormData] = useState({
        title: "",
        category: "",
        jobType: "Full-time",

        minSalary: "",
        maxSalary: "",
        currency: "USD",

        city: "",
        country: "",
        deadline: "",

        responsibilities: "",
        requirements: "",
        benefits: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFormError("");
        setSuccess(false);
    };


    const handleRemoteToggle = () => {
        setIsRemote((prev) => !prev);
        setSuccess(false);
    };


    const today = new Date();

    const minDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");



    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormError("");
        setSuccess(false);

        // Required Field Validation
        const requiredFields = [
            {
                value: formData.title,
                title: "Job Title Required",
                text: "Please enter a job title.",
            },
            {
                value: formData.category,
                title: "Job Category Required",
                text: "Please select a job category.",
            },
            {
                value: formData.deadline,
                title: "Application Deadline Required",
                text: "Please select an application deadline.",
            },
            {
                value: formData.responsibilities,
                title: "Responsibilities Required",
                text: "Please describe the job responsibilities.",
            },
            {
                value: formData.requirements,
                title: "Requirements Required",
                text: "Please provide the job requirements.",
            },
        ];

        // Check all required fields
        const emptyField = requiredFields.find(
            (field) => !field.value.trim()
        );

        if (emptyField) {
            await Swal.fire({
                icon: "error",
                title: emptyField.title,
                text: emptyField.text,
                confirmButtonText: "Okay",
                confirmButtonColor: "#7c3aed",
                background: "#202023",
                color: "#ffffff",
            });

            return;
        }

        // Minimum Length Validation
        if (formData.title.trim().length < 3) {
            await Swal.fire({
                icon: "error",
                title: "Invalid Job Title",
                text: "Job title must contain at least 3 characters.",
                confirmButtonColor: "#7c3aed",
                background: "#202023",
                color: "#ffffff",
            });

            return;
        }

        if (
            formData.responsibilities.trim().length < 10 ||
            formData.requirements.trim().length < 10
        ) {
            await Swal.fire({
                icon: "error",
                title: "Description Too Short",
                text: "Responsibilities and requirements must contain at least 10 characters.",
                confirmButtonColor: "#7c3aed",
                background: "#202023",
                color: "#ffffff",
            });

            return;
        }

        // Salary Validation
        const minSalary = Number(formData.minSalary);
        const maxSalary = Number(formData.maxSalary);

        if (
            formData.minSalary !== "" &&
            formData.maxSalary !== "" &&
            minSalary > maxSalary
        ) {
            await Swal.fire({
                icon: "error",
                title: "Invalid Salary Range",
                text: "Maximum salary must be greater than or equal to minimum salary.",
                confirmButtonColor: "#7c3aed",
                background: "#202023",
                color: "#ffffff",
            });

            return;
        }

        // Remote Location Validation
        if (
            !isRemote &&
            (!formData.city.trim() || !formData.country.trim())
        ) {
            await Swal.fire({
                icon: "error",
                title: "Location Required",
                text: "Please provide your job location.",
                confirmButtonColor: "#7c3aed",
                background: "#202023",
                color: "#ffffff",
            });

            return;
        }

        // Prepare Submission Data
        const payload = {
            ...formData,
            title: formData.title.trim(),
            responsibilities: formData.responsibilities.trim(),
            requirements: formData.requirements.trim(),
            benefits: formData.benefits.trim(),
            isRemote,
            city: isRemote ? "" : formData.city.trim(),
            country: isRemote ? "" : formData.country.trim(),
            minSalary:
                formData.minSalary === ""
                    ? null
                    : Number(formData.minSalary),
            maxSalary:
                formData.maxSalary === ""
                    ? null
                    : Number(formData.maxSalary),
        };

        try {
            setIsSubmitting(true);

            // API integration will go here.
            console.log("Job Submission:", payload);

            await Swal.fire({
                icon: "success",
                title: "Job Submitted Successfully!",
                text: "Your job details have been validated and are ready for publishing.",
                confirmButtonText: "Continue",
                confirmButtonColor: "#7c3aed",
                background: "#202023",
                color: "#ffffff",
            });

        } catch (error) {
            console.error("Job submission error:", error);

            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong. Please try again.";

            await Swal.fire({
                icon: "error",
                title: "Submission Failed!",
                text: errorMessage,
                confirmButtonText: "Try Again",
                confirmButtonColor: "#7c3aed",
                background: "#202023",
                color: "#ffffff",
            });

        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">

            <motion.div
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                className="mx-auto max-w-4xl"
            >

                {/* Main Form Container */}
                <div className="overflow-hidden rounded-xl border border-white/15 bg-[#171719] shadow-2xl">

                    {/* ================================= */}
                    {/* Header */}
                    {/* ================================= */}

                    <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#202023] px-5 py-5 sm:px-7">

                        <div>

                            <h1 className="text-lg font-semibold text-white sm:text-xl">
                                Post a New Job
                            </h1>

                            <p className="mt-1 text-xs text-gray-400">
                                Enter your job details to start hiring on HireLoop.
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            aria-label="Go back"
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <span className="text-xl leading-none">
                                ×
                            </span>
                        </button>

                    </div>

                    {/* ================================= */}
                    {/* Form */}
                    {/* ================================= */}

                    <Form validationBehavior="aria" onSubmit={handleSubmit}>

                        <div className="space-y-8 p-5 sm:p-7">

                            {/* ================================= */}
                            {/* Job Information */}
                            {/* ================================= */}

                            <motion.section variants={sectionVariants}>

                                <div className="mb-5">

                                    <h2 className="text-base font-semibold text-white">
                                        Job Information
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Provide the basic information about the position.
                                    </p>

                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                    {/* Job Title */}
                                    <div className="sm:col-span-2">

                                        <label
                                            htmlFor="title"
                                            className={labelClass}
                                        >
                                            Job Title *
                                        </label>

                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="e.g. Senior Frontend Developer"
                                            required
                                            minLength={3}
                                            maxLength={120}
                                            fullWidth
                                            variant="secondary"
                                            className={inputClass}
                                        />

                                    </div>

                                    {/* Job Category */}
                                    <SelectField
                                        label="Job Category *"
                                        name="category"
                                        value={formData.category}
                                        options={categories}
                                        placeholder="Select category"
                                        onChange={handleChange}
                                        required
                                    />

                                    {/* Job Type */}
                                    <SelectField
                                        label="Job Type *"
                                        name="jobType"
                                        value={formData.jobType}
                                        options={jobTypes}
                                        onChange={handleChange}
                                        required
                                    />

                                    {/* Minimum Salary */}
                                    <div>

                                        <label
                                            htmlFor="minSalary"
                                            className={labelClass}
                                        >
                                            Minimum Salary
                                        </label>

                                        <Input
                                            id="minSalary"
                                            name="minSalary"
                                            type="number"
                                            value={formData.minSalary}
                                            onChange={handleChange}
                                            placeholder="e.g. 50000"
                                            min={0}
                                            step="any"
                                            fullWidth
                                            variant="secondary"
                                            className={inputClass}
                                        />

                                    </div>

                                    {/* Maximum Salary */}
                                    <div>

                                        <label
                                            htmlFor="maxSalary"
                                            className={labelClass}
                                        >
                                            Maximum Salary
                                        </label>

                                        <Input
                                            id="maxSalary"
                                            name="maxSalary"
                                            type="number"
                                            value={formData.maxSalary}
                                            onChange={handleChange}
                                            placeholder="e.g. 80000"
                                            min={0}
                                            step="any"
                                            fullWidth
                                            variant="secondary"
                                            className={inputClass}
                                        />

                                    </div>

                                    {/* Currency */}
                                    <SelectField
                                        label="Currency"
                                        name="currency"
                                        value={formData.currency}
                                        options={currencies}
                                        onChange={handleChange}
                                    />

                                    {/* Application Deadline */}
                                    <div>

                                        <label
                                            htmlFor="deadline"
                                            className={labelClass}
                                        >
                                            Application Deadline *
                                        </label>

                                        <Input
                                            id="deadline"
                                            name="deadline"
                                            type="date"
                                            value={formData.deadline}
                                            onChange={handleChange}
                                            min={minDate}
                                            required
                                            fullWidth
                                            variant="secondary"
                                            className={`${inputClass} [color-scheme:dark]`}
                                        />

                                    </div>

                                    {/* ================================= */}
                                    {/* Remote Toggle */}
                                    {/* ================================= */}



                                    {/* ================================= */}
                                    {/* Remote Toggle */}
                                    {/* ================================= */}

                                    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#202023] p-4 sm:col-span-2">

                                        <div>
                                            <h3 className="text-sm font-medium text-white">
                                                Remote Position
                                            </h3>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Allow candidates to work remotely.
                                            </p>
                                        </div>

                                        <Switch
                                            isSelected={isRemote}
                                            onChange={(selected) => {
                                                setIsRemote(selected);
                                                setSuccess(false);
                                            }}
                                            size="md"
                                            aria-label="Remote position"
                                        >
                                            {({ isSelected }) => (
                                                <Switch.Content>
                                                    <Switch.Control
                                                        className={`h-6 w-11 transition-colors duration-300 ${isSelected
                                                            ? "!bg-violet-600"
                                                            : "!bg-gray-600"
                                                            }`}
                                                    >
                                                        <Switch.Thumb className="bg-white shadow-sm" />
                                                    </Switch.Control>
                                                </Switch.Content>
                                            )}
                                        </Switch>

                                    </div>


                                    {/* ================================= */}
                                    {/* Location */}
                                    {/* ================================= */}

                                    <AnimatePresence initial={false}>

                                        {!isRemote && (

                                            <motion.div
                                                key="location-fields"
                                                initial={{
                                                    opacity: 0,
                                                    height: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    height: "auto",
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    height: 0,
                                                }}
                                                transition={{
                                                    duration: 0.25,
                                                }}
                                                className="grid grid-cols-1 gap-5 overflow-hidden sm:col-span-2 sm:grid-cols-2"
                                            >

                                                {/* City */}
                                                <div>

                                                    <label
                                                        htmlFor="city"
                                                        className={labelClass}
                                                    >
                                                        City *
                                                    </label>

                                                    <Input
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        placeholder="e.g. Dhaka"
                                                        required={!isRemote}
                                                        fullWidth
                                                        variant="secondary"
                                                        className={inputClass}
                                                    />

                                                </div>

                                                {/* Country */}
                                                <div>

                                                    <label
                                                        htmlFor="country"
                                                        className={labelClass}
                                                    >
                                                        Country *
                                                    </label>

                                                    <Input
                                                        id="country"
                                                        name="country"
                                                        type="text"
                                                        value={formData.country}
                                                        onChange={handleChange}
                                                        placeholder="e.g. Bangladesh"
                                                        required={!isRemote}
                                                        fullWidth
                                                        variant="secondary"
                                                        className={inputClass}
                                                    />

                                                </div>

                                            </motion.div>

                                        )}

                                    </AnimatePresence>

                                </div>

                            </motion.section>

                            {/* Divider */}
                            <div className="border-t border-white/10" />

                            {/* ================================= */}
                            {/* Job Description */}
                            {/* ================================= */}

                            <motion.section variants={sectionVariants}>

                                <div className="mb-5">

                                    <h2 className="text-base font-semibold text-white">
                                        Job Description
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Explain what candidates will do and what you expect from them.
                                    </p>

                                </div>

                                <div className="space-y-5">

                                    {/* Responsibilities */}
                                    <div>

                                        <label
                                            htmlFor="responsibilities"
                                            className={labelClass}
                                        >
                                            Responsibilities *
                                        </label>

                                        <TextArea
                                            id="responsibilities"
                                            name="responsibilities"
                                            value={formData.responsibilities}
                                            onChange={handleChange}
                                            placeholder="Describe the key responsibilities of this position..."
                                            rows={5}
                                            required
                                            minLength={10}
                                            maxLength={10000}
                                            fullWidth
                                            variant="secondary"
                                            className={inputClass}
                                        />

                                    </div>

                                    {/* Requirements */}
                                    <div>

                                        <label
                                            htmlFor="requirements"
                                            className={labelClass}
                                        >
                                            Requirements *
                                        </label>

                                        <TextArea
                                            id="requirements"
                                            name="requirements"
                                            value={formData.requirements}
                                            onChange={handleChange}
                                            placeholder="Mention skills, qualifications, and experience..."
                                            rows={5}
                                            required
                                            minLength={10}
                                            maxLength={10000}
                                            fullWidth
                                            variant="secondary"
                                            className={inputClass}
                                        />

                                    </div>

                                    {/* Benefits */}
                                    <div>

                                        <label
                                            htmlFor="benefits"
                                            className={labelClass}
                                        >
                                            Benefits

                                            <span className="ml-2 text-xs font-normal text-gray-500">
                                                (Optional)
                                            </span>

                                        </label>

                                        <TextArea
                                            id="benefits"
                                            name="benefits"
                                            value={formData.benefits}
                                            onChange={handleChange}
                                            placeholder="Mention additional benefits offered by your company..."
                                            rows={4}
                                            maxLength={5000}
                                            fullWidth
                                            variant="secondary"
                                            className={inputClass}
                                        />

                                    </div>

                                </div>

                            </motion.section>

                            {/* ================================= */}
                            {/* Feedback Messages */}
                            {/* ================================= */}

                            <AnimatePresence mode="wait">

                                {formError && (

                                    <motion.div
                                        key="error"
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10,
                                        }}
                                        role="alert"
                                        className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
                                    >
                                        {formError}
                                    </motion.div>

                                )}

                                {success && (

                                    <motion.div
                                        key="success"
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10,
                                        }}
                                        role="status"
                                        className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400"
                                    >
                                        Form validated successfully. Your job data is ready for API submission.
                                    </motion.div>

                                )}

                            </AnimatePresence>

                        </div>

                        {/* ================================= */}
                        {/* Footer */}
                        {/* ================================= */}

                        <div className="flex flex-col-reverse justify-end gap-3 border-t border-white/10 bg-[#202023] px-5 py-5 sm:flex-row sm:px-7">

                            <Button
                                type="button"
                                variant="tertiary"
                                onPress={() => window.history.back()}
                                className="rounded-lg border border-white/10 px-7 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5"
                            >
                                Cancel
                            </Button>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >

                                <Button
                                    type="submit"
                                    variant="primary"
                                    isDisabled={isSubmitting}
                                    isPending={isSubmitting}
                                    className="w-full rounded-lg bg-white px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-200 sm:w-auto"
                                >
                                    {isSubmitting
                                        ? "Submitting..."
                                        : "Publish Job"}
                                </Button>

                            </motion.div>

                        </div>

                    </Form>

                </div>

            </motion.div>

        </div>
    );
}
