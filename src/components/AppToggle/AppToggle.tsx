import React, { ChangeEvent } from 'react'
import './AppToggle.scss'

interface IAppToggle {
    value: boolean
    disabled?: boolean
    onChange?: (value: boolean) => void
    text?:string
}

export const AppToggle = React.memo(({
                                         value,
                                         onChange,
                                         disabled,
                                         text
                                     }: IAppToggle) => {
    const onChangeHandler = !!onChange
        ? (e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.checked)
        }
        : undefined

    return (
        <div className={'toggle-wrap'}>
            <label className={`checkbox-slider`}>
                <input
                    type="checkbox"
                    className="checkbox"
                    id="input-p-slider"
                    checked={value}
                    onChange={onChangeHandler}
                    disabled={disabled}
                />
                <span className={`slider${!onChange ? ' active-not' : ''}`} />
            </label>
            {!!text && <span> {text}</span>}
        </div>
    )
})
