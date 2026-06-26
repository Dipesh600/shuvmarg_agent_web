"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PartnerData } from "@/data/partners";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";
import Image from "next/image";

const NM = '"Neue Machina", system-ui, -apple-system, sans-serif';

export function PartnerHero({ data }: { data: PartnerData }) {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center bg-[#FDF4F4] overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F8E7E7] rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F8E7E7] rounded-full blur-[80px] transform -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[#7A1D1B]/10 text-[#7A1D1B] text-sm font-semibold tracking-wide">
              {data.type}
            </div>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#171717] leading-[1.1] mb-6 tracking-tight"
              style={{ fontFamily: NM }}
            >
              {data.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-[#525252] mb-10 max-w-lg leading-relaxed font-medium">
              {data.hero.subtitle}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-[#7A1D1B] text-white rounded-xl font-semibold text-[16px] hover:bg-[#641715] transition-colors shadow-lg shadow-[#7A1D1B]/20 w-full sm:w-auto"
            >
              Become a Partner <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <Image 
                src={data.hero.image} 
                alt={data.type} 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#F8CA69] rounded-2xl -z-10 rotate-12" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#CD7272]/20 rounded-full -z-10 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function PartnerWhoIsThisFor({ data }: { data: PartnerData }) {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#171717] mb-6"
            style={{ fontFamily: NM }}
          >
            Who is this for?
          </h2>
          <p className="text-xl text-[#525252] leading-relaxed font-medium">
            {data.whoIsThisFor}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function PartnerBenefits({ data }: { data: PartnerData }) {
  return (
    <section className="py-20 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#171717] mb-6"
            style={{ fontFamily: NM }}
          >
            Why {data.type.toLowerCase()} choose ShuvMarg
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-[#E8DDCC]"
            >
              <div className="w-14 h-14 bg-[#F8E7E7] rounded-2xl flex items-center justify-center mb-6 text-[#7A1D1B]">
                {(() => {
                  const Icon = Icons[benefit.icon as keyof typeof Icons] as React.ElementType;
                  return Icon ? <Icon strokeWidth={1.5} className="w-7 h-7" /> : null;
                })()}
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-3">{benefit.title}</h3>
              <p className="text-[#525252] leading-relaxed">
                {benefit.description}
              </p>
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
    "Internet connection",
    "Smartphone or computer",
    "Bank account",
    "Basic customer handling"
  ];

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-[#FDF4F4] rounded-3xl p-10 md:p-14 border border-[#F8E7E7]">
          <h2 
            className="text-3xl font-bold text-[#171717] mb-8 text-center"
            style={{ fontFamily: NM }}
          >
            What you need
          </h2>
          <div className="space-y-4">
            {requirements.map((req, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="mt-0.5">
                  <CheckCircle2 className="w-6 h-6 text-[#7A1D1B]" />
                </div>
                <span className="text-lg text-[#404040] font-medium">{req}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnerHowItWorks() {
  const steps = [
    { title: "Register", desc: "Sign up in 2 minutes" },
    { title: "Get Approved", desc: "Quick verification" },
    { title: "Start Booking", desc: "Access live inventory" },
    { title: "Earn Commission", desc: "Get paid automatically" }
  ];

  return (
    <section className="py-20 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
        <h2 
          className="text-3xl md:text-4xl font-bold text-[#171717] mb-16"
          style={{ fontFamily: NM }}
        >
          How it works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#F8E7E7] via-[#7A1D1B]/20 to-[#F8E7E7] -z-10" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center text-2xl font-bold text-[#7A1D1B] border-[4px] border-[#F8E7E7] mb-6 relative z-10">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-2">{step.title}</h3>
              <p className="text-[#525252] font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerOutcomes() {
  const outcomes = [
    "Access to hundreds of routes",
    "Instant ticket generation",
    "Automatic commission tracking",
    "Customer booking history",
    "Digital manifests",
    "Wallet & settlements",
    "Dedicated support"
  ];

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#171717] mb-6"
            style={{ fontFamily: NM }}
          >
            What you&apos;ll get
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {outcomes.map((outcome, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#FAF7F2] px-6 py-5 rounded-2xl flex items-center gap-4 border border-[#E8DDCC]"
            >
              <div className="w-2 h-2 rounded-full bg-[#7A1D1B]" />
              <span className="text-[#404040] font-semibold">{outcome}</span>
            </motion.div>
          ))}
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
    <section className="py-20 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
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
  const faqs = [
    { q: "Can I sell tickets immediately?", a: "Yes, once your registration is approved (usually within 24 hours), you can start booking tickets instantly." },
    { q: "How do I receive commission?", a: "Commissions are automatically tracked and settled directly into your connected bank account or digital wallet." },
    { q: "Do I need a shop?", a: "No, a physical shop is not required. You can operate entirely from a smartphone or computer from anywhere." },
    { q: "Can I work from home?", a: "Absolutely. Our platform is fully digital, meaning you can manage your bookings and customers from the comfort of your home." },
    { q: "What happens if customers cancel?", a: "Cancellations follow the specific operator's policy. The process is handled smoothly within your dashboard." },
    { q: "How do refunds work?", a: "Refunds are processed automatically and returned to the customer's original payment method or wallet based on the policy." }
  ];

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#171717] mb-6"
            style={{ fontFamily: NM }}
          >
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8DDCC]">
              <h3 className="text-lg font-bold text-[#171717] mb-3">{faq.q}</h3>
              <p className="text-[#525252] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerCTA() {
  return (
    <section className="py-24 md:py-32 bg-[#171717] text-center px-4 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7A1D1B]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C99A4A]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <h2 
          className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
          style={{ fontFamily: NM }}
        >
          Ready to start selling bus tickets?
        </h2>
        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-[#7A1D1B] text-white rounded-xl font-semibold text-[16px] hover:bg-[#641715] transition-colors w-full sm:w-auto"
        >
          Become a ShuvMarg Partner
        </Link>
      </div>
    </section>
  );
}
