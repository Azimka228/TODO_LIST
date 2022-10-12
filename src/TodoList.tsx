import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";
import "./App.css";

export type TodoListPropsType = {
	title: string,
	id: string,
	tasks: Array<TaskType>
	addTasks: (e: string , todoListId:string) => void
	removeTasks: (taskId: string,todoListId:string) => void
	chooseTasks: (task: FilterValueType, taskId: string) => void
	ChangeTaskStatus: (taskId: string, isDone: boolean, todoListId:string) => void
	DeleteTodoList: (todoListId:string) => void
	Filter: FilterValueType
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
	const [inputText, setInputText] = useState("")
	const [error, setError] = useState<boolean>(false)
	const AddTask = () => {
		let trimStr = inputText.trim()
		if (trimStr !== "") {
			props.addTasks(inputText,props.id);
			setError(false)
		} else {
			setError(true)
			setInputText("");
		}

	}
	const DeleteTodoListHandler = () => {
		props.DeleteTodoList(props.id)
	}
	const ChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
		setError(false)
		setInputText(e.currentTarget.value)
	}
	const OnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			AddTask()
		}
	}
	const OnblurInput = () => {
		setError(false)
	}
	const ChangeTaskType = (e: any) => {
		let ButtonValue = (e._dispatchInstances.memoizedProps.children)
		props.chooseTasks(ButtonValue, props.id)
	}
	const TasksList = props.tasks.map((el) => {
		const RemoveTask = () => props.removeTasks(el.id,props.id)
		const ChangeTaskStatus = (e: React.MouseEvent<HTMLInputElement>) => {
			props.ChangeTaskStatus(el.id, e.currentTarget.checked, props.id)
		}
		return (
			<>
				<li key={el.id} className={el.isDone ? "isDone" : "notComplete"}>
					<input onClick={(e) => {
						ChangeTaskStatus(e)
					}} type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
					<button onClick={RemoveTask}>X</button>
				</li>

			</>
		)
	})
	const emptyList = <div>
		Tasks is empty
	</div>

	return (
		<div>
			<button onClick={DeleteTodoListHandler}>X</button>
			<h3>{props.title}</h3>
			<div>
				<input className={error ? "error" : ""} value={inputText} onChange={ChangeInputText}
					   onKeyDown={(e) => OnKeyPressHandler(e)} onBlur={OnblurInput}/>
				<button onClick={AddTask} onBlur={OnblurInput}>+
				</button>
			</div>
			{error && <div className="error_text">field is required</div>}
			<ul>
				{props.tasks.length ? TasksList : emptyList}
			</ul>
			<div>
				<button className={props.Filter === "All" ? "active-filter" : ""} onClick={ChangeTaskType}>All</button>
				<button className={props.Filter === "Active" ? "active-filter" : ""} onClick={ChangeTaskType}>Active
				</button>
				<button className={props.Filter === "Completed" ? "active-filter" : ""}
						onClick={ChangeTaskType}>Completed
				</button>
			</div>
		</div>
	);
};

export default TodoList;