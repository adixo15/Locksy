import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/locksy")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema & model
const passwordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
});
const Password = mongoose.model("Password", passwordSchema);

// GET all passwords
app.get("/passwords", async (req, res) => {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new password
app.post("/passwords", async (req, res) => {
  try {
    const { site, username, password } = req.body;
    const newPass = new Password({ site, username, password });
    await newPass.save();
    res.status(201).json(newPass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (edit) password
app.put("/passwords/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updated = await Password.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Password not found" });

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE password
app.delete("/passwords/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deleted = await Password.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Password not found" });

    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
