import {TaskStateType, ToDoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC, todoListsReducer} from "./todolist-reducer";

let startTasksState: TaskStateType
let startTodolistsState: Array<ToDoListType>

beforeEach(()=>{
    startTasksState = {};
    startTodolistsState = [];
})

test('ids should be equals', () => {
    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});


