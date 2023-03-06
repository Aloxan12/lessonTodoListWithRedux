import React, {ChangeEvent} from 'react';
import './AppInput.scss'

enum InputMaskType {
    integer = 'integer'
}

interface IAppInputProps {
    label?: string
    error?: string
    placeholder?: string
    inputMask?: InputMaskType
    value?: string | null
    onChange: (value: string | null) => void
}

export const AppInput = React.memo(({label, error, placeholder, value, inputMask, onChange}: IAppInputProps) => {

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let result = ''
            switch (inputMask){
                case InputMaskType.integer: {
                    const integerVal = e.currentTarget.value
                        .replace(/[^0-9]/g, '')
                        .replace(/^(0)([0-9])+/g, '$2')
                    result = integerVal
                    break
                }
                default:
                    result = e.currentTarget.value
            }
            onChange(result)
        }

        return (
            <div className='app-input'>
                {label && <label className='input-label'>{label}</label>}
                <input className='input-base' placeholder={placeholder} value={value || ''} onChange={onChangeHandler}/>
                {error && <div className='input-error'>{error}</div>}
            </div>
        );
    }
)