import { ComponentPropsWithoutRef, useId } from "react";

import { Input } from "../input";
import { Label } from "../label";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

export function InputField({
  label,
  id: providedId,
  className,
  ...props
}: InputFieldProps) {
  const generatedId = useId();
  const id = providedId || generatedId;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} className={className} {...props} />
    </div>
  );
}
