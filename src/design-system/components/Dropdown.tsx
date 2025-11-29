import React, { useState, useRef, useEffect } from "react";
import { css, cx } from "@/styled-system/css";
import { dropdown as dropdownRecipe } from "../../../styled-system/recipes";
import type { WCAGLevel } from "../constants/accessibility";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  wcagLevel?: WCAGLevel;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  placeholder = "選択してください",
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  wcagLevel = "AA",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const autoId = React.useId();
  const buttonId = `dropdown-button-${autoId}`;
  const listId = `dropdown-list-${autoId}`;
  const errorId = `dropdown-error-${autoId}`;
  const helperId = `dropdown-helper-${autoId}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(
            options.findIndex((opt) => opt.value === selectedValue)
          );
        } else if (focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value);
        }
        break;
      case "Escape":
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;
    }
  };

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setFocusedIndex(
          options.findIndex((opt) => opt.value === selectedValue)
        );
      }
    }
  };

  const slots = dropdownRecipe({
    state: error ? "error" : "default",
    placeholder: selectedValue ? "filled" : "empty",
    wcagLevel,
  });

  const arrowOpenClass = css({
    transform: "translateY(-50%) rotate(180deg)",
  });

  const optionFocusedClass = css({
    backgroundColor: "blue.50",
  });

  const optionSelectedClass = css({
    backgroundColor: "blue.100",
    fontWeight: "semibold",
  });

  const optionDisabledClass = css({
    color: "contents.disabled",
    cursor: "not-allowed",
    _hover: { backgroundColor: "transparent" },
  });

  return (
    <div className={slots.root} ref={dropdownRef}>
      <label htmlFor={buttonId} className={slots.label}>
        {label}
        {required && (
          <span className={slots.requiredMark} aria-label="必須">
            *
          </span>
        )}
      </label>

      <div className={slots.triggerWrapper}>
        <button
          ref={buttonRef}
          id={buttonId}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`${label} ${displayText}`}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          className={slots.trigger}
        >
          {displayText}
          <span
            className={cx(
              slots.arrow,
              isOpen && arrowOpenClass
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={buttonId}
            className={slots.menu}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={selectedValue === option.value}
                onClick={() => !option.disabled && handleSelect(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!option.disabled) {
                      handleSelect(option.value);
                    }
                  }
                }}
                onMouseEnter={() => !option.disabled && setFocusedIndex(index)}
                className={cx(
                  slots.option,
                  focusedIndex === index && optionFocusedClass,
                  selectedValue === option.value && optionSelectedClass,
                  option.disabled && optionDisabledClass
                )}
              >
                {option.label}
                {selectedValue === option.value && (
                  <span className={slots.checkmark}>✓</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className={slots.error}>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className={slots.helper}>
          {helperText}
        </p>
      )}
    </div>
  );
};
