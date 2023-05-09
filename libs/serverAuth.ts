import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import prismadb from '@/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NotSignedIn } from './exceptions';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerSession(req, res, authOptions);

	if (!session?.user?.email) {
		throw new NotSignedIn();
	}

	const currentUser = await prismadb.user.findUnique({
		where: {
			email: session.user.email
		}
	});

	if (!currentUser) {
		throw new NotSignedIn();
	}

	return { currentUser };
};

export default serverAuth;
