import React, {useEffect} from "react";
import TodolistMainPage from "../pages/TodolistMainPage";
import {Login} from "../pages/User/Login";
import {AppBar, Box, Button, CircularProgress, LinearProgress, Toolbar, Typography} from "@mui/material";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {initializedAppTC, RequestStatusType} from "../state/app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {

	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(initializedAppTC())
	}, [])

	const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
	const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)

	if (!isInitialized) {
		return <div>
			<CircularProgress/>
		</div>
	}

	return <>
		<BrowserRouter>
			<div className="App">
				{appStatus === "loading" && <LinearProgress/>}
				<ErrorSnackbar/>
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
				<Routes>
					<Route path="/" element={<TodolistMainPage/>}></Route>
					<Route path="/login" element={<Login/>}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	</>
};

export default App;