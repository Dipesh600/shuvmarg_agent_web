import WorkspaceNav from "./WorkspaceNav";
import { SmoothScrollArea } from "./SmoothScrollProvider";
import { Plus } from "lucide-react";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FAF7F2] md:h-screen md:overflow-hidden flex flex-col relative">
      <WorkspaceNav />
      {/* 
        Mobile: page scrolls naturally (no height/overflow constraint).
                The fixed top bar and bottom nav sit above/below content.
        Tablet: md:pt-20 (top bar), md:pl-20 (nav rail), overflow-y-auto.
        Desktop: lg:pl-64 (sidebar), smooth scroll contained in this area.
      */}
      <SmoothScrollArea className="workspace-scroll-area pb-16 pt-16 md:pt-20 md:pb-0 md:pl-20 lg:pl-64 md:flex-1 md:min-h-0 relative">
        <main className="max-w-[1280px] mx-auto w-full px-4 py-4 md:px-6 md:py-4 lg:px-8 lg:py-2">
          {children}
        </main>
      </SmoothScrollArea>

      {/* Floating Action Button for New Booking */}
      <button className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 bg-[#7A1D1B] hover:bg-[#5C1414] text-white rounded-full shadow-[0_8px_32px_rgba(122,29,27,0.3)] hover:shadow-[0_12px_40px_rgba(122,29,27,0.4)] transition-all duration-300 flex items-center justify-center gap-2 px-6 h-[56px] group hover:-translate-y-1">
        <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" strokeWidth={2.5} />
        <span className="font-sans font-bold text-[15px]">Book Now</span>
      </button>
    </div>
  );
}
