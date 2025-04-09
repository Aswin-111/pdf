const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/preview", express.static(path.join(__dirname, "public")));

// Upload route
app.post("/upload", upload.single("pdf"), (req, res) => {
  const filename = req.file.filename;
  const previewUrl = `http://ezbiz.co.in/page3/preview/viewer.html?file=${filename}`;
  res.json({ success: true, previewUrl });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit the process if the server fails to start
  }
  console.log("Server started on port 5000");
});
