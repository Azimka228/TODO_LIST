import {AppThunk} from "../../state/store";
import {setErrorAC, setStatusAC} from "../../state/app-reducer";
import {authAPI, UserType} from "../../API/API";

const initialState = {
	id: null,
	login: null,
	email: null
}

export type InitialUserStateType = {
	id?: number | null
	login?: string | null
	email?: string | null
}

export const userReducer = (state: InitialUserStateType = initialState, action: UserReducerActionsType): InitialUserStateType => {
	switch (action.type) {
		case "SET-USER": {
			return {...state, ...action.user}
		}
		default:
			return state
	}
}

export type UserReducerActionsType =
	| ReturnType<typeof setUserAC>

export const setUserAC = (user: InitialUserStateType) => ({type: "SET-USER", user})

//THUNK CREATORS
export const userLoginTC = (user: UserType): AppThunk => (dispatch) => {
	dispatch(setStatusAC("loading"))
	authAPI.loginUser(user)
		.then(res => {
				if (res.data.resultCode === 0) {
					console.log(res.data.data)
					dispatch(setUserAC({id: res.data.data.userId}))
					dispatch(setStatusAC("succeeded"))
				} else {
					if (res.data.messages.length) {
						dispatch(setErrorAC(res.data.messages[0]))
						dispatch(setStatusAC("failed"))
					}
				}
			}
		)
		.catch((error) => {
			dispatch(setErrorAC(error.message))
		})
}
export const userLogoutTC = (): AppThunk => (dispatch) => {
	dispatch(setStatusAC("loading"))
	authAPI.logoutUser()
		.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(setUserAC({
						id: null,
						login: null,
						email: null
					}))

					dispatch(setStatusAC("succeeded"))
				} else {
					if (res.data.messages.length) {
						dispatch(setErrorAC(res.data.messages[0]))
						dispatch(setStatusAC("failed"))
					}
				}
			}
		)
		.catch((error) => {
			dispatch(setErrorAC(error.message))
		})
}