const Legend = () => (
    <div className="flex gap-4 justify-center my-4">
      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded" /> Available</div>
      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500 rounded" /> Selected</div>
      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded" /> Booked</div>
    </div>
  );
  
  export default Legend;
  