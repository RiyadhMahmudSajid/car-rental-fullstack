import React, { useContext, useState } from 'react';
import useAxios from './Hook/useAxios';
import AllCarsCard from './AllCarsCard';
import { motion } from "motion/react";
import Loading from './Loading/Loading';
import { carContext } from '../Contex/CarsProvider';

const AllCars = () => {
  
    const [search, setSearch] = useState('');
    const {cars, isLoading} = useContext(carContext)
   
    if (isLoading) {
        return <Loading></Loading>
    }
    const filteredCars = search
        ? cars.filter(
            (car) =>
                car.name.toLowerCase().includes(search.toLowerCase()) ||
                car.brand.toLowerCase().includes(search.toLowerCase()) ||
                car.type.toLowerCase().includes(search.toLowerCase())
        )
        : cars;
    return (
        <div className='bg-background min-h-screen pb-20 transition-colors duration-300 '>

            <div className='bg-surface border-b border-border '>
                <div className='text-center max-w-4xl mx-auto py-16 px-6'>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="font-bold text-4xl md:text-5xl text-text-base tracking-tight">
                        Available Cars
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}

                        className='text-sm md:text-lg text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed'>
                        Browse our selection of premium vehicles available for your next adventure.
                        Quality guaranteed for every mile.
                    </motion.p>


                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className='relative max-w-2xl mx-auto mt-10 group'>
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-text-secondary group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search cars by name, brand, or type..."
                            className="w-full h-14 pl-12 pr-6 bg-background border border-border rounded-2xl shadow-sm text-text-base placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </motion.div>
                </div>
            </div>
            <div className='mt-12 w-[90%] lg:w-4/5 mx-auto ]'>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-items-center'>
                    {
                        filteredCars?.length > 0 ? (
                            filteredCars.map((car,index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    key={car._id} className="w-full h-full ">
                                    <AllCarsCard data={car} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-text-secondary text-lg italic">No cars found matching your search criteria.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    );
};

export default AllCars;
