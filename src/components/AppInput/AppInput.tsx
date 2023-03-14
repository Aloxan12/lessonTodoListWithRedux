import React, { ChangeEvent, useCallback } from "react";
import "./AppInput.scss";
import icoArrowDown from "../../utils/icons/arrow-down.png";

export enum InputMaskType {
  integer = "integer",
  float = "float",
}

interface IAppInputBase {
  label?: string;
  error?: string;
  placeholder?: string;
  inputMask?: InputMaskType;
  value?: string | number | null;
  onChange: (value: string) => void;
  disabled?: boolean;
  maxValue?: number;
  type?: string;
}

interface IAppInputIcoRight extends IAppInputBase {
  icoRight?: string;
  rows?: never;
  onClick?: never;
  dropdownInput?: never;
  dropdownActive?: never;
}

interface IAppInputDropdown extends IAppInputBase {
  icoRight?: never;
  rows?: never;
  onClick: () => void;
  dropdownInput: boolean;
  dropdownActive: boolean;
}

type AppInputType = IAppInputDropdown | IAppInputIcoRight;

const floatMask = (value: string) => {
  // Заменяем запятую на точку
  const normalizedValue = value.replace(",", ".");

  // Разделяем на целую и дробную части
  const [integerPart, fractionalPart] = normalizedValue.split(".");

  // Ограничиваем количество цифр в дробной части до двух
  const limitedFractionalPart = fractionalPart
    ? fractionalPart.slice(0, 2)
    : "";

  // Объединяем целую и дробную части с точкой между ними
  const formattedValue = `${integerPart}.${limitedFractionalPart}`;

  return formattedValue;
};

export const AppInput = ({
  label,
  error,
  placeholder,
  value,
  inputMask,
  onChange,
  onClick,
  dropdownInput,
  dropdownActive,
  disabled,
  maxValue,
  type = "text",
}: AppInputType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let result = "";
    switch (inputMask) {
      case InputMaskType.float:
        const floatVal = e.target.value
          .replace(/[,]+/g, ".")
          .replace(/^\.+/g, "")
          // .replace(/^0+/g, '')
          .replace(/^(0)([0-9])+/g, "$2")
          .match(/(^[0-9]*(\.)?[0-9]{0,2})*/g);
        // onChange(!!newVal ? (newVal[0] === '' ? '0' : newVal[0]) : '')
        result = !!floatVal ? floatVal[0] : "";
        break;
      case InputMaskType.integer:
        const integerVal = e.target.value
          .replace(/\D/g, "")
          .replace(/^(0)([0-9])+/g, "$2");
        result = integerVal;
        break;
      default:
        result = e.target.value;
    }
    onChange(result);
  };

  const onBlurHandler = useCallback(() => {
    if (
      !!maxValue &&
      (type === "number" || inputMask === InputMaskType.integer) &&
      maxValue < Number(value)
    ) {
      onChange(maxValue.toString());
    }
  }, [maxValue, value, inputMask, type]);

  return (
    <div className="app-input" onClick={onClick}>
      {label && <label className="input-label">{label}</label>}
      {dropdownInput && (
        <img
          src={icoArrowDown}
          className={`dropdown-ico-arrow ${dropdownActive ? "active" : ""}`}
          alt={"arrow-ico"}
        />
      )}
      <input
        className={`input-base ${dropdownInput ? "ico-right" : ""}`}
        placeholder={placeholder}
        value={value ? `${value}` : ""}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        disabled={!!disabled}
        type={type}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};
