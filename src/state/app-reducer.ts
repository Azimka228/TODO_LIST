import {AppThunk} from "./store";
import {authAPI} from "../API/API";
import {setUserAC} from "../pages/User/login-reducer";

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
		case "APP/SET-INITIALIZED":
			return {...state, initialized: action.value}
		default:
			return state
	}
}

export const setErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setInitializedValueAppAC = (value: boolean) => ({type: "APP/SET-INITIALIZED", value} as const)

export const initializedAppTC = (): AppThunk => {
	return (dispatch) => {
		authAPI.me()
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(setUserAC(res.data.data))
				} else {
					console.log(res.data.data)
				}
			})
			.finally(() => {
					dispatch(setInitializedValueAppAC(true))
				}
			)
	}
}

export type AppReducerActionsType =
	| ReturnType<typeof setStatusAC>
	| ReturnType<typeof setErrorAC>
	| ReturnType<typeof setInitializedValueAppAC>