import { ClearFormProps } from "@/@types/clearFormProps";

export default async function handleClearForm({
  reset,
  setZipCodeInput,
}: ClearFormProps) {
  reset();
  setZipCodeInput("");
}
