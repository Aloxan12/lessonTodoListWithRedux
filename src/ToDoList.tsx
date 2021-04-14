import React, {ChangeEvent} from "react";
import {FilterValueType, TaskType} from './App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";

type TypeToDoList = {
    id: string
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    removeTasks: (taskID: string, toDoListId: string) => void
    removeTodoList: (toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeToDoList: (newFilterValue: FilterValueType, toDoListId: string) => void
    changeToDoListTitle: (newTitle: string, toDoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    changeTitle: (taskId: string, newTitle: string, toDoListId: string) => void
}

function ToDoList(props: TypeToDoList) {
    const addTask = (title: string) => props.addTask(title, props.id)

    const tasks = props.tasks.map(t => {
        const removeTasks = () => props.removeTasks(t.id, props.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
            // let newIsDoneValue = e.currentTarget.checked
            // props.changeStatus(t.id, newIsDoneValue)
        }
        const changeTaskTitle = (newTitle: string) => {
            props.changeTitle(t.id, newTitle, props.id)
        }
        return (
            <li className={t.isDone ? "isDone" : ''}>
                <Checkbox
                       icon={<FavoriteBorder />}
                       checkedIcon={<Favorite />}
                       onChange={onChangeHandler}
                       checked={t.isDone}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTasks} aria-label="delete">
                    <Delete/>
                </IconButton>
            </li>
        );
    })
    const onAllClickHandler = () => {
        props.changeToDoList("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeToDoList("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeToDoList("completed", props.id)
    }
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (title: string) => props.changeToDoListTitle(title, props.id)


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle:'none', padding:'0'}}>
                {tasks}
            </ul>
            <Button variant={'outlined'} color={props.filter === "all" ? 'default' : 'inherit'} onClick={onAllClickHandler}>All</Button>
            <Button variant={'outlined'} color={props.filter === "active" ? 'primary' : 'inherit'} onClick={onActiveClickHandler}>Active</Button>
            <Button variant={'outlined'} color={props.filter === "completed" ? 'secondary' : 'inherit'} onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    );
}

export default ToDoList;