import React from 'react';
import { motion } from "motion/react";
import { FaShieldAlt, FaHandshake, FaHeadset, FaGlobeAmericas, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';
import learnImage from '/learn.avif'

const LearnMore = () => {
    const features = [
        {
            icon: <FaShieldAlt />,
            title: "Fully Insured Fleet",
            desc: "Drive with peace of mind. Every vehicle in our fleet comes with comprehensive premium insurance coverage."
        },
        {
            icon: <FaHandshake />,
            title: "Transparent Pricing",
            desc: "No hidden fees, no surprise taxes. What you see is exactly what you pay for your journey."
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Roadside Assist",
            desc: "Our dedicated support team is always a call away, ensuring you're never stranded on your adventure."
        }
    ];

    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
             
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-surface shadow-2xl">
                            <img 
                                src={learnImage}
                                alt="Premium Car" 
                                className="w-full h-[500px] object-cover hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                
                        <div className="absolute -bottom-8 -right-8 z-20 bg-primary p-8 rounded-[2rem] text-white shadow-xl hidden md:block">
                            <FaGlobeAmericas size={40} className="mb-4 text-cyan-300" />
                            <h3 className="text-3xl font-black italic">500+</h3>
                            <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Luxury Locations</p>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
                    </motion.div>

                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-sm italic">Premium Experience</span>
                            <h2 className="text-4xl md:text-5xl font-black text-text-base leading-tight mt-4 italic uppercase tracking-tighter">
                                Redefining The Way <br />
                                <span className="text-primary">You Travel.</span>
                            </h2>
                            <p className="text-text-secondary text-lg mt-6 leading-relaxed">
                                We don't just rent cars; we provide the keys to your next unforgettable story. From luxury sedans for business to rugged SUVs for family adventures.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {features.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-5 p-4 rounded-2xl hover:bg-surface transition-colors group"
                                >
                                    <div className="mt-1 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-text-base mb-1">{item.title}</h4>
                                        <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                     
                       
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LearnMore;