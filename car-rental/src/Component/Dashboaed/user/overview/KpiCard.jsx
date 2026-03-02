import React from "react";

const KpiCard = ({ icon, title, value, color }) => (
  <div
    className="p-6 rounded-xl shadow-lg flex items-center justify-between transition duration-300 hover:shadow-xl"
    style={{
      backgroundColor: 'var(--color-surface)',
      borderLeft: `4px solid ${color}`,
      border: '1px solid var(--color-border)',
      color: 'var(--color-text-base)'
    }}
  >
    <div>
      <p className="text-sm font-medium uppercase" style={{ color: 'var(--color-text-secondary)' }}>
        {title}
      </p>
      <p className="text-3xl font-extrabold mt-1">{value}</p>
    </div>
    <div className="p-3 rounded-full opacity-70" style={{ color: color }}>
      {React.isValidElement(icon) && React.cloneElement(icon, { className: 'w-6 h-6' })}
    </div>
  </div>
);

export default KpiCard;
