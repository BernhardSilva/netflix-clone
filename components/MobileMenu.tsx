import React from 'react';

interface MobileMenuProps {
	visible?: boolean;
	updateNavbar: (newValue: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, updateNavbar }: MobileMenuProps) => {

	const handleNavbarType = (value: string) => {
		updateNavbar(value);
	};


	if (!visible) {
		return null;
	}
	return (
		<div className='bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex '>
			<div className='flex flex-col gap-4'>
				<div className='px-3 text-center text-white hover:underline' onClick={() => handleNavbarType("Home")}>Home</div>
				<div className='px-3 text-center text-white hover:underline' onClick={() => handleNavbarType("MyList")}>My List</div>
				<div className='px-3 text-center text-white hover:underline' onClick={() => handleNavbarType("Trending")}>Trending now</div>
			</div>
		</div>
	);
};

export default MobileMenu;
