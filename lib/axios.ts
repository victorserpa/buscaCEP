import { envData } from "@/app/env";
import axios from "axios";

export const api = axios.create({
  baseURL: envData.NEXT_PUBLIC_API_PUBLIC_URL,
});

export const apiViaCep = axios.create({
  baseURL: envData.NEXT_PUBLIC_VIA_CEP_URL,
});