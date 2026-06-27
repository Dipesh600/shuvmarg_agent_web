"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PartnerData } from "@/data/partners";
import { MoveRight, CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import FAQItem from "@/components/ui/FAQItem";

const NM = '"Neue Machina", system-ui, -apple-system, sans-serif';

export function PartnerHero({ data }: { data: PartnerData }) {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center bg-white overflow-hidden pt-28 md:pt-32 pb-8 md:pb-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >

            <h1
              className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-[#111111] leading-[1.05] mb-6 tracking-tight"
              style={{ fontFamily: NM }}
            >
              {data.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-[#525252] mb-10 max-w-xl leading-[1.6] font-medium">
              {data.hero.subtitle}
            </p>
            {/* Mobile Image */}
            <div className="block lg:hidden relative w-full mb-10">
              <div className="relative aspect-[4/3]">
                <Image
                  src={data.hero.image}
                  alt={data.type}
                  fill
                  className="object-contain scale-110 -rotate-2"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-[#7A1D1B] text-white rounded-xl font-semibold text-[16px] hover:bg-[#5C1414] transition-all shadow-lg shadow-[#7A1D1B]/20 w-full sm:w-auto hover:shadow-xl hover:-translate-y-0.5"
              >
                Become a Partner <MoveRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-8 flex items-center flex-wrap gap-4 sm:gap-6 text-sm font-medium text-[#525252]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                <span>Zero setup fee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                <span>Instant commission</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full hidden lg:block"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={data.hero.image}
                alt={data.type}
                fill
                className="object-contain scale-110 -rotate-2"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function PartnerWhoIsThisFor({ data }: { data: PartnerData }) {
  return (
    <section className="pt-8 lg:pt-12 pb-12 lg:pb-16 bg-white relative z-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-[#111111] mb-6 tracking-tight"
            style={{ fontFamily: NM }}
          >
            Is {data.type} the right fit for you?
          </h2>
          <p className="text-lg md:text-xl text-[#666666] leading-relaxed max-w-2xl mx-auto">
            {data.whoIsThisFor}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function PartnerBenefits({ data }: { data: PartnerData }) {
  return (
    <section className="py-10 lg:py-16 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 lg:mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 flex-shrink-0 bg-[#C99A4A]" />
              <span className="text-[12px] font-medium tracking-wide text-[#7A1D1B] uppercase">
                Why Choose Us
              </span>
              <div className="h-px w-8 flex-shrink-0 bg-[#C99A4A]" />
            </div>
            <h2
              className="font-bold text-[#111111] tracking-tight leading-[1.15]"
              style={{ fontSize: "clamp(32px, 4vw, 44px)" }}
            >
              Why {data.type.toLowerCase()} <br />
              choose Shuv Marg
            </h2>
          </div>
          <div className="max-w-sm pb-2">
            <p className="text-[16px] text-[#666666] leading-relaxed">
              We provide the tools and network you need to grow your business, serve more customers, and maximize your earnings seamlessly.
            </p>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {data.benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex items-start gap-5 p-8 bg-white rounded-[24px] border border-neutral-100 hover:border-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300"
            >
              <div className="w-14 h-14 shrink-0 bg-[#FAFAFA] border border-neutral-100 rounded-2xl flex items-center justify-center text-[#7A1D1B]">
                {(() => {
                  const Icon = Icons[benefit.icon as keyof typeof Icons] as React.ElementType;
                  return Icon ? <Icon strokeWidth={1.5} className="w-6 h-6" /> : null;
                })()}
              </div>

              <div>
                <h3 className="font-bold text-[#111111] text-[18px] md:text-[20px] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[15px] text-[#666666] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerRequirements() {
  const requirements = [
    "Business registration (optional depending on policy)",
    "Internet connection (WiFi or mobile data)",
    "Smartphone, tablet or computer",
    "Bank account for settlements",
    "Basic customer handling skills"
  ];

  return (
    <section className="py-10 lg:py-16 bg-white border-t border-neutral-100 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center bg-[#FAFAFA] rounded-[32px] p-8 md:p-12 lg:p-16 border border-neutral-100 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FDF4F4] to-transparent rounded-bl-full opacity-60 pointer-events-none" />

          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 flex-shrink-0 bg-[#C99A4A]" />
              <span className="text-[12px] font-medium tracking-wide text-[#7A1D1B] uppercase">
                Requirements
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#111111] mb-6 tracking-tight leading-[1.15]"
              style={{ fontFamily: NM }}
            >
              Everything you need <br className="hidden lg:block" /> to start earning
            </h2>
            <p className="text-[16px] text-[#666666] leading-relaxed max-w-md">
              Getting started as a Shuv Marg partner is incredibly simple. You don't need complex infrastructure or high capital to start your ticket booking business.
            </p>
          </div>

          <div className="flex-1 w-full max-w-lg relative z-10">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="space-y-5">
                {requirements.map((req, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-0.5 shrink-0 bg-[#FDF4F4] w-6 h-6 rounded-full flex items-center justify-center text-[#7A1D1B]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-[15px] text-[#404040] leading-relaxed font-medium">{req}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnerHowItWorks() {
  const steps = [
    { title: "Register", desc: "Sign up and complete your profile in minutes." },
    { title: "Get Approved", desc: "Fast verification by our dedicated team." },
    { title: "Start Booking", desc: "Access live inventory and book tickets instantly." },
    { title: "Earn Commission", desc: "Get paid automatically into your wallet." }
  ];

  return (
    <section className="py-10 lg:py-16 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 flex-shrink-0 bg-[#C99A4A]" />
            <span className="text-[12px] font-medium tracking-wide text-[#7A1D1B] uppercase">
              How it works
            </span>
            <div className="h-px w-8 flex-shrink-0 bg-[#C99A4A]" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight leading-[1.15]"
            style={{ fontFamily: NM }}
          >
            Start earning in four simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-neutral-200 -z-10" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col relative"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-neutral-100 flex items-center justify-center text-[18px] font-bold text-[#7A1D1B] mb-6 mx-auto md:mx-0 relative z-10">
                0{idx + 1}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-[18px] font-bold text-[#111111] mb-2">{step.title}</h3>
                <p className="text-[15px] text-[#666666] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerOutcomes() {
  const outcomes = [
    { title: "Live Inventory", desc: "Access hundreds of routes instantly." },
    { title: "Instant Tickets", desc: "Generate tickets without calling operators." },
    { title: "Auto Commission", desc: "Commission tracked on every sale." },
    { title: "Booking History", desc: "Complete records of all customers." },
    { title: "Digital Manifests", desc: "Manage passengers easily." },
    { title: "Quick Settlements", desc: "Fast payouts to your bank account." }
  ];

  return (
    <section className="py-10 lg:py-16 bg-white border-t border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          <div className="lg:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 flex-shrink-0 bg-[#C99A4A]" />
              <span className="text-[12px] font-medium tracking-wide text-[#7A1D1B] uppercase">
                What you'll get
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#111111] mb-6 tracking-tight leading-[1.15]"
              style={{ fontFamily: NM }}
            >
              Everything you need to succeed
            </h2>
            <p className="text-[16px] text-[#666666] leading-relaxed mb-8">
              We provide a complete digital toolkit designed specifically for agents, giving you full control over your bookings, customers, and revenue.
            </p>
          </div>

          <div className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {outcomes.map((outcome, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="flex items-start gap-4 p-5 rounded-2xl hover:bg-[#FAFAFA] border border-transparent hover:border-neutral-100 transition-colors"
              >
                <div className="mt-1 shrink-0 bg-[#FDF4F4] text-[#7A1D1B] w-8 h-8 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#111111] text-[16px] mb-1">{outcome.title}</h3>
                  <p className="text-[14px] text-[#666666] leading-relaxed">{outcome.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export function PartnerComparison() {
  const rows = [
    { type: "Travel Agency", bestFor: "Existing travel businesses", invest: "Low", workspace: "Office" },
    { type: "Mobile Shop", bestFor: "Retail stores", invest: "Very Low", workspace: "Existing shop" },
    { type: "Hotel", bestFor: "Hospitality businesses", invest: "Very Low", workspace: "Reception desk" },
    { type: "Independent Agent", bestFor: "Anyone starting out", invest: "Minimal", workspace: "Home or anywhere" },
  ];

  return (
    <section className="py-10 lg:py-16 bg-[#FAFAFA]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#171717] mb-6"
            style={{ fontFamily: NM }}
          >
            Find your fit
          </h2>
          <p className="text-[#525252] text-lg max-w-2xl mx-auto">
            ShuvMarg is designed for different kinds of partners, not just traditional ticket counters.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-sm border border-[#EAEAEA]">
            <thead>
              <tr className="bg-[#F5F5F5] border-b border-[#EAEAEA]">
                <th className="py-5 px-6 font-semibold text-[#171717] whitespace-nowrap">Business Type</th>
                <th className="py-5 px-6 font-semibold text-[#171717] whitespace-nowrap">Best For</th>
                <th className="py-5 px-6 font-semibold text-[#171717] whitespace-nowrap">Investment</th>
                <th className="py-5 px-6 font-semibold text-[#171717] whitespace-nowrap">Workspace Needed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-[#EAEAEA] hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-5 px-6 font-semibold text-[#7A1D1B] whitespace-nowrap">{row.type}</td>
                  <td className="py-5 px-6 text-[#525252] whitespace-nowrap">{row.bestFor}</td>
                  <td className="py-5 px-6 text-[#525252] whitespace-nowrap">{row.invest}</td>
                  <td className="py-5 px-6 text-[#525252] whitespace-nowrap">{row.workspace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function PartnerFAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs = [
    { id: 1, question: "Can I sell tickets immediately?", answer: "Yes, once your registration is approved (usually within 24 hours), you can start booking tickets instantly." },
    { id: 2, question: "How do I receive commission?", answer: "Commissions are automatically tracked and settled directly into your connected bank account or digital wallet." },
    { id: 3, question: "Do I need a shop?", answer: "No, a physical shop is not required. You can operate entirely from a smartphone or computer from anywhere." },
    { id: 4, question: "Can I work from home?", answer: "Absolutely. Our platform is fully digital, meaning you can manage your bookings and customers from the comfort of your home." },
    { id: 5, question: "What happens if customers cancel?", answer: "Cancellations follow the specific operator's policy. The process is handled smoothly within your dashboard." },
    { id: 6, question: "How do refunds work?", answer: "Refunds are processed automatically and returned to the customer's original payment method or wallet based on the policy." }
  ];

  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#171717] mb-6"
            style={{ fontFamily: NM }}
          >
            Frequently Asked Questions
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerCTA() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-[#F5F9FF] via-white to-[#FEFBF5] text-center px-4">
      <div className="max-w-2xl mx-auto relative z-10">
        <h2
          className="text-4xl md:text-5xl font-bold text-[#111111] mb-8 tracking-tight"
          style={{ fontFamily: NM }}
        >
          Ready to start selling bus tickets?
        </h2>
        <div className="relative inline-block">
          {/* Decorative lines around button */}
          <div className="absolute -top-6 -left-6 opacity-60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L4 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M22 10L10 22" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 2L2 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute -bottom-6 -right-6 opacity-60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L20 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2 10L14 22" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 2L22 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <Link
            href="/register"
            className="relative z-10 inline-flex items-center justify-center h-14 px-10 bg-[#D96B62] hover:bg-[#B83D35] text-white text-lg font-medium rounded-2xl transition-all shadow-[0_8px_24px_rgba(217,107,98,0.3)] hover:shadow-[0_12px_32px_rgba(217,107,98,0.4)] hover:-translate-y-0.5"
          >
            Sign Up for free
            <MoveRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
