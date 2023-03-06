import React from 'react';
import './Calculator.scss'
import {AppInput} from "../../components/AppInput/AppInput";

export const Calculator = () => {

    return (
        <div className='calculator-wrap'>
            <CalculatorTitle />
            <RoomForm />
        </div>
    );
};

const CalculatorTitle = React.memo(()=>{
    return <div className='calculator-wrap'>
        <h1>Калькулятор</h1>
        <h3>Здесь вы можете расчитать примерную смоимость.</h3>
    </div>
})

const RoomForm = ()=>{
    return <div className='calculator-form'>
        <AppInput />
    </div>
}

