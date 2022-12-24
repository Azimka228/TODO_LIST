import {
	addTaskAC,
	AddTodolistAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReducer
} from "./tasks-reducer"
import {TaskStateType, TodoListsType} from "../pages/TodolistMainPage"
import {RemoveTodoListAC, todolistsReducer} from "./todolists-reducer";

test("correct task should be deleted from correct array", () => {
	const startState: TaskStateType = {
		"todolistId1": [
			{id: "1", title: "CSS", completed: false},
			{id: "2", title: "JS", isDone: true},
			{id: "3", title: "React", isDone: false}
		],
		"todolistId2": [
			{id: "1", title: "bread", isDone: false},
			{id: "2", title: "milk", isDone: true},
			{id: "3", title: "tea", isDone: false}
		]
	}

	const action = removeTaskAC("2", "todolistId2")

	const endState = tasksReducer(startState, action)

	expect(endState).toEqual({
		"todolistId1": [
			{id: "1", title: "CSS", isDone: false},
			{id: "2", title: "JS", isDone: true},
			{id: "3", title: "React", isDone: false}
		],
		"todolistId2": [
			{id: "1", title: "bread", isDone: false},
			{id: "3", title: "tea", isDone: false}
		]
	})
})
test("correct task should be added to correct array", () => {
	const startState: TaskStateType = {
		"todolistId1": [
			{id: "1", title: "CSS", isDone: false},
			{id: "2", title: "JS", isDone: true},
			{id: "3", title: "React", isDone: false}
		],
		"todolistId2": [
			{id: "1", title: "bread", isDone: false},
			{id: "2", title: "milk", isDone: true},
			{id: "3", title: "tea", isDone: false}
		]
	}

	const action = addTaskAC("juce", "todolistId2")

	const endState = tasksReducer(startState, action)

	expect(endState["todolistId1"].length).toBe(3)
	expect(endState["todolistId2"].length).toBe(4)
	expect(endState["todolistId2"][0].id).toBeDefined()
	expect(endState["todolistId2"][0].title).toBe("juce")
	expect(endState["todolistId2"][0].isDone).toBe(false)
})
test("status of specified task should be changed", () => {
	const startState: TaskStateType = {
		"todolistId1": [
			{id: "1", title: "CSS", isDone: false},
			{id: "2", title: "JS", isDone: true},
			{id: "3", title: "React", isDone: false}
		],
		"todolistId2": [
			{id: "1", title: "bread", isDone: false},
			{id: "2", title: "milk", isDone: true},
			{id: "3", title: "tea", isDone: false}
		]
	}

	const action = changeTaskStatusAC("2", false, "todolistId2")

	const endState = tasksReducer(startState, action)

	expect(endState["todolistId2"][1].isDone).toBe(false)
	expect(endState["todolistId2"][2].isDone).toBe(false)

})

test("Title of specified task should be changed", () => {
	const startState: TaskStateType = {
		"todolistId1": [
			{id: "1", title: "CSS", isDone: false},
			{id: "2", title: "JS", isDone: true},
			{id: "3", title: "React", isDone: false}
		],
		"todolistId2": [
			{id: "1", title: "bread", isDone: false},
			{id: "2", title: "milk", isDone: true},
			{id: "3", title: "tea", isDone: false}
		]
	}

	const action = changeTaskTitleAC("2", "tasty", "todolistId2")

	const endState = tasksReducer(startState, action)

	expect(endState["todolistId2"][1].title).toBe("tasty")
	expect(endState["todolistId2"][2].title).toBe("tea")

})
test('new array should be added when new todolist is added', () => {
	const startState: TaskStateType = {
		'todolistId1': [
			{id: '1', title: 'CSS', isDone: false},
			{id: '2', title: 'JS', isDone: true},
			{id: '3', title: 'React', isDone: false}
		],
		'todolistId2': [
			{id: '1', title: 'bread', isDone: false},
			{id: '2', title: 'milk', isDone: true},
			{id: '3', title: 'tea', isDone: false}
		]
	}

	const action = AddTodolistAC('new todolist')

	const endState = tasksReducer(startState, action)


	const keys = Object.keys(endState)
	const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})


test('ids should be equals', () => {
	const startTasksState: TaskStateType = {}
	const startTodolistsState: Array<TodoListsType> = []

	const action = AddTodolistAC('new todolist')

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState[0].id

	expect(idFromTasks).toBe(action.todolistId)
	expect(idFromTodolists).toBe(action.todolistId)
})

test('property with todolistId should be deleted', () => {
	const startState: TaskStateType = {
		'todolistId1': [
			{id: '1', title: 'CSS', isDone: false},
			{id: '2', title: 'JS', isDone: true},
			{id: '3', title: 'React', isDone: false}
		],
		'todolistId2': [
			{id: '1', title: 'bread', isDone: false},
			{id: '2', title: 'milk', isDone: true},
			{id: '3', title: 'tea', isDone: false}
		]
	}

	const action = RemoveTodoListAC('todolistId2')

	const endState = tasksReducer(startState, action)


	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeDefined()
})