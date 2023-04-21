import Input from '@/components/Input';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Button from '@/components/Button';

const Auth = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [variant, setVariant] = useState('login');

	const toggleVariant = useCallback(() => {
		setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
	}, []);

	const login = useCallback(async () => {
		try {
			setLoading(true);
			await signIn('credentials', {
				email,
				password,
				redirect: false,
				callbackUrl: '/'
			});
			router.push('/');
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}, [email, password, router]);

	const register = useCallback(async () => {
		try {
			setLoading(true);
			await axios.post('/api/register', {
				email,
				name,
				password
			});
			login();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}, [email, name, password, login]);

	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
			<div className={`bg-black w-full h-full lg:bg-opacity-50 ${!loading && 'pointer-events-none opacity-75'}`}>
				<nav className='px-12 py-5'>
					<img src='/images/logo.png' alt='logo' className='h-12'></img>
				</nav>

				<div className='flex justify-center'>
					<div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
						<h2 className='text-white text-4xl mb-8 font-semibold'>
							{variant === 'login' ? 'Sign in' : 'Register'}
						</h2>
						<div className='flex flex-col gap-4'>
							{variant === 'register' && (
								<Input
									label='Name'
									onChange={(ev: any) => setName(ev.target.value)}
									id='name'
									type='name'
									value={name}
									disabled={loading}
								/>
							)}

							<Input
								label='Email'
								onChange={(ev: any) => setEmail(ev.target.value)}
								id='email'
								type='email'
								value={email}
								disabled={loading}
							/>

							<Input
								label='Password'
								onChange={(ev: any) => setPassword(ev.target.value)}
								id='password'
								type='password'
								value={password}
								disabled={loading}
							/>
						</div>
						<Button
							id={'auth-btn'}
							label={variant === 'login' ? 'Login' : 'Register'}
							className={
								'bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
							}
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

						<p onClick={toggleVariant} className='text-neutral-500 mt-12'>
							{variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
							<span className='text-white ml-1 hover:underline cursor-pointer'>
								{variant === 'login' ? 'Create an account' : 'Login'}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
