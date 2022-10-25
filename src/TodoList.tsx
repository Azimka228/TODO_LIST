import React from "react";
import {FilterValueType} from "./App";
import "./App.css";
import InputForAddItem from "./Components/InputForAddItem/InputForAddItem";
import EditableSpan from "./Components/EditableSpan/EditableSpan";
import {Button, Checkbox} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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

	const ChangeTaskType = (el:FilterValueType) => {
		props.chooseTasks(el, props.id)
	}
	const TasksList = props.tasks.map((el) => {
		const RemoveTask = () => props.removeTasks(el.id, props.id)
		const ChangeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
			props.ChangeTaskStatus(el.id, !e.currentTarget.checked, props.id)
		}
		const RenameTaskHandler = (value:string) => {
			props.RenameTask(el.id, value, props.id)
		}
		return (
			<>
				<li key={el.id} color={el.isDone ? "secondary" : "notComplete"}>
					<Checkbox onChange={ChangeTaskStatusHandler}  checked={el.isDone}/>
					<EditableSpan title={el.title} onRenameCallBack={RenameTaskHandler}/>
					<IconButton  onClick={RemoveTask} aria-label="delete" size="large">
						<DeleteIcon fontSize="inherit" />
					</IconButton>
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
			<Button variant="outlined" color="warning" onClick={DeleteTodoListHandler}>X</Button>
			<h3>	<EditableSpan title={props.title} onRenameCallBack={RenameTodoListTitleHandler}/></h3>
			<InputForAddItem onAddItemCallBack={AddTask}/>
			<ul>
				{props.tasks.length ? TasksList : emptyList}
			</ul>
			<div>
				<Button
					variant={props.Filter === "All" ? "outlined" : "text"}
					color="inherit"
					onClick={() => ChangeTaskType("All")}>All</Button>
				<Button
					variant={props.Filter === "Active" ? "outlined" : "text"}
					color="secondary"
					onClick={() => ChangeTaskType("Active")}>Active
				</Button>
				<Button
					variant={props.Filter === "Completed" ? "outlined" : "text"}
					color="primary"
					onClick={() => ChangeTaskType("Completed")}>Completed
				</Button>
			</div>
		</div>
	);
};

export default TodoList;