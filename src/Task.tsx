import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./AppWithRedux";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";


type TasksPropsType = {
    changeTaskTitle:(id: string, newTitle:string, todoListId: string)=> void
    changeTasksStatus:(taskId: string, newIsDone: boolean, toDoListId: string)=> void
    removeTasks:(taskID: string, toDoListId: string)=>void
    task: TaskType
    todoListId: string
}


export const Task = React.memo((props:TasksPropsType)=>{
    const removeTasks = () => props.removeTasks(props.task.id, props.todoListId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTasksStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }
    const changeTaskTitle = useCallback((newTitle: string) =>{
        props.changeTaskTitle(props.task.id, newTitle, props.todoListId)},
        [props.changeTaskTitle, props.task.id, props.todoListId])
    return (
        <div className={props.task.isDone ? "isDone" : ''}>
            <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                onChange={onChangeHandler}
                checked={props.task.isDone}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTasks} aria-label="delete">
                <Delete/>
            </IconButton>
        </div>
    )
})
