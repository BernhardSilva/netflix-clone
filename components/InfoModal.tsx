import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';

interface InfoModalProps {
	visible?: boolean;
	onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
	const [isVisible, setIsVisible] = useState(!!visible);
	const [isLoading, setIsLoading] = useState(true);

	const { movieId } = useInfoModal();
	const { data = {} } = useMovie(movieId);

	useEffect(() => {
		setIsVisible(!!visible);
	}, [visible]);

	const handleClose = useCallback(() => {
		setIsVisible(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [onClose]);

	const handleLoadStart = () => {
		setIsLoading(true);
	};

	const handleLoadedData = () => {
		setIsLoading(false);
	};

	if (!isVisible) {
		return null;
	}
	return (
		<div
			className='
                    z-50
                    transition
                    duration-300
                    bg-black
                    bg-opacity-80
                    flex
                    justify-center
                    items-center
                    overflow-x-hidden
                    overflow-y-auto
                    fixed
                    inset-0
                    '
		>
			<div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
				<div
					className={`
					${isVisible ? 'scale-100' : 'scale-0'}
					tranform
					duration-300
					relative
					flex-auto
					bg-zinc-900
					drop-shadow-md
					`}
				>
					<div className='relative h-96'>
						<video
							className={`w-full brigthness-[60%] object-cover h-full ${isLoading && 'bg-gradient-to-r from-neutral-600 to-neutral-800 animate-pulse'}`}
							poster={data?.thumbnailUrl}
							src={data?.videoUrl}
							autoPlay
							muted
							loop
							onLoadStart={handleLoadStart}
							onLoadedData={handleLoadedData}
						/>
						<div
							className='
							cursor-pointer
							absolute
							top-3
							right-3
							h-10
							w-10
							rounded-full
							bg-black
							bg-opacity-70
							flex
							items-center
							justify-center
							hover:opacity-80'
							onClick={handleClose}
						>
							<AiOutlineClose className='text-white' size={20} />
						</div>
						<div className='absolute bottom-[10%] left-10'>
							<p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>
								{data?.tittle}
							</p>
							<div className='flex flex-row gap-4 items-center'>
								<PlayButton movieId={data?.id} />
								<FavoriteButton movieId={data?.id} />
							</div>
						</div>
					</div>
					<div className='px-12 py-8'>
						<div className='flex display-inline'>
							<p className='text-green-400 font-semibold'>
								New<span className='text-white'> 2023</span>
							</p>
							<p className='ml-2 text-gray-400 text-md font-semibold'>{data?.duration}</p>
							<p className='ml-2 text-gray-400 text-md font-semibold'>{data?.genre}</p>
						</div>
						<p className='text-white mt-2 text-lg font-light'>{data?.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoModal;
