import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./ToDoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    const toDoListId_1 = v1()
    const toDoListId_2 = v1()

    const [todoLists, dispatchToDoListReducer] = useReducer(todoListsReducer, [
        {id: toDoListId_1, title: 'What to learn', filter: 'all'},
        {id: toDoListId_2, title: 'What to Buy', filter: 'all'}
    ])
    const [tasks, dispatchToTaskReducer] = useReducer(tasksReducer,{
        [toDoListId_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [toDoListId_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Candy", isDone: false},
        ],
    })


    //BLL:
    function removeTasks(taskID: string, toDoListId: string) {
        const action = removeTaskAC(taskID, toDoListId)
        dispatchToTaskReducer(action)
    }

    function addTask(title: string, toDoListId: string) {
        const action = addTaskAC(title, toDoListId)
        dispatchToTaskReducer(action)
    }

    function changeTasksStatus(taskId: string, newIsDone: boolean, toDoListId: string) {
        const action = changeTaskStatusAC(taskId, newIsDone, toDoListId)
        dispatchToTaskReducer(action)
    }

    function changeTasksTitle(taskId: string, newTitle: string, toDoListId: string) {
        const action = changeTaskTitleAC(taskId, newTitle ,toDoListId)
        dispatchToTaskReducer(action)
    }

    function changeToDoList(newFilterValue: FilterValueType, toDoListId: string) {
        const action = changeTodolistFilterAC( toDoListId, newFilterValue)
        dispatchToDoListReducer(action)
    }

    function changeToDoListTitle(newTitle: string, toDoListId: string) {
        const action = changeTodolistAC(newTitle, toDoListId)
        dispatchToDoListReducer(action)
    }

    function removeTodoList(toDoListId: string) {
        const action = removeTodoListAC(toDoListId)
        dispatchToTaskReducer(action)
        dispatchToDoListReducer(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatchToTaskReducer(action)
        dispatchToDoListReducer(action)
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForToDoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
        }
        return (
            <Grid item>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTasks}
                        addTask={addTask}
                        changeFilter={changeToDoList}
                        changeTodolistTitle={changeToDoListTitle}
                        changeTaskStatus={changeTasksStatus}
                        changeTaskTitle={changeTasksTitle}
                        filter={tl.filter}
                        removeTodolist={removeTodoList}
                    />
                </Paper>
            </Grid>
        )
    })
    //UI
    //Create, Read, Update, Delete
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5} style={{padding: '20px'}}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

