import React from 'react';

const bookings = [
  {
    id: 1,
    user: 'John Doe',
    movie: 'Avatar 2',
    theater: 'PVR Hospet',
    seats: ['A1', 'A2'],
    time: '04-Apr, 7:00 PM',
    amount: '₹400',
    status: 'Paid',
  },
  {
    id: 2,
    user: 'Naruto',
    movie: 'Jawan',
    theater: 'INOX Arena',
    seats: ['B5'],
    time: '04-Apr, 9:00 PM',
    amount: '₹200',
    status: 'Pending',
  },
  {
    id: 3,
    user: 'Tanjiro',
    movie: 'Demon Slayer',
    theater: 'JMAX',
    seats: ['2A'],
    time: '04-Apr, 9:00 PM',
    amount: '₹150',
    status: 'Paid',
  },
];

const BookingTable = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-8 overflow-x-auto border-2 border-gray-100 ">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Bookings</h3>
      <table className="min-w-full text-sm text-left">
        <thead className="text-gray-500 bg-gray-100">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Movie</th>
            <th className="p-3">Theater</th>
            <th className="p-3">Seats</th>
            <th className="p-3">Showtime</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{booking.user}</td>
              <td className="p-3">{booking.movie}</td>
              <td className="p-3">{booking.theater}</td>
              <td className="p-3">{booking.seats.join(', ')}</td>
              <td className="p-3">{booking.time}</td>
              <td className="p-3">{booking.amount}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}  
                >
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
