"use client";

import { useContext } from "react";

import { UserForm } from "./UserForm";
import { ConditionalFormSelector } from "./ConditionalFormSelector";
import { SignupContext } from "../contexts/SignupContext";

export function FormNavigator() {
  const { step, user } = useContext(SignupContext);

  return (
    <>
      {step === 1 && <UserForm />}

      {step === 2 && user && <ConditionalFormSelector />}
    </>
  );
}
