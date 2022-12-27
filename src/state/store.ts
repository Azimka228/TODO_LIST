import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "./todolists-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {userReducer, UserReducerActionsType} from "../pages/User/login-reducer";

const rootReducer = combineReducers(
	{
		todolists: todolistsReducer,
		tasks: tasksReducer,
		app: appReducer,
		user: userReducer
	}
)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch: () => ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppActionsType = TodolistsActionsType | TasksActionsType | AppReducerActionsType | UserReducerActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>