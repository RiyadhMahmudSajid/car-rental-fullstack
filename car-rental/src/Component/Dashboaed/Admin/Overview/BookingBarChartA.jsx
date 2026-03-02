import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hook/useAxios";


const BookingBarChartA = () => {
  const axiosInstance = useAxios();

  const { data: bookings = [] } = useQuery({
    queryKey: ["booking-bar"],
    queryFn: async () => {
      const res = await axiosInstance.get("/booking");
      return res.data;
    },
  });


  const carCount = bookings.reduce((acc, b) => {
    const name = b.car?.name || "Unknown";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(carCount).map(name => ({
    name,
    count: carCount[name],
  }));

  return (
    <div className="p-8 bg-surface border border-border rounded-[2.5rem] shadow-sm h-[450px]">
      <h2 className="text-xl font-black text-text-base mb-6 italic">Bookings Per Car</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            cursor={{ fill: '#f1f5f9' }}
          />
          <Bar dataKey="count" fill="#6366F1" radius={[10, 10, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingBarChartA;
