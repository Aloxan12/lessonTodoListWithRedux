import React, {ChangeEvent, useCallback} from "react";
import {FilterValueType, TaskType} from './App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {Task} from "./Task";

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

const ToDoList = React.memo((props: TypeToDoList)=>{
    console.log('ToDoList clicked')
    const addTask = useCallback((title: string) => props.addTask(title, props.id),[props.id])

    const tasks = props.tasks.map(t => {

        let allTasksTodoLists = props.tasks
        let tasksForToDoList = allTasksTodoLists

        if (props.filter === "active") {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
        }
        if (props.filter === "completed") {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
        }
        return (
            <Task changeTaskTitle={props.changeTitle}
                  changeTasksStatus={props.changeStatus}
                  removeTasks={props.removeTasks}
                  task={t}
                  todoListId={props.id} />
        );
    })
    const onAllClickHandler = useCallback (() => props.changeToDoList("all", props.id),[props.id])
    const onActiveClickHandler = useCallback (() => props.changeToDoList("active", props.id), [props.id])
    const onCompletedClickHandler = useCallback(() =>props.changeToDoList("completed", props.id),[props.id])

    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = useCallback((title: string) => props.changeToDoListTitle(title, props.id),
        [props.changeToDoListTitle, props.id])


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
})

export default ToDoList;