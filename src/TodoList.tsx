import React from "react";
import {FilterValueType} from "./App";
import "./App.css";
import InputForAddItem from "./Components/InputForAddItem/InputForAddItem";
import EditableSpan from "./Components/EditableSpan/EditableSpan";

export type TodoListPropsType = {
	title: string,
	id: string,
	tasks: Array<TaskType>
	addTasks: (e: string, todoListId: string) => void
	removeTasks: (taskId: string, todoListId: string) => void
	chooseTasks: (task: FilterValueType, taskId: string) => void
	ChangeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
	RenameTask: (taskId: string, value: string, todoListId: string) => void
	RenameTodoListTitle:( value:string, todoListId: string) => void
	DeleteTodoList: (todoListId: string) => void
	Filter: FilterValueType
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

	const AddTask = (ItemValue: string) => {
		props.addTasks(ItemValue, props.id);
	}
	const DeleteTodoListHandler = () => {
		props.DeleteTodoList(props.id)
	}

	const ChangeTaskType = (e: any) => {
		let ButtonValue = (e._dispatchInstances.memoizedProps.children)
		props.chooseTasks(ButtonValue, props.id)
	}
	const TasksList = props.tasks.map((el) => {
		const RemoveTask = () => props.removeTasks(el.id, props.id)
		const ChangeTaskStatusHandler = (e: React.MouseEvent<HTMLInputElement>) => {
			props.ChangeTaskStatus(el.id, e.currentTarget.checked, props.id)
		}
		const RenameTaskHandler = (value:string) => {
			props.RenameTask(el.id, value, props.id)
		}
		return (
			<>
				<li key={el.id} className={el.isDone ? "isDone" : "notComplete"}>
					<input onClick={(e) => {
						ChangeTaskStatusHandler(e)
					}} type="checkbox" checked={el.isDone}/>
					<EditableSpan title={el.title} onRenameCallBack={RenameTaskHandler}/>
					<button onClick={RemoveTask}>X</button>
				</li>

			</>
		)
	})
	const emptyList = <div>
		Tasks is empty
	</div>

	const RenameTodoListTitleHandler = (value:string) => {
		props.RenameTodoListTitle( value, props.id)
	}

	return (
		<div>
			<button onClick={DeleteTodoListHandler}>X</button>
			<h3>	<EditableSpan title={props.title} onRenameCallBack={RenameTodoListTitleHandler}/></h3>
			<InputForAddItem onAddItemCallBack={AddTask}/>
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