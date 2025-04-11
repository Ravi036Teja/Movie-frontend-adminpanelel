import React, { useState, useEffect } from 'react';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setPayments([
      {
        id: '1',
        user: 'John Doe',
        movie: 'Batman',
        amount: 300,
        status: 'success',
        date: '2025-04-07',
        orderId: 'ORD12345'
      },
      {
        id: '2',
        user: 'Alice Smith',
        movie: 'Superman',
        amount: 400,
        status: 'failed',
        date: '2025-04-06',
        orderId: 'ORD54321'
      }
    ]);
  }, []);

  const filteredPayments = payments.filter(p =>
    p.user.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === '' || p.status === statusFilter)
  );

  return (
    <div className="p-6 ml-60">
      <h2 className="text-2xl font-bold mb-6">Payment Management</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
          className="border px-4 py-2 rounded w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Movie</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Amount (₹)</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="border-t text-sm">
                <td className="px-4 py-3">{payment.user}</td>
                <td className="px-4 py-3">{payment.movie}</td>
                <td className="px-4 py-3">{payment.orderId}</td>
                <td className="px-4 py-3">₹{payment.amount}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded 
                    ${payment.status === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3">{payment.date}</td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
