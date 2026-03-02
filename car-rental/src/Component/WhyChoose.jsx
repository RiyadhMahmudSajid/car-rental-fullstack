import React from "react";
import { FaCheckCircle, FaDollarSign, FaBolt, FaHeadset } from "react-icons/fa";
import { motion } from "motion/react";

const WhyChoose = () => {
    const cards = [
        {
            icon: <FaCheckCircle />,
            title: "Verified Fleet",
            description:
                "Every vehicle undergoes a 50-point safety check before every rental.",
        },
        {
            icon: <FaDollarSign />,
            title: "Best Price",
            description:
                "Transparent pricing with no hidden charges. We match any competitor's price.",
        },
        {
            icon: <FaBolt />,
            title: "Instant Booking",
            description:
                "Book your favorite car in less than 60 seconds with our instant approval.",
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Support",
            description:
                "Our dedicated support team is always ready to help you on the road.",
        },
    ];

    return (
        <section className="bg-background py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-wide uppercase text-sm">
                        Why Choose Us
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-2 text-3xl md:text-4xl font-extrabold text-text-base">
                        Experience the Best Car Rental Service
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        viewport={{ once: true }}

                        className="w-20 h-1.5 bg-accent mx-auto mt-4 rounded-full"></motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}

                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-surface p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    className="text-primary group-hover:text-white text-2xl"
                                >
                                    {card.icon}
                                </motion.div>
                            </motion.div>

                            <h3 className="text-xl font-bold text-text-base mb-3">
                                {card.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChoose;
