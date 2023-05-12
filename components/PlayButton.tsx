import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

interface PlayButtonProps {
	movieId: string;
	disabled?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId, disabled }) => {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(`/watch/${movieId}`)}
			disabled={disabled}
			className={`
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
            transition
            ${disabled ? 'bg-zinc-400' : 'hover:bg-neutral-300'}
            `}
		>
			<BsFillPlayFill size={25} />
			<p className='hidden sm:block'>Play</p>
		</button>
	);
};

export default PlayButton;
