import { ReactNode } from "react";
import { AdminHeader } from "./_components/Header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <AdminHeader />
      {children}
    </main>
  );
}
