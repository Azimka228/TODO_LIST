import {FilterValueType, TodoListsType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
	type: "REMOVE-TODOLIST"
	id: string
}

export type AddTodoListActionType = {
	type: "ADD-TODOLIST",
	todolistId:string
	title: string
}

export type ChangeTodoListTitleActionType = {
	type: "CHANGE-TODOLIST-TITLE"
	id: string
	title: string
}

export type ChangeTodoListFilterActionType = {
	type: "CHANGE-TODOLIST-FILTER"
	id: string
	filter: FilterValueType
}

type ActionsType =
	RemoveTodoListActionType
	| AddTodoListActionType
	| ChangeTodoListTitleActionType
	| ChangeTodoListFilterActionType

export const todolistsReducer = (state: Array<TodoListsType>, action: ActionsType): Array<TodoListsType> => {
	switch (action.type) {
		case "ADD-TODOLIST" : {
			return [
				...state,
				{id: action.todolistId, title: action.title, filter: "All"}
			]
		}
		case "REMOVE-TODOLIST" : {
			return [...state.filter(el => el.id !== action.id)]
		}
		case "CHANGE-TODOLIST-TITLE" : {
			const todolist = state.find(el => el.id === action.id);
			if (todolist) {
				todolist.title = action.title
			}
			return [...state]
		}
		case "CHANGE-TODOLIST-FILTER" : {
			const todolist = state.find(el => el.id === action.id);
			if (todolist) {
				todolist.filter = action.filter
			}
			return [...state]
		}
		default: {
			throw new Error("Action type is not valid")
		}
	}
}

export const RemoveTodoListAC = (id: string):RemoveTodoListActionType => {
	return{type: "REMOVE-TODOLIST", id: id}
}
export const AddTodoListAC = (title: string):AddTodoListActionType => {
	return{type: "ADD-TODOLIST", title: title,todolistId: v1()}
}
export const ChangeTodoListTitleAC = (id:string,title: string):ChangeTodoListTitleActionType => {
	return{type: "CHANGE-TODOLIST-TITLE", id:id , title: title}
}
export const ChangeTodoListFilterAC = (id:string,filter: FilterValueType):ChangeTodoListFilterActionType => {
	return{type: "CHANGE-TODOLIST-FILTER", id:id , filter: filter}
}

