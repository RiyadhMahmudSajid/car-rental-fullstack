import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hook/useAxios";


const COLORS = ["#10B981", "#F59E0B"];

const PaymentPieChart = () => {
  const axiosInstance = useAxios();

  const { data: bookings = [] } = useQuery({
    queryKey: ["payment-pie"],
    queryFn: async () => {
      const res = await axiosInstance.get("/booking");
      return res.data;
    },
  });

  const paid = bookings.filter(b => b.paymentStatus === "paid").length;
  const pending = bookings.filter(b => b.paymentStatus === "pending").length;

  const pieData = [
    { name: "Paid", value: paid },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="p-8 bg-surface border border-border rounded-[2.5rem] shadow-sm h-[450px] relative">
      <h2 className="text-xl font-black text-text-base mb-2 italic">Payment Status</h2>
      <p className="text-xs text-text-secondary mb-6 font-medium">Distribution of paid vs pending</p>

      <div className="h-full pb-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={80}
              outerRadius={110}
              paddingAngle={8}
              dataKey="value"
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-4">
          <p className="text-[10px] uppercase font-bold text-text-secondary">Overview</p>
          <p className="text-2xl font-black text-text-base">100%</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPieChart;
