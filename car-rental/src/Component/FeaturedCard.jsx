import React from "react";
import { FaGasPump, FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { Link } from "react-router";
import { motion } from "motion/react";
const FeaturedCard = ({ car }) => {
    const { _id,name, type,year,seats,fuelType,transmission,
        location,
        pricePerDay,
        currency,
        image,
        available,
    } = car;

    return (


        <Link to={`carDetails/${_id}`}>
            <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-surface rounded-2xl overflow-hidden shadow-xl ">

                <div className="relative">
                    {
                        image && (<motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            src={image}
                            alt={name}
                            className="w-full h-56 object-cover"
                        />)
                    }


                    {available && (
                        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            Available Now
                        </span>
                    )}


                    <div className="absolute bottom-3 right-3 bg-text-base dark:text-black text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg">
                        {currency === "USD" ? "$" : currency}
                        {pricePerDay}/day
                    </div>
                </div>


                <div className="p-5">

                    <h3 className="text-xl font-extrabold text-text-base mb-2">{name}</h3>

                    <p className="text-sm font-semibold text-text-secondary">{type}  {year}</p>



                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-text-secondary mt-5 pt-4 border-t border-border">


                        <div className="flex items-center gap-2">
                            <FaUserFriends className="text-primary w-4 h-4" />
                            <span className='font-medium'>{seats} Seats</span>
                        </div>


                        <div className="flex items-center gap-2">
                            <FaGasPump className="text-primary w-4 h-4" />
                            <span className='font-medium'>{fuelType}</span>
                        </div>


                        <div className="flex items-center gap-2">
                            <GiGearStickPattern className="text-primary w-4 h-4" />
                            <span className='font-medium'>{transmission}</span>
                        </div>


                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-primary w-4 h-4" />
                            <span className='font-medium'>{location}</span>
                        </div>
                    </div>


                </div>
            </motion.div>
        </Link>
    );
};

export default FeaturedCard;