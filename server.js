const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(cors());

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
  limits: { fileSize: 100 * 1024 * 1024 },
});

const upload = multer({ storage });

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.get("/", (req, res) => {
  return res.send("Success");
});
// Upload route
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const filename = req.file.filename;
    const fileUrl = `https://ezbiz.co.in/assets/${filename}`; 

    // 🔥 Send to WhatsApp

    return res.json({ success: true, fileUrl });
  } catch (err) {
    console.error("Error uploading/sending:", err);
    res.status(500).json({ success: false, message: "Upload failed." });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit the process if the server fails to start
  }
  console.log("Server started on port 5000");
});
