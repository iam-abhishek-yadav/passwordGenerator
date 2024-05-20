import React from "react";

interface CheckboxInputProps {
	label: string;
	checked: boolean;
	onChange: () => void;
	id: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
	label,
	checked,
	onChange,
	id,
}) => (
	<div className='flex items-center gap-x-1'>
		<input
			type='checkbox'
			checked={checked}
			id={id}
			onChange={onChange}
		/>
		<label htmlFor={id}>{label}</label>
	</div>
);

export default CheckboxInput;
