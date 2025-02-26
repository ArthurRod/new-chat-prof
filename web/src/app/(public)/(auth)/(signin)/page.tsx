import type { Metadata } from "next";
import { SigninForm } from "./components/SigninForm";

export const metadata: Metadata = {
  title: "Chat Prof | Signin",
};

export default function Signin() {
  return (
    <section
      id="signin"
      className="flex w-full items-center justify-center lg:h-screen lg:w-1/2"
    >
      <SigninForm />
    </section>
  );
}
