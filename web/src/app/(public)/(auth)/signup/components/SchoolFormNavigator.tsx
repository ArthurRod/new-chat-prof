"use client";

import { useContext } from "react";

import { SignupContext } from "../contexts/SignupContext";
import { SchoolAddressForm } from "./SchoolAddressForm";
import { SchoolForm } from "./SchoolForm";

export function SchoolFormNavigator() {
  const { schoolStep, schoolAddress } = useContext(SignupContext);

  return (
    <>
      {schoolStep === 1 && <SchoolAddressForm />}

      {schoolStep === 2 && schoolAddress && <SchoolForm />}
    </>
  );
}
