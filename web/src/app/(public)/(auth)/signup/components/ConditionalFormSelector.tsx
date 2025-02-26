import { SchoolFormNavigator } from "./SchoolFormNavigator";
import { TeacherForm } from "./TeacherForm";
import { ParentForm } from "./ParentForm";
import { useContext } from "react";
import { SignupContext } from "../contexts/SignupContext";

export function ConditionalFormSelector() {
  const { user } = useContext(SignupContext);

  return (
    <>
      {user && user.role === "SCHOOL" && <SchoolFormNavigator />}

      {user && user.role === "TEACHER" && <TeacherForm />}

      {user && user.role === "PARENT" && <ParentForm />}
    </>
  );
}
