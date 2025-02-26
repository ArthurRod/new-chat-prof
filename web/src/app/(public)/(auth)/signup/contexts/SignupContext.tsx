"use client";

import { CreateSchoolAddressBody } from "@/interfaces/SchoolAddressInterfaces";
import { CreateSchoolBody } from "@/interfaces/SchoolInterfaces";
import { CreateTeacherBody } from "@/interfaces/TeacherInterfaces";
import { CreateUserBody } from "@/interfaces/UserInterfaces";
import { createContext, ReactNode, useState } from "react";

type SignupContextType = {
  step: number;
  setStep: (step: number) => void;
  schoolStep: number;
  setSchoolStep: (schoolStep: number) => void;
  user?: CreateUserBody;
  setUser: (user: CreateUserBody) => void;
  school?: CreateSchoolBody;
  setSchool: (school: CreateSchoolBody) => void;
  schoolAddress?: CreateSchoolAddressBody;
  setSchoolAddress: (schoolAddress: CreateSchoolAddressBody) => void;
  teacher?: CreateTeacherBody;
  setTeacher: (teacher: CreateTeacherBody) => void;
  teacherSubjects: string[];
  setTeacherSubjects: (teacherSubjects: string[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
};

type SignupProviderProps = {
  children: ReactNode;
};

export const SignupContext = createContext({} as SignupContextType);

export function SignupProvider({ children }: SignupProviderProps) {
  const [step, setStep] = useState(1);
  const [schoolStep, setSchoolStep] = useState(1);
  const [user, setUser] = useState<CreateUserBody>();
  const [school, setSchool] = useState<CreateSchoolBody>();
  const [schoolAddress, setSchoolAddress] = useState<CreateSchoolAddressBody>();
  const [teacher, setTeacher] = useState<CreateTeacherBody>();
  const [teacherSubjects, setTeacherSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <SignupContext.Provider
      value={{
        step,
        setStep,
        schoolStep,
        setSchoolStep,
        user,
        setUser,
        school,
        setSchool,
        schoolAddress,
        setSchoolAddress,
        teacher,
        setTeacher,
        teacherSubjects,
        setTeacherSubjects,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}
