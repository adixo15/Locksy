import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API = "http://localhost:5000/passwords";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwords, setPasswords] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const savePassword = async () => {
    try {
      if (editId) {
        const res = await axios.put(`${API}/${editId}`, form);
        setPasswords(passwords.map((p) => (p._id === editId ? res.data : p)));
        toast.success("Password updated successfully!");
        setEditId(null);
      } else {
        const res = await axios.post(API, form);
        setPasswords([...passwords, res.data]);
        toast.success("Password added successfully!");
      }
      setForm({ site: "", username: "", password: "" });
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
      toast.error("Failed to save password");
    }
  };

  const fetchPasswords = async () => {
    try {
      const res = await axios.get(API);
      setPasswords(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const deletePassword = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this password?")) return;
      await axios.delete(`${API}/${id}`);
      setPasswords(passwords.filter((p) => p._id !== id));
      toast.success("Password deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      toast.error("Failed to delete password");
    }
  };

  const startEditing = (password) => {
    setForm({ site: password.site, username: password.username, password: password.password });
    setEditId(password._id);
  };

  useEffect(() => { fetchPasswords(); }, []);

  return (
    <div className="flex flex-col items-center justify-start pt-16 bg-green-50 px-4 min-h-[70vh]">
      <Toaster position="top-right" />

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700 mb-2 text-center">
        &lt;LOCK<span className="text-black">SY</span>/&gt;
      </h1>
      <p className="text-gray-600 mb-6 text-sm sm:text-base text-center">
        Your own Password Manager
      </p>

      {/* Form */}
      <div className="w-full max-w-xl space-y-4">
        <input
          type="text"
          value={form.site}
          onChange={handleChange}
          placeholder="Enter website URL"
          name="site"
          className="w-full px-4 py-3 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-gray-800 placeholder-gray-400"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={form.username}
            onChange={handleChange}
            name="username"
            placeholder="Enter Username"
            className="flex-1 px-4 py-3 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-gray-800 placeholder-gray-400"
          />
          <div className="flex-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={form.password}
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-gray-800 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          onClick={savePassword}
          className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 rounded-full transition-all duration-300"
        >
          {editId ? "Update Password" : "Add Password"}
        </button>
      </div>

      {/* Passwords */}
      <div className="w-full max-w-4xl mt-10">
        <div className="text-xl sm:text-2xl font-semibold my-2 text-green-700">
          Your Passwords:
        </div>

        {/* Desktop/Table view */}
<div className="hidden sm:block overflow-x-auto w-full">
  <table className="bg-white border border-green-200 rounded-lg overflow-hidden min-w-[600px] sm:min-w-[800px] md:min-w-[1000px]">
    <thead className="bg-green-600 text-white text-sm sm:text-base">
      <tr>
        <th className="py-2 px-3 text-left">Site</th>
        <th className="py-2 px-3 text-left">Username</th>
        <th className="py-2 px-3 text-left">Password</th>
        <th className="py-2 px-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {passwords.length === 0 ? (
        <tr>
          <td colSpan="4" className="py-4 text-center text-gray-500">
            No passwords yet
          </td>
        </tr>
      ) : (
        passwords.map((p) => (
          <tr key={p._id} className="border-t border-green-100 text-sm sm:text-base">
            <td className="py-2 px-3 whitespace-nowrap">{p.site}</td>
            <td className="py-2 px-3 whitespace-nowrap">{p.username}</td>
            <td className="py-2 px-3 whitespace-nowrap">{p.password}</td>
            <td className="py-2 px-3 flex gap-2">
              <button onClick={() => startEditing(p)} className="text-blue-500 hover:text-blue-700">
                ✏️
              </button>
              <button onClick={() => deletePassword(p._id)} className="text-red-500 hover:text-red-700">
                🗑️
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


        {/* Mobile/Card view */}
        <div className="sm:hidden flex flex-col gap-4">
          {passwords.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No passwords yet</div>
          ) : (
            passwords.map((p) => (
              <div key={p._id} className="bg-white rounded-lg shadow-md p-4 border border-green-200 flex flex-col gap-2">
                <div><span className="font-semibold text-green-700">Site:</span> {p.site}</div>
                <div><span className="font-semibold text-green-700">Username:</span> {p.username}</div>
                <div><span className="font-semibold text-green-700">Password:</span> {p.password}</div>
                <div className="flex gap-4 mt-2">
                  <button onClick={() => startEditing(p)} className="text-blue-500 hover:text-blue-700">✏️ Edit</button>
                  <button onClick={() => deletePassword(p._id)} className="text-red-500 hover:text-red-700">🗑️ Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
