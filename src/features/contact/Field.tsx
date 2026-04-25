import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { clsx } from "../../utils/clsx";

const FIELD_BASE =
  "w-full border-0 border-b border-line bg-transparent py-[8px] font-display text-[22px] text-ink outline-none transition-colors duration-300 focus:border-accent";

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
};

function FieldLabel({ htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-[10px] block font-sans text-[11px] uppercase tracking-meta text-ink-soft"
    >
      {children}
    </label>
  );
}

type FieldFrameProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

function FieldFrame({ id, label, error, children }: FieldFrameProps) {
  return (
    <div className="mb-[28px]">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      {error && (
        <p className="mt-[6px] font-sans text-[11px] uppercase tracking-meta text-accent">{error}</p>
      )}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, error, className, ...rest },
  ref,
) {
  return (
    <FieldFrame id={id} label={label} error={error}>
      <input ref={ref} id={id} className={clsx(FIELD_BASE, className)} {...rest} />
    </FieldFrame>
  );
});

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  options: ReadonlyArray<string>;
  error?: string;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { id, label, options, error, className, ...rest },
  ref,
) {
  return (
    <FieldFrame id={id} label={label} error={error}>
      <select ref={ref} id={id} className={clsx(FIELD_BASE, className)} {...rest}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldFrame>
  );
});

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  error?: string;
};

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  function TextAreaField({ id, label, error, className, ...rest }, ref) {
    return (
      <FieldFrame id={id} label={label} error={error}>
        <textarea
          ref={ref}
          id={id}
          className={clsx(FIELD_BASE, "min-h-[100px] resize-y", className)}
          {...rest}
        />
      </FieldFrame>
    );
  },
);
