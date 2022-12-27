import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {setErrorAC} from "../../state/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
	const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
	const isOpen = error !== null
const dispatch = useAppDispatch()
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(setErrorAC(null))
	}
	return (
		<Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
				{error} 😠
			</Alert>
		</Snackbar>
	)
}