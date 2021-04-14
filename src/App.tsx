import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import classes from "*.module.scss";

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

    const [todoLists, setToDoList] = useState<Array<ToDoListType>>([
        {id: toDoListId_1, title: 'What to learn', filter: 'all'},
        {id: toDoListId_2, title: 'What to Buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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
        const todoListTasks = tasks[toDoListId]
        const filteredTasks = todoListTasks.filter(t => t.id !== taskID)
        tasks[toDoListId] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(title: string, toDoListId: string) {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todoListTasks = tasks[toDoListId]
        tasks[toDoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeTasksStatus(taskId: string, newIsDone: boolean, toDoListId: string) {
        const todoListTasks = tasks[toDoListId]

        const task = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = newIsDone
            setTasks({...tasks})
        }
    }

    function changeTasksTitle(taskId: string, newTitle: string, toDoListId: string) {
        const todoListTasks = tasks[toDoListId]
        const task = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function changeToDoList(newFilterValue: FilterValueType, toDoListId: string) {
        const todoList = todoLists.find(tl => tl.id === toDoListId)
        if (todoList) {
            todoList.filter = newFilterValue
            setToDoList([...todoLists])
        }
    }

    function changeToDoListTitle(newTitle: string, toDoListId: string) {
        const todoList = todoLists.find(tl => tl.id === toDoListId)
        if (todoList) {
            todoList.title = newTitle
            setToDoList([...todoLists])
        }
    }

    function removeTodoList(toDoListId: string) {
        setToDoList(todoLists.filter(tl => tl.id !== toDoListId))
        delete tasks[toDoListId]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: ToDoListType = {id: newTodoListId, title, filter: 'all'}
        setToDoList([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
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
                    <ToDoList
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForToDoList}
                        removeTasks={removeTasks}
                        addTask={addTask}
                        changeToDoList={changeToDoList}
                        changeToDoListTitle={changeToDoListTitle}
                        changeStatus={changeTasksStatus}
                        changeTitle={changeTasksTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
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

