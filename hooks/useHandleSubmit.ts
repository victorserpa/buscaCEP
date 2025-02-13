import handleClearForm from "@/hooks/useHandleClearForm";
import { useToast } from "./use-toast";
import useSaveFields from "./useSaveFields";
import { useCallback } from "react";
import { formSchema } from "@/lib/schema";
import { z } from "zod";
import { UseFormReset } from "react-hook-form";

export default function useHandleSubmit(reset: UseFormReset<any>, setZipCodeInput: (value: string) => void) {
  const { toast } = useToast();
  const { handleSaveFields } = useSaveFields();

  const handleOnSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      try {
        await handleSaveFields(data);

        toast({
          variant: "success",
          title: "Sucesso!",
          description: "Endereço salvo com sucesso",
          datatype: "success",
        });

        await handleClearForm({ reset, setZipCodeInput });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao salvar",
          description: `Não foi possível salvar o endereço. Erro: ${error}`,
          datatype: "error",
        });
      }
    },
    [handleSaveFields, toast, reset, setZipCodeInput]
  );

  return { handleOnSubmit };
}