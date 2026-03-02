import React, { useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, } from "recharts";
import { FaHistory, FaCreditCard, FaCar, FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import { AuthContex } from "../../../Contex/AuthProvider";
import useAxios from "../../Hook/useAxios";
const PaymentHistory = () => {
  const { user } = useContext(AuthContex);
  const axiosInstance = useAxios();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      if (user?.role === "admin") {
        const res = await axiosInstance.get("/booking");
        return res.data;
      } else {
        const res = await axiosInstance.get(`/my-booking?email=${user.email}`);
        return res.data || [];
      }
    },
    enabled: !!user,
  });
  const chartData = useMemo(() => {
    const dailyData = payments
      .filter((p) => p.paymentStatus === "paid")
      .reduce((acc, curr) => {
        const date = new Date(curr.
pickupDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const amount = curr.car?.totalPrice ?? curr.car?.pricePerDay ?? 0;
        acc[date] = (acc[date] || 0) + amount;
        return acc;
      }, {});

    return Object.keys(dailyData).map((date) => ({
      date,
      amount: dailyData[date],
    })).slice(-7);
  }, [payments]);
  const totalPaid = payments
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + (p.car?.totalPrice ?? p.car?.pricePerDay ?? 0), 0);
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 font-semibold text-gray-500 animate-pulse uppercase tracking-widest text-xs">Loading Assets</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-[#F8FAFC] dark:bg-gray-900 transition-colors duration-300">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
              <FaHistory size={20} />
            </span>
            Payment Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 ml-1">Monitor your recent rental transactions and spending.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center">
          <div className="px-8 py-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl text-white shadow-md">
            <p className="text-xs font-medium uppercase opacity-80 tracking-wider">Total Net Spend</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">${totalPaid.toLocaleString()}</span>
              <span className="text-sm opacity-80">USD</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaCreditCard className="text-blue-500" /> Spending Activity
            </h3>
            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              Last 7 Records
            </span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={1} />
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: '#F3F4F6', opacity: 0.4 }}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                  itemStyle={{ color: "#60A5FA" }}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">Rental Insights</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Based on your recent activity, you prefer luxury sedans. Consider our loyalty program to save up to 15% on next bookings.
            </p>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-900/20">
              Get Member Perks
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-all">
        <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 dark:text-white">Detailed Transactions</h3>
          <button className="text-sm text-blue-600 font-semibold hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Car Details</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Rental Duration</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <FaCreditCard size={48} className="mb-4 text-gray-400" />
                      <p className="text-gray-500 font-medium">No transactions found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                payments.map((booking) => (
                  <tr key={booking._id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <FaCar />
                        </div>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{booking.car.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt size={12} className="opacity-60" />
                        <span>{new Date(booking.pickupDate).toLocaleDateString()}</span>
                        <span className="text-gray-300">→</span>
                        <span>{new Date(booking.returnDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                        ${(booking.car.totalPrice ?? booking.car.pricePerDay).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {booking.paymentStatus === "paid" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                          <FaCheckCircle /> Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                          <FaClock /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 italic">
                        {booking.paymentStatus === "paid" ? new Date(booking.pickupDate).toLocaleDateString('en-GB') : "---"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;