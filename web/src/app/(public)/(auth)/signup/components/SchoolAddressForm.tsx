"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft, MoveRight } from "lucide-react";
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
import { CreateSchoolAddressBody } from "@/interfaces/SchoolAddressInterfaces";
import { CreateSchoolAddressSchema } from "@/schemas/SchoolAddressSchema";
import { SignupContext } from "../contexts/SignupContext";

export function SchoolAddressForm() {
  const { setStep, setSchoolStep, schoolAddress, setSchoolAddress } =
    useContext(SignupContext);

  const form = useForm<CreateSchoolAddressBody>({
    resolver: zodResolver(CreateSchoolAddressSchema),
    defaultValues: {
      zipCode: schoolAddress?.zipCode ? schoolAddress.zipCode : "",
      country: schoolAddress?.country ? schoolAddress.country : "",
      state: schoolAddress?.state ? schoolAddress.state : "",
      city: schoolAddress?.city ? schoolAddress.city : "",
      neighborhood: schoolAddress?.neighborhood
        ? schoolAddress.neighborhood
        : "",
      street: schoolAddress?.street ? schoolAddress.street : "",
      number: schoolAddress?.number ? schoolAddress.number : "",
      complement: schoolAddress?.complement ? schoolAddress.complement : "",
    },
  });

  const onBackButton = async () => {
    const data = {
      zipCode: form.getValues("zipCode"),
      country: form.getValues("country"),
      state: form.getValues("state"),
      city: form.getValues("city"),
      neighborhood: form.getValues("neighborhood"),
      street: form.getValues("street"),
      number: form.getValues("number"),
      complement: form.getValues("complement"),
    };

    setSchoolAddress(data);
    setStep(1);
  };

  const onSubmit = (data: CreateSchoolAddressBody) => {
    const {
      zipCode,
      country,
      state,
      city,
      neighborhood,
      street,
      number,
      complement,
    } = data;

    const schoolAddress = {
      zipCode,
      country,
      state,
      city,
      neighborhood,
      street,
      number,
      complement,
    };

    setSchoolAddress(schoolAddress);
    setSchoolStep(2);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center p-4 lg:w-96 lg:p-8"
      >
        <div className="mb-4 flex gap-4">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
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
            Avançar
            <MoveRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
