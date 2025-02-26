"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { MoveLeft } from "lucide-react";
import { useContext } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SCHOOL_PERIODS } from "@/constants/signup";
import { CreateSchoolBody } from "@/interfaces/SchoolInterfaces";
import { CreateSchoolSchema } from "@/schemas/SchoolSchema";
import { SignupContext } from "../contexts/SignupContext";

export function SchoolForm() {
  const { setSchoolStep, user, schoolAddress, school, setSchool } =
    useContext(SignupContext);

  const form = useForm<CreateSchoolBody>({
    resolver: zodResolver(CreateSchoolSchema),
    defaultValues: {
      name: school?.name ? school.name : "",
      fixedPeriod: school?.fixedPeriod ? school.fixedPeriod : undefined,
    },
  });

  const onBackButton = async () => {
    const data = {
      name: form.getValues("name"),
      fixedPeriod: form.getValues("fixedPeriod"),
    };

    setSchool(data);
    setSchoolStep(1);
  };

  const onSubmit = (data: CreateSchoolBody) => {
    if (!user || !schoolAddress) return;

    const { name, fixedPeriod } = data;

    const school = {
      ...user,
      ...schoolAddress,
      name,
      fixedPeriod,
    };

    axios
      .post("http://localhost:3333/api/schools", school)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error: AxiosError) => {
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
              <FormLabel>Nome da escola</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fixedPeriod"
          render={({ field }) => (
            <FormItem className="mb-8 w-full">
              <FormLabel>Qual a divisão dos períodos da escola?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SCHOOL_PERIODS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
