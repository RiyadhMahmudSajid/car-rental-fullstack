import React, { useContext } from "react";
import { motion, scale } from "motion/react";
import Background from "../assets/herobanner2.webp";
import { carContext } from "../Contex/CarsProvider";
import { useNavigate } from "react-router";

const Hero = () => {
  const { cars, isLoading } = useContext(carContext)
  const navigate = useNavigate()

  return (
    <motion.section
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative text-white py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={true}
        className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center"
      >

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          viewport={true}
          className="text-primary font-semibold tracking-wide mb-3 uppercase"
        >
          Premium Car Rentals
        </motion.p>


        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={true}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          Drive Your <span className="text-primary">Dreams</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={true}
          className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mb-8"
        >
          Experience luxury and freedom with our handpicked collection of premium vehicles.
          Every journey deserves the perfect ride.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={true}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <motion.button
            onClick={()=>navigate('/all-car')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={true}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg font-semibold shadow-md"
          >
            Explore Our Fleet
          </motion.button>

          <motion.button
          onClick={()=>navigate('/LearnMore')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={true}
            className="px-6 py-3 bg-gray-800 rounded-lg font-semibold shadow-md"
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={true}
          className="grid grid-cols-2 gap-3 text-center"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary">{cars.length}+</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Premium Vehicles
            </p>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary">24/7</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Support
            </p>
          </div> 
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
