import { createContext } from "react";
import useAxios from "../Component/Hook/useAxios";
import { useQuery } from "@tanstack/react-query";

export const carContext = createContext()


const CarsProvider = ({children}) => {

    const axiosInstance = useAxios()

    const { data: cars = [], isLoading, refetch } = useQuery({
        queryKey: ['all-cars'],
        queryFn: async () => {
            const res = await axiosInstance.get('/all-car');
            return res.data;
        },
        staleTime: Infinity,
    });

    const carData = {
        cars,
        isLoading,
        refetch
    }

    return <carContext.Provider value={carData}>
        {children}
    </carContext.Provider>
};

export default CarsProvider;