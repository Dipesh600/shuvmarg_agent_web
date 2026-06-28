import WorkspaceNav from "./WorkspaceNav";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col">
      <WorkspaceNav />
      {/* 
        Main content area adjusts based on the fixed navigation size
        Mobile: pt-16 (top bar), pb-16 (bottom nav)
        Tablet: md:pt-20 (top bar), md:pl-20 (nav rail)
        Desktop: lg:pt-20, lg:pl-64 (sidebar)
      */}
      <div className="h-screen overflow-y-auto pt-16 pb-16 md:pt-20 md:pb-0 md:pl-20 lg:pl-64">
        <main className="max-w-[1280px] mx-auto w-full px-4 py-4 md:px-6 md:py-4 lg:px-8 lg:py-2">
          {children}
        </main>
      </div>
    </div>
  );
}
