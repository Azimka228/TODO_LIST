import axios from "axios";

const settings = {
	withCredentials: true,
	headers: {
		"API-KEY": "97f4bec8-f93c-43fe-9fba-e289a8c77883"
	}
}

const instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.1",
	...settings
})

export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}

type ResponseAPI<D = {}> = {
	data: D
	fieldsErrors: Array<string>
	messages: Array<string>
	resultCode: number
}

type TaskType = {
	title: string
	description: string
	completed: boolean
	status: number
	priority: number
	startDate: string
	deadline: string
}

export const API = {
	getTodolists() {
		return instance.get<Array<TodolistType>>(`/todo-lists`)
	},
	deleteTodolist(id: string) {
		return instance.delete<ResponseAPI>(`/todo-lists/${id}`)
	},
	createNewTodolist(title: string) {
		return instance.post<ResponseAPI<{ item: TodolistType }>>(`/todo-lists/`, {title})
	},
	updateTodolistTitle(todolistId: string, title: string) {
		return instance.put<ResponseAPI<{ item: TodolistType }>>(`/todo-lists/${todolistId}`, {title})
	},

	getTasks(todolistId: string) {
		return instance.get(`/todo-lists/${todolistId}/tasks`)
	},
	createNewTask(todolistId: string, title: string) {
		return instance.post<ResponseAPI<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseAPI>(`/todo-lists/${todolistId}/tasks/${taskId}`,)
	},
	updateTask(todolistId: string, taskId: string, model:TaskType) {
		return instance.put<ResponseAPI<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`,model)
	},


}