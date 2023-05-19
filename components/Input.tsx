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

	const [passwordVisible, setPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	}

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
    ${(hasError) && 'border-b-2 border-[#F97316]'}
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

	const handlerPasswordToggleType = (type: string): string =>
		type === 'password' ? (passwordVisible ? 'text' : 'password') : 'text';

	return (
		<div className={`relative`}>
			<input
				id={id}
				value={value}
				type={handlerPasswordToggleType(type)}
				onChange={onChange}
				disabled={disabled}
				required={required}
				className={inputClassNames}
				placeholder=' '
				onBlur={() => setIsTouched(true)}
			/>
			{type === 'password' &&
				<button
					className="absolute top-[17px] right-[5px] flex items-center px-4 text-gray-400"
					onClick={togglePasswordVisibility}
				>
					{!passwordVisible ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					)}
				</button>}
			<label className={labelClassNames} htmlFor={id}>
				{label}
			</label>
			{hasError && <div className='mt-1 ml-2 text-sm text-orange-500'>{errorMessage}</div>}
		</div>
	);
};

export default Input;
