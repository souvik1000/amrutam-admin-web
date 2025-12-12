import * as Yup from "yup";
import { useFormContext, UseFormReturn } from "react-hook-form";

const buildValidators = (stepSchemas: Record<string, Yup.ObjectSchema<any>>, getValues: () => any, clearErrors: (...args: any[]) => void, setError: (...args: any[]) => void) => {
  const validateStep = async (stepName: string) => {
    const schema = stepSchemas[stepName];
    if (!schema) return true;

    clearErrors();

    try {
      await schema.validate(getValues(), { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(e => {
          if (!e.path) return;
          setError(e.path as any, { type: "manual", message: e.message });
        });
      }
      return false;
    }
  };

  const validateAllSteps = async (stepNames: string[]) => {
    clearErrors(); // Clear all existing errors first

    let allValid = true;

    for (const stepName of stepNames) {
      const schema = stepSchemas[stepName];
      if (!schema) continue;

      try {
        await schema.validate(getValues(), { abortEarly: false });
      } catch (err) {
        allValid = false;
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(e => {
            if (!e.path) return;
            setError(e.path as any, { type: "manual", message: e.message });
          });
        }
      }
    }

    return allValid;
  };

  return { validateStep, validateAllSteps };
};

export const useStepValidation = (stepSchemas: Record<string, Yup.ObjectSchema<any>>) => {
  const { getValues, clearErrors, setError } = useFormContext();

  return buildValidators(stepSchemas, getValues, clearErrors, setError);
};

// Factory for using validation outside of FormProvider by passing form methods
export const createStepValidation = (stepSchemas: Record<string, Yup.ObjectSchema<any>>, formMethods: UseFormReturn<any>) => {
  const { getValues, clearErrors, setError } = formMethods;
  return buildValidators(stepSchemas, getValues, clearErrors, setError);
};
