export const validateName = (value: string) => {
	const nameRegex = /^[a-zA-Z0-9]{2,}$/;
	return nameRegex.test(value);
};

export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
	const passwordRegex =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{9,}$/;
	return passwordRegex.test(password);
};

export const validatePasswordConfirmation = (isMatch: boolean) => {
	return isMatch;
};
