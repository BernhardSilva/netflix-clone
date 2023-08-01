import { useCallback, useEffect, useState } from 'react';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';
import AccountMenu from './AccountMenu';
import MobileMenu from './MobileMenu';
import NavbarItem from './NavbarItem';
import { menuLabels } from '@/utils/labels';

const TOP_OFFSET = 66;

interface NavbarProps {
	updateNavbar: (newValue: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ updateNavbar }: NavbarProps) => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showAccountMenu, setShowAccountMenu] = useState(false);
	const [showBackground, setShowBackground] = useState(false);

	const handleNavbarType = (value: string) => {
		updateNavbar(value);
	};


	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= TOP_OFFSET) {
				setShowBackground(true);
			} else {
				setShowBackground(false);
			}
		};

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, []);

	const toggleMobileMenu = useCallback(() => {
		setShowMobileMenu((current) => !current);
	}, []);

	const toggleAccountMenu = useCallback(() => {
		setShowAccountMenu((current) => !current);
	}, []);

	return (
		<nav className='w-full fixed z-40'>
			<div
				className={`
                    px-4
                    md:px-16
                    py-6
                    flex
                    flex-row
                    items-center
                    transition
                    duration-500
                    ${showBackground && 'bg-zinc-900 bg-opacity-90'}
                    `}
			>
				<img className='h-4 lg:h-7 cursor-pointer' src='/images/logo.png' alt='Logo' onClick={() => handleNavbarType("Home")} />
				<div
					className='
                        flex-row
                        ml-8
                        gap-7
                        hidden
                        lg:flex
                        '
				>
					<NavbarItem label={menuLabels.home} onClick={() => handleNavbarType(menuLabels.home)} />
					<NavbarItem label={menuLabels.myList} onClick={() => handleNavbarType(menuLabels.myList)} />
					<NavbarItem label={menuLabels.trending.replace("now", "")} onClick={() => handleNavbarType(menuLabels.trending)} />
				</div>
				<div
					className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
					onClick={toggleMobileMenu}
				>
					<p className='text-white text-sm'>Browse</p>
					<BsChevronDown className={`text-white transition ${showMobileMenu && 'rotate-180'}`} />
					<MobileMenu visible={showMobileMenu} updateNavbar={handleNavbarType} />
				</div>
				<div className='flex flex-row ml-auto gap-7 items-center'>
					<div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
						<BsSearch className='text-white transition' />
					</div>
					<div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
						<BsBell className='text-white transition' />
					</div>

					<div
						onClick={toggleAccountMenu}
						className='flex flex-row items-center gap-2 cursor-pointer relative'
					>
						<div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
							<img src='/images/default-blue.png' alt='' />
						</div>
						<BsChevronDown className={`text-white transition ${showAccountMenu && 'rotate-180'}`} />
						<AccountMenu visible={showAccountMenu} />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
