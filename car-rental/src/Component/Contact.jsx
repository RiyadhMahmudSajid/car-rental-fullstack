import React, { useContext } from 'react';
import { motion } from "motion/react";
import { useForm } from 'react-hook-form';
import { AuthContex } from '../Contex/AuthProvider';
import useAxios from './Hook/useAxios';
import { CgKey } from 'react-icons/cg';
import toast from 'react-hot-toast';
const Contact = () => {
    const { user } = useContext(AuthContex)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosInstance = useAxios()
    const onSubmit = async (data) => {
       
        const messageInfo = {
            email: data.email,
            name: data.fullName,
            message: data.message,
            subject: data.subject



        }

        const result = await axiosInstance.post('/message', messageInfo)
        if (result.data.insertedId) {
            toast.success("Message sent!");
        }
        


    };
    return (
        <div className="bg-background min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">


                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-primary font-bold tracking-wide uppercase text-sm">Contact Us</motion.h2>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}

                        className="mt-2 text-4xl font-extrabold text-text-base sm:text-5xl">
                        Get In Touch With Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}

                        className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
                        Have questions about our fleet or booking process? Our team is here to help you 24/7.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">


                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-2xl border border-border flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-text-base">Our Location</h4>
                                <p className="text-text-secondary text-sm">123 Car Street, Automative Hub, NY 10001</p>
                            </div>
                        </div>

                        <div className="bg-surface p-6 rounded-2xl border border-border flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-text-base">Phone Number</h4>
                                <p className="text-text-secondary text-sm">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="bg-surface p-6 rounded-2xl border border-border flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-text-base">Email Address</h4>
                                <p className="text-text-secondary text-sm">support@carrental.com</p>
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-surface p-8 rounded-3xl border border-border shadow-sm space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <label className="block text-sm font-medium text-text-base mb-2">Full Name</label>
                                    <input
                                        {...register("fullName", { required: "Full name is required" })}
                                        type="text"

                                        defaultValue={user?.displayName}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-border'} bg-background text-text-base focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                                        placeholder="John Doe"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-base mb-2">Email Address</label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }

                                        })}

                                        defaultValue={user?.email}
                                        type="email"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-border'} bg-background text-text-base focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-base mb-2">Subject</label>
                                <input
                                    {...register("subject", { required: "Subject is required" })}
                                    type="text"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500' : 'border-border'} bg-background text-text-base focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                                    placeholder="Booking Inquiry"
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-text-base mb-2">Message</label>
                                <textarea
                                    {...register("message", {
                                        required: "Message cannot be empty",
                                        minLength: { value: 10, message: "Message should be at least 10 characters" }
                                    })}
                                    rows="4"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-border'} bg-background text-text-base focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                                    placeholder="Write your message here..."
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;