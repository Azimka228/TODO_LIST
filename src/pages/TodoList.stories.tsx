import React from "react";
import {action} from "@storybook/addon-actions";
import TodoList from "./TodoList";

export default {
	title: "Input for add item",
	component: TodoList
}

const callback = action("Item were added")

export const TodoListBasicExample = () => (
	<TodoList
		DeleteTodoList={()=>{}}
		id={"test"}
		title={"test"}
		RenameTodoListTitle={()=>{}}
		Filter={"All"}
	/>
)