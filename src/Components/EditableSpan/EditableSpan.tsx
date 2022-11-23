import React, {ChangeEventHandler, MouseEventHandler, useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanProps = {
	title: string
	onRenameCallBack: (value: string) => void
}

const EditableSpan: React.FC<EditableSpanProps> = ({title,onRenameCallBack}) => {
	const [editMode, setEditMode] = useState(false)
	const [inputValue, setInputValue] = useState(title)

	const onDoubleClickHandler: MouseEventHandler<HTMLSpanElement> = () => {
		setEditMode(true)
	}
	const onBlurHandler = () => {
		setEditMode(false)
		onRenameCallBack(inputValue)
	}
	const OnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setEditMode(false)
			onRenameCallBack(inputValue)
		}
	}
	const onChangeInputValue: ChangeEventHandler<HTMLInputElement> = (e) => {
		setInputValue(e.currentTarget.value)
	}
	return (
		<>
			{editMode ?
				<TextField type="text"
											onBlur={onBlurHandler}
											onKeyDown={OnKeyPressHandler}
											value={inputValue} autoFocus
											onChange={onChangeInputValue}
				/> :
				<span
					onDoubleClick={onDoubleClickHandler}
				>{title}</span>}
		</>
	);
};

export default EditableSpan;