import {TaskStateType} from "../AppWithRedux";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todolists-reducer";
import {API, TaskType} from "../API/API";
import {AppThunk} from "./store";

const REMOVE_TASK = "REMOVE-TASK"
const ADD_TASK = "ADD-TASK"
const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"
const ADD_TODOLIST = "ADD-TODOLIST"
const SET_TASKS = "SET-TASKS"

export type removeTaskActionType = {
	type: "REMOVE-TASK"
	taskId: string
	todolistId: string
}

export type addTaskActionType = {
	type: "ADD-TASK"
	newTask: TaskType
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

export type setTasksActionType = {
	type: "SET-TASKS"
	tasks: Array<TaskType>
	todolistId: string
}

export type TasksActionsType = removeTaskActionType
	| addTaskActionType
	| changeTaskStatusActionType
	| changeTaskTitleActionType
	| AddTodoListActionType
	| RemoveTodoListActionType
	| setTasksActionType
	| SetTodoListsActionType

const initialState = {}

export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
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

			let copyState = {
				...state,
				[action.newTask.todoListId]: [
					{...action.newTask},
					...state[action.newTask.todoListId]
				]
			}
			return copyState
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
				[action.todolist.id]: []
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
		case "SET-TODOLISTS" : {
			const copyState = {...state}
			action.todolists.forEach(el => copyState[el.id] = [])
			return copyState
		}
		case "SET-TASKS" : {
			const copyState = {...state}
			copyState[action.todolistId] = action.tasks
			return copyState
		}
		default: {
			return state
		}
	}
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
	return {type: REMOVE_TASK, taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (newTask: TaskType): addTaskActionType => {
	return {type: ADD_TASK, newTask}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {

	return {type: CHANGE_TASK_STATUS, taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
	return {type: CHANGE_TASK_TITLE, taskId: taskId, title: title, todolistId: todolistId}
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): setTasksActionType => {
	return {type: SET_TASKS, todolistId, tasks}
}

export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
	API.getTasks(todolistId).then(res => {
			dispatch(setTasksAC(todolistId, res.data.items))
		}
	)
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => {
	return (dispatch) => {
		API.deleteTask(todolistId, taskId)
			.then(res => {
				dispatch(removeTaskAC(taskId, todolistId))
			})
	}
}

export const createTaskTC = (todolistId: string, title: string): AppThunk => {
	return (dispatch) => {
		API.createNewTask(todolistId, title)
			.then(res => {
				dispatch(addTaskAC(res.data.data.item))
			})
	}
}