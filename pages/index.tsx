import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
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

	return (
		<>
			<Navbar />
			<Billboard />
			<MovieList title='Trending now' data={movies} />
		</>
	);
}
