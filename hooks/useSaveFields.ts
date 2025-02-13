import { AddressForm } from "@/@types/addressForm";
import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export default function useSaveFields() { 
    const { mutateAsync: handleSaveFields } = useMutation<AddressForm, Error, AddressForm>({
      mutationFn: async (data: AddressForm) => {
        await api.post("/api/save-search", { data });
        return data;
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Oh! Algo de errado aconteceu",
          description: "Tivemos um problema ao buscar o CEP",
          datatype: "error",
        });
      }
    });
  
  return { handleSaveFields };
}