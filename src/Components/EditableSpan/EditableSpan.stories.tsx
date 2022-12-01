import React from "react";
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";

export default {
	title: "Input for add item",
	component: EditableSpan
}

const callback = action("Item were added")

export const EditableSpanBasicExample = () => <EditableSpan 	title={"Test"} onRenameCallBack={callback}/>