import { formSchema } from "@/lib/schema";
import { z } from "zod";

export type AddressForm = z.infer<typeof formSchema>;
