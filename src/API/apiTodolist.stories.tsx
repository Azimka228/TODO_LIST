import React, {useEffect, useState} from "react"
import axios from "axios";
import {API, TodolistType} from "./API";

export default {
	title: "API"
}

const settings = {
	withCredentials: true,
	headers: {
		"API-KEY": "97f4bec8-f93c-43fe-9fba-e289a8c77883"
	}
}

export const Todolist = () => {
	const [state, setState] = useState<null | Array<TodolistType>>(null)

	useEffect(() => {
		API.getTodolists()
			.then((res) => {

				setState(res.data)
			})

	}, [])

	const deleteTodolist = (id: string) => {
		API.deleteTodolist(id)
			.then((res) => {
					console.log(res)
					API.getTodolists()
						.then((res) => setState(res.data))
				}
			)

	}
	const addNewTodolist = () => {
		API.createNewTodolist("TEST")
			.then((res) => {
					if (state !== null) {
						API.getTasks(state[0].id)
							.then(res => {
								console.log("Tasks", res)
							})
					}
					console.log(res)
					API.getTodolists()
						.then((res) => setState(res.data))
				}
			)
	}
	const changeTitleTodolist = () => {
		if (state) {
			API.updateTodolistTitle(state[0].id, "Changed").then(
				(res) => {
					console.log(res)
					API.getTodolists()
						.then((res) => setState(res.data))
				}
			)
		}
	}

	return (
		<div>
			<button onClick={addNewTodolist}>New todolist |+|</button>
			<button onClick={changeTitleTodolist}>Change title Todolist</button>
			{state &&
				state.map((el: any) => {
					console.log(el.title)
					return (
						<div key={el.id}>
							<div>{el.title}</div>
							<button onClick={() => deleteTodolist(el.id)}>X</button>
						</div>
					)
				})
			}
		</div>
	)
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		let promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
		promise.then((res) =>
			setState(res.data))
		// здесь мы будем делать запрос и ответ закидывать в стейт.
		// который в виде строки будем отображать в div-ке

	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {
			title: "New todoList"
		}, settings).then((res) => setState(res))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios.delete("https://social-network.samuraijs.com/api/1.1/todo-lists/0f6a9ffd-fb95-4711-9f72-fcb3acc7925b", settings)
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists/50a9550f-ff28-4819-b444-a4a807fe57ba", {
			title: "Changed Title"
		}, settings)
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
	const [state, setState] = useState<string>("")
	const [todolists, setTodolists] = useState<TodolistType[]>([])
	const [task, setTasks] = useState<Array<object>>([])

	useEffect(() => {
		API.getTodolists().then(res => setTodolists(res.data))
	}, [])

	const onClickGetTasks = () => {
		API.getTasks(state).then(res => setTasks(res.data.items))
	}

	return (
		<>
			<select onChange={(e) => setState(e.currentTarget.value)}>
				<option value="value2" selected disabled>Choose todolist</option>
				{todolists?.map(el => {
					return <option value={el.id}>{el.title}</option>
				})}
			</select>
			<button onClick={onClickGetTasks}>GET</button>
			<ul>
				{task?.map((el:any) =>{
					return <li>{el.title}</li>
				})}
			</ul>
		</>
	)
}

export const CreateTasks = () => {
	const [state, setState] = useState<string>("")
	const [todolists, setTodolists] = useState<TodolistType[]>([])
	const [titleValue, setTitleValue] = useState<string>("")
	const [tasks, setTasks] = useState<null | Array<object>>(null)
	useEffect(() => {
		API.getTodolists().then(res => setTodolists(res.data))
	}, [])

	const onClickCreateTask = () => {
		API.createNewTask(state, titleValue).then(res => console.log(res.data.data.item))
	}

	return (
		<>
			<select onChange={(e) => setState(e.currentTarget.value)}>
				<option value="value2" selected disabled>Choose todolist</option>
				{todolists?.map(el => {
					return <option value={el.id}>{el.title}</option>
				})}
			</select>
			<input value={titleValue} onChange={(e) => setTitleValue(e.currentTarget.value)}/>
			<button onClick={onClickCreateTask}>Create</button>
		</>
	)
}


export const DeleteTask = () => {
	const [currentTodolist, setCurrentTodolist] = useState<string>("")
	const [todolists, setTodolists] = useState<TodolistType[]>([])


	const [currentTask, setCurrentTask] = useState<string>("")
	const [tasks, setTasks] = useState<any>(null)

	useEffect(() => {
		API.getTodolists().then(res => setTodolists(res.data))
	}, [])

	useEffect(() => {
		API.getTasks(currentTodolist).then(res => setTasks(res.data.items))
	}, [currentTodolist])

	const onClickDeleteTask = () => {
		API.deleteTask(currentTodolist,currentTask)
	}

	return (
		<>
			<select onChange={(e) => setCurrentTodolist(e.currentTarget.value)}>
				<option value="value2" selected disabled>Choose todolist</option>
				{todolists?.map(el => {
					return <option value={el.id}>{el.title}</option>
				})}
			</select>
			<select onChange={(e) => setCurrentTask(e.currentTarget.value)}>
				<option value="value2" selected disabled>Choose task</option>
				{tasks?.map((el:any) => {
					return <option value={el.id}>{el.title}</option>
				})}
			</select>
			<button  onClick={onClickDeleteTask}>Delete</button>
		</>
	)
}



export const UpdateTask = () => {
	const [currentTodolist, setCurrentTodolist] = useState<string>("")
	const [todolists, setTodolists] = useState<TodolistType[]>([])


	const [currentTask, setCurrentTask] = useState<string>("")
	const [tasks, setTasks] = useState<any>(null)

	const [newTitle, setNewTitle] = useState("")

	useEffect(() => {
		API.getTodolists().then(res => setTodolists(res.data))
	}, [])

	useEffect(() => {
		API.getTasks(currentTodolist).then(res => setTasks(res.data.items))
	}, [currentTodolist])

	const onClickUpdateTitleTask = () => {
		const newObj = {
			title: newTitle,
			description: "",
			completed: true,
			status: 1,
			priority: 1,
			startDate:"",
			deadline: "",
		}
		API.updateTask(currentTodolist,currentTask,newObj).then(res => console.log(res.data.data.item))
	}

	return (
		<>
			<select onChange={(e) => setCurrentTodolist(e.currentTarget.value)}>
				<option value="value2" selected disabled>Choose todolist</option>
				{todolists?.map(el => {
					return <option value={el.id}>{el.title}</option>
				})}
			</select>
			<select onChange={(e) => setCurrentTask(e.currentTarget.value)}>
				<option value="value2" selected disabled>Choose task</option>
				{tasks?.map((el:any) => {
					return <option value={el.id}>{el.title}</option>
				})}
			</select>
			<input placeholder="new title" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)}/>
			<button  onClick={onClickUpdateTitleTask}>Update</button>
		</>
	)
}