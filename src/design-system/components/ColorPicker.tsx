import React, { forwardRef, useEffect, useId, useState } from "react";
import { css, cx } from "@/styled-system/css";
import { colorpicker } from "@/styled-system/recipes";
import type { RecipeVariantProps } from "@/styled-system/types";

export type ColorPickerProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> &
  RecipeVariantProps<typeof colorpicker> & {
    label: string;
    helperText?: string;
    error?: string;
    showValueLabel?: boolean;
  };

const containerClass = css({
  mb: 4,
});

const labelClass = css({
  display: "flex",
  alignItems: "center",
  gap: 1,
  mb: 2,
  fontSize: "sm",
  fontWeight: "medium",
  color: "contents.primary",
});

const pickerRowClass = css({
  display: "flex",
  alignItems: "center",
  gap: 3,
});

const valueBadgeClass = css({
  fontFamily: "mono",
  fontSize: "sm",
  px: 3,
  py: 1,
  borderRadius: "md",
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "border.default",
  backgroundColor: "bg.secondary",
  color: "contents.primary",
});

const helperClass = css({
  mt: 2,
  fontSize: "sm",
  color: "contents.secondary",
});

const errorClass = css({
  mt: 2,
  fontSize: "sm",
  color: "colors.red.700",
});

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      showValueLabel = true,
      value,
      defaultValue = "#000000",
      id,
      className,
      onChange,
      size = "md",
      wcagLevel = "AA",
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const initialValue =
      typeof value === "string"
        ? value
        : typeof defaultValue === "string"
        ? defaultValue
        : "#000000";

    const [internalValue, setInternalValue] = useState(initialValue);
    const isControlled = typeof value === "string";

    useEffect(() => {
      if (isControlled) {
        setInternalValue(value);
      }
    }, [isControlled, value]);

    const currentValue = isControlled ? (value as string) : internalValue;

    const describedByIds: string[] = [];
    if (error) describedByIds.push(errorId);
    if (helperText && !error) describedByIds.push(helperId);
    const describedBy = describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    };

    return (
      <div className={containerClass}>
        <label htmlFor={inputId} className={labelClass}>
          {label}
          {required && (
            <span
              className={css({ color: "colors.red.600", fontWeight: "bold" })}
              aria-label="必須"
            >
              *
            </span>
          )}
        </label>
        <div className={pickerRowClass}>
          <input
            ref={ref}
            id={inputId}
            type="color"
            value={currentValue}
            aria-describedby={describedBy}
            aria-invalid={!!error}
            aria-required={required}
            disabled={disabled}
            required={required}
            className={cx(colorpicker({ size, wcagLevel }), className)}
            onChange={handleChange}
            {...props}
          />
          {showValueLabel && (
            <span className={valueBadgeClass} aria-live="polite">
              {currentValue?.toUpperCase()}
            </span>
          )}
        </div>
        {error && (
          <p id={errorId} role="alert" aria-live="polite" className={errorClass}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className={helperClass}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
