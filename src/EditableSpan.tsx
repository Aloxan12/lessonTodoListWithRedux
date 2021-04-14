import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    changeTitle:(t: string)=>void
}

export function EditableSpan(props:EditableSpanType){
    const[editMode, setEditMode] = useState<boolean>(false)
    const[title, setTitle] = useState<string>(props.title)

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }
    const onEditMode = ()=>setEditMode(true)
    const offEditMode = ()=>{
        setEditMode(false)
        props.changeTitle(title)
    }
    const onEnter = (e:KeyboardEvent<HTMLInputElement>)=> {
        if (e.charCode === 13) {
            setEditMode(false)
            props.changeTitle(title);
        }
    }
    return (
        editMode
            ?<TextField
                    variant={"outlined"}
                    value={title}
                    onChange={changeTitle}
                    onBlur={offEditMode}
                    autoFocus
                    onKeyPress={onEnter}
            />
            :<span onDoubleClick={onEditMode}>{props.title}</span>
    )
}