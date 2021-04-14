import {TaskStateType} from '../App';
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, toDoListId_1, toDoListId_2} from "./todolist-reducer";

type firstActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
type addTodoListActionType = {
    type: 'ADD-TASKS'
    title: string
    todoListId: string
}
type changeTasksStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    newIsDone: boolean
    todoListId: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todoListId: string
}


export type ActionType = firstActionType
    | addTodoListActionType | changeTasksStatusActionType | changeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType;

const initialState: TaskStateType = {
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
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASKS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todoListId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => task.id === action.id
                        ? {...task, isDone: action.newIsDone}
                        : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => task.id === action.id
                        ? {...task, title: action.title}
                        : task)
            }
        }

        case "ADD-TODOLIST": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): firstActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}
export const addTaskAC = (title: string, todoListId: string): addTodoListActionType => {
    return {type: 'ADD-TASKS', title, todoListId}
}
export const changeTaskStatusAC = (id: string, newIsDone: boolean, todoListId: string): changeTasksStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, newIsDone, todoListId}
}
export const changeTaskTitleAC = (id: string, title: string, todoListId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todoListId}
}