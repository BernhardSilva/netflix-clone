import useBillboard from '@/hooks/useBillboard';
import useInfoModal from '@/hooks/useInfoModal';
import { useCallback, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import PlayButton from './PlayButton';

const Billboard = () => {
	const { data } = useBillboard();
	const [isLoading, setIsLoading] = useState(true);
	const { openModal } = useInfoModal();

	const handleLoadStart = () => {
		setIsLoading(true);
	};

	const handleLoadedData = () => {
		setIsLoading(false);
	};

	const handleOpenModal = useCallback(() => {
		openModal(data?.id);
	}, [openModal, data?.id]);

	return (
		<div className='relative h-[56.25vw]'>
			<video
				className={`w-full h-[56.25vw] object-cover brightness-[60%] ${
					isLoading && 'bg-gradient-to-r from-neutral-600 to-neutral-800 animate-pulse'
				}`}
				poster={data?.thumbnailUrl}
				src={data?.videoUrl}
				autoPlay
				muted
				loop
				onLoadStart={handleLoadStart}
				onLoadedData={handleLoadedData}
			/>
			<div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
				<p className='text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
					{data?.title}
				</p>
				<p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
					{data?.description}
				</p>
				<div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
					<PlayButton movieId={data?.id} disabled={isLoading} />
					<button
						className={`
						text-white
						bg-white
						bg-opacity-30
						rounded-md
						p-1
						md:p-2
						lg:px-4
						lg:py-2
						w-auto
						text-xs
						lg:text-lg
						font-semibold
						flex
						flex-row
						items-center
						${isLoading ? 'bg-zinc-400 text-zinc-400' : 'hover:bg-opacity-20'}
						transition
						`}
						onClick={handleOpenModal}
						disabled={isLoading}
					>
						<BsInfoCircle size={25} />
						<p className='hidden sm:block ml-1.5'>More Info</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Billboard;
