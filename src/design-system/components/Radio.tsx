import React from "react";
import { radio as radioRecipe } from "../../../styled-system/recipes";
import { css, cx } from "@/styled-system/css";
import type { WCAGLevel } from "../constants/accessibility";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  helpText?: string;
  wcagLevel?: WCAGLevel;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  error,
  helpText,
  id,
  disabled = false,
  wcagLevel = "AA",
  className,
  style,
  ...props
}) => {
  const autoId = React.useId();
  const radioId = id || autoId;
  const errorId = `${radioId}-error`;
  const helpId = `${radioId}-help`;

  const slots = radioRecipe({
    wcagLevel,
    state: error ? "error" : "default",
  });

  return (
    <div className={cx(slots.root, className)} style={style}>
      <input
        type="radio"
        id={radioId}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : helpText ? helpId : undefined}
        className={slots.control}
        {...props}
      />
      <div className={css({ flex: 1 })}>
        <label
          htmlFor={radioId}
          className={slots.label}
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
          <p id={errorId} role="alert" className={slots.error}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export interface RadioGroupProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  helpText?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  children,
  error,
  helpText,
}) => {
  const groupId = React.useId();
  const errorId = `${groupId}-error`;
  const helpId = `${groupId}-help`;

  const describedById = error ? errorId : helpText ? helpId : undefined;

  return (
    <fieldset
      aria-describedby={describedById}
      className={css({
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: error ? "border.error" : "border.default",
        borderRadius: "md",
        p: 4,
        m: 0,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      })}
    >
      <legend
        className={css({
          fontSize: "sm",
          fontWeight: "semibold",
          mb: 2,
        })}
      >
        {label}
      </legend>

      <div>{children}</div>

      {helpText && !error && (
        <p
          id={helpId}
          className={css({
            mt: 2,
            fontSize: "sm",
            color: "contents.secondary",
          })}
        >
          {helpText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className={css({
            mt: 2,
            fontSize: "sm",
            color: "contents.error",
          })}
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}
