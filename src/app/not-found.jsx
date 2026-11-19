
"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121212]">

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/errorbg.png')",
                }}
            />

            {/* Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 mt-[600px] flex flex-col items-center gap-4 lg:mt-[500px] sm:flex-row"
            >
                <Link
                    href="/"
                    className="flex h-12 min-w-[155px] items-center justify-center rounded-[8px] bg-white px-8 text-xs font-semibold tracking-wider text-black transition-all duration-300 hover:bg-zinc-200"
                >
                    GO HOME
                </Link>

                <button
                    onClick={() => window.history.back()}
                    className="flex h-12 min-w-[155px] items-center justify-center rounded-[8px] border border-white/30 bg-white/5 px-8 text-xs font-semibold tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                >
                    GO BACK
                </button>
            </motion.div>
        </main>
    );
}
