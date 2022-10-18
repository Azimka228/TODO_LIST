import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import InputForAddItem from "./Components/InputForAddItem/InputForAddItem";

export type FilterValueType = "All" | "Completed" | "Active"
export type TodoListsType = {
	id: string
	title: string
	filter: FilterValueType
}
type TaskStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	let todoListId1 = v1()
	let todoListId2 = v1()

	let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
		{id: todoListId1, title: "What to buy", filter: "All"},
		{id: todoListId2, title: "What to Learn", filter: "All"}
	])

	const [Tasks, setTasks] = useState<TaskStateType>({
		[todoListId1]: [
			{id: v1(), title: "HTML&CSS", isDone: true},
			{id: v1(), title: "JS", isDone: true},
			{id: v1(), title: "ReactJS", isDone: false},

		],
		[todoListId2]: [
			{id: v1(), title: "Cola", isDone: true},
			{id: v1(), title: "Milk", isDone: false},
			{id: v1(), title: "Cheaps", isDone: false},

		],

	})

	const addTasks = (e: string, todoListId: string) => {
		let Task = {id: v1(), title: e.trim(), isDone: false}
		let tasks = Tasks[todoListId]
		Tasks[todoListId] = [Task, ...tasks]
		setTasks({...Tasks})
	}
	const removeTasks = (taskId: string, todoListId: string) => {
		let tasks = Tasks[todoListId]
		Tasks[todoListId] = tasks.filter(el => el.id !== taskId)
		setTasks({...Tasks})
	}
	const chooseTasks = (ch_task: FilterValueType, taskId: string) => {
		let TodoList = todoLists.find(el => el.id === taskId)
		if (TodoList) {
			TodoList.filter = ch_task
			setTodoLists([...todoLists])
		}

	}

	const ChangeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
		Tasks[todoListId] = Tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: !isDone} : t)
		setTasks({...Tasks})
	}

	const RenameTask = (taskId: string, value: string, todoListId: string) => {
		Tasks[todoListId] = Tasks[todoListId].map(t => t.id === taskId ? {...t, title:value} : t)
		setTasks({...Tasks})
	}

	const RenameTodoListTitle = (value: string, todoListId: string) => {
		todoLists.map(el => el.id === todoListId? el.title = value: el.title )
		setTodoLists([...todoLists])
	}

	const DeleteTodoList = (todoListId: string) => {
		setTodoLists(todoLists.filter(td => td.id !== todoListId))
		delete Tasks[todoListId]
		setTasks({...Tasks})
	}
	const addNewTodoList = (ItemValue: string) => {
		let idForTodoList = v1()
		let newTodoList:TodoListsType = {"id": idForTodoList,
				title: ItemValue,
				filter: "All",
			}

		setTodoLists([newTodoList,...todoLists])
		setTasks({...Tasks,[idForTodoList]:[]})
	}
	return (
		<div className="App">
			<div>
				<InputForAddItem onAddItemCallBack={addNewTodoList}/>
			</div>
			{
				todoLists.map(todolist => {
					let TaskForTodoList = Tasks[todolist.id]
					if (todolist.filter === "Completed") {
						TaskForTodoList = TaskForTodoList.filter(t => t.isDone)
					}
					if (todolist.filter === "Active") {
						TaskForTodoList = TaskForTodoList.filter(t => !t.isDone)
					}
					return <TodoList
						DeleteTodoList={DeleteTodoList}
						key={todolist.id}
						id={todolist.id}
						tasks={TaskForTodoList}
						title={todolist.title}
						removeTasks={removeTasks}
						chooseTasks={chooseTasks}
						addTasks={addTasks}
						ChangeTaskStatus={ChangeTaskStatus}
						RenameTask={RenameTask}
						RenameTodoListTitle={RenameTodoListTitle}
						Filter={todolist.filter}
					/>
				})
			}

		</div>
	);
}

export default App;
