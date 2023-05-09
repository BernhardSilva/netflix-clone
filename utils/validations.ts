export const validateName = (value: string) => {
	const nameRegex = /^[a-zA-Z0-9]+$/;
	return nameRegex.test(value);
};

export const validateEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
	const passwordRegex =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{9,}$/;
	return passwordRegex.test(password);
};
