import Input from '@/components/Input';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Button from '@/components/Button';
import Footer from '@/components/Footer';

const Auth = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [variant, setVariant] = useState('login');

	const [isValidName, setIsValidName] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isSecurePassword, setIsSecurePassword] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newName = event.target.value;
		setName(newName);
		setIsValidName(validateName(newName));
	};

	const validateName = (value: string) => {
		const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
		return nameRegex.test(value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = event.target.value;
		setEmail(newEmail);
		setIsValidEmail(validateEmail(newEmail));
	};

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = event.target.value;
		setPassword(newPassword);
		setIsSecurePassword(validatePassword(newPassword));
	};

	const validatePassword = (password: string): boolean => {
		const passwordRegex =
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{9,}$/;
		return passwordRegex.test(password);
	};

	const toggleVariant = useCallback(() => {
		setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
		setErrorMessage('');
	}, []);

	const login = useCallback(async () => {
		try {
			setLoading(true);
			const res = await signIn('credentials', {
				email,
				password,
				redirect: false,
				callbackUrl: '/'
			});
			if (res?.error) {
				setLoading(false);
				setErrorMessage(res.error);
				console.log(res.error);
			}
			setLoading(false);
			router.push('/');
		} catch (error: any) {
			setLoading(false);
			setErrorMessage(error.message);
			console.log(error);
		}
	}, [email, password, router]);

	const register = useCallback(async () => {
		try {
			setLoading(true);
			const res = await axios.post('/api/register', {
				email,
				name,
				password
			});
			if (res.status === 200) {
				setLoading(false);
				login();
			}
		} catch (error: any) {
			setLoading(false);
			setErrorMessage(error.response.data.error);
			console.log(error.response.data.error);
		}
	}, [email, name, password, login]);

	const isRegister = () => {
		if (!isValidEmail || !isSecurePassword || !isValidName) {
			return 'pointer-events-none opacity-75';
		}
	};

	const isLogin = () => {
		if (!isValidEmail || !isSecurePassword) {
			return 'pointer-events-none opacity-75';
		}
	};

	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
			<div className={`bg-black w-full h-full lg:bg-opacity-50`}>
				<nav className='px-12 py-5'>
					<img src='/images/logo.png' alt='logo' className='h-10 lg:h-12'></img>
				</nav>
				<div className={`flex justify-center  ${loading && 'pointer-events-none opacity-75'}`}>
					<div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
						<h2 className='text-white text-4xl mb-8 font-semibold'>
							{variant === 'login' ? 'Sign in' : 'Register'}
						</h2>
						{errorMessage && (
							<div className='bg-orange-500 text-white py-2 px-4 rounded mb-3'>{errorMessage}</div>
						)}
						<div className='flex flex-col gap-4'>
							{variant === 'register' && (
								<Input
									id='name'
									onChange={handleNameChange}
									value={name}
									label='Name'
									type='text'
									required
									validation={validateName}
									errorMessage='Please enter a valid name.'
								/>
							)}

							<Input
								id='email'
								value={email}
								onChange={handleEmailChange}
								label='Email address'
								type='email'
								required
								validation={validateEmail}
								errorMessage='Please enter a valid email address.'
							/>

							<Input
								id='password'
								value={password}
								onChange={handlePasswordChange}
								label='Password'
								type='password'
								required
								validation={validatePassword}
								errorMessage='Password should have at least 9 characters with one uppercase,
								one lowercase, one digit, and one symbol.'
							/>
						</div>
						<Button
							id={'auth-btn'}
							label={variant === 'login' ? 'Login' : 'Register'}
							className={`bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition ${variant === 'login' ? isLogin() : isRegister()}`}
							onClick={variant === 'login' ? login : register}
							loading={loading}
						/>

						<div className='flex flex-row items-center gap-4 mt-8 justify-center'>
							<div
								onClick={() => signIn('google', { callbackUrl: '/' })}
								className='
								w-10
								h-10
								bg-white
								rounded-full
								flex
								items-center
								justify-center
								cursor-pointer
								hover:opacity-80
								transition
								'
							>
								<FcGoogle size={30} />
							</div>
							<div
								onClick={() => signIn('github', { callbackUrl: '/' })}
								className='
								w-10
								h-10
								bg-white
								rounded-full
								flex
								items-center
								justify-center
								cursor-pointer
								hover:opacity-80
								transition
								'
							>
								<FaGithub size={30} />
							</div>
						</div>

						<p onClick={toggleVariant} className='text-neutral-500 mt-5'>
							{variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
							<span className='text-white ml-1 hover:underline cursor-pointer'>
								{variant === 'login' ? 'Create an account' : 'Login'}
							</span>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Auth;
