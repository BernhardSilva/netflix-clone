import Navbar from '@/components/Navbar';
import useCurrentUser from '@/hooks/useCurrentUser';
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
	const { data: user } = useCurrentUser();

	return (
		<>
			<Navbar/>
			<div className="bg-gray-500">
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
					<div className="h-96"></div>
			</div>
		</>
	);
}
