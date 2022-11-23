import {
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	RemoveTodoListAC,
	todolistsReducer
} from "./todolists-reducer"
import {v1} from "uuid"
import {FilterValueType, TodoListsType} from "../App"

test("correct todolist should be added", () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = "New Todolist"

	const startState: Array<TodoListsType> = [
		{id: todolistId1, title: "What to learn", filter: "All"},
		{id: todolistId2, title: "What to buy", filter: "All"}
	]

	let action = AddTodoListAC(newTodolistTitle)

	const endState = todolistsReducer(startState, action)

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodolistTitle)
})
test("correct todolist should be removed", () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: Array<TodoListsType> = [
		{id: todolistId1, title: "What to learn", filter: "All"},
		{id: todolistId2, title: "What to buy", filter: "All"}
	]

	let action = RemoveTodoListAC(todolistId1)

	const endState = todolistsReducer(startState, action)

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})
test("correct todolist should change its name", () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = "New Todolist"

	const startState: Array<TodoListsType> = [
		{id: todolistId1, title: "What to learn", filter: "All"},
		{id: todolistId2, title: "What to buy", filter: "All"}
	]

	let action = ChangeTodoListTitleAC(todolistId2,newTodolistTitle)

	const endState = todolistsReducer(startState, action)

	expect(endState[0].title).toBe("What to learn")
	expect(endState[1].title).toBe(newTodolistTitle)
})
test("correct filter of todolist should be changed", () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newFilter: FilterValueType = "Completed"

	const startState: Array<TodoListsType> = [
		{id: todolistId1, title: "What to learn", filter: "All"},
		{id: todolistId2, title: "What to buy", filter: "All"}
	]

	let action = ChangeTodoListFilterAC(todolistId2,newFilter)

	const endState = todolistsReducer(startState, action)

	expect(endState[0].filter).toBe("All")
	expect(endState[1].filter).toBe(newFilter)
})
