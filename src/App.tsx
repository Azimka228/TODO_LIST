import React, {useState} from "react";
import "./App.css";
import TodoList from "./TodoList";
import {v1} from "uuid";

export type FilterValueType = "All" | "Completed" | "Active"

function App() {
	const todoListTitle = "What to buy"
	const [Tasks, setTasks] = useState([
		{id: v1(), title: "HTML&CSS", isDone: true},
		{id: v1(), title: "JS", isDone: true},
		{id: v1(), title: "React", isDone: false},
	])

	const addTasks = (e: string) => {
		let Task = {id: v1(), title: e.trim(), isDone: false}
		let NewTasks = [Task, ...Tasks]
		setTasks(NewTasks)
	}
	const removeTasks = (taskId: string) => {
		setTasks(Tasks.filter((t) => {
			return t.id !== taskId
		}))
	}
	const [Filter, setFilter] = useState<FilterValueType>("All")
	const chooseTasks = (ch_task: FilterValueType) => {
		setFilter(ch_task)
	}
	const ChangeTaskStatus = (taskId: string, isDone: boolean) => {
		const UpdatedTasks = Tasks.map(t => t.id === taskId ? {...t, isDone} : t)
		setTasks(UpdatedTasks)
	}
	let TaskForTodoList = Tasks
	if (Filter === "Completed") {
		TaskForTodoList = Tasks.filter(t => t.isDone)
	}
	if (Filter === "Active") {
		TaskForTodoList = Tasks.filter(t => !t.isDone)
	}

	return (
		<div className="App">
			<TodoList tasks={TaskForTodoList} title={todoListTitle} removeTasks={removeTasks}
					  chooseTasks={chooseTasks} addTasks={addTasks} ChangeTaskStatus={ChangeTaskStatus}
					  Filter={Filter}
			/>
		</div>
	);
}

export default App;
