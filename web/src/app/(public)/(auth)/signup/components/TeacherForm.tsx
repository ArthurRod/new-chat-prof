"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MoveLeft, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateTeacherBody } from "@/interfaces/TeacherInterfaces";
import { CreateTeacherSchema } from "@/schemas/TeacherSchema";
import { SignupContext } from "../contexts/SignupContext";

export function TeacherForm() {
  const {
    setStep,
    user,
    teacher,
    setTeacher,
    teacherSubjects,
    setTeacherSubjects,
    errorMessage,
    setErrorMessage,
  } = useContext(SignupContext);

  const form = useForm<CreateTeacherBody>({
    resolver: zodResolver(CreateTeacherSchema),
    defaultValues: {
      name: teacher?.name ? teacher.name : "",
    },
  });

  const [currentSubject, setCurrentSubject] = useState<string>("");

  const onBackButton = async () => {
    const data = {
      name: form.getValues("name"),
    };

    setTeacher(data);
    setStep(1);
  };

  const addSubject = () => {
    const subject = currentSubject.trim();
    if (subject && !teacherSubjects.includes(subject)) {
      setTeacherSubjects([...teacherSubjects, subject]);
      setCurrentSubject("");
    }
  };

  const handleRemoveSubject = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setTeacherSubjects(teacherSubjects.filter((_, i) => i !== index));
  };

  const onSubmit = (data: CreateTeacherBody) => {
    const subject = currentSubject.trim();

    if ((!subject.length && !teacherSubjects.length) || !user) {
      setErrorMessage("Adicione pelo menos uma matéria");
      return;
    }

    const teacher = {
      ...user,
      name: data.name,
      subjects: subject || teacherSubjects.join(", "),
    };

    axios
      .post("http://localhost:3333/api/teachers", teacher)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        const err = error.response?.data || error.message;

        console.log("Error:", err);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center p-4 lg:w-96 lg:p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-4 w-full">
          <Label htmlFor="subjects">Matéria(s)</Label>
          <div className="relative">
            <Input
              type="text"
              name="subjects"
              autoComplete="off"
              placeholder="Adicione suas matérias"
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e.target.value)}
            />
            <Button
              type="button"
              className="absolute right-0 top-0 w-8"
              onClick={addSubject}
            >
              <Plus color="#fff" />
            </Button>
          </div>
          {errorMessage.length ? (
            <span className="text-sm text-red-500">{errorMessage}</span>
          ) : (
            ""
          )}
        </div>

        <div className="mb-8 w-full">
          {teacherSubjects.map((subject, index) => (
            <span key={index} className="mr-4 rounded bg-gray-200 p-1">
              {subject}
              <button
                onClick={(event) => handleRemoveSubject(event, index)}
                className="ml-4 cursor-pointer border-none bg-transparent"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex w-full justify-center gap-4">
          <Button type="button" onClick={onBackButton}>
            <MoveLeft />
            Voltar
          </Button>
          <Button type="submit">
            {form.formState.isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
