import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "./todolists-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers(
	{
		todolists: todolistsReducer,
		tasks: tasksReducer
	}
)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch: () => ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch

export const store = createStore(rootReducer ,applyMiddleware(thunk))

export type AppActionsType = TodolistsActionsType | TasksActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>