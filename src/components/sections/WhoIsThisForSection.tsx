"use client";

import { useState } from "react";
import { Building2, Store, Hotel, UserCheck, Check, MoveRight } from "lucide-react";
import Link from "next/link";

const audiences = [
  {
    tabTitle: "Travel Agencies",
    title: "Travel Agencies",
    subtitle: "Help travelers plan complete journeys while earning commission on every bus ticket.",
    bullets: [
      "Live Inventory",
      "Instant Ticketing",
      "Customer Management",
      "Higher Revenue"
    ],
    closing: "Perfect for agencies looking to expand their travel services without additional operational complexity.",
    link: "/partners/travel-agencies",
    icon: <Building2 className="w-6 h-6 text-current" strokeWidth={1.5} />,
    image: "/images/travel_agency.png",
  },
  {
    tabTitle: "Mobile Shops",
    title: "Mobile Shops & Ticket Counters",
    subtitle: "Turn your existing shop into a trusted local travel booking point.",
    bullets: [
      "Book tickets while customers wait",
      "Print physical tickets instantly",
      "Accept digital or cash payments",
      "Serve your local community"
    ],
    closing: "Increase daily footfall and create a new source of recurring income without changing your existing business.",
    link: "/partners/mobile-shops",
    icon: <Store className="w-6 h-6 text-current" strokeWidth={1.5} />,
    image: "/images/Mobile_shop.png",
  },
  {
    tabTitle: "Hotels",
    title: "Hotels & Hospitality",
    subtitle: "Offer transportation as part of your guest experience.",
    bullets: [
      "Book onward travel for guests",
      "Reserve seats instantly",
      "Handle group bookings",
      "Reduce reception workload"
    ],
    closing: "Deliver a better guest experience while earning commissions from every successful booking.",
    link: "/partners/hotels",
    icon: <Hotel className="w-6 h-6 text-current" strokeWidth={1.5} />,
    image: "/images/hotel.png",
  },
  {
    tabTitle: "Independent Agents",
    title: "Independent Agents",
    subtitle: "Start selling bus tickets from anywhere with just a phone or computer.",
    bullets: [
      "Start with minimal setup",
      "Manage bookings digitally",
      "Print or share tickets instantly",
      "Track your earnings"
    ],
    closing: "Build a travel business on your own schedule without opening a travel agency or maintaining a physical office.",
    link: "/partners/independent-agents",
    icon: <UserCheck className="w-6 h-6 text-current" strokeWidth={1.5} />,
    image: "/images/independent.png",
  },
];

