import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../API/API";
import {AppRootStateType, AppThunk} from "./store";
import {RequestStatusType, setErrorAC, setStatusAC} from "./app-reducer";

export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export type TaskStateType = {
	[key: string]: Array<TaskType>
}
export type TasksActionsType = ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof setTasksAC>
	| ReturnType<typeof updateTaskAC>
	| ReturnType<typeof setTaskStatusAC>
	| AddTodoListActionType
	| RemoveTodoListActionType
	| SetTodoListsActionType

const initialState: TaskStateType = {}

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
			copyState[action.todolistId] = action.tasks.map(el => {
				return {...el, taskStatus: "idle"} as const
			})
			return copyState
		}
		case "SET-TASK-STATUS" : {
			return {
				...state,
				[action.todolistId]: [
					...state[action.todolistId].map(el => {
						if (el.id === action.taskId) {
							return {
								...el,
								taskStatus: action.taskStatus
							}
						} else {
							return {...el}
						}
					})
				]
			}
		}
		default: {
			return state
		}
	}
}

//ACTION CREATORS
export const removeTaskAC = (taskId: string, todolistId: string) =>
	({type: "REMOVE-TASK", taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
	({type: "ADD-TASK", task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
	({type: "UPDATE-TASK", model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
	({type: "SET-TASKS", tasks, todolistId} as const)
export const setTaskStatusAC = (taskId: string, todolistId: string, taskStatus: RequestStatusType) =>
	({type: "SET-TASK-STATUS", taskId, todolistId, taskStatus} as const)

//THUNK CREATORS
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
	dispatch(setStatusAC("loading"))
	todolistAPI.getTasks(todolistId)
		.then(res => {
				dispatch(setTasksAC(res.data.items, todolistId))
				dispatch(setStatusAC("succeeded"))
			}
		)
		.catch((error) => {
			dispatch(setErrorAC(error.message))
		})
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => {
	return (dispatch) => {
		dispatch(setTaskStatusAC(taskId, todolistId, "loading"))
		todolistAPI.deleteTask(todolistId, taskId)
			.then(res => {
				dispatch(removeTaskAC(taskId, todolistId))
			})
			.catch((error) => {
				dispatch(setErrorAC(error.message))
			})
	}
}

export const createTaskTC = (todolistId: string, title: string): AppThunk => {
	return (dispatch) => {
		dispatch(setStatusAC("loading"))
		todolistAPI.createNewTask(todolistId, title)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(addTaskAC(res.data.data.item))
					dispatch(setStatusAC("succeeded"))
				} else {
					if (res.data.messages.length) {
						dispatch(setErrorAC(res.data.messages[0]))
						dispatch(setStatusAC("failed"))
					}

				}
			})
			.catch((error) => {
				dispatch(setErrorAC(error.message))
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
		dispatch(setStatusAC("loading"))
		dispatch(setTaskStatusAC(taskId, todolistId, "loading"))
		todolistAPI.updateTask(todolistId, taskId, newModel)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(updateTaskAC(taskId, res.data.data.item, todolistId))
					dispatch(setStatusAC("succeeded"))
					dispatch(setTaskStatusAC(taskId, todolistId, "succeeded"))
				} else {
					if (res.data.messages.length) {
						dispatch(setErrorAC(res.data.messages[0]))
						dispatch(setStatusAC("failed"))
						dispatch(setTaskStatusAC(taskId, todolistId, "failed"))
					}

				}

			})
			.catch((error) => {
				dispatch(setErrorAC(error.message))
			})
	}
}