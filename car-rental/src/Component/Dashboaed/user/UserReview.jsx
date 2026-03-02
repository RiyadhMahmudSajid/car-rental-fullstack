import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaStar, FaCar, FaChevronRight, FaRegCommentDots } from 'react-icons/fa';
import useAxios from '../../Hook/useAxios';
import { AuthContex } from '../../../Contex/AuthProvider';
import { useForm } from 'react-hook-form';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';


const UserReview = () => {
    const { user } = useContext(AuthContex);
    const axiosInstance = useAxios();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);


    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['my-booking', user?.email],
        queryFn: async () => {
            const result = await axiosInstance.get(`/my-booking?email=${user.email}`);
            return result.data;
        }
    });


    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['my-reviews', user?.email],
        queryFn: async () => {
            const result = await axiosInstance.get(`/my-reviews?email=${user.email}`);
            return result.data;
        }
    });

    const onSubmit = async (data) => {
        if (rating === 0) {
            return toast.error("Oops!", "Please select a rating star.", "warning");
        }

        const reviewData = {
            userName: user?.displayName,
            userEmail: user?.email,
            userImage: user?.photoURL,
            rating: rating,
            reviewText: data.reviewText,
            date: new Date().toISOString(),
        };

        try {
            const res = await axiosInstance.post("/reviews", reviewData);
            if (res.data.insertedId) {
                toast.success("Success!", "Thank you for your review!", "success");
                reset();
                setRating(0);
                refetch(); 
            }
            
        } catch (error) {
            //
        }
    };

    
    const chartData = reviews.slice(-5).map((r) => ({
        date: new Date(r.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        rating: r.rating,
    }));

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
    );

    const hasPaidBooking = bookings.some(b => b.paymentStatus === 'paid');

    return (
        <div className="p-4 md:p-8 space-y-10 animate-fade-in">
            
          
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-base">Reviews & Feedback</h1>
                    <p className="text-text-secondary mt-1 text-sm md:text-base">Monitor your activity and share your rental experience.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span>Dashboard</span> <FaChevronRight className="text-[10px]" /> <span className="text-primary font-medium">Reviews</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                
               
                <div className="lg:col-span-3">
                    <div className="bg-surface p-6 rounded-[2rem] border border-border shadow-sm h-full">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-text-base flex items-center gap-2">
                                <span className="p-2 bg-accent/10 rounded-lg"><FaStar className="text-accent text-sm" /></span>
                                Rating History
                            </h3>
                            <span className="text-xs font-semibold text-text-secondary bg-background px-3 py-1 rounded-full border border-border">
                                Last 5 Reviews
                            </span>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                                    <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                        cursor={{fill: '#F3F4F6'}}
                                    />
                                    <Bar dataKey="rating" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

         
                <div className="lg:col-span-2">
                    {hasPaidBooking ? (
                        <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8"></div>
                            
                            <div className="relative z-10">
                                <div className="p-3 bg-primary/10 w-fit rounded-2xl mb-4 text-primary">
                                    <FaRegCommentDots size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-text-base mb-2">Write a Review</h3>
                                <p className="text-text-secondary text-sm mb-6 leading-relaxed">How was your last trip? Your feedback makes GoDrive better for everyone.</p>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     
                                    <div>
                                        <label className="block text-sm font-bold text-text-base mb-3">Rate your experience</label>
                                        <div className="flex gap-2 bg-background p-3 rounded-2xl border border-border w-fit">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    className={`text-2xl transition-all duration-200 ${(hover || rating) >= star ? 'text-accent scale-110' : 'text-gray-300'}`}
                                                    onClick={() => setRating(star)}
                                                    onMouseEnter={() => setHover(star)}
                                                    onMouseLeave={() => setHover(0)}
                                                >
                                                    <FaStar />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                             
                                    <div>
                                        <label className="block text-sm font-bold text-text-base mb-2">Share your thoughts</label>
                                        <textarea
                                            {...register("reviewText", { required: "Please write a few words" })}
                                            rows="4"
                                            className={`w-full px-5 py-4 rounded-2xl border ${errors.reviewText ? 'border-error' : 'border-border'} bg-background text-text-base focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-all resize-none shadow-inner`}
                                            placeholder="The car was amazing, the host was helpful..."
                                        ></textarea>
                                        {errors.reviewText && <span className="text-error text-xs mt-1 ml-2 italic">Please write something about your experience</span>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        Submit Feedback
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                     
                        <div className="bg-surface p-10 rounded-[2.5rem] border border-border text-center flex flex-col items-center justify-center h-full border-dashed">
                            <div className="bg-primary/5 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                                <FaCar className="text-4xl text-primary/40 rotate-12" />
                            </div>
                            <h3 className="text-xl font-bold text-text-base mb-3">No Paid Trips Found</h3>
                            <p className="text-text-secondary text-sm max-w-[250px] mx-auto leading-relaxed">
                                Reviews are only available after you complete a paid rental.
                            </p>
                            <button className="mt-8 bg-accent/10 text-accent border border-accent/20 px-6 py-2 rounded-full font-bold hover:bg-accent hover:text-white transition-all text-sm">
                                Rent a Car
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserReview;