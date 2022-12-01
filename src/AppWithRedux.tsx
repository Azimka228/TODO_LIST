import React, {useCallback} from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";
import InputForAddItem from "./Components/InputForAddItem/InputForAddItem";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import {AddTodoListAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValueType = "All" | "Completed" | "Active"
export type TodoListsType = {
	id: string
	title: string
	filter: FilterValueType
}
export type TaskStateType = {
	[key: string]: Array<TaskType>
}

const AppWithReducer =  () => {

	console.log("App rendered")

	const dispatch = useDispatch()

	const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todolists)


	const RenameTodoListTitle = useCallback((value: string, todoListId: string) => {
		const action = ChangeTodoListTitleAC(value,todoListId)
		dispatch(action)
	},[])
	const DeleteTodoList =  useCallback ( (todoListId: string) => {
		const action = RemoveTodoListAC(todoListId)
		dispatch(action)
	},[])
	const addNewTodoList = useCallback ((ItemValue: string) => {
		const action = AddTodoListAC(ItemValue)
		dispatch(action)
	},[])

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
					<Grid container sx={{p:4}}>
						<InputForAddItem onAddItemCallBack={addNewTodoList}/>
					</Grid>
					<Grid container spacing={3}>
						{
							todoLists.map(todolist => {

								return (
										<Grid item>
											<Paper sx={{p:2}}>
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
