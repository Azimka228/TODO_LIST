import {FilterValueType, TodoListsType} from "../pages/TodolistMainPage";
import {API, TodolistType} from "../API/API";
import {AppThunk} from "./store";

export type SetTodoListsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListAC>
export type AddTodoListActionType = ReturnType<typeof AddTodoListAC>

export type TodolistsActionsType =
	| RemoveTodoListActionType
	| AddTodoListActionType
	| ReturnType<typeof ChangeTodoListTitleAC>
	| ReturnType<typeof ChangeTodoListFilterAC>
	| SetTodoListsActionType

export type FilterValuesType = "All" | "Active" | "Completed";
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodoListsType> => {
	switch (action.type) {
		case "ADD-TODOLIST" : {
			return [
				...state,
				{...action.todolist, filter: "All"}
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
		case "SET-TODOLISTS" : {
			return action.todolists.map(el => {
				return {
					...el,
					filter: "All"
				}
			})
		}
		default: {
			return state
		}
	}
}

export const RemoveTodoListAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)

export const AddTodoListAC = (todolist: TodolistType) =>
	({type: "ADD-TODOLIST", todolist} as const)
export const ChangeTodoListTitleAC = (id: string, title: string) => ({
	type: "CHANGE-TODOLIST-TITLE",
	id,
	title
} as const)

export const ChangeTodoListFilterAC = (id: string, filter: FilterValueType) =>
	({type: "CHANGE-TODOLIST-FILTER", id, filter} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
	({type: "SET-TODOLISTS", todolists} as const)

export const fetchTodolistTC = (): AppThunk => {
	return (dispatch) => {
		API.getTodolists()
			.then(res => {
					dispatch(setTodolistsAC(res.data))
				}
			)
	}
}

export const deleteTodolistTC = (todolistId: string): AppThunk => {
	return (dispatch) => {
		API.deleteTodolist(todolistId)
			.then(res => {
					dispatch(RemoveTodoListAC(todolistId))
				}
			)
	}
}

export const createTodolistTC = (todolistTitle: string): AppThunk => {
	return (dispatch) => {
		API.createNewTodolist(todolistTitle)
			.then(res => {
				dispatch(AddTodoListAC(res.data.data.item))
			})
	}
}

export const сhangeTodolistTitleTC = (title: string, todoListId: string): AppThunk => {
	return (dispatch) => {
		API.updateTodolistTitle(todoListId, title).then(res =>
			dispatch(ChangeTodoListTitleAC(todoListId, title))
		)
	}
}