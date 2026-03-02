import React, { useContext } from 'react';
import { AuthContex } from '../../Contex/AuthProvider';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { user,loading } = useContext(AuthContex)
    const axiosInstance = useAxios()
    const { data:role, isLoading , refetch } = useQuery({
        queryKey: ['role', user?.email],
        enabled : !loading && !!user?.email,
        queryFn: async () => {
            const result = await axiosInstance.get(`/role?email=${user.email}`)
          
            return result.data.role;
        }
    })

    const allLoading = isLoading || loading

    return {role, allLoading,refetch}
};

export default useUserRole;