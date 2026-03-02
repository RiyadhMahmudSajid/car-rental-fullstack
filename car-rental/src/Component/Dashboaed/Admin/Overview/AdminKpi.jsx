import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hook/useAxios';
import { FaCar, FaMoneyBill, FaClock, FaCheck } from "react-icons/fa";
const AdminKpi = () => {

    const axiosInstance = useAxios()
    const { data: bookings = [] } = useQuery({
        queryKey: ["admin-bookings"],
        queryFn: async () => {
            const res = await axiosInstance.get("/booking")
            return res.data
        }
    })
    const { data: cars = [] } = useQuery({
        queryKey: ["admin-cars"],
        queryFn: async () => {
            const res = await axiosInstance.get("/all-car");
            return res.data;
        },
    })

    const totalBookings = bookings.length;
    const paidBookings = bookings.filter(b => b.paymentStatus === "paid").length
    const pendingBookings = bookings.filter(b => b.paymentStatus === "pending").length;

    const totalRevenue = bookings
        .filter(b => b.paymentStatus === "paid")
        .reduce((sum, b) => sum + (b.car?.pricePerDay || 0), 0);



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card title="Total Bookings" value={totalBookings} icon={<FaCar />} color="bg-blue-500" />
            <Card title="Paid Units" value={paidBookings} icon={<FaCheck />} color="bg-emerald-500" />
            <Card title="Pending" value={pendingBookings} icon={<FaClock />} color="bg-amber-500" />
            <Card title="Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={<FaMoneyBill />} color="bg-violet-500" />
            <Card title="Total Fleet" value={cars.length} icon={<FaCar />} color="bg-rose-500" />
        </div>
    );
};

const Card = ({ title, value, icon, color }) => (
    <div className="p-6 bg-surface border border-border rounded-[2rem] shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
        <div className="relative z-10">
            <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-${color}/20 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">{title}</p>
            <h2 className="text-2xl font-black text-text-base">{value}</h2>
        </div>

        <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${color} opacity-[0.03] rounded-full`}></div>
    </div>
);
export default AdminKpi;