import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from "motion/react";

const CarFleetCTA = () => {
    return (
        <section

            className='bg-background py-16 px-4 transition-colors duration-500'
        >

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 dark:border-white/5">

                    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-500 dark:from-blue-900 dark:via-[#1e293b] dark:to-blue-800 p-10 md:p-20 text-center text-white">

                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                            <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/20 dark:bg-blue-500/20 rounded-full blur-[80px]"></div>
                            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-300/20 dark:bg-cyan-500/10 rounded-full blur-[80px]"></div>
                        </div>

                        <div className="relative z-10">
                            <h2
                                
                                className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight"
                            >
                                Ready to Start Your <span className="text-cyan-200 dark:text-cyan-400">Journey?</span>
                            </h2>

                            <p
                               
                                className="text-lg md:text-xl text-blue-50/90 mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
                            >
                                Browse our fleet and find the perfect car for your next adventure.
                                We offer the best rates and premium quality vehicles.
                            </p>

                            <div
                            
                            >
                                <Link
                                    to="/all-car"
                                    className="inline-flex items-center gap-3 bg-white dark:bg-primary text-blue-600 dark:text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-300 group"
                                >
                                    Explore Our Fleet
                                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                                </Link> 
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default CarFleetCTA;