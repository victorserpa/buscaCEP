import { useState, useEffect } from "react";
import { SearchCepProps } from "@/@types/searchCepProps";
import { apiViaCep } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "./use-toast";

export default function useSearchZipCode({ zipCode }: SearchCepProps) {
  const [hasError, setHasError] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["searchZipCode", zipCode],
    queryFn: async () => {
      const response = await apiViaCep.get(`${zipCode}/json/`);
      if (response.data.erro === "true") {
        setHasError(true);
        toast({
          variant: "destructive",
          title: "Oh! Algo de errado aconteceu",
          description: "Tivemos um problema ao buscar o CEP",
          datatype: "error",
        });
      } else {
        setHasError(false);
      }

      const result = await response.data;

      return {
        street: result.logradouro,
        neighborhood: result.bairro,
        city: result.localidade,
        state: result.uf,
        complement: result.complemento,
      };
    },
    enabled: zipCode.length === 8 && zipCode !== "00000000",
  });

  return { data, isLoading, hasError };
}