export default function WhoIsThisForSection() {
  const [activeAudience, setActiveAudience] = useState(0);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleMobileFlipToggle = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <section className="py-24 relative bg-[#FAFAFA] overflow-hidden">
      <style>
        {`
          @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-feature {
            animation: slideUpFade 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
        `}
      </style>
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-white mb-6 shadow-sm">
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7A1D1B]">
              WHO IS THIS FOR
            </span>
          </div>
          <h2 className="font-bold text-[#111111] leading-[1.15] tracking-tight mb-4 text-[32px]">
            Built for every business <br />
            <span className="text-[#888888]">that sells travel.</span>
          </h2>
          <p className="text-[#666666] text-[16px] leading-relaxed">
            Whether you operate a travel agency, run a mobile shop, or manage a ticket counter, Shuv Marg gives you the tools to sell bus tickets and grow your business.
          </p>
        </div>

        {/* Desktop Split Layout */}
        <div className="hidden lg:flex flex-row items-center gap-16">
          
          {/* Left Column - Large Image Flip Card */}
          <div className="w-1/2 flex justify-start">
            <div className="group relative w-full max-w-[500px] h-[600px] cursor-pointer [perspective:1000px]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front of Card: Image + Title + Subtitle */}
                <div className="absolute inset-0 w-full h-full rounded-[32px] bg-white border border-neutral-200 shadow-[0_12px_48px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col [backface-visibility:hidden]">
                  <div className="relative flex-1 bg-gradient-to-b from-[#F9F9F9] to-white flex items-center justify-center p-12 overflow-hidden border-b border-neutral-100">
                    <img 
                      key={`img-${activeAudience}`}
                      src={audiences[activeAudience].image} 
                      alt={audiences[activeAudience].title}
                      className="w-full h-full object-contain drop-shadow-xl animate-feature scale-[1.1]"
                      onLoad={(e) => {
                        e.currentTarget.style.display = 'block';
                        e.currentTarget.parentElement?.classList.remove('fallback-bg');
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('fallback-bg');
                      }}
                    />
                    <style>{`
                      .fallback-bg::before {
                        content: "📸";
                        font-size: 80px;
                        opacity: 0.2;
                      }
                    `}</style>
                  </div>
                  
                  <div key={`content-${activeAudience}`} className="p-8 bg-white animate-feature flex flex-col">
                    <div className="inline-flex items-center self-start gap-2 px-3 py-1 rounded-full bg-[#FFF4F3] border border-[#F0A09B]/30 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A1D1B]">Ideal For</span>
                    </div>
                    <h3 className="font-bold text-[#111111] text-[24px] mb-2 tracking-tight leading-tight">
                      {audiences[activeAudience].title}
                    </h3>
                    <p className="text-[#666666] text-[15px] leading-relaxed line-clamp-2">
                      {audiences[activeAudience].subtitle}
                    </p>
                  </div>
                </div>

                {/* Back of Card: Bullets + Closing Text */}
                <div className="absolute inset-0 w-full h-full rounded-[32px] bg-[#F8F1E3] border border-[#E8DDCC] shadow-lg overflow-hidden flex flex-col justify-center p-10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                   <div className="flex flex-col h-full justify-center">
                      <h3 className="font-bold text-[24px] text-[#111111] mb-6 border-b border-[#D7C8B3] pb-4">
                        What you can do
                      </h3>
                      <div className="flex flex-col gap-4 mb-8">
                        {audiences[activeAudience].bullets.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#7A1D1B] shrink-0 mt-[2px]" strokeWidth={2.5} />
                            <span className="text-[#111111] font-medium text-[16px] leading-snug">{bullet}</span>
                          </div>
                        ))}
                      </div>
                      <div className="w-full h-px bg-[#D7C8B3] mb-6"></div>
                      <div className="bg-white/60 p-5 rounded-2xl border border-[#E8DDCC] mb-6">
                        <p className="text-[#444444] text-[15px] leading-relaxed font-semibold">
                          {audiences[activeAudience].closing}
                        </p>
                      </div>
                      <Link 
                        href={audiences[activeAudience].link} 
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-2 h-12 bg-[#7A1D1B] text-white rounded-xl font-semibold text-[15px] hover:bg-[#5C1414] transition-colors shadow-sm self-start px-6 mt-auto"
                      >
                        Learn More <MoveRight className="w-4 h-4" />
                      </Link>
                   </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column - Navigation & Tabs */}
          <div className="w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-white mb-6 shadow-sm">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7A1D1B]">
                WHO IS THIS FOR
              </span>
            </div>

            <h2 className="font-bold text-[#111111] leading-[1.15] tracking-tight mb-4" style={{ fontSize: "clamp(32px, 4vw, 44px)" }}>
              Built for every business <br className="hidden xl:block" />
              <span className="text-[#888888]">that sells travel.</span>
            </h2>

            <p className="text-[#666666] text-lg leading-relaxed mb-10">
              Whether you operate a travel agency, run a mobile shop, or manage a ticket counter, Shuv Marg gives you the tools to sell bus tickets and grow your business.
            </p>

            {/* Desktop Tabs (Grid of Cards) */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {audiences.map((audience, i) => {
                const isActive = activeAudience === i;
                return (
                  <div 
                    key={i} 
                    onClick={() => setActiveAudience(i)}
                    onMouseEnter={() => setActiveAudience(i)}
                    className={`flex items-center gap-4 p-3 rounded-[16px] cursor-pointer transition-all duration-300 border ${
                      isActive 
                        ? "bg-white border-neutral-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transform scale-[1.02]" 
                        : "bg-transparent border-transparent hover:bg-white/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0 border overflow-hidden transition-colors duration-300 ${
                      isActive ? "bg-[#FFF4F3] border-[#F0A09B] text-[#7A1D1B]" : "bg-white border-neutral-200 text-[#444444]"
                    }`}>
                      {audience.icon}
                    </div>
                    <h3 className={`font-semibold text-[15px] transition-colors duration-300 ${
                      isActive ? "text-[#7A1D1B]" : "text-[#444444]"
                    }`}>
                      {audience.tabTitle}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Carousel of Flip Cards (Hidden on Desktop) */}
        <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {audiences.map((audience, i) => (
            <div 
              key={i} 
              className="snap-center shrink-0 w-[85vw] max-w-[340px] h-[480px] cursor-pointer [perspective:1000px]"
              onClick={() => handleMobileFlipToggle(i)}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                  flippedCard === i ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                
                {/* Front of Card */}
                <div className="absolute inset-0 w-full h-full rounded-[24px] bg-white border border-neutral-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col [backface-visibility:hidden]">
                  <div className="relative h-[220px] bg-gradient-to-b from-[#F9F9F9] to-white flex items-center justify-center p-8 overflow-hidden border-b border-neutral-100">
                    <img 
                      src={audience.image} 
                      alt={audience.title}
                      className="w-full h-full object-contain drop-shadow-xl scale-[1.1]"
                      onLoad={(e) => {
                        e.currentTarget.style.display = 'block';
                        e.currentTarget.parentElement?.classList.remove('fallback-bg');
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('fallback-bg');
                      }}
                    />
                  </div>
                  <div className="p-6 bg-white flex-1 flex flex-col relative">
                    <div className="inline-flex items-center self-start gap-2 px-3 py-1 rounded-full bg-[#FFF4F3] border border-[#F0A09B]/30 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A1D1B]">Ideal For</span>
                    </div>
                    <h3 className="font-bold text-[#111111] text-[20px] mb-2 tracking-tight leading-tight">
                      {audience.title}
                    </h3>
                    <p className="text-[#666666] text-[14px] leading-relaxed line-clamp-3">
                      {audience.subtitle}
                    </p>
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-neutral-200 shadow-sm text-[#7A1D1B]">
                       <span className="text-[9px] font-bold uppercase tracking-wider">Tap to Flip</span>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 w-full h-full rounded-[24px] bg-[#F8F1E3] border border-[#E8DDCC] shadow-lg overflow-hidden flex flex-col justify-center p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                   <h3 className="font-bold text-[18px] text-[#111111] mb-4 border-b border-[#D7C8B3] pb-3">
                     What you can do
                   </h3>
                   <div className="flex flex-col gap-3 mb-6">
                     {audience.bullets.map((bullet, idx) => (
                       <div key={idx} className="flex items-start gap-2.5">
                         <Check className="w-4 h-4 text-[#7A1D1B] shrink-0 mt-[1px]" strokeWidth={2.5} />
                         <span className="text-[#111111] font-medium text-[14px] leading-snug">{bullet}</span>
                       </div>
                     ))}
                   </div>
                   <div className="w-full h-px bg-[#D7C8B3] mb-4"></div>
                   <div className="bg-white/60 p-4 rounded-xl border border-[#E8DDCC] mb-6">
                     <p className="text-[#444444] text-[13px] leading-relaxed font-semibold">
                       {audience.closing}
                     </p>
                   </div>
                   <Link 
                     href={audience.link} 
                     onClick={(e) => e.stopPropagation()}
                     className="inline-flex items-center justify-center gap-2 h-11 w-full bg-[#7A1D1B] text-white rounded-xl font-semibold text-[14px] hover:bg-[#5C1414] transition-colors shadow-sm mt-auto"
                   >
                     Learn More <MoveRight className="w-4 h-4" />
                   </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
