import {FilterValueType, ToDoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodoListActionType = {
    todolistId: string
    type: "ADD-TODOLIST",
    title: string,
}
export type ChangeTodolistActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}


export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType

export const toDoListId_1 = v1()
export const toDoListId_2 = v1()

const initialState: Array<ToDoListType> = [
    {id: toDoListId_1, title: 'What to learn', filter: 'all'},
    {id: toDoListId_2, title: 'What to Buy', filter: 'all'}
]

export const todoListsReducer = (todoLists: Array<ToDoListType> = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: ToDoListType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [newTodoList, ...todoLists]
        case "CHANGE-TODOLIST-TITLE":
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...todoLists]
            }
            return todoLists
        case "CHANGE-TODOLIST-FILTER":
            const todolist = todoLists.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
                return [...todoLists]
            }
            return todoLists
        default:
            return todoLists
    }
}
export const removeTodoListAC = (id: string):RemoveTodoListActionType=>{
    return {type: "REMOVE-TODOLIST", id}
}
export const addTodoListAC = (title: string,):AddTodoListActionType=>{
    return {type: "ADD-TODOLIST",todolistId: v1() , title}
}
export const changeTodolistAC = (id: string, title: string):ChangeTodolistActionType=>{
    return {type: "CHANGE-TODOLIST-TITLE", id , title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType):ChangeTodolistFilterActionType=>{
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}