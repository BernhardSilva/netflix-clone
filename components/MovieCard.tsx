import React, { useState } from 'react';

import useInfoModal from '@/hooks/useInfoModal';
import { useRouter } from 'next/router';
import { BsChevronDown, BsFillPlayFill } from 'react-icons/bs';
import FavoriteButton from './FavoriteButton';

interface MovieCardProps {
	data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
	const router = useRouter();
	const { openModal } = useInfoModal();

	const [isLoading, setIsLoading] = useState(true);

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	return (
		<div className='group bg-zinc-900 col-span relative h-[12vw]'>
			{isLoading && (
				<div className='bg-gradient-to-r from-neutral-600 to-neutral-800 rounded-md w-full h-[12vw] animate-pulse' />
			)}
			<img
				className={`
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-md
                group-hover:opacity-90
                sm:group-hover:opacity-0
                delay-300
                w-full
                h-[12vw]
                ${isLoading && 'hidden'}
                `}
				src={data?.thumbnailUrl}
				alt='Thumbnail'
				onLoad={handleImageLoad}
				onClick={() => openModal(data.id)}
			/>
			<div
				className='
                opacity-0
                absolute
                top-0
                transition
                duration-200
                z-10
                invisible
                sm:visible
                delay-300
                w-full
                scale-0
                group-hover:scale-110
                group-hover:-translate-y-[6vw]
                group-hover:translate-x-[2vw]
                group-hover:opacity-100
                '
			>
				<img
					className={`
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-t-md
                    w-full
                    h-[12vw]
                    ${isLoading && 'hidden'}
                    `}
					src={data?.thumbnailUrl}
					alt='Thumbnail'
                    onClick={() => router.push(`/watch/${data.id}`)}
				/>
				<div
					className='
                    z-10
                    bg-zinc-800
                    p-2
                    lg:p-4
                    absolute
                    w-full
                    transition
                    shadow-md
                    rounded-b-md
                    '
				>
					<div className='flex flex-row items-center gap-3'>
						<div
							className='
                            cursor-pointer
                            w-6
                            h-6
                            lg:w-10
                            lg:h-10
                            bg-white
                            rounded-full
                            flex
                            justify-center
                            items-center
                            transition
                            hover:bg-neutral-300
                            '
							onClick={() => router.push(`/watch/${data?.id}`)}
						>
							<BsFillPlayFill size={25} className='ml-0.5' />
						</div>
						<FavoriteButton movieId={data?.id} />
						<div
							onClick={() => openModal(data?.id)}
							className='
                            cursor-pointer
                            ml-auto
                            group/item
                            w-6
                            h-6
                            lg:w-10
                            lg:h-10
                            border-white
                            border-2
                            rounded-full
                            flex
                            justify-center
                            items-center
                            transition
                            hover:border-neutral-300
                            '
						>
							<BsChevronDown className='text-white text-bold group-hover/item:text-neutral-300' />
						</div>
					</div>
					<div className='lg:inline-flex'>
						<p className='text-green-400 font-semibold mt-4'>
							New <span className='text-white'>2023</span>
						</p>
						<div className='flex flex-row lg:mt-4 gap-2 items-center'>
							<p className='text-gray-400 text-[14px] lg:txt-md lg:ml-2 font-semibold'>
								{data?.duration}
							</p>
						</div>
						<div className='flex flex-row lg:mt-4 gap-2 items-center'>
							<p className='text-gray-400 text-[14px] lg:txt-md lg:ml-2 font-semibold'>
								{data?.genre}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
