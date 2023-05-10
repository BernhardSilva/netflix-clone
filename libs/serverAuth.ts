import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import prismadb from '@/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NotSignedInException } from './exceptions';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerSession(req, res, authOptions);

	if (!session?.user?.email) {
		throw new NotSignedInException();
	}

	const currentUser = await prismadb.user.findUnique({
		where: {
			email: session.user.email
		}
	});

	if (!currentUser) {
		throw new NotSignedInException();
	}

	return { currentUser };
};

export default serverAuth;
