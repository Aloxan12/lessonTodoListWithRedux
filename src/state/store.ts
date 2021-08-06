import {combineReducers, createStore} from 'redux';
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolist-reducer";


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

let preloadedState;
const persistedTodosString = localStorage.getItem('state')
if(persistedTodosString){
    preloadedState = JSON.parse(persistedTodosString)
}

export const store = createStore(rootReducer, preloadedState)

store.subscribe(()=>{
    localStorage.setItem('state', JSON.stringify(store.getState()))
    localStorage.setItem('todos', JSON.stringify(store.getState().todoLists))
    localStorage.setItem('tasks', JSON.stringify(store.getState().tasks))
})


export type AppRootState = ReturnType<typeof rootReducer>
//@ts-ignore
window.store = store