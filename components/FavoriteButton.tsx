import React, { useCallback, useMemo, useState } from 'react';
import axios from 'axios';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { AiOutlinePlus, AiFillStar } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

interface FavoriteButtonProps {
	movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
	const [isHovering, setIsHovered] = useState(false);
	const onMouseEnter = () => {
		if (isFavorite) {
			setIsHovered(true);
		}
	};
	const onMouseLeave = () => {
		if (isFavorite) {
			setIsHovered(false);
		}
	};

	const { mutate: mutateFavorites } = useFavorites();

	const { data: currentUser, mutate } = useCurrentUser();

	const isFavorite = useMemo(() => {
		const list = currentUser?.favoriteIds || [];

		return list.includes(movieId);
	}, [currentUser, movieId]);

	const toggleFavorites = useCallback(async () => {
		let response;

		if (isFavorite) {
			response = await axios.delete('/api/favorite', { data: { movieId } });
		} else {
			response = await axios.post('/api/favorite', { movieId });
		}

		const updatedFavoriteIds = response?.data?.favoriteIds;

		mutate({
			...currentUser,
			favoriteIds: updatedFavoriteIds
		});
		mutateFavorites();
	}, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

	const Icon = isFavorite ? (isHovering ? BsTrash : AiFillStar) : AiOutlinePlus;

	return (
		<div
			onClick={toggleFavorites}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`
				cursor-pointer
				group/item
				w-6
				h-6
				lg:w-10
				lg:h-10
				${
					isFavorite
						? 'text-yellow-400 hover:text-red-600 border-yellow-400 hover:border-red-600'
						: 'text-white hover:text-green-400 border-white hover:border-green-400'
				}
				hover:border-natural-300
				border-2
				rounded-full
				flex
				justify-center
				items-center
				transition
				`}
		>
			<Icon size={20} />
		</div>
	);
};

export default FavoriteButton;
