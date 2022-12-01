import {TaskStateType} from "../AppWithReducer";
import {v1} from "uuid";
import {RemoveTodoListActionType} from "./todolists-reducer";

const REMOVE_TASK = "REMOVE-TASK"
const ADD_TASK = "ADD-TASK"
const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"
const ADD_TODOLIST = "ADD-TODOLIST"

export type removeTaskActionType = {
	type: "REMOVE-TASK"
	taskId: string
	todolistId: string
}

export type addTaskActionType = {
	type: "ADD-TASK"
	title: string
	todolistId: string
}

export type changeTaskStatusActionType = {
	type: "CHANGE-TASK-STATUS"
	taskId: string
	isDone: boolean
	todolistId: string
}

export type changeTaskTitleActionType = {
	type: "CHANGE-TASK-TITLE"
	taskId: string
	title: string
	todolistId: string
}

export type addTodolistActionType = {
	type: "ADD-TODOLIST"
	title:string
	todolistId:string
}

type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | addTodolistActionType | RemoveTodoListActionType

const initialState = {
	["todoListId1"]: [
		{id: v1(), title: "HTML&CSS", isDone: true},
		{id: v1(), title: "JS", isDone: true},
		{id: v1(), title: "ReactJS", isDone: false},

	],
	["todoListId2"]: [
		{id: v1(), title: "Cola", isDone: true},
		{id: v1(), title: "Milk", isDone: false},
		{id: v1(), title: "Cheaps", isDone: false},

	],

}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
	switch (action.type) {
		case REMOVE_TASK : {
			let copyState = {
				...state,
				[action.todolistId]: [
					...state[action.todolistId].filter((el: any) => (el.id !== action.taskId))
				]
			}

			return {...copyState}
		}
		case ADD_TASK : {
			const newTask = {id: v1(), title: action.title, isDone: false}
			let copyState = {
				...state,
				[action.todolistId]: [
					newTask,
					...state[action.todolistId]
				]
			}
			return {...copyState}
		}
		case CHANGE_TASK_STATUS : {
			let copyState = {
				...state,
				[action.todolistId]: [
					...state[action.todolistId].map(el => {
						if (el.id === action.taskId) {
							return {...el, isDone: action.isDone}
						} else {
							return {...el}
						}
					})
				]
			}
			return {...copyState}
		}
		case CHANGE_TASK_TITLE: {
			let copyState = {
				...state,
				[action.todolistId]: [
					...state[action.todolistId].map(el => {
						if (el.id === action.taskId) {
							return {...el, title: action.title}
						} else {
							return {...el}
						}
					})
				]
			}
			return {...copyState}
		}
		case ADD_TODOLIST: {
			let copyState = {
				...state,
				[action.todolistId]:[]
			}
			return {...copyState}
		}
		case "REMOVE-TODOLIST": {
			let copyState = {
				...state,
			}
			delete copyState[action.id]
			return {...copyState}
		}
		default: {
			return state
		}
	}
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
	return {type: REMOVE_TASK, taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
	return {type: ADD_TASK, title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {

	return {type: CHANGE_TASK_STATUS, taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
	return {type: CHANGE_TASK_TITLE, taskId: taskId, title: title, todolistId: todolistId}
}

export const AddTodolistAC = ( title: string): addTodolistActionType => {
	return {type: ADD_TODOLIST,todolistId:v1(), title:title }
}