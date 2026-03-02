import React, { useContext } from 'react';
import FeaturedCard from './FeaturedCard';
import { GoArrowRight } from 'react-icons/go';
import { Link } from 'react-router';
import { motion } from "motion/react";
import Loading from './Loading/Loading';
import { carContext } from '../Contex/CarsProvider';
const Featured = () => {
      const {cars, isLoading} = useContext(carContext)
   
    const Cars = cars.slice(0,6)
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='bg-background py-24'>
            <div

                className='max-w-3xl  mx-auto px-6 mb-12 text-center '>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className='text-black dark:text-white text-4xl md:text-[40px]  font-extrabold tracking-tight mb-2'>Our Vehicle Fleet</motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}

                    className='text-text-secondary text-sm md:text-base tracking-wider'>Choose from our wide selection of premium vehicles</motion.p>
            </div>
            <motion.div
              
                className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-4/5 mx-auto '>
                {Cars?.map((car,index) => (
                    <motion.div
                        key={car._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 , delay:index*0.2}}
                        viewport={{ once: true }}
                    >
                        <FeaturedCard car={car} />
                    </motion.div>
                ))}
            </motion.div>
            <div className='mt-18  text-center cursor-pointer rounded-md  flex justify-center '>
                <motion.button 
                 whileHover={{rotateZ:-5, y:-2}}
                    transition={{duration: 0.3}}
                className='cursor-pointer text-center  rounded-md border border-primary text-primary px-6 py-2  '><Link to='/all-car' className='flex justify-center items-center'>Explore all cars <GoArrowRight className='ml-2' /></Link></motion.button>
            </div>
        </div>
    );
};

export default Featured;