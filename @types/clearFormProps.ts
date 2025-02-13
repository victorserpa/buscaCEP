import { UseFormReset } from "react-hook-form";

export interface ClearFormProps {
  reset: UseFormReset<any>;
  setZipCodeInput: (value: string) => void;
}