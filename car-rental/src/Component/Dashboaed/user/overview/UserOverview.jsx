import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContex } from "../../../../Contex/AuthProvider";
import useAxios from "../../../Hook/useAxios";
import BookingsPerCar from "./BookingsPerCar";
import PaymentStatusPie from "./PaymentStatusPie";
import KpiCardsSection from "./KpiCardsSection";


const UserOverview = () => {
  const { user } = useContext(AuthContex);
  const axiosInstance = useAxios();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["overview", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosInstance.get(`/my-booking?email=${user.email}`);
      return res.data || [];
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-base)' }}>
        <p className="text-xl">Loading Data...</p>
      </div>
    );
  }

  const carCounts = bookings.reduce((acc, booking) => {
    const carName = booking.car?.name || "Unknown Car";
    acc[carName] = (acc[carName] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.keys(carCounts).map(name => ({ name, bookingCount: carCounts[name] }));

  const paidCount = bookings.filter(b => b.paymentStatus === "paid").length;
  const pendingCount = bookings.filter(b => b.paymentStatus === "pending").length;
  const pieData = [{ name: "Paid", value: paidCount }, { name: "Pending", value: pendingCount }];
  const paidValue = bookings.filter(b => b.paymentStatus === "paid").reduce((sum, b) => sum + (b.car?.pricePerDay || 0), 0);

  return (
    <div className="p-6 space-y-10 min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <h1 className="text-4xl font-extrabold border-b pb-3" style={{ color: 'var(--color-text-base)', borderColor: 'var(--color-border)' }}>
        Dashboard Overview
      </h1>

      <KpiCardsSection bookings={bookings} paidCount={paidCount} pendingCount={pendingCount} paidValue={paidValue} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BookingsPerCar barData={barData} />
        <PaymentStatusPie pieData={pieData} />
      </div>
    </div>
  );
};

export default UserOverview;
