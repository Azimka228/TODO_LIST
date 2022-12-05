import axios from "axios";

const API_URL = "https://social-network.samuraijs.com/api/1.1"

const settings = {
	withCredentials: true,
	headers: {
		"API-KEY": "97f4bec8-f93c-43fe-9fba-e289a8c77883"
	}
}

export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order:number
}

export const API = {
	getTodolists() {
		return axios.get<Array<TodolistType>>(`${API_URL}/todo-lists`, settings)
	},
	deleteTodolist(id: string) {
		return axios.delete(`${API_URL}/todo-lists/${id}`, settings)
	},
	createNewTodolist() {
		return axios.post(`${API_URL}/todo-lists/`,{title: "new todolist"} ,settings)
	}

}