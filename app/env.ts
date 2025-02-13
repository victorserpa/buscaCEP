import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_VIA_CEP_URL: z.string().url(),
  NEXT_PUBLIC_API_PUBLIC_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_VIA_CEP_URL: process.env.NEXT_PUBLIC_VIA_CEP_URL,
  NEXT_PUBLIC_API_PUBLIC_URL: process.env.NEXT_PUBLIC_API_PUBLIC_URL,
});

if (!parsedEnv.success) {
  throw new Error("Configuração de ambiente inválida. Verifique suas variáveis no .env.local.");
}

export const envData = parsedEnv.data;