import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method != 'POST') {
		return res.status(405).end();
	}

	try {
		const { email, name, password } = req.body;

        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        })
	} catch (error) {
		console.log(error);
		return res.status(400).end();
	}
}
