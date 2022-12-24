import React from "react";
import {action} from "@storybook/addon-actions";
import {Checkbox} from "@mui/material";
import EditableSpan from "../Components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default {
	title: "Task",
}

const callbackСheckbox = action("Item status changed")
const callbackRemoveTask = action("Item were deleted")
const callbackOnRenameEditableSpan = action("Item were added")

export const TaskBasicExample = () => {
return (
	<>
		<li color={"secondary"}>
			<Checkbox onChange={callbackСheckbox} checked={true}/>
			<EditableSpan title={"test"} onRenameCallBack={callbackOnRenameEditableSpan}/>
			<IconButton onClick={callbackRemoveTask} aria-label="delete" size="large">
				<DeleteIcon fontSize="inherit"/>
			</IconButton>
		</li>
	</>)
}