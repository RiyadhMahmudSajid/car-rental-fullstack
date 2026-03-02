import React from 'react';
import { Link } from 'react-router';
import { motion } from "motion/react";
import { FaHome, FaArrowLeft, FaCar } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 overflow-hidden relative">

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-3xl w-full text-center relative z-10">
               
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-[10rem] md:text-[15rem] font-black leading-none text-primary/10 select-none">
                        404
                    </h1>
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-surface/80 backdrop-blur-md border border-border p-8 md:p-12 rounded-[3rem] shadow-2xl -mt-20 md:-mt-32"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary rotate-12">
                            <FaCar size={40} />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-text-base mb-4 italic uppercase tracking-tighter">
                        Lost Your Way?
                    </h2>

                    <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto font-medium">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-surface border border-border rounded-2xl font-bold text-text-base hover:bg-background transition-all shadow-sm"
                        >
                            <FaArrowLeft size={14} /> Go Back
                        </button>

                        <Link
                            to="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all group"
                        >
                            <FaHome size={18} /> Back to Home
                        </Link>
                    </div>
                </motion.div>

              
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-sm text-text-secondary font-medium"
                >
                    Need help? <Link to="/contact" className="text-primary hover:underline">Contact Support</Link>
                </motion.p>
            </div>
        </div>
    );
};

export default NotFound;