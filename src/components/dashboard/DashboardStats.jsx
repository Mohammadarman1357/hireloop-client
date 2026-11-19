
"use client";

import { motion } from "motion/react";

export default function DashboardStats({ data = [] }) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {data.map((item, index) => {
                const Icon = item.icon;

                return (
                    <motion.div
                        key={item.id || item.title}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        className="rounded-[14px] border border-white/15 bg-[#1C1C1C] p-5 transition-colors duration-300 hover:border-white/25"
                    >
                        {/* Icon */}
                        <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-[#333333] text-[#E4E4E7]">
                            {Icon && <Icon className="size-6" />}
                        </div>

                        {/* Stats */}
                        <div className="space-y-2">
                            <p className="text-sm text-[#BDBDBD]">
                                {item.title}
                            </p>

                            <h3 className="text-[29px] font-medium leading-tight text-white">
                                {item.value}
                            </h3>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
