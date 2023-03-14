import React, {useCallback, useEffect, useState} from 'react';
import './Calculator.scss'
import {AppInput, InputMaskType} from "../../components/AppInput/AppInput";
import {AppToggle} from "../../components/AppToggle/AppToggle";
import {AppDropdown} from "../../components/AppDropdown/AppDropdown";
import {AppButton} from "../../components/AppButton/AppButton";
import {AppTitlePage} from "../../components/AppTitlePage/AppTitlePage";

export const Calculator = () => {
    return (
        <div className='calculator-wrap'>
            <CalculatorTitle/>
            <RoomForm/>
        </div>
    );
};

const CalculatorTitle = React.memo(() => {
    return <div className='calculator-title-wrap'>
        <AppTitlePage title='Калькулятор' />
        <span className='sub-title'>Здесь вы можете рассчитать примерную стоимость</span>
    </div>
})

type CorniceType = 'Открытая ниша' |
    'Ниша с аллюминевым карнизом (закрытая ниша)' |
    'Потолочный'

interface IRoom {
    id?: string
    title: string
    lampCount: number
    pipeCount: number
    trackLightCount: number
    square: number
    bigWidth: boolean
    cornice: boolean
    corniceLong: number
    corniceType: CorniceType
}

const RoomForm = React.memo(() => {
    const [newRoom, setNewRoom] = useState<IRoom>({
        title: '',
        square: 0,
        lampCount: 0,
        pipeCount: 0,
        trackLightCount: 0,
        bigWidth: false,
        cornice: false,
        corniceLong: 0,
        corniceType: 'Открытая ниша'
    })

    const [rate, setRate] = useState<null | number>(null);

    useEffect(() => {
        fetch(
            "https://www.nbrb.by/api/exrates/rates/431", {method:'Get'}
        )
            .then((response) => response.json())
            .then((data) => {
                setRate(data.Cur_OfficialRate)
            });
    }, []);


    const changeTitleHandler = useCallback((value: string) => setNewRoom(prevState => ({
        ...prevState,
        title: value
    })), [])
    const changeSquareHandler = useCallback((value: string) => setNewRoom(prevState => ({
        ...prevState,
        square: Number(value)
    })), [])
    const changeLampCountHandler = useCallback((value: string) => setNewRoom(prevState => ({
        ...prevState,
        lampCount: Number(value)
    })), [])
    const changeTrackLampHandler = useCallback((value: string) => setNewRoom(prevState => ({
        ...prevState,
        trackLightCount: Number(value)
    })), [])
    const changePipeCountHandler = useCallback((value: string) => setNewRoom(prevState => ({
        ...prevState,
        pipeCount: Number(value)
    })), [])
    const changeBidWidthHandler = useCallback((value: boolean) => setNewRoom(prevState => ({
        ...prevState,
        bigWidth: value
    })), [])
    const changeCorniceLongHandler = useCallback((value: string) => setNewRoom(prevState => ({
        ...prevState,
        corniceLong: Number(value)
    })), [])
    const changeCorniceHandler = useCallback((value: boolean) => setNewRoom(prevState => ({
        ...prevState,
        cornice: value
    })), [])
    const changeCorniceTypeHandler = useCallback((value: CorniceType) => setNewRoom(prevState => ({
        ...prevState,
        corniceType: value
    })), [])

    return <div className='calculator-form'>
        <AppInput
            value={newRoom.title}
            label={'Название помещения'}
            onChange={changeTitleHandler}/>
        <div className={'input-row'}>
            <AppInput
                value={newRoom.square}
                label={`Площадь помещения(м²)`}
                onChange={changeSquareHandler}
                maxValue={5}
                type={'number'}
            />
            <AppInput
                value={newRoom.lampCount}
                label={'Количество люстр, светильников(шт.)'}
                onChange={changeLampCountHandler}
                inputMask={InputMaskType.integer}
            />
        </div>
        <div className={'input-row'}>
            <AppInput
                value={newRoom.trackLightCount}
                label={`Трековый светильник(м.п.)`}
                onChange={changeTrackLampHandler}
                inputMask={InputMaskType.integer}
            />
            <AppInput
                value={newRoom.pipeCount}
                label={'Труба под обход батареи(шт.)'}
                onChange={changePipeCountHandler}
                inputMask={InputMaskType.integer}
            />
        </div>
        <div className={'checkbox-row'}>
            <AppToggle
                value={newRoom.bigWidth}
                onChange={changeBidWidthHandler}
                text={'Ширина помещения больше 3.2м ?'}
            />
            <AppToggle
                value={newRoom.cornice}
                onChange={changeCorniceHandler}
                text={'Добавить карниз'}
            />
        </div>
        {newRoom.cornice &&
            <React.Fragment>
                <div className={'dropdown-row'}>
                    <div className='app-dropdown'/>
                    <AppDropdown
                        label={'Выберетие тип карниза'}
                        value={newRoom.corniceType}
                        onChange={changeCorniceTypeHandler}
                        data={['Открытая ниша', 'Ниша с аллюминевым карнизом (закрытая ниша)', 'Потолочный']}
                    />
                </div>
                <div className={'input-row'}>
                    <div className={'app-input'} />
                    <AppInput
                        value={newRoom.corniceLong}
                        label={'Длинна корниза(м)'}
                        onChange={changeCorniceLongHandler}
                        type={'number'}
                        maxValue={10}
                    />
                </div>
            </React.Fragment>
        }
        <RoomPrice />
        <div className='buttons-wrap'>
            <AppButton title='Добавить в корзину' onClick={()=>{}} />
        </div>
    </div>
})


const RoomPrice = () => {
    return <div className='room-price-wrap'>
        <span><b>Итого:</b></span>
        <span><b>0 руб.</b></span>
    </div>
}
