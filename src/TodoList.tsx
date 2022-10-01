import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";

export type TodoListPropsType = {
	title: string,
	tasks: Array<TaskType>
	addTasks: (e: string) => void
	removeTasks: (taskId: string) => void
	changeTasks: (task: FilterValueType) => void
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
	const [inputText, setInputText] = useState("")
	const AddTask = () => {
		props.addTasks(inputText);
		setInputText("");
	}
	const ChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
		setInputText(e.currentTarget.value)
	}
	const OnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			props.addTasks(inputText);
			setInputText("");
		}
	}
	const ChangeTaskType = (e:any) => {
		let ButtonValue = (e._dispatchInstances.memoizedProps.children)
		props.changeTasks(ButtonValue)
	}
	const TasksList = props.tasks.map((el) => {
		const RemoveTask = () => props.removeTasks(el.id)
		return (
			<>
				<li key={el.id}>
					<input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
					<button onClick={RemoveTask}>X</button>
				</li>

			</>
		)
	})
	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input value={inputText}  onChange={ChangeInputText} onKeyDown={(e) => OnKeyPressHandler(e)}/>
				<button onClick={AddTask}>+
				</button>
			</div>
			<ul>
				{TasksList}
			</ul>
			<div>
				<button onClick={ChangeTaskType}>All</button>
				<button onClick={ChangeTaskType}>Active</button>
				<button onClick={ChangeTaskType}>Completed</button>
			</div>
		</div>
	);
};

export default TodoList;