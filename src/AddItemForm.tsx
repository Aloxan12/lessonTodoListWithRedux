import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {Button, TextField} from "@material-ui/core";
import PostAddIcon from '@material-ui/icons/PostAdd';

type AddItemFormType = {
    addItem:(title: string)=>void
}

export function AddItemForm(props: AddItemFormType) {
    let [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeItem = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem =()=>{
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
            setTitle('');
        }else {
            setError(true)
        }
    }
    const onKeyPressItem = (e:KeyboardEvent<HTMLInputElement>)=> {
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <TextField
                value={title}
                error={!!error}
                helperText={error}
                onChange={onChangeItem}
                onKeyPress={onKeyPressItem}
            />
            <Button onClick={addItem}> <PostAddIcon/> </Button>
            {error && <div className='errorMessage'>Title is required</div>}
        </div>
    )
}
