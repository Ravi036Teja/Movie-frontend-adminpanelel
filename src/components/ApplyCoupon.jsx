import React, { useState } from 'react';

const ApplyCoupon = ({ coupons, totalAmount, onSuccess }) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [finalAmount, setFinalAmount] = useState(totalAmount);

  const applyCoupon = () => {
    const found = coupons.find(c => c.code === couponCode.toUpperCase());
    if (found) {
      const discountedAmount = totalAmount - found.discount;
      setFinalAmount(discountedAmount > 0 ? discountedAmount : 0);
      setMessage(`Coupon applied! ₹${found.discount} off.`);
      onSuccess(); // mark as success
    } else {
      setMessage('Invalid coupon code!');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto mt-6">
      <h3 className="text-lg font-semibold mb-2">Apply Coupon</h3>
      <div className="flex gap-2 mb-2">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button onClick={applyCoupon} className="bg-green-600 text-white px-4 rounded">
          Apply
        </button>
      </div>
      {message && <p className="text-sm text-blue-600">{message}</p>}
      <p className="mt-2 font-medium">Final Amount: ₹{finalAmount}</p>
    </div>
  );
};

export default ApplyCoupon;
