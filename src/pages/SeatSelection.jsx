import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const { data } = await axios.get(`https://movieticketadmin-backend.onrender.com/api/showtimes/${showtimeId}`);
        setShowtime(data);
        setMovie(data.movie);
        // Initialize seat layout (if not present, create 50 empty seats)
        if (!data.seatLayout || data.seatLayout.length === 0) {
          const generatedSeats = Array.from({ length: 50 }, (_, i) => ({
            seatNumber: `S${i + 1}`,
            isBooked: false,
          }));
          setSeats(generatedSeats);
        } else {
          setSeats(data.seatLayout);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching showtime:", err);
        setLoading(false);
      }
    };

    fetchShowtime();
  }, [showtimeId]);

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleBooking = async () => {
    try {
      const res = await axios.post(`https://movieticketadmin-backend.onrender.com/api/showtimes/${showtimeId}/book`, {
        seats: selectedSeats,
      });
      alert("Booking successful!");
      // Refresh seats
      setSeats(seats.map(seat => selectedSeats.includes(seat.seatNumber) ? { ...seat, isBooked: true } : seat));
      setSelectedSeats([]);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed!");
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-1">{movie?.title}</h2>
        <p className="text-sm text-gray-500">{movie?.genre} | {movie?.language}</p>
      </div>

      <div className="grid grid-cols-10 gap-2 mb-6">
        {seats.map((seat, idx) => (
          <div
            key={idx}
            className={`p-2 border text-sm text-center rounded cursor-pointer ${
              seat.isBooked ? 'bg-gray-400 cursor-not-allowed' :
              selectedSeats.includes(seat.seatNumber) ? 'bg-green-500 text-white' : 'bg-white'
            }`}
            onClick={() => !seat.isBooked && toggleSeat(seat.seatNumber)}
          >
            {seat.seatNumber}
          </div>
        ))}
      </div>

      <div className="text-center mb-4">
        <h4 className="font-semibold">Selected Seats:</h4>
        <p>{selectedSeats.join(", ") || "None"}</p>
      </div>

      <div className="text-center">
        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
