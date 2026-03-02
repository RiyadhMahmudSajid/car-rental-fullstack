import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { FaChartPie } from "react-icons/fa";

const PIE_COLORS = ["var(--color-accent)", "var(--color-text-secondary)"];

const PaymentStatusPie = ({ pieData }) => (
  <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
    <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: 'var(--color-text-base)' }}>
      <FaChartPie className="mr-2" style={{ color: PIE_COLORS[0] }} /> Payment Status Distribution
    </h2>
    {pieData.length > 0 ? (
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
                className="transition duration-300 hover:opacity-80"
              />
            ))}
          </Pie>
          <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ color: 'var(--color-text-secondary)' }} />
          <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-base)' }} formatter={(value, name) => [value, name]} />
        </PieChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-center py-10" style={{ color: 'var(--color-text-secondary)' }}>No payment data available.</p>
    )}
  </div>
);

export default PaymentStatusPie;
