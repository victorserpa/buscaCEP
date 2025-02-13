import { z } from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
  zipCode: z
    .string()
    .regex(/^\d{5}\d{3}$/, "Formato inválido")
    .length(8, "CEP deve ter 9 caracteres (incluindo o hífen)"),
  street: z.string().min(3, "A Rua é obrigatória"),
  complement: z.string().min(3, "O Complemento é obrigatório"),
  neighborhood: z.string().min(3, "O bairro é obrigatório"),
  city: z.string().min(2, "A Cidade é obrigatória"),
  state: z.string().min(2, "O Estado é obrigatório"),
});
