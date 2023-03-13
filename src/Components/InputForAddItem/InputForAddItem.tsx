import React, {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";

type EditableInputProps = {
	onAddItemCallBack: (ItemValue: string) => void
}

const InputForAddItem: React.FC<EditableInputProps> = React.memo (({onAddItemCallBack}) => {
	const [error, setError] = useState<boolean>(false)
	const [inputText, setInputText] = useState("")

	const ChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
		setError(false)
		setInputText(e.currentTarget.value)
	}

	const OnblurInput = () => {
		setError(false)
	}
	const OnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onClickHandler()
		}
	}
	const onClickHandler = () => {
		let trimStr = inputText.trim()
		if (trimStr !== "") {
			onAddItemCallBack(trimStr)
			setError(false)
			setInputText("");
		} else {
			setError(true)
		}

	}

	return (
		<>
			<div>
				<TextField variant="outlined"
															error={error}
															label="Text"
															helperText={error? "Field is required" : ""}
															value={inputText}
															onChange={ChangeInputText}
															onKeyDown={OnKeyPressHandler}
															onBlur={OnblurInput}/>
				<IconButton
												color="primary"
												onClick={onClickHandler}
												onBlur={OnblurInput}>
					<AddBox/>
				</IconButton>
			</div>

		</>
	);
})

export default InputForAddItem;