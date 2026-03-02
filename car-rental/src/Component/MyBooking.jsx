import React, { useContext } from 'react';
import { AuthContex } from '../Contex/AuthProvider';
import useAxios from './Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaUsers, FaGasPump, FaCog, FaCalendarAlt, FaMapMarkerAlt  } from 'react-icons/fa';
import { FaCarRear } from "react-icons/fa6"
import { motion } from "motion/react";
import Loading from './Loading/Loading';
import { Link } from 'react-router';
const MyBooking = () => {
    const { user,loading } = useContext(AuthContex);
    const axiosInstance = useAxios();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['my-booking'],
        queryFn: async () => {
            const result = await axiosInstance.get(`/my-booking?email=${user.email}`);
            return result.data;
        },
         enabled: !loading && !!user?.email
    });

    if (isLoading) {
        return <Loading></Loading>
    }

   if (!isLoading && bookings.length === 0) {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-surface p-10 md:p-16 rounded-[3rem] border border-border shadow-xl flex flex-col items-center max-w-lg w-full"
            >
              
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 shadow-inner">
                    <FaCarRear size={45} className="opacity-80" />
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-text-base mb-3 italic uppercase tracking-tighter">
                    No Bookings Found!
                </h2>
                <p className="text-text-secondary mb-8 leading-relaxed font-medium">
                    It looks like you haven't booked any cars yet. 
                    Start your adventure today by exploring our premium fleet!
                </p>

                <Link
                    to="/all-car"
                    className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-md hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-300 group"
                >
                    Browse Our Fleet
                    <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        →
                    </motion.span>
                </Link>
            </motion.div>
        </div>
    );
}

    return (
        <div className='bg-background'>
            <div className="max-w-7xl  mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking,index) => (
                    <motion.div
                     initial={{ opacity: 0, y: 40 }}
                     animate={{opacity:1,y:0}}
                     transition={{duration:0.6, delay:index * 0.2}}
                    
                    
                    key={booking._id} className="bg-surface border border-border rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl">


                        <div className="relative">
                            <img
                                src={booking.car.image}
                                alt={booking.car.name}
                                className="w-full h-48 object-cover"
                            />
                            <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${booking.paymentStatus === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-600/20 text-green-400"
                                }`}>
                                {booking.paymentStatus}
                            </span>
                        </div>


                        <div className="p-4 flex flex-col gap-2">
                            <h2 className="text-xl font-semibold text-text-base">{booking.car.name}</h2>
                            <p className="text-text-secondary text-sm">{booking.car.brand} • {booking.car.type} • {booking.car.year}</p>


                            <div className="flex items-center gap-2 text-yellow-500">
                                {booking.car.rating && <p className="flex items-center"><FaStar /> <span className="ml-1 font-medium">{booking.car.rating}</span></p>}
                            </div>

                            <p className="text-text-secondary text-sm">{booking.car.description}</p>


                            <div className="grid grid-cols-2 gap-2 mt-2 text-text-secondary text-sm">
                                <div className="flex items-center gap-2"><FaGasPump /> {booking.car.fuelType}</div>
                                <div className="flex items-center gap-2"><FaCog /> {booking.car.transmission}</div>
                                <div className="flex items-center gap-2"><FaUsers /> {booking.car.seats} Seats</div>
                                <div className="flex items-center gap-2"><FaCalendarAlt /> {booking.pickupDate} - {booking.returnDate}</div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-text-secondary mt-2">
                                <FaMapMarkerAlt /> {booking.car.location}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

    );
};

export default MyBooking;
