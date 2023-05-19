import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Input from '@/components/Input';
import axios from 'axios';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import {
	validEmailMessage,
	validNameMessage,
	validPassowrdMessage,
	validPasswordMatchMessage
} from '@/utils/errorMessages';
import { validateEmail, validateName, validatePassword } from '@/utils/validations';
import { useRouter } from 'next/router';
import Head from 'next/head';

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
}

const Auth = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [loading, setLoading] = useState(false);

	const [variant, setVariant] = useState('login');

	const [isValidName, setIsValidName] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isSecurePassword, setIsSecurePassword] = useState(false);
	const [isSamePassword, setIsSamePassword] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newName = event.target.value;
		setName(newName);
		setIsValidName(validateName(newName));
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = event.target.value.toLowerCase();
		setEmail(newEmail);
		setIsValidEmail(validateEmail(newEmail));
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = event.target.value;
		setPassword(newPassword);
		setIsSecurePassword(validatePassword(newPassword));
	};

	const handlePasswordConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newPasswordConfirmation = event.target.value;
		setPasswordConfirmation(newPasswordConfirmation);
		setIsSamePassword(newPasswordConfirmation === password);
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
			if (res?.status === 200) {
				router.push('/profiles');
			}
			if (res?.error) {
				setErrorMessage(res.error);
				console.log(res.error);
			}
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setErrorMessage(error.message);
			console.log(error);
		}
	}, [email, password]);

	const register = useCallback(async () => {
		try {
			setLoading(true);
			const res = await axios.post('/api/register', {
				email,
				name,
				password
			});
			if (res.status === 200) {
				login();
			}
		} catch (error: any) {
			setLoading(false);
			setErrorMessage(error.response.data.error);
			console.log(error.response.data.error);
		}
	}, [email, name, password, login]);

	const isRegister = () => {
		if (!isValidEmail || !isSecurePassword || !isValidName || !isSamePassword) {
			return 'pointer-events-none opacity-75';
		}
	};

	const isLogin = () => {
		if (!isValidEmail || !isSecurePassword) {
			return 'pointer-events-none opacity-75';
		}
	};

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="This is Notflix, a demo app for watch some shorts, enjoy it!" />
				<meta name="keywords" content="Notflix, Shorts" />
				<meta name="author" content="Bernhard Silva" />
				<title>Notflix</title>
			</Head>
			<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
				<div className={`bg-black w-full h-full lg:bg-opacity-50`}>
					<nav className='px-12 py-5'>
						<img src='/images/logo.png' alt='logo' className='h-10 lg:h-12' />
					</nav>
					<div className={`flex justify-center h-[80%]  ${loading && 'pointer-events-none opacity-75'}`}>
						<div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
							<h2 className='text-white text-4xl mb-8 font-semibold'>
								{variant === 'login' ? 'Sign in' : 'Register'}
							</h2>
							{errorMessage && (
								<div className='bg-orange-500 text-white py-2 px-4 rounded mb-3'>{`${errorMessage}.`}</div>
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
										validation={validateName(name)}
										errorMessage={validNameMessage}
									/>
								)}

								<Input
									id='email'
									value={email}
									onChange={handleEmailChange}
									label='Email address'
									type='email'
									required
									validation={validateEmail(email)}
									errorMessage={validEmailMessage}
								/>

								<Input
									id='password'
									value={password}
									onChange={handlePasswordChange}
									label='Password'
									type='password'
									required
									validation={validatePassword(password)}
									errorMessage={validPassowrdMessage}
								/>
								{variant === 'register' && (
									<Input
										id='passwordConfirmation'
										value={passwordConfirmation}
										onChange={handlePasswordConfirmationChange}
										label='Password Confirmation'
										type='password'
										required
										validation={isSamePassword}
										errorMessage={validPasswordMatchMessage}
									/>
								)}
							</div>
							<Button
								id={'auth-btn'}
								label={variant === 'login' ? 'Login' : 'Register'}
								className={`bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition 
								${variant === 'login' ? isLogin() : isRegister()
									}`}
								onClick={variant === 'login' ? login : register}
								loading={loading}
							/>

							<div className='flex flex-row items-center gap-4 mt-8 justify-center'>
								<div
									onClick={() => signIn('google', { callbackUrl: '/profiles' })}
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
									onClick={() => signIn('github', { callbackUrl: '/profiles' })}
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
								{variant === 'login' ? 'First time using Notflix?' : 'Already have an account?'}
								<span className='text-white ml-1 hover:underline cursor-pointer'>
									{variant === 'login' ? 'Create an account' : 'Login'}
								</span>
							</p>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Auth;
