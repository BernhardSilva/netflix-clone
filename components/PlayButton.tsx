import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

interface PlayButtonProps {
	movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(`/watch/${movieId}`)}
			className='
            bg-white
            rounded-md
            p-1
            md:p-2
            lg:px-4
            lg:py-2
            w-auto
            text-xs lg:text-lg
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-neutral-300
            transition
            '
		>
			<BsFillPlayFill size={25} />
			<p className='hidden sm:block'>Play</p>
		</button>
	);
};

export default PlayButton;
