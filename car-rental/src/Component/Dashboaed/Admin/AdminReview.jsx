import React, { useContext } from 'react';
import Loading from '../../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hook/useAxios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from "recharts";
import { AuthContex } from '../../../Contex/AuthProvider';
import { FaStar, FaUsers, FaRegCommentDots } from 'react-icons/fa';

const AdminReview = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContex);

    const { isLoading, data: reviews = [] } = useQuery({
        queryKey: ['admin-reviews'],
        queryFn: async () => {
            const result = await axiosInstance.get('/my-reviews'); // অ্যাডমিনের জন্য সব রিভিউ আসবে
            return result.data;
        },
    });

    if (isLoading) return <Loading />;

    const averageRating = reviews.length 
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
        : 0;

    const chartData = reviews.slice(-8).map((r) => ({
        name: r.userName?.split(' ')[0] || "User",
        rating: r.rating,
    }));

    const getBarColor = (rating) => {
        if (rating >= 4) return '#2563EB'; 
        if (rating >= 3) return '#F59E0B'; 
        return '#EF4444'; 
    };

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fade-in">
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface p-6 rounded-[2rem] border border-border shadow-sm flex items-center gap-5">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary"><FaRegCommentDots size={24} /></div>
                    <div>
                        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Total Reviews</p>
                        <h2 className="text-2xl font-black text-text-base">{reviews.length}</h2>
                    </div>
                </div>

                <div className="bg-surface p-6 rounded-[2rem] border border-border shadow-sm flex items-center gap-5">
                    <div className="p-4 bg-accent/10 rounded-2xl text-accent"><FaStar size={24} /></div>
                    <div>
                        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Average Rating</p>
                        <h2 className="text-2xl font-black text-text-base">{averageRating} / 5.0</h2>
                    </div>
                </div>

                <div className="bg-surface p-6 rounded-[2rem] border border-border shadow-sm flex items-center gap-5">
                    <div className="p-4 bg-green-500/10 rounded-2xl text-green-600"><FaUsers size={24} /></div>
                    <div>
                        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Satisfied Users</p>
                        <h2 className="text-2xl font-black text-text-base">
                            {reviews.filter(r => r.rating >= 4).length}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h3 className="text-xl font-black text-text-base italic">Review Analytics</h3>
                        <p className="text-sm text-text-secondary">Recent user ratings and performance</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 text-xs font-medium"><span className="w-3 h-3 rounded-full bg-primary"></span> High</div>
                        <div className="flex items-center gap-2 text-xs font-medium"><span className="w-3 h-3 rounded-full bg-accent"></span> Average</div>
                    </div>
                </div>

                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#6B7280', fontSize: 12, fontWeight: 600}} 
                                dy={10}
                            />
                            <YAxis 
                                domain={[0, 5]} 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#6B7280', fontSize: 12}} 
                            />
                            <Tooltip 
                                cursor={{fill: '#F3F4F6'}}
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="rating" radius={[8, 8, 0, 0]} barSize={45}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.rating)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminReview;