import { ReactNode } from "react";
import { AdminHeader } from "./_components/Header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-white">
      {" "}
      <AdminHeader />
      {children}
    </main>
  );
}
