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

export type AppRootState = ReturnType<typeof rootReducer>

export const useAppDispatch: () => ThunkDispatch<AppRootState, any, AnyAction> = useDispatch

export const store = createStore(rootReducer ,applyMiddleware(thunk))

export type AppActionsType = TodolistsActionsType | TasksActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>