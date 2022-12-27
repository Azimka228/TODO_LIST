import {appReducer, InitialAppStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
	startState = {
		status: "loading",
		error: null
	}
})

test("correct error message should be set", () => {
const endState = appReducer(startState,setErrorAC("Some error"))

	expect(endState.error).toBe("Some error")
})

test("correct status message should be set", () => {
	const endState = appReducer(startState,setStatusAC("succeeded"))

	expect(endState.status).toBe("succeeded")
})