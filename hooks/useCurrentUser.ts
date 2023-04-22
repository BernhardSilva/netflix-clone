import fetcher from "@/libs/fetcher";
import useSWR from "swr";


const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/current', fetcher);
}

export default useCurrentUser