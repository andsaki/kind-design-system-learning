import React from "react";
import { checkbox } from "../../../styled-system/recipes";
import { css, cx } from "@/styled-system/css";
import type { WCAGLevel } from "../constants/accessibility";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  helpText?: string;
  indeterminate?: boolean;
  wcagLevel?: WCAGLevel;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helpText,
  indeterminate = false,
  id,
  disabled = false,
  wcagLevel = "AA",
  className,
  ...props
}) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;
  const errorId = `${checkboxId}-error`;
  const helpId = `${checkboxId}-help`;
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  const slots = checkbox({ wcagLevel, state: error ? "error" : "default" });

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={cx(slots.root, className)}>
      <div className={slots.control}>
        <input
          ref={checkboxRef}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helpText ? helpId : undefined}
          className={slots.input}
          {...props}
        />
      </div>
      <div className={css({ flex: 1 })}>
        <label
          htmlFor={checkboxId}
          className={cx(
            slots.label,
            disabled && css({ cursor: "not-allowed" })
          )}
          data-disabled={disabled ? "true" : undefined}
        >
          {label}
        </label>
        {helpText && !error && (
          <p id={helpId} className={slots.helper}>
            {helpText}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className={slots.errorText}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
