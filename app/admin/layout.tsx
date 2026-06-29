import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-9999 bg-cream flex overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto pt-12 md:pt-0">{children}</main>
    </div>
  );
}
