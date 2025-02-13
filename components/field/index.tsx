import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { formatMaskedValue } from "../../lib/utils";
import { FieldProps } from "@/@types/fieldFormProps";

export default function Field({
  label,
  type = "text",
  maxLength,
  placeholder,
  register,
  value,
  onChange,
  onBlur,
  disabled,
  error,
  useMask = false,
  mask = "",
}: FieldProps) {

  return (
    <div>
      <Label htmlFor={register?.name}>{label}</Label>

      <Input
        id={register?.name}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        {...register}
        value={useMask ? formatMaskedValue({ inputValue: value || "", mask, useMask }) : value}
        onChange={(e) => {
          if (useMask) {
            const rawValue = e.target.value.replace(/\D/g, "");
            onChange?.({ ...e, target: { ...e.target, value: rawValue } });
          } else {
            onChange?.(e);
          }
        }}
        onBlur={onBlur}
        disabled={disabled}
        className={`${error ? "border-red-500" : ""}`}
      />

      {error && <Label id={register?.name} variant="destructive">{error}</Label>}
    </div>
  );
}