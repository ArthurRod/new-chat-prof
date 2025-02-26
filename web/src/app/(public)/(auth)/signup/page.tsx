import type { Metadata } from "next";
import { FormNavigator } from "./components/FormNavigator";
import { SignupProvider } from "./contexts/SignupContext";

export const metadata: Metadata = {
  title: "Chat Prof | Signup",
};

export default function Signup() {
  return (
    <SignupProvider>
      <section
        id="signup"
        className="flex w-full items-center justify-center lg:h-screen lg:w-1/2"
      >
        <FormNavigator />
      </section>
    </SignupProvider>
  );
}
