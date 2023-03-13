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
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {InitialUserStateType, userLogoutTC} from "../pages/User/login-reducer";

const App = () => {
	const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
	const appState = useSelector<AppRootStateType>(state => state.todolists)
	const appState2 = useSelector<AppRootStateType>(state => state.tasks)
	const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
	const isLoggedIn = useSelector<AppRootStateType, InitialUserStateType>(state => state.user)


	console.log(appState)
	console.log(appState2)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(initializedAppTC())
	}, [isLoggedIn.id])

	if (!isInitialized) {
		return <div>
			<CircularProgress/>
		</div>
	}
	const logoutUser = () => {
		dispatch(userLogoutTC())
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
							{/*TODO!!!*/}
							{isLoggedIn.id !== null ?
								<>
									<Button color="inherit">Profile</Button>
									<Button color="inherit" onClick={logoutUser}>Logout</Button>
								</>

								:
								<>
									<Button color="inherit">Login</Button>
								</>
							}

						</Toolbar>
					</AppBar>
				</Box>
				<Routes>
					{isLoggedIn.id !== null ?
						<>
							<Route path="/" element={<TodolistMainPage/>}></Route>
							<Route path="*" element={<Navigate replace to="/"/>}></Route>
						</>

						:
						<>
							<Route path="/login" element={<Login/>}></Route>
							<Route path="*" element={<Navigate replace to="/login"/>}></Route>
						</>
					}
				</Routes>
			</div>
		</BrowserRouter>
	</>
};

export default App;