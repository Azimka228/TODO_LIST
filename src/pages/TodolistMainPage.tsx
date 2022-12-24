import React, {useCallback, useEffect} from "react";
import "../app/App.css";

import InputForAddItem from "../Components/InputForAddItem/InputForAddItem";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import {createTodolistTC, deleteTodolistTC, fetchTodolistTC, сhangeTodolistTitleTC} from "../state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {TaskType} from "../API/API";
import TodoList from "./TodoList";

export type FilterValueType = "All" | "Completed" | "Active"
export type TodoListsType = {
	id: string
	title: string
	filter: FilterValueType
}
export type TaskStateType = {
	[key: string]: Array<TaskType>
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
		<div className="App">
			<Box sx={{flexGrow: 1}}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{mr: 2}}
						>
							<MenuIcon/>
						</IconButton>
						<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
							News
						</Typography>
						<Button color="inherit">Login</Button>
					</Toolbar>
				</AppBar>
			</Box>
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

		</div>
	);
}

export default AppWithReducer;
