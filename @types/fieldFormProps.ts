export interface FieldProps {
  label: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  register?: any;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  useMask?: boolean;
  mask?: string;
}
