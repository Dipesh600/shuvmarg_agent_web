"use client";
import { useState } from "react";
import FAQItem from "@/components/ui/FAQItem";
import { FAQItemData } from "@/types";

const faqs: FAQItemData[] = [
  {
    id: 1,
    question: "How do I register as a travel agent?",
    answer:
      "Click on 'Become an Agent' and fill out the registration form. An onboarding manager will review your details (Citizenship/PAN, shop photos, and location) and activate your account within 24 hours.",
  },
  {
    id: 2,
    question: "What is the commission structure?",
    answer:
      "Travel agents earn up to 10% commission on every ticket booked. Commissions are instantly credited to your wallet upon successful booking.",
  },
  {
    id: 3,
    question: "How do I top up my wallet?",
    answer:
      "You can top up your wallet instantly using eSewa, Khalti, ConnectIPS, or direct bank transfer. The loaded amount can be immediately used to book tickets.",
  },
  {
    id: 4,
    question: "How do I handle ticket cancellations?",
    answer:
      "You can cancel tickets directly from your dashboard. The refund is automatically processed back to your wallet according to the bus operator's cancellation policy.",
  },
  {
    id: 5,
    question: "Do I get a dedicated support line?",
    answer:
      "Yes. All registered Shuvmarg Partner agents get access to a priority support hotline that operates 24/7 to resolve any booking or boarding issues immediately.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | string | null>(null);
  return (
    <section id="faq" className="py-24 relative bg-[#FAFAFA] w-full">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">

        {/* Centered Heading */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 flex-shrink-0" style={{ background: "#C99A4A" }} />
            <span className="text-[12px] font-medium tracking-wide" style={{ color: "#7A1D1B" }}>Faq</span>
            <div className="h-px w-8 flex-shrink-0" style={{ background: "#C99A4A" }} />
          </div>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(32px, 4vw, 44px)",
              color: "#111111",
              letterSpacing: "-0.025em",
              fontFamily: "var(--font-sans)",
              lineHeight: 1.15,
            }}
          >
            Questions, <em style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontStyle: "italic", color: "#666666" }}>answered</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Contact Support Card */}
          <div className="lg:col-span-4">
            <div
              className="p-8 rounded-[24px] flex flex-col items-center text-center"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E8E0D4",
                boxShadow: "0 4px 24px rgba(0,0,0,0.02)"
              }}
            >
              {/* Support Icon */}
              <div
                className="w-14 h-14 rounded-[16px] flex items-center justify-center mb-6"
                style={{ background: "#FFF4F3", border: "1px solid rgba(122,29,27,0.15)" }}
              >
                <span className="material-symbols-rounded text-[24px]" style={{ color: "#7A1D1B" }}>
                  support_agent
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold mb-3 tracking-tight" style={{ fontSize: "20px", color: "#111111" }}>
                Still have questions?
              </h3>
              <p className="mb-8" style={{ fontSize: "15px", color: "#666666", lineHeight: 1.6 }}>
                Our team will walk you through the Shuv Marg platform and get your agency set up.
              </p>

              {/* Contact Action Pills */}
              <div className="flex flex-col gap-3 w-full">
                <a
                  href="tel:+9779803643115"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[12px] transition-colors hover:bg-neutral-50"
                  style={{ background: "#FAFAFA", border: "1px solid #EEEEEE" }}
                >
                  <span className="material-symbols-rounded text-[18px]" style={{ color: "#7A1D1B" }}>call</span>
                  <span className="font-semibold" style={{ fontSize: "14px", color: "#111111" }}>+977 9803643115</span>
                </a>
                <a
                  href="mailto:support@shuvmarg.com"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[12px] transition-colors hover:bg-neutral-50"
                  style={{ background: "#FAFAFA", border: "1px solid #EEEEEE" }}
                >
                  <span className="material-symbols-rounded text-[18px]" style={{ color: "#7A1D1B" }}>mail</span>
                  <span className="font-semibold" style={{ fontSize: "14px", color: "#111111" }}>support@shuvmarg.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordions */}
          <div className="lg:col-span-8 flex flex-col gap-3">
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
      </div>
    </section>
  );
}
