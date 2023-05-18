import React from 'react';
import { useState } from 'react';

interface InputProps {
	id: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	label: string;
	type?: string;
	disabled?: boolean;
	required?: boolean;
	validation?: boolean;
	isMatchPassword?: boolean;
	errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
	id,
	onChange,
	value,
	label,
	type = 'text',
	disabled = false,
	required = false,
	validation,
	errorMessage = 'Invalid input',
}) => {
	const [isTouched, setIsTouched] = useState(false);

	const hasError = isTouched && (!required || !validation);

	const inputClassNames = `
    block
    rounded-md
    px-6
    pt-6
    pb-1
    w-full
    text-white
    bg-[#333]
    appearance-none
    focus:outline-none
    focus:ring-0
    peer
    ${hasError ? 'invalid:border-b-1' : ''}
  `;

	const labelClassNames = `
    absolute
    text-[#9e9d9d]
    duration-150 
    transform 
    -translate-y-3 
    scale-75
    top-4 
    z-10 
    origin-[0]
    left-6
    peer-placeholder-shown:scale-100 
    peer-placeholder-shown:translate-y-0 
    peer-focus:scale-75
    peer-focus:-translate-y-3
  `;

	return (
		<div className='relative'>
			<input
				id={id}
				value={value}
				type={type}
				onChange={onChange}
				disabled={disabled}
				required={required}
				className={inputClassNames}
				placeholder=' '
				onBlur={() => setIsTouched(true)}
			/>
			<label className={labelClassNames} htmlFor={id}>
				{label}
			</label>
			{hasError && <div className='mt-1 ml-2 text-sm text-orange-500'>{errorMessage}</div>}
		</div>
	);
};

export default Input;
