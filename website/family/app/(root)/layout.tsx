import RightWidgets from "@/components/layout/RightWidgets";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <a
        href="#main"
        className="skip-link sr-only focus:not-sr-only fixed left-4 top-4 z-50 rounded-md bg-primary-foreground text-primary px-3 py-2 text-sm font-medium"
      >
        Skip to content
      </a>

      <Topbar />

      <Sidebar />

      <main
        id="main"
        className="flex-1 min-w-0 px-4 py-8 pt-24 lg:ml-48 2xl:mr-80 lg:px-8 lg:pt-10"
      >
        <div className="mx-auto w-full max-w-7xl space-y-6">{children}</div>
      </main>

      <RightWidgets />
    </div>
  );
}
