import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([
    { code: 'SAVE50', discount: 50 },
    { code: 'FIRST100', discount: 100 },
  ]);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');

  const addCoupon = () => {
    if (!newCode || !newDiscount) return;
    setCoupons([...coupons, { code: newCode.toUpperCase(), discount: parseInt(newDiscount) }]);
    setNewCode('');
    setNewDiscount('');
  };

  const deleteCoupon = (code) => {
    setCoupons(coupons.filter((c) => c.code !== code));
  };

  return (
    <div className="p-6 ml-60 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-1/2"
          placeholder="Coupon Code"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
        />
        <input
          className="border p-2 rounded w-1/2"
          placeholder="Discount Amount"
          type="number"
          value={newDiscount}
          onChange={(e) => setNewDiscount(e.target.value)}
        />
        <button onClick={addCoupon} className="bg-indigo-600 text-white px-4 rounded">Add</button>
      </div>

      <ul className="bg-white rounded shadow divide-y">
        {coupons.map((coupon) => (
          <li key={coupon.code} className="flex justify-between items-center px-4 py-2">
            <div>
              <p className="font-medium">{coupon.code}</p>
              <p className="text-sm text-gray-600">₹{coupon.discount} OFF</p>
            </div>
            <button onClick={() => deleteCoupon(coupon.code)} className="text-red-600">
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCoupons;
