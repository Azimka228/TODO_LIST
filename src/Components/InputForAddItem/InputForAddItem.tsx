import React, {ChangeEvent, useState} from "react";

type EditableInputProps = {
	onAddItemCallBack: (ItemValue:string) => void
}

const InputForAddItem: React.FC<EditableInputProps> = ({onAddItemCallBack}) => {
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
	const onClickHandler = ()=> {
		let trimStr = inputText.trim()
		if (trimStr !== "") {
			onAddItemCallBack(trimStr)
			setError(false)
		} else {
			setError(true)
			setInputText("");
		}

	}
	return (
		<>
			<div>
				<input className={error ? "error" : ""} value={inputText} onChange={ChangeInputText}
											onKeyDown={OnKeyPressHandler} onBlur={OnblurInput}/>
				<button onClick={onClickHandler}  onBlur={OnblurInput} >+
				</button>
			</div>
			{error && <div className="error_text">field is required</div>}
		</>
	);
};

export default InputForAddItem;