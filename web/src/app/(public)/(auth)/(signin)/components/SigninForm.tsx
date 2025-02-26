"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginUserBody } from "@/interfaces/AuthInterfaces";
import { LoginUserSchema } from "@/schemas/AuthSchema";

export function SigninForm() {
  const form = useForm<LoginUserBody>({
    resolver: zodResolver(LoginUserSchema),
  });

  // const router = useRouter();
  const [inputType, setInputType] = useState<"password" | "text">("password");

  const toggleInputType = () => {
    setInputType((prevType: string) =>
      prevType === "password" ? "text" : "password",
    );
  };

  // const redirect = async (token: string) => {
  //   const decoded = await verifyToken(token);

  //   if (!decoded) router.push("/signin");

  //   switch (decoded.role) {
  //     case "TEACHER":
  //       router.push("/panel/teacher");
  //       break;
  //     case "SCHOOL":
  //       router.push("/panel/school");
  //       break;
  //     case "PARENT":
  //       router.push("/panel/parent");
  //       break;
  //     default:
  //       router.push("/signin");
  //   }
  // };

  const onSubmit = (data: LoginUserBody) => {
    const { email, password } = data;

    const requestBody = {
      email,
      password,
    };

    axios
      .post("http://localhost:3333/api/auth", requestBody, {
        withCredentials: true,
      })
      .then((response: unknown) => {
        console.log(email, password);
        console.log(response);

        // redirect(token);
      })
      .catch((error: AxiosError) => {
        console.log("Error:", error.response?.data);
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
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="xxxx@xxxx.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-8 w-full">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={inputType}
                    placeholder="Digite sua senha..."
                    {...field}
                  />
                  <Button
                    type="button"
                    className="absolute right-0 top-0 bg-transparent"
                    onClick={() => toggleInputType()}
                  >
                    {inputType === "password" ? (
                      <Eye color="#00303a" />
                    ) : (
                      <EyeOff color="#00303a" />
                    )}
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex w-full justify-center gap-4">
          <Button type="submit">
            {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
