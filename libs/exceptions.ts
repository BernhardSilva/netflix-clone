export class EmailAndPasswordRequiredException extends Error {
	constructor(message = 'Email and password required') {
		super(message);
		this.name = 'EmailAndPasswordRequiredException';
	}
}
export class IncorrectPasswordException extends Error {
	constructor(message = 'Incorrect Email or Password') {
		super(message);
		this.name = 'IncorrectPasswordException';
	}
}

export class UserDoesntExistException extends Error {
	constructor(message = "This user doesn't exist") {
		super(message);
		this.name = 'UserDoesntExistException';
	}
}

export class InvalidIdException extends Error {
	constructor(message = 'Invalid Id') {
		super(message);
		this.name = 'InvalidIdException';
	}
}

export class NotSignedInException extends Error {
	constructor(message = 'Not signed in') {
		super(message);
		this.name = 'NotSignedInException';
	}
}
