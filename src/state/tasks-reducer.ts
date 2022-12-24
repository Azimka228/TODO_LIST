import {TaskStateType} from "../pages/TodolistMainPage";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todolists-reducer";
import {API, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../API/API";
import {AppRootStateType, AppThunk} from "./store";

export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}

export type TasksActionsType = ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof setTasksAC>
	| ReturnType<typeof updateTaskAC>
	| AddTodoListActionType
	| RemoveTodoListActionType
	| SetTodoListsActionType

const initialState = {}

export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
	switch (action.type) {
		case "REMOVE-TASK" : {
			return {
				...state,
				[action.todolistId]: [
					...state[action.todolistId].filter((el: any) => (el.id !== action.taskId))
				]
			}
		}
		case "ADD-TASK" : {
			return {
				...state,
				[action.task.todoListId]: [
					{...action.task},
					...state[action.task.todoListId]
				]
			}
		}
		case "ADD-TODOLIST": {
			return {
				...state,
				[action.todolist.id]: []
			}

		}
		case "UPDATE-TASK":
			return {
				...state,
				[action.todolistId]: state[action.todolistId]
					.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
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

export const removeTaskAC = (taskId: string, todolistId: string) =>
	({type: "REMOVE-TASK", taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
	({type: "ADD-TASK", task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
	({type: "UPDATE-TASK", model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
	({type: "SET-TASKS", tasks, todolistId} as const)

export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
	API.getTasks(todolistId).then(res => {
			dispatch(setTasksAC(res.data.items, todolistId))
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

export const updateTaskTc = (todolistId: string, taskId: string, updatemodel: UpdateDomainTaskModelType): AppThunk => {
	return (dispatch, getState: () => AppRootStateType) => {
		const state = getState()
		const currentTask = state.tasks[todolistId].find((el) => el.id === taskId)
		if (!currentTask) {
			console.warn("Task not found")
			return
		}

		const newModel: UpdateTaskModelType = {
			title: currentTask.title,
			description: currentTask.description,
			status: currentTask.status,
			priority: currentTask.priority,
			startDate: currentTask.startDate,
			deadline: currentTask.deadline,
			...updatemodel
		}
		console.log(newModel)
		API.updateTask(todolistId, taskId, newModel)
			.then(res => dispatch(updateTaskAC(taskId, res.data.data.item, todolistId)))
	}
}