import clsx from "clsx";
import * as Yup from "yup";
import React, { ReactNode } from "react";
import { FieldValues, UseFormReturn, UseFormProps, FormProvider, useForm } from "react-hook-form";

export interface FormProps<T extends FieldValues> extends UseFormProps<T> {
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode | React.JSX.Element);
  className?: string;
  methods?: UseFormReturn<T>;
  validationSchema?: Yup.ObjectSchema<T>;
  onSubmit?: (data: T, methods: UseFormReturn<T>) => void;
}

function Form<T extends FieldValues>({
  onSubmit,
  className,
  children,
  methods,
  ...rest
}: FormProps<T>) {
  const hookMethods = useForm(rest);

  const formMethods = methods || hookMethods;

  const handleSubmit = (data: T) => onSubmit?.(data, formMethods);

  const content = typeof children === "function" ? children(formMethods) : children;

  return (
    <FormProvider {...formMethods}>
      <form className={clsx("h-100", className)} onSubmit={onSubmit && formMethods.handleSubmit(handleSubmit)}>
        {content}
      </form>
    </FormProvider>
  );
}

export default Form;
