import React from "react"
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {useAppDispatch} from "../../state/store";
import {userLoginTC} from "./login-reducer";



export const Login = () => {

	const dispatch = useAppDispatch()

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			rememberMe: false
		},
		onSubmit: values => {
			dispatch(userLoginTC(values))
		},
	})

	return <Grid container justifyContent={"center"}>
		<Grid item justifyContent={"center"}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormLabel>
						<p>To log in get registered
							<a href={"https://social-network.samuraijs.com/"}
										target={"_blank"}> here
							</a>
						</p>
						<p>or use common test account credentials:</p>
						<p>Email: free@samuraijs.com</p>
						<p>Password: free</p>
					</FormLabel>
					<FormGroup>
						<TextField
							label="email"
							margin="normal"
							name="email"
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
						<TextField
							type="password"
							label="Password"
							margin="normal"
							name="password"
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						<FormControlLabel
							label={"rememberMe"}
							control={<Checkbox/>}
							name="rememberMe"
							onChange={formik.handleChange}
							value={formik.values.rememberMe}
						/>
						<Button type={"submit"} variant={"contained"} color={"primary"} >
							Login
						</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}