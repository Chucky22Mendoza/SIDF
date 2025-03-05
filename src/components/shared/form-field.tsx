import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  input: React.ReactNode;
  className?: string;
  error?: string;
}

export function FormField({ className, label, input, error }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      {input}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}