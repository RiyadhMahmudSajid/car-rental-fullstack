import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import useAxios from '../../../Hook/useAxios';
import ManageCarTable from './ManageCarTable';

// Icons
import { FiSearch } from "react-icons/fi";
import { FaListUl, FaRegTimesCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Loading from '../../../Loading/Loading';
import { carContext } from '../../../../Contex/CarsProvider';


const ManageCar = () => {
    const axiosInstance = useAxios();
    const [search, setSearch] = useState("");

    const [filterStatus, setFilterStatus] = useState('all');
      const {cars, isLoading,refetch} = useContext(carContext)
       



    const filteredAndSearchedCars = cars.filter((car) => {
        const matchesSearch =
            car.name?.toLowerCase().includes(search.toLowerCase()) ||
            car.brand?.toLowerCase().includes(search.toLowerCase()) ||
            car.type?.toLowerCase().includes(search.toLowerCase());

        if (!matchesSearch) return false;

        if (filterStatus === 'available') return car.available === true;
        if (filterStatus === 'unavailable') return car.available === false;

        return true;
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="bg-background min-h-screen py-10">

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 mb-10">
                <h2 className="font-extrabold text-4xl md:text-5xl flex items-center gap-3 text-text-base">
                    <FaListUl className="text-primary" /> Manage Cars
                </h2>
                <p className='text-text-secondary mt-2 text-lg'>
                    Search, filter, edit, and remove cars.
                </p>

        
                <div className="flex flex-col md:flex-row gap-4 mt-6">
  
                    <div className="relative w-full">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, brand or type..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                                w-full h-14 rounded-xl bg-surface text-text-base
                                pl-12 pr-4 border border-border shadow
                                focus:outline-none focus:ring-2 focus:ring-primary
                            "
                        />
                    </div>

             
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="
                            h-14 px-4 rounded-xl bg-surface border border-border
                            text-text-base shadow focus:ring-2 focus:ring-primary
                        "
                    >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>
            </div>

       
            <div className="max-w-7xl mx-auto px-4">
                {filteredAndSearchedCars.length === 0 ? (
                    <div className="p-10 bg-surface rounded-2xl text-center border border-border shadow-lg">
                        <FaRegTimesCircle className="text-error mx-auto w-12 h-12 mb-3" />
                        <p className="text-white text-2xl font-semibold">No cars found</p>
                        <p className="text-text-secondary">Try different search or filter.</p>
                    </div>
                ) : (
                    <ManageCarTable cars={filteredAndSearchedCars} refetch={refetch} axiosInstance={axiosInstance} />
                )}
            </div>

        </div>
    );
};

export default ManageCar;
