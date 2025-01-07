"use client";
import React from "react";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  placeholder,
  label,
}: {
  name: string;
  placeholder: string;
  label: string;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className={`focus-visible:ring-1 text-sm  ${
                errors[name] &&
                "bg-red-600/5 border focus-visible:ring-0 placeholder:text-red-500 border-red-600 "
              }`}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
