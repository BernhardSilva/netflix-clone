export class EmailAndPasswordRequired extends Error {
	constructor(message = 'Email and password required') {
		super(message);
		this.name = 'EmailAndPasswordRequired';
	}
}
export class InconrrectPassword extends Error {
	constructor(message = 'Inconrrect Password') {
		super(message);
		this.name = 'InconrrectPassword';
	}
}

export class UserDoesntExist extends Error {
	constructor(message = "This user doesn't exist") {
		super(message);
		this.name = 'UserDoesntExist';
	}
}

export class InvalidId extends Error {
	constructor(message = 'Invalid Id') {
		super(message);
		this.name = 'InvalidId';
	}
}

export class NotSignedIn extends Error {
	constructor(message = 'Not signed in') {
		super(message);
		this.name = 'NotSignedIn';
	}
}
