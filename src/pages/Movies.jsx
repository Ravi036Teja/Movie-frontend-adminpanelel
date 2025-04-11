import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
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
    theaterId: "",
    cast: [{ name: "", image: "" }],
  });

  useEffect(() => {
    fetchMovies();
    fetchTheaters();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get("http://localhost:5000/api/movies");
    setMovies(res.data);
  };

  const fetchTheaters = async () => {
    const res = await axios.get("http://localhost:5000/api/theaters");
    setTheaters(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCastChange = (index, e) => {
    const updatedCast = [...form.cast];
    updatedCast[index][e.target.name] = e.target.value;
    setForm({ ...form, cast: updatedCast });
  };

  const addCastField = () => {
    setForm({ ...form, cast: [...form.cast, { name: "", image: "" }] });
  };

  const removeCastField = (index) => {
    const updatedCast = [...form.cast];
    updatedCast.splice(index, 1);
    setForm({ ...form, cast: updatedCast });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`http://localhost:5000/api/movies/${editingId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/movies", form);
    }

    fetchMovies();
    resetForm();
  };

  const resetForm = () => {
    setForm({
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
      theaterId: "",
      cast: [{ name: "", image: "" }],
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/movies/${id}`);
    fetchMovies();
  };

  const handleEdit = (movie) => {
    setForm({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      language: movie.language,
      posterUrl: movie.posterUrl,
      trailerUrl: movie.trailerUrl,
      releaseDate: movie.releaseDate?.split("T")[0] || "",
      duration: movie.duration,
      rating: movie.rating,
      director: movie.director,
      theaterId: movie.theaterId,
      cast: movie.cast?.length ? movie.cast : [{ name: "", image: "" }],
    });
    setEditingId(movie._id);
  };

  return (
    <div className="ml-64 p-4 md:p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Movie Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="border-2 border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-10">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="p-2 border rounded" required />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" className="p-2 border rounded" />
        <input name="language" value={form.language} onChange={handleChange} placeholder="Language" className="p-2 border rounded" />
        <input name="posterUrl" value={form.posterUrl} onChange={handleChange} placeholder="Poster URL" className="p-2 border rounded" />
        <input name="trailerUrl" value={form.trailerUrl} onChange={handleChange} placeholder="Trailer URL" className="p-2 border rounded" />
        <input name="releaseDate" type="date" value={form.releaseDate} onChange={handleChange} className="p-2 border rounded" />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="p-2 border rounded" />
        <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" className="p-2 border rounded" />
        <input name="director" value={form.director} onChange={handleChange} placeholder="Director" className="p-2 border rounded" />
        <select name="theaterId" value={form.theaterId} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Theater</option>
          {theaters.map((theater) => (
            <option key={theater._id} value={theater._id}>
              {theater.name}
            </option>
          ))}
        </select>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded col-span-1 md:col-span-2" />

        {/* Cast */}
        <div className="col-span-1 md:col-span-2 border-2 border-gray">
          <label className="font-semibold mb-2 block">Cast</label>
          {form.cast.map((member, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input name="name" value={member.name} onChange={(e) => handleCastChange(index, e)} placeholder="Cast Name" className="p-2 border rounded w-full" />
              <input name="image" value={member.image} onChange={(e) => handleCastChange(index, e)} placeholder="Cast Image URL" className="p-2 border rounded w-full" />
              {index > 0 && (
                <button type="button" onClick={() => removeCastField(index)} className="bg-red-500 text-white px-2 rounded">
                  ×
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addCastField} className="bg-blue-500 text-white px-4 py-1 rounded">
            + Add Cast
          </button>
        </div>

        <button type="submit" className="bg-green-600 text-white py-2 rounded col-span-1 md:col-span-2">
          {editingId ? "Update Movie" : "Add Movie"}
        </button>
      </form>

      {/* Movie List (Original Style) */}
      <div className="grid md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white shadow rounded overflow-hidden">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-600">{movie.description?.slice(0, 100)}...</p>
              <p className="text-xs text-gray-500">{movie.genre} | {movie.language}</p>
              <p className="text-xs">🎬 {movie.director}</p>
              <p className="text-xs">⭐ {movie.rating} | ⏱ {movie.duration} hrs</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(movie)} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => handleDelete(movie._id)} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieManagement;
