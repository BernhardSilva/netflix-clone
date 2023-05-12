import axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';

interface FavoriteButtonProps {
	movieId: string;
	disabled?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, disabled }) => {
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
		<button
			onClick={toggleFavorites}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			disabled={disabled}
			className={`
			group/item
			p-1
            md:p-2
			hover:text-red-600
			hover:border-red-600
			${isFavorite ? 'text-red-600 border-red-600' : 'text-white border-white'}
			border-2
			rounded-full
			flex
			justify-center
			items-center
			transition
			${disabled && 'opacity-40'}
			`}
		>
			<Icon size={20} />
		</button>
	);
};

export default FavoriteButton;
