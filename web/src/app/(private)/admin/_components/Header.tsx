import { UserRoundCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between bg-neutralLight px-4 py-4 shadow-md lg:px-8">
      <Link
        href="/"
        className="rounded duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryDark focus-visible:ring-offset-2"
      >
        <Image width={75} height={25} src="/png/logo.png" alt="logo" />
      </Link>
      <Link
        href="/"
        className="h-10 rounded px-4 py-2 duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryDark focus-visible:ring-offset-2"
      >
        <UserRoundCog color="#007f8e" />
      </Link>
    </header>
  );
}
