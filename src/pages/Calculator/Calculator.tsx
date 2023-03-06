import React from 'react';
import './Calculator.scss'

export const Calculator = () => {

    return (
        <div className='calculator-wrap'>
            <CalculatorTitle />
        </div>
    );
};

const CalculatorTitle = React.memo(()=>{
    return <div className='calculator-wrap'>
        <h1>Калькулятор</h1>
        <h3>Здесь вы можете расчитать примерную смоимость.</h3>
    </div>
})

