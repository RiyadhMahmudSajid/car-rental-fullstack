import React from "react";

import { FaCar, FaCheckCircle, FaClock, FaDollarSign } from "react-icons/fa";
import KpiCard from "./KpiCard";

const KpiCardsSection = ({ bookings, paidCount, pendingCount, paidValue }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <KpiCard icon={<FaCar />} title="Total Bookings" value={bookings.length} color="var(--color-primary)" />
    <KpiCard icon={<FaCheckCircle />} title="Paid Bookings" value={paidCount} color="#10B981" />
    <KpiCard icon={<FaClock />} title="Pending Bookings" value={pendingCount} color="var(--color-accent)" />
    <KpiCard icon={<FaDollarSign />} title="Paid Revenue (Simple)" value={`$${paidValue.toFixed(2)}`} color="#3B82F6" />
  </div>
);

export default KpiCardsSection;
