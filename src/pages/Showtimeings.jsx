import React, { useEffect, useState } from "react";
import axios from "axios";

const SHOWTIME_API = "http://localhost:5000/api/showtimes";
const MOVIES_API = "http://localhost:5000/api/movies";
const THEATER_API = "http://localhost:5000/api/theaters";

export default function Showtimeings() {
  const [theaters, setTheaters] = useState([]);
  const [theaterId, setTheaterId] = useState("");
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    movieId: "",
    date: "",
    startTime: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get(THEATER_API).then((res) => setTheaters(res.data));
  }, []);

  useEffect(() => {
    if (theaterId) {
      fetchMovies(theaterId);
      fetchShowtimes();
    }
  }, [theaterId]);

  const fetchMovies = async (id) => {
    try {
      const res = await axios.get(`${MOVIES_API}?theaterId=${id}`);
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  };

  const fetchShowtimes = async () => {
    try {
      const res = await axios.get(`${SHOWTIME_API}/theater/${theaterId}`);
      setShowtimes(res.data);
    } catch (err) {
      console.error("Error fetching showtimes", err);
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.movieId || !form.date || !form.startTime || !form.price) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    const data = {
      ...form,
      theaterId,
      startTime: `${form.date}T${form.startTime}`,
    };

    try {
      if (editingId) {
        await axios.put(`${SHOWTIME_API}/${editingId}`, data);
        setMessage("✅ Showtime updated successfully!");
        setEditingId(null);
      } else {
        await axios.post(SHOWTIME_API, data);
        setMessage("✅ Showtime scheduled successfully!");
      }

      setForm({ movieId: "", date: "", startTime: "", price: "" });
      fetchShowtimes();
    } catch (err) {
      console.error("Error submitting showtime:", err);
      setMessage("❌ Failed to submit showtime.");
    }
  };

  const handleEdit = (show) => {
    const rawStartTime = show?.startTime;
  
    if (!rawStartTime) {
      console.warn("Missing startTime:", show);
      setMessage("⚠️ Missing startTime data.");
      return;
    }
  
    const start = new Date(rawStartTime);
  
    if (isNaN(start.getTime())) {
      console.warn("Invalid startTime format:", rawStartTime);
      setMessage("⚠️ Cannot edit showtime due to invalid startTime format.");
      return;
    }
  
    setForm({
      movieId: show.movieId?._id || "",
      theaterId: show.theaterId?._id || "", // if you're using theaters
      date: start.toISOString().slice(0, 10),
      startTime: start.toTimeString().slice(0, 5),
      price: show.price,
    });
  
    setEditingId(show._id);
    setMessage("");
  };
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SHOWTIME_API}/${id}`);
      fetchShowtimes();
      setMessage("🗑️ Showtime deleted.");
    } catch (err) {
      console.error("Delete failed", err);
      setMessage("❌ Failed to delete showtime.");
    }
  };

  return (
    <div className="p-6 ml-60">
      <h2 className="text-2xl font-bold mb-4">🎥 Schedule Showtime</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">🎭 Select Theater:</label>
        <select
          value={theaterId}
          onChange={(e) => setTheaterId(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Select --</option>
          {theaters.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {theaterId && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="movieId"
              value={form.movieId}
              onChange={handleInput}
              className="border px-3 py-2 rounded"
            >
              <option value="">Select Movie</option>
              {movies.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.title}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleInput}
              className="border px-3 py-2 rounded"
            />

            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleInput}
              className="border px-3 py-2 rounded"
            />

            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              value={form.price}
              onChange={handleInput}
              className="border px-3 py-2 rounded"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update Showtime" : "Add Showtime"}
          </button>

          {message && (
            <p
              className={`mt-2 ${
                message.includes("✅")
                  ? "text-green-600"
                  : message.includes("🗑️")
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <h3 className="text-xl font-semibold mt-8 mb-2">
            📆 Scheduled Showtimes
          </h3>
          <div className="space-y-4">
            {showtimes.length === 0 ? (
              <p>No showtimes scheduled yet.</p>
            ) : (
              showtimes.map((s) => (
                <div
                  key={s._id}
                  className="border p-4 rounded shadow flex justify-between items-center"
                >
                  <div className="flex gap-4 items-center">
                    {s.movieId?.posterUrl ? (
                      <img
                        src={s.movieId.posterUrl}
                        alt={s.movieId.title}
                        className="w-20 h-28 object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-28 bg-gray-300 rounded flex items-center justify-center text-sm">
                        No Poster
                      </div>
                    )}

                    <div>
                      <strong>{s.movieId?.title || "Untitled"}</strong> <br />
                      📅{" "}
                      {s.startTime
                        ? new Date(s.startTime).toLocaleDateString()
                        : "--"}{" "}
                      <br />
                      🕒{" "}
                      {s.startTime
                        ? new Date(s.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}{" "}
                      <br />
                      💸 ₹{s.price}
                    </div>
                  </div>

                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
