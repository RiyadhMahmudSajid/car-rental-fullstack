import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from './Hook/useAxios';
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { motion } from "motion/react"
const Testomonial = () => {
    const axiosInstance = useAxios();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const result = await axiosInstance.get('/review');
            return result.data;
        }
    });

    if (isLoading) return <div className="py-20 text-center text-primary font-bold">Loading Testimonials...</div>;

    return (
        <motion.div>
            <section className="bg-background py-20 transition-colors duration-300 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold uppercase text-sm tracking-widest">Testimonials</motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-extrabold text-text-base mt-2">What Our Clients Say</motion.h3>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            viewport={{ once: true }}
                            className="w-16 h-1.5 bg-accent mx-auto mt-4 rounded-full"></motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.2 }}
                                viewport={{ once: true }}

                                key={item._id}
                                className="bg-surface p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all duration-300 relative group"
                            >

                                <div className="absolute top-6 right-8 text-primary/10 text-4xl group-hover:text-primary/20 transition-colors">
                                    <FaQuoteRight />
                                </div>


                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={item.userImage || "No image found"}
                                        alt={item.userName}
                                        className="w-14 h-14 rounded-full border-2 border-primary object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-text-base leading-tight">{item.userName}</h4>
                                        <p className="text-xs text-text-secondary mt-1">Verified Customer</p>
                                    </div>
                                </div>

                                <div className="flex text-accent mb-4 gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={index < item.rating ? "fill-current" : "text-border"}
                                        />
                                    ))}
                                </div>

                                <p className="text-text-secondary leading-relaxed italic text-sm md:text-base">
                                    "{item.reviewText}"
                                </p>

                                <div className="mt-6 pt-4 border-t border-border/50 text-[10px] text-text-secondary uppercase tracking-widest">
                                    {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {reviews.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center text-text-secondary py-10">
                            No reviews yet. Be the first to share your experience!
                        </motion.div>
                    )}
                </div>
            </section>
        </motion.div>
    );
};

export default Testomonial;