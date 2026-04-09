const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/leadsDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema
const LeadSchema = new mongoose.Schema({
  name: String,
  email: String
});

const Lead = mongoose.model("Lead", LeadSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/lead", async (req, res) => {
  const data = req.body;

  const newLead = new Lead(data);
  await newLead.save();

  console.log("Saved Lead:", data);

  res.json({
    message: "Lead saved successfully",
    data
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});