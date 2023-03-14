import React, {ChangeEvent, useCallback} from 'react';
import './AppInput.scss'
import icoArrowDown from '../../utils/icons/arrow-down.png'

export enum InputMaskType {
    integer = 'integer',
}

interface IAppInputBase {
    label?: string
    error?: string
    placeholder?: string
    inputMask?: InputMaskType
    value?: string | number | null
    onChange: (value: string) => void
    disabled?: boolean
    maxValue?: number
    type?: string
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

export const AppInput = React.memo(({
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
                                        type = 'text'
                                    }: AppInputType) => {

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let result = ''
            switch (inputMask) {
                case InputMaskType.integer: {
                    result = e.currentTarget.value
                        .replace(/[^0-9]/g, '')
                        .replace(/^(0)([0-9])+/g, '$2')
                    break
                }
                default:
                    result = e.currentTarget.value
            }
            onChange(type = 'number' ?  Number(result).toFixed(2) : result)
        }

        const onBlurHandler = useCallback(()=>{
            if(!!maxValue && (type === 'number' || inputMask === InputMaskType.integer) && maxValue < Number(value)){
                onChange(maxValue.toString())
            }
        },[maxValue, value, inputMask, type])

        return (
            <div className='app-input' onClick={onClick}>
                {label && <label className='input-label'>{label}</label>}
                {dropdownInput && <img src={icoArrowDown} className={`dropdown-ico-arrow ${dropdownActive ? 'active' : ''}`}
                                       alt={'arrow-ico'}/>}
                <input
                    className={`input-base ${dropdownInput ? 'ico-right' : ''}`}
                    placeholder={placeholder}
                    value={value ? value : ''}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    disabled={!!disabled}
                    type={type}
                    maxLength={maxValue}
                />
                {error && <div className='input-error'>{error}</div>}
            </div>
        );
    }
)