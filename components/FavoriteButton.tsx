import React, { useCallback, useMemo, useState } from 'react';
import axios from 'axios';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';

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

	const Icon = isFavorite
		? isHovering
			? MdOutlineFavoriteBorder
			: MdOutlineFavorite
		: MdOutlineFavoriteBorder;

	return (
		<div
			onClick={toggleFavorites}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`
			cursor-pointer
			group/item
			p-1
            md:p-2
			${isFavorite && 'text-red-600 border-red-600 hover:text-white hover:border-white'}
			border-white
			text-white
			hover:text-red-600
			hover:border-red-600
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
