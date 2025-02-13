import handleClearForm from "@/hooks/useHandleClearForm";
import { Button } from "../ui/button";
import { ClearFormProps } from "@/@types/clearFormProps";

export default function ClearButton({
  reset,
  setZipCodeInput,
}: ClearFormProps) {
  return (
    <Button
      type="reset"
      variant="destructive"
      onClick={() => handleClearForm({ reset, setZipCodeInput })}
    >
      Limpar
    </Button>
  );
}
