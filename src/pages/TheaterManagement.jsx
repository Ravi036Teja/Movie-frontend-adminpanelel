import React, { useEffect, useState } from "react";
import axios from "axios";

const TheaterManagement = () => {
  const [theaters, setTheaters] = useState([]);
  const [form, setForm] = useState({ name: "", location: "" });
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchTheaters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/theaters");
      setTheaters(res.data);
    } catch (error) {
      console.error("Error fetching theaters:", error.message);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.location) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      name: form.name,
      location: form.location,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/theaters/${editId}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/theaters", payload);
      }
      setForm({ name: "", location: "" });
      setEditId(null);
      setOpen(false);
      fetchTheaters();
    } catch (error) {
      console.error("❌ Error submitting form:", error.response?.data || error.message);
      alert("Failed to submit. Please check console for details.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/theaters/${id}`);
      fetchTheaters();
    } catch (error) {
      console.error("Error deleting theater:", error.message);
    }
  };

  const handleEdit = (theater) => {
    setForm({
      name: theater.name,
      location: theater.location,
    });
    setEditId(theater._id);
    setOpen(true);
  };

  return (
    <div className="p-6 ml-60">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Theater Management</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setForm({ name: "", location: "" });
            setEditId(null);
            setOpen(true);
          }}
        >
          Add Theater
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {theaters.map((theater) => (
          <div key={theater._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{theater.name}</h3>
            <p>{theater.location}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(theater)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(theater._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">{editId ? "Edit" : "Add"} Theater</h2>
            <input
              name="name"
              placeholder="Theater Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setOpen(false);
                  setForm({ name: "", location: "" });
                  setEditId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheaterManagement;
