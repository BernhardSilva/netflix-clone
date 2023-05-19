import Billboard from '@/components/Billboard';
import InfoModal from '@/components/InfoModal';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useFavorites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';
import useMovieList from '@/hooks/useMovieList';

import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
}

export default function Home() {
	const { data: movies = [] } = useMovieList();
	const { data: favorites = [] } = useFavorites();
	const { isOpen, closeModal } = useInfoModal();
	const [navBarType, setNavbarType] = useState("");

	const updateNavbar = (newValue: string) => {
		setNavbarType(newValue);
	};

	return (
		<>
			<InfoModal visible={isOpen} onClose={closeModal} />
			<Navbar updateNavbar={updateNavbar} />
			<Billboard />
			<div className={`${navBarType === 'MyList' && 'hidden'}`}>
				<MovieList title='Trending now' data={movies} />
			</div>
			<div className={`${navBarType === 'Trending' && 'hidden'} pb-8`}>
				<MovieList title='My List' data={favorites} />
			</div>
		</>
	);
}
