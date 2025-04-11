import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { date: 'Apr 1', revenue: 2000 },
    { date: 'Apr 2', revenue: 4000 },
    { date: 'Apr 3', revenue: 3000 },
    { date: 'Apr 4', revenue: 5000 },
    { date: 'Apr 5', revenue: 4500 },
  ];
  
  const RevenueChart = () => {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-gray-100  mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Revenue (Last 5 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default RevenueChart;
  