import InputForAddItem from "./InputForAddItem";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
	title: "Input for add item",
	component: InputForAddItem
}

const callback = action("Item were added")

export const AddItemFormBasicExample = () => <InputForAddItem onAddItemCallBack={(title)=>{alert(title)}}/>