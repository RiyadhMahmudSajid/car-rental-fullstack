import React from "react";
import { motion } from "motion/react";

const HowItWork = () => {
    const steps = [
        {
            number: "01",
            title: "Choose A Car",
            description: "Select from our wide range of luxury and budget vehicles.",
            bg: "bg-background",
            border: "border-accent",
        },
        {
            number: "02",
            title: "Pick-up Date",
            description: "Select your preferred date and time for picking up the car.",
            bg: "bg-background",
            border: "border-accent",
        },
        {
            number: "03",
            title: "Book Your Ride",
            description: "Confirm your booking and get ready for the adventure!",
            bg: "bg-accent",
            border: "border-accent",
            textColor: "text-white",
        },
    ];

    return (
        <section className="bg-surface py-20   overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-primary font-bold uppercase text-sm tracking-widest">
                    Process
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-text-base mt-2 mb-12">
                    How It Works
                </motion.h3>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
                >
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay:idx * 0.2 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <div
                                className={`w-20 h-20 ${step.bg} border-4 ${step.border} ${step.textColor || "text-accent"
                                    } text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                            >
                                {step.number}
                            </div>
                            <h4 className="text-xl font-bold text-text-base mb-2">{step.title}</h4>
                            <p className="text-text-secondary">{step.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWork;
