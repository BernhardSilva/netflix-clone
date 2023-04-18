const Auth = () => {
	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
			<div className='bg-black w-full h-full lg:bg-opacity-50'>
				<nav className='px-12 py-5'>
					<img src='/images/logo.png' alt='logo' className='h-12'></img>
				</nav>
			</div>
            <div className="flex justify-center"></div>
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2"></div>
		</div>
	);
};

export default Auth;
