"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AddressForm } from "@/@types/addressForm";
import { Label } from "@/components/ui/label";
import useHandleSubmit from "@/hooks/useHandleSubmit";
import useSearchZipCode from "@/hooks/useSearchZipCode";
import { formSchema } from "@/lib/schema";
import ChangeTheme from "../changeTheme";
import Field from "../field";
import SubmitButton from "../submit";
import ClearButton from "../clear";

export default function FormSearchCep() {
  const [zipCodeInput, setZipCodeInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      street: "",
      complement: "",
      neighborhood: "",
      state: "",
      city: "",
    },
  });

  const { handleOnSubmit } = useHandleSubmit(reset, setZipCodeInput);

  useEffect(() => {
    const initialZipCode = watch("zipCode");
    setZipCodeInput(initialZipCode);
  }, [watch]);

  const zipCode: string = watch("zipCode");

  const { data, isLoading, hasError } = useSearchZipCode({ zipCode });

  useEffect(() => {
    if (data) {
      setValue("street", data.street);
      setValue("neighborhood", data.neighborhood);
      setValue("city", data.city);
      setValue("state", data.state);
      clearErrors();
    }
  }, [data, setValue, clearErrors]);

  return (
    <div className="w-full max-w-md border border-gray-500 p-5 rounded-lg">
      <div className="flex flex-row justify-between">
        <Label>Busque seu CEP</Label>
        <ChangeTheme />
      </div>
      <form
        className="flex flex-col gap-2 m-5"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div>
          <Field
            label="CEP"
            placeholder="Informe o seu CEP"
            register={register("zipCode")}
            value={zipCodeInput}
            onChange={(e) => {
              setZipCodeInput(e.target.value);
              setValue("zipCode", e.target.value);
            }}
            onBlur={() => null}
            disabled={isLoading}
            error={
              errors.zipCode?.message || (hasError ? "CEP inválido" : undefined)
            }
            useMask={true}
            mask="99999-999"
          />
        </div>

        <div>
          <Field
            label="Endereço"
            placeholder="Informe o seu Endereço"
            register={register("street")}
            disabled={isLoading}
            error={errors.street?.message}
          />
        </div>

        <div>
          <Field
            label="Complemento"
            placeholder="Informe o Complemento"
            register={register("complement")}
            onChange={(e) => setValue("complement", e.target.value)}
            value={watch("complement")}
            disabled={isLoading}
            error={errors.complement?.message}
          />
        </div>

        <div>
          <Field
            label="Bairro"
            placeholder="Informe o seu bairro"
            register={register("neighborhood")}
            disabled={isLoading}
            error={errors.neighborhood?.message}
          />
        </div>

        <div>
          <Field
            label="Cidade"
            placeholder="Informe a sua cidade"
            register={register("city")}
            disabled={isLoading}
            error={errors.city?.message}
          />
        </div>

        <div>
          <Field
            label="Estado"
            placeholder="Informe o seu estado"
            register={register("state")}
            disabled={isLoading}
            error={errors.state?.message}
          />
        </div>

        <div className="flex justify-between">
          <ClearButton reset={reset} setZipCodeInput={setZipCodeInput} />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
