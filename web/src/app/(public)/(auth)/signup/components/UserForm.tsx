"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, MoveRight } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLES } from "@/constants/signup";
import { CreateUserBody } from "@/interfaces/UserInterfaces";
import { CreateUserSchema } from "@/schemas/UserSchema";
import { SignupContext } from "../contexts/SignupContext";

export function UserForm() {
  const { setStep, user, setUser } = useContext(SignupContext);

  const form = useForm<CreateUserBody>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      email: user?.email ? user.email : "",
      password: user?.password ? user.password : "",
      confirmPassword: user?.confirmPassword ? user.confirmPassword : "",
      role: user?.role ? user.role : undefined,
    },
  });

  const [inputPasswordType, setInputPasswordType] = useState<
    "password" | "text"
  >("password");
  const [inputRepeatPasswordType, setInputRepeatPasswordType] = useState<
    "password" | "text"
  >("password");

  const toggleInputType = (buttonClicked: "password" | "confirmPassword") => {
    if (buttonClicked === "password") {
      const newState = inputPasswordType === "password" ? "text" : "password";

      setInputPasswordType(newState);
    } else if (buttonClicked === "confirmPassword") {
      const newState =
        inputRepeatPasswordType === "password" ? "text" : "password";

      setInputRepeatPasswordType(newState);
    }
  };

  const onSubmit = (data: CreateUserBody) => {
    const { email, password, confirmPassword, role } = data;

    const user = {
      email,
      password,
      confirmPassword,
      role,
    };

    setUser(user);
    setStep(2);
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={inputPasswordType}
                    placeholder="Digite sua senha..."
                    {...field}
                  />
                  <Button
                    type="button"
                    className="absolute right-0 top-0 bg-transparent"
                    onClick={() => toggleInputType("password")}
                  >
                    {inputPasswordType === "password" ? (
                      <Eye color="#00303a" />
                    ) : (
                      <EyeOff color="#00303a" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={inputRepeatPasswordType}
                    placeholder="Repita a senha..."
                    {...field}
                  />
                  <Button
                    type="button"
                    className="absolute right-0 top-0 bg-transparent"
                    onClick={() => toggleInputType("password")}
                  >
                    {inputRepeatPasswordType === "password" ? (
                      <Eye color="#00303a" />
                    ) : (
                      <EyeOff color="#00303a" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="mb-8 w-full">
              <FormLabel>Quem é você?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {USER_ROLES.map((option) => (
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
          <Button type="submit">
            Avançar
            <MoveRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
