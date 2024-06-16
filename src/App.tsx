import React, { useState, useCallback } from "react";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import CheckboxInput from "./components/CheckBoxInput";

const App: React.FC = () => {
	const [text, setText] = useState<string>("copy");
	const [length, setLength] = useState<number>(8);
	const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
	const [symbolsAllowed, setSymbolsAllowed] = useState<boolean>(false);
	const [upperCaseAllowed, setUpperCaseAllowed] = useState<boolean>(true);
	const [lowerCaseAllowed, setLowerCaseAllowed] = useState<boolean>(true);
	const [checkedCount, setCheckedCount] = useState<number>(2);

	const password = usePasswordGenerator(
		length,
		numberAllowed,
		symbolsAllowed,
		upperCaseAllowed,
		lowerCaseAllowed
	);

	const copyPassword = useCallback(() => {
		window.navigator.clipboard.writeText(password);
		setText("copied");
		setTimeout(() => {setText("copy")}, 2000)
	}, [password]);

	const handleCheckboxChange = (
		setter: React.Dispatch<React.SetStateAction<boolean>>,
		currentValue: boolean
	) => {
		if (checkedCount > 1 || !currentValue) {
			setter((prev) => !prev);
			setCheckedCount((prev) => prev + (currentValue ? -1 : 1));
		}
	};

	return (
		<div className='w-full shadow-lg rounded-lg px-4 py-3 my-8 bg-gray-600 text-orange-500'>
			<h1 className='text-white text-center my-3'>Password Generator</h1>
			<div className='flex shadow rounded-lg overflow-hidden mb-4'>
				<input
					type='text'
					value={password}
					className='outline-none w-full py-1 px-3'
					placeholder='Password'
					readOnly
					aria-label='Generated Password'
				/>
				<button
					onClick={copyPassword}
					className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
					aria-label='Copy Password'>
					{text}
				</button>
			</div>
			<div className='flex flex-wrap text-sm gap-x-2'>
				<div className='flex items-center gap-x-1'>
					<input
						type='range'
						min={8}
						max={30}
						value={length}
						className='cursor-pointer'
						onChange={(e) => setLength(Number(e.target.value))}
						aria-label='Password Length'
					/>
					<label>Length: {length}</label>
				</div>
				<CheckboxInput
					label='UpperCase'
					checked={upperCaseAllowed}
					onChange={() =>
						handleCheckboxChange(setUpperCaseAllowed, upperCaseAllowed)
					}
					id='upperInput'
				/>
				<CheckboxInput
					label='LowerCase'
					checked={lowerCaseAllowed}
					onChange={() =>
						handleCheckboxChange(setLowerCaseAllowed, lowerCaseAllowed)
					}
					id='lowerInput'
				/>
				<CheckboxInput
					label='Numbers'
					checked={numberAllowed}
					onChange={() => handleCheckboxChange(setNumberAllowed, numberAllowed)}
					id='numberInput'
				/>
				<CheckboxInput
					label='Characters'
					checked={symbolsAllowed}
					onChange={() =>
						handleCheckboxChange(setSymbolsAllowed, symbolsAllowed)
					}
					id='symbolInput'
				/>
			</div>
		</div>
	);
};

export default App;
