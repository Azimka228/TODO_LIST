import React, {useEffect} from "react";
import "./App.css";
import InputForAddItem from "./Components/InputForAddItem/InputForAddItem";
import EditableSpan from "./Components/EditableSpan/EditableSpan";
import {Button, Checkbox} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskTC, deleteTaskTC, fetchTasksTC} from "./state/tasks-reducer";
import {ChangeTodoListFilterAC} from "./state/todolists-reducer";
import {TaskType} from "./API/API";
import {FilterValueType} from "./AppWithRedux";

export type TodoListPropsType = {
	title: string,
	id: string,
	tasks?: Array<TaskType>
	addTasks?: (e: string, todoListId: string) => void
	removeTasks?: (taskId: string, todoListId: string) => void
	chooseTasks?: (task: FilterValueType, taskId: string) => void
	ChangeTaskStatus?: (taskId: string, isDone: boolean, todoListId: string) => void
	RenameTask?: (taskId: string, value: string, todoListId: string) => void
	RenameTodoListTitle: (value: string, todoListId: string) => void
	DeleteTodoList: (todoListId: string) => void
	Filter: FilterValueType
}


const TodoList = React.memo((props: TodoListPropsType) => {

	const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTasksTC(props.id))
	}, [])
	const AddTask = (titleTask: string) => {
		dispatch(createTaskTC(props.id,titleTask))
	}
	const DeleteTodoListHandler = () => {
		props.DeleteTodoList(props.id)
	}

	const ChangeTaskType = (el: FilterValueType) => {
		dispatch(ChangeTodoListFilterAC(props.id, el))
	}

	let TaskForTodoList = tasks
	if (props.Filter === "Completed") {
		TaskForTodoList = TaskForTodoList.filter(t => t.completed)
	}
	if (props.Filter === "Active") {
		TaskForTodoList = TaskForTodoList.filter(t => !t.completed)
	}
	const TasksList = TaskForTodoList?.map((task) => {
		const RemoveTask = () => dispatch(deleteTaskTC(props.id,task.id))

		const ChangeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.id))
		}
		const RenameTaskHandler = (value: string) => {
			dispatch(changeTaskTitleAC(task.id, value, props.id))
		}

		return (
			<>
				<li key={task.id} color={task.completed ? "secondary" : "notComplete"}>
					<Checkbox onChange={ChangeTaskStatusHandler} checked={task.completed}/>
					<EditableSpan title={task.title} onRenameCallBack={RenameTaskHandler}/>
					<IconButton onClick={RemoveTask} aria-label="delete" size="large">
						<DeleteIcon fontSize="inherit"/>
					</IconButton>
				</li>

			</>
		)
	})

	const emptyList = <div>
		Tasks is empty
	</div>

	const RenameTodoListTitleHandler = (value: string) => {
		props.RenameTodoListTitle(value, props.id)
	}

	return (
		<div>
			<Button variant="outlined" color="warning" onClick={DeleteTodoListHandler}>X</Button>
			<h3><EditableSpan title={props.title} onRenameCallBack={RenameTodoListTitleHandler}/></h3>
			<InputForAddItem onAddItemCallBack={AddTask}/>
			<ul>
				{TaskForTodoList ? TasksList : emptyList}
				{/*{emptyList}*/}
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
	)
})

export default TodoList;