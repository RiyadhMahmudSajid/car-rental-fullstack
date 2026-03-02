import React from "react";

import BookingBarChartA from "./BookingBarChartA";
import PaymentPieChart from "./PaymentPieChart";
import AdminKpi from "./AdminKpi";



const AdminOverview = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 bg-background min-h-screen animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-base italic uppercase tracking-tighter">Dashboard Overview</h1>
                    <p className="text-text-secondary text-sm">Welcome back! Here's what's happening with your fleet today.</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-4 py-2 bg-surface border border-border rounded-xl text-xs font-bold shadow-sm">Updated: Just Now</span>
                </div>
            </div>

            <AdminKpi />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 h-full">
                    <BookingBarChartA />
                </div>
                <div className="lg:col-span-5 h-full">
                    <PaymentPieChart />
                </div>
            </div>
        </div>
    );

};

export default AdminOverview;
