import {AppThunk} from "./store";
import {authAPI} from "../API/API";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
	status: "idle" as RequestStatusType,
	error: null,
	initialized: false
}

export type InitialAppStateType = {
	status: RequestStatusType
	error: string | null
	initialized: boolean
}

export const appReducer = (state: InitialAppStateType = initialState, action: AppReducerActionsType): InitialAppStateType => {
	switch (action.type) {
		case "APP/SET-STATUS":
			return {...state, status: action.status}
		case "APP/SET-ERROR":
			return {...state, error: action.error}
		default:
			return state
	}
}

export const setErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)

export const initializedAppTC = (): AppThunk => {
	return (dispatch) => {
		authAPI.me()
			.then(res =>{
				if(res.data.resultCode === 0) {
					console.log(res.data.data)
				}else {
					console.log(res.data.data)
				}
			})
	}
}

export type AppReducerActionsType =
	| ReturnType<typeof setStatusAC>
	| ReturnType<typeof setErrorAC>