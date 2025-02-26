import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row lg:overflow-hidden">
      <section
        id="auth-left-banner"
        className="flex w-full items-center justify-center bg-primary lg:h-screen lg:w-1/2"
      >
        <Image
          priority
          src="/png/banner-left.png"
          width={540}
          height={540}
          alt="Banner chat prof"
        />
      </section>

      {children}
    </main>
  );
}
