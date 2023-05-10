import React from 'react';

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className='text-gray-400 text-sm py-12 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bottom-0 w-full bg-neutral-950'>
			<p className='text-white text-center py-2'>
				Notflix, all rights reserved, Bernhard Silva &copy; {currentYear}.
			</p>
		</footer>
	);
};

export default Footer;
