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
	const addTasks = (e:string) => {
		let Task = {id: v1(), title:e, isDone: false}
		let NewTasks = [Task, ...Tasks]
		setTasks(NewTasks)
	}
	const removeTasks = (taskId:string) => {
		setTasks(Tasks.filter((t) => { return t.id !== taskId}))
	}
	const [Filter,setFilter] = useState<FilterValueType>("All")
	const changeTasks = (ch_task : FilterValueType) => {
		setFilter(ch_task)
	}
	let TaskaForTodoList = Tasks
	if (Filter === "Completed") {
		TaskaForTodoList = Tasks.filter(t => t.isDone)
	}
	if (Filter === "Active") {
		TaskaForTodoList = Tasks.filter(t => !t.isDone)
	}

	return (
		<div className="App">
			<TodoList tasks={TaskaForTodoList} title={todoListTitle} removeTasks={removeTasks}
					  changeTasks={changeTasks} addTasks={addTasks}/>
		</div>
	);
}

export default App;
