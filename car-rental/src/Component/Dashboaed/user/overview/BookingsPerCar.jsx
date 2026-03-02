import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Legend } from "recharts";
import { FaChartBar } from "react-icons/fa";

const BAR_COLOR = "var(--color-primary)";

const BookingsPerCar = ({ barData }) => (
  <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
    <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: 'var(--color-text-base)' }}>
      <FaChartBar className="mr-2" style={{ color: 'var(--color-primary)' }} /> Bookings Per Car Model
    </h2>
    {barData.length > 0 ? (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" style={{ fill: 'var(--color-text-secondary)' }} />
          <YAxis allowDecimals={false} style={{ fill: 'var(--color-text-secondary)' }} />
          <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-base)' }} />
          <Legend wrapperStyle={{ color: 'var(--color-text-secondary)' }} />
          <Bar dataKey="bookingCount" fill={BAR_COLOR} name="Total Bookings" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-center py-10" style={{ color: 'var(--color-text-secondary)' }}>No car booking data to display.</p>
    )}
  </div>
);

export default BookingsPerCar;
