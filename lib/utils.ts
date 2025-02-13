import { FormatMaskProps } from "@/@types/formatMask";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMaskedValue({
  inputValue,
  mask,
  useMask,
}: FormatMaskProps) {
  if (!useMask || !mask) return inputValue;

  let maskedValue = "";
  let inputIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "9") {
      if (inputValue[inputIndex]) {
        maskedValue += inputValue[inputIndex];
        inputIndex++;
      } else {
        break;
      }
    } else {
      maskedValue += mask[i];
    }
  }

  return maskedValue;
}
