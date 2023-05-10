import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';

import prismadb from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { InvalidIdException } from '@/libs/exceptions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		//POST METHOD
		if (req.method === 'POST') {
			const { currentUser } = await serverAuth(req, res);
			const { movieId } = req.body;

			const existingMovie = await prismadb.movie.findUnique({
				where: {
					id: movieId
				}
			});

			if (!existingMovie) {
				throw new InvalidIdException();
			}

			const user = await prismadb.user.update({
				where: {
					email: currentUser.email || ''
				},
				data: {
					favoriteIds: {
						push: movieId
					}
				}
			});
			return res.status(200).json(user);
		}

		//DELETE METHOD
		if (req.method === 'DELETE') {
			const { currentUser } = await serverAuth(req, res);
			const { movieId } = req.body;

			const existingMovie = await prismadb.movie.findUnique({
				where: {
					id: movieId
				}
			});

			if (!existingMovie) {
				throw new InvalidIdException();
			}

			const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

			const updatedUser = await prismadb.user.update({
				where: {
					email: currentUser.email || ''
				},
				data: {
					favoriteIds: updatedFavoriteIds
				}
			});

			return res.status(200).json(updatedUser);
		}

		return res.status(405).end();
	} catch (error) {
		console.log(error);
		return res.status(500).end();
	}
}
