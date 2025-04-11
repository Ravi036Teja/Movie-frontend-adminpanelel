import React, { useState, useEffect } from "react";
import axios from "axios";

const MOVIE_API = "http://localhost:5000/api/movies";
const THEATER_API = "http://localhost:5000/api/theaters";

export default function MovieManagement() {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    language: "",
    posterUrl: "",
    trailerUrl: "",
    releaseDate: "",
    duration: "",
    rating: "",
    director: "",
    cast: "",
    theaterId: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMovies();
    fetchTheaters();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(MOVIE_API);
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const fetchTheaters = async () => {
    try {
      const res = await axios.get(THEATER_API);
      setTheaters(res.data);
    } catch (err) {
      console.error("Error fetching theaters:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      genre: formData.genre.trim(),
      language: formData.language.trim(),
      posterUrl: formData.posterUrl.trim(),
      trailerUrl: formData.trailerUrl.trim(),
      releaseDate: formData.releaseDate ? new Date(formData.releaseDate).toISOString() : null,
      duration: parseInt(formData.duration) || 0,
      rating: parseFloat(formData.rating) || 0,
      director: formData.director.trim(),
      cast: formData.cast.split(",").map((c) => c.trim()).filter(Boolean),
      theaterId: formData.theaterId,
    };

    if (!payload.title || !payload.posterUrl || !payload.releaseDate || !payload.theaterId) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${MOVIE_API}/${editId}`, payload);
      } else {
        await axios.post(MOVIE_API, payload);
      }

      setFormData({
        title: "",
        description: "",
        genre: "",
        language: "",
        posterUrl: "",
        trailerUrl: "",
        releaseDate: "",
        duration: "",
        rating: "",
        director: "",
        cast: "",
        theaterId: "",
      });
      setEditId(null);
      fetchMovies();
    } catch (err) {
      console.error("Error submitting movie:", err.response?.data || err.message);
      alert("Movie submission failed. Check console for errors.");
    }
  };

  const handleEdit = (movie) => {
    setFormData({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      language: movie.language,
      posterUrl: movie.posterUrl,
      trailerUrl: movie.trailerUrl,
      releaseDate: movie.releaseDate.split("T")[0],
      duration: movie.duration,
      rating: movie.rating,
      director: movie.director,
      cast: movie.cast.join(", "),
      theaterId: movie.theaterId?._id || movie.theaterId,
    });
    setEditId(movie._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${MOVIE_API}/${id}`);
    fetchMovies();
  };

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Movie Management</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md mb-10"
        >
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="input" />
          <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required className="input" />
          <input name="language" value={formData.language} onChange={handleChange} placeholder="Language" required className="input" />
          <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required className="input" />
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (min)" required className="input" />
          <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (e.g., 8.5)" required className="input" />
          <input name="posterUrl" value={formData.posterUrl} onChange={handleChange} placeholder="Poster URL" required className="input" />
          <input name="trailerUrl" value={formData.trailerUrl} onChange={handleChange} placeholder="Trailer URL" className="input" />
          <input name="director" value={formData.director} onChange={handleChange} placeholder="Director" className="input" />
          <input name="cast" value={formData.cast} onChange={handleChange} placeholder="Cast (comma-separated)" className="input" />

          <select name="theaterId" value={formData.theaterId} onChange={handleChange} className="input" required>
            <option value="">Select Theater</option>
            {theaters.map((theater) => (
              <option key={theater._id} value={theater._id}>
                {theater.name} - {theater.location}
              </option>
            ))}
          </select>

          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="textarea md:col-span-2" />

          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition md:col-span-2">
            {editId ? "Update Movie" : "Add Movie"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-60 object-cover rounded-t-lg" />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-600">{movie.genre} | {movie.language}</p>
                <p className="text-sm text-gray-700 line-clamp-2">{movie.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm"><strong>Duration:</strong> {movie.duration} min</p>
                    <p className="text-sm"><strong>Rating:</strong> ⭐ {movie.rating}</p>
                  </div>
                  <div>
                    <p className="text-sm"><strong>Director:</strong> {movie.director}</p>
                    <p className="text-sm"><strong>Cast:</strong> {movie.cast.join(", ")}</p>
                  </div>
                </div>
                <p className="text-sm"><strong>Theater:</strong> {movie.theaterId?.name} ({movie.theaterId?.location})</p>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => handleEdit(movie)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(movie._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
