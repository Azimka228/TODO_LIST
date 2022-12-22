import {FilterValueType, TodoListsType} from "../AppWithRedux";
import {API, TodolistType} from "../API/API";
import {AppThunk} from "./store";

export type RemoveTodoListActionType = {
	type: "REMOVE-TODOLIST"
	id: string
}

export type AddTodoListActionType = {
	type: "ADD-TODOLIST",
	todolist: TodolistType
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

export type SetTodoListsActionType = {
	type: "SET-TODOLISTS"
	todolists: Array<TodolistType>
}

export type TodolistsActionsType =
	RemoveTodoListActionType
	| AddTodoListActionType
	| ChangeTodoListTitleActionType
	| ChangeTodoListFilterActionType
	| SetTodoListsActionType

export type FilterValuesType = "All" | "Active" | "Completed";
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = [
	// {id: "todoListId1", title: "What to buy", filter: "All"},
	// {id: "todoListId2", title: "What to Learn", filter: "All"}
]

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

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
	return {type: "REMOVE-TODOLIST", id: id}
}
export const AddTodoListAC = (todolist: TodolistType): AddTodoListActionType => {
	return {type: "ADD-TODOLIST", todolist}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
	return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValueType): ChangeTodoListFilterActionType => {
	return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>):SetTodoListsActionType => {
	return {type: "SET-TODOLISTS", todolists}
}

export const fetchTodolistTC = ():AppThunk => {
	return (dispatch) => {
		API.getTodolists()
			.then(res => {
					dispatch(setTodolistsAC(res.data))
				}
			)
	}
}

export const deleteTodolistTC = (todolistId: string):AppThunk => {
	return (dispatch) => {
		API.deleteTodolist(todolistId)
			.then(res => {
					dispatch(RemoveTodoListAC(todolistId))
				}
			)
	}
}

export const createTodolistTC = (todolistTitle: string):AppThunk => {
	return (dispatch) => {
		API.createNewTodolist(todolistTitle)
			.then(res => {
				dispatch(AddTodoListAC(res.data.data.item))
			})
	}
}

export const сhangeTodolistTitleTC = (title: string, todoListId: string):AppThunk => {
	return (dispatch) => {
		API.updateTodolistTitle(todoListId, title).then(res =>
			dispatch(ChangeTodoListTitleAC(todoListId, title))
		)
	}
}