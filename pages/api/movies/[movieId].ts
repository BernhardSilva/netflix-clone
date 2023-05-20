import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { InvalidIdException } from '@/libs/exceptions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(405).end();
		}

		await serverAuth(req, res);
		const { movieId } = req.query;

		if (typeof movieId !== 'string' || !movieId) {
			throw new InvalidIdException();
		}

		const movie = await prismadb.movie.findUnique({
			where: {
				id: movieId
			}
		});

		return res.status(200).json(movie);
	} catch (error) {
		// console.log(error);
		return res.status(400).end();
	}
}
