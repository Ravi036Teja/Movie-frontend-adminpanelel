import React from 'react';

const SummaryCard = ({ title, value, icon, bgColor = 'bg-white', textColor = 'text-gray-800' }) => {
  return (
    <div className={`cursor-pointer flex items-center justify-between p-4 rounded-2xl shadow-md border-2 border-gray-100  ${bgColor}`}>
      <div>
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      </div>
      <div className="p-3 bg-gray-100 rounded-full text-gray-700">
        {icon}
      </div>
    </div>
  );
};

export default SummaryCard;
