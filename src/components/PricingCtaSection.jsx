
"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Button } from "@heroui/react";

import {
  CrownDiamond,
  BarsAscendingAlignLeft,
  Thunderbolt,
  Plus,
  ArrowRight,
} from "@gravity-ui/icons";

import { motion, AnimatePresence } from "motion/react";

// ============================================
// PRICING DATA
// ============================================

const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 0,
    icon: CrownDiamond,
    featured: false,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 17,
    icon: BarsAscendingAlignLeft,
    featured: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 99,
    icon: Thunderbolt,
    featured: false,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function PricingCtaSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const getPrice = (price) => {
    if (price === 0) return 0;

    return billingCycle === "yearly"
      ? Math.round(price * 0.75)
      : price;
  };

  return (
    <main className="relative w-full overflow-hidden bg-[#050507] text-white">

      {/* ========================================
          PRICING SECTION
      ======================================== */}

      <section
        id="pricing"
        className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pt-24 pb-16 sm:px-8 lg:px-10"
      >

        {/* Pricing Label */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2.5 text-xs font-medium tracking-[0.16em] text-zinc-400"
        >
          <span className="h-1.5 w-1.5 rounded-[1px] bg-[#6555ff]" />

          <span>PRICING</span>

          <span className="h-1.5 w-1.5 rounded-[1px] bg-[#6555ff]" />
        </motion.div>

        {/* Main Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto mt-4 max-w-[650px] text-center text-[34px] font-medium leading-[1.13] tracking-[-0.045em] text-white sm:text-[40px] md:text-[44px]"
        >
          Pay for the leverage,
          <br />
          not the listings
        </motion.h2>

        {/* ========================================
            BILLING TOGGLE
        ======================================== */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center rounded-full border border-white/[0.07] bg-[#29292c] p-1.5">

            {/* Monthly */}

            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              aria-pressed={billingCycle === "monthly"}
              className={`relative flex h-[34px] items-center justify-center rounded-full px-5 text-[12px] font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "text-black"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              {billingCycle === "monthly" && (
                <motion.span
                  layoutId="billing-pill"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}

              <span className="relative z-10">Monthly</span>
            </button>

            {/* Yearly */}

            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              aria-pressed={billingCycle === "yearly"}
              className={`relative flex h-[34px] items-center justify-center gap-2 rounded-full px-5 text-[12px] font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "text-black"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              {billingCycle === "yearly" && (
                <motion.span
                  layoutId="billing-pill"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}

              <span className="relative z-10">Yearly</span>

              <span className="relative z-10 rounded-full bg-[#e000c9] px-2 py-1 text-[10px] font-semibold text-white">
                25%
              </span>
            </button>

          </div>
        </motion.div>

        {/* ========================================
            PRICING CARDS
        ======================================== */}

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">

          {PRICING_PLANS.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = getPrice(plan.monthlyPrice);

            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: 0.12 + index * 0.09,
                }}
                whileHover={{ y: -5 }}
                className={`group relative flex min-h-[310px] flex-col justify-between rounded-[17px] border p-5 sm:p-5 lg:p-6 transition-all duration-300 ${
                  plan.featured
                    ? "border-white/[0.17] bg-[#171719] shadow-[0_0_45px_rgba(255,255,255,0.055)]"
                    : "border-white/[0.12] bg-[#050507] hover:border-white/[0.24]"
                }`}
              >

                <div>

                  {/* Card Header */}

                  <div className="flex items-center justify-between gap-2">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.10] bg-white/[0.04] text-[#e9b7ff]">
                        <Icon className="h-[19px] w-[19px]" />
                      </div>

                      <h3 className="truncate text-[17px] font-medium tracking-[-0.02em] text-white">
                        {plan.name}
                      </h3>

                    </div>

                    {/* Price */}

                    <div className="flex shrink-0 items-baseline gap-1">

                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${billingCycle}-${currentPrice}`}
                          initial={{ opacity: 0, y: -7 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 7 }}
                          transition={{ duration: 0.2 }}
                          className="text-[34px] font-medium leading-none tracking-[-0.065em] text-white"
                        >
                          ${currentPrice}
                        </motion.span>
                      </AnimatePresence>

                      <span className="text-[10px] text-zinc-400">
                        /month
                      </span>

                    </div>

                  </div>

                  {/* Features */}

                  <div className="mt-7">

                    <p className="mb-4 text-[13px] font-medium text-zinc-200">
                      Start building your insights hub:
                    </p>

                    <ul className="space-y-3.5">

                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2.5 text-[12px] leading-[1.5] text-zinc-400"
                        >
                          <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] bg-[#29292c] text-zinc-200">
                            <Plus className="h-3 w-3" />
                          </span>

                          <span>{feature}</span>
                        </li>
                      ))}

                    </ul>

                  </div>

                </div>

                {/* Choose Plan */}

                <Button
                  fullWidth
                  onPress={() => {
                    // Connect subscription checkout here.
                  }}
                  className={`group/btn mt-7 flex h-[42px] min-h-[42px] w-full items-center justify-between rounded-[8px] px-4 text-[12px] font-medium transition-all duration-200 ${
                    plan.featured
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "border border-white/[0.07] bg-[#29292c] text-white hover:bg-[#37373b]"
                  }`}
                >
                  <span>Choose This Plan</span>

                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Button>

              </motion.article>
            );
          })}

        </div>
      </section>

      {/* ========================================
          FOOTER / BOTTOM CTA
      ======================================== */}

      <footer className="relative isolate mt-10 min-h-[500px] w-full overflow-hidden bg-[#050507] pt-[150px] pb-24 sm:min-h-[540px] sm:pt-[175px]">

        {/* =====================================
            BACKGROUND IMAGE COMPOSITION
            BOTH IMAGES SAME POSITION & SIZE
        ===================================== */}

        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

          {/* Purple ambient light behind images */}

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 28%, rgba(83,65,220,0.22) 0%, transparent 65%)",
            }}
          />

          {/* SAME IMAGE CONTAINER FOR BOTH IMAGES */}

          <div className="absolute inset-0">

            {/* Original CTA Grid Image - Bottom Layer */}

            <Image
              src="/images/cta-bg.png"
              alt="Purple perspective globe grid"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top opacity-95"
            />

            {/* Purple Glow Image - Top Layer */}

            <div className="absolute inset-0 mix-blend-screen">

              <Image
                src="/images/purple-glow.png"
                alt="Purple and blue neon glowing sphere"
                fill
                priority
                sizes="100vw"
                className="object-cover object-top opacity-85"
              />

            </div>

          </div>

          {/* Additional ambient glow */}

          <div
            className="absolute left-1/2 top-[5%] h-[350px] w-[90%] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(105,75,255,0.20) 0%, rgba(75,50,200,0.10) 45%, transparent 75%)",
              filter: "blur(45px)",
            }}
          />

          {/* Top Fade */}

          <div className="absolute inset-x-0 top-0 h-[130px] bg-gradient-to-b from-[#050507] via-[#050507]/55 to-transparent" />

          {/* Bottom Fade */}

          <div className="absolute inset-x-0 bottom-0 h-[150px] bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent" />

          {/* Side Fade */}

          <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/25 via-transparent to-[#050507]/25" />

        </div>

        {/* =====================================
            CTA CONTENT
        ===================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="relative z-10 mx-auto max-w-[850px] px-5 text-center"
        >

          {/* Heading */}

          <h2 className="text-[36px] font-medium leading-[1.15] tracking-[-0.055em] text-white sm:text-[44px] md:text-[48px]">
            Your next role is
            <br />
            already looking for you
          </h2>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-[560px] text-[14px] font-normal leading-[1.7] text-white/65 sm:text-[15px]">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>

          {/* CTA Buttons */}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

            <Button
              onPress={() => {
                // Navigate to registration page.
              }}
              className="h-[44px] min-h-[44px] rounded-[9px] bg-white px-6 text-[13px] font-medium text-black shadow-lg shadow-black/20 transition-colors hover:bg-zinc-200"
            >
              Create a free account
            </Button>

            <Button
              onPress={() => {
                document.getElementById("pricing")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              variant="secondary"
              className="h-[44px] min-h-[44px] rounded-[9px] border border-white/15 bg-[#111116]/70 px-6 text-[13px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              View pricing
            </Button>

          </div>

        </motion.div>

      </footer>

    </main>
  );
}
