import React, {useCallback, useEffect} from "react";
import "../app/App.css";
import InputForAddItem from "../Components/InputForAddItem/InputForAddItem";
import {Container, Grid, Paper} from "@mui/material";
import {createTodolistTC, deleteTodolistTC, fetchTodolistTC, сhangeTodolistTitleTC} from "../state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import TodoList from "./TodoList";

export type FilterValueType = "All" | "Completed" | "Active"
export type TodoListsType = {
	id: string
	title: string
	filter: FilterValueType
}

const AppWithReducer = () => {

	const dispatch = useAppDispatch()

	const todoLists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists)

	useEffect(() => {
		dispatch(fetchTodolistTC())
	}, [])

	const RenameTodoListTitle = useCallback((title: string, todoListId: string) => {
		const thunk = сhangeTodolistTitleTC(title, todoListId)
		dispatch(thunk)
	}, [])
	const DeleteTodoList = useCallback((todoListId: string) => {
		dispatch(deleteTodolistTC(todoListId))
	}, [])
	const addNewTodoList = useCallback((ItemValue: string) => {
		dispatch(createTodolistTC(ItemValue))
	}, [])

	return (
		<>
			<Container fixed>
				<Grid container sx={{p: 4}}>
					<InputForAddItem onAddItemCallBack={addNewTodoList}/>
				</Grid>
				<Grid container spacing={3}>
					{
						todoLists.map(todolist => {

							return (
								<Grid item>
									<Paper sx={{p: 2}}>
										<TodoList
											DeleteTodoList={DeleteTodoList}
											key={todolist.id}
											id={todolist.id}
											title={todolist.title}
											RenameTodoListTitle={RenameTodoListTitle}
											Filter={todolist.filter}
										/>
									</Paper>
								</Grid>
							)
						})
					}
				</Grid>
			</Container>

		</>
	);
}

export default AppWithReducer;
