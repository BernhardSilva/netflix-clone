import Billboard from '@/components/Billboard';
import Footer from '@/components/Footer';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useFavorites from '@/hooks/useFavorites';
import useMovieList from '@/hooks/useMovieList';

import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

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

	return (
		<>
			<Navbar />
			<Billboard />
			<MovieList title='Trending now' data={movies} />
			<MovieList title='My List' data={favorites} />
			{movies[0] && (
				<div className='pt-8'>
					<Footer />
				</div>
			)}
		</>
	);
}
