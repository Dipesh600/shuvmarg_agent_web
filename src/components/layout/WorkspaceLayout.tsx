import WorkspaceNav from "./WorkspaceNav";
import { SmoothScrollArea } from "./SmoothScrollProvider";

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

    </div>
  );
}
