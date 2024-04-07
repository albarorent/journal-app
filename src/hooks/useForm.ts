import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  FormCheckedValues,
  FormValidationState,
} from "../interface/Interfaces";

export const useForm = (
  initialForm: any = {},
  formValidations: FormValidationState = {}
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState<FormCheckedValues>({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: FormCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    formState,
    onInputChange,
    onResetForm,
    formValidation,
    isFormValid,
  };
};
