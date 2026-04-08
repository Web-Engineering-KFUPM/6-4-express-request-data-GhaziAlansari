/**
===================================================================
Back-end Lab — Express request data
===================================================================

===================================================================
LAB SETUP INSTRUCTIONS
===================================================================

1. Navigate to the project directory:
   Open your terminal and run:
      cd 6-4-express-request-data

2. Install project dependencies:
   Run either of these commands:
      npm i
      OR
      npm install
      npm install express

3. Start the back-end server from terminal, path: 6-4-express-request-data-main\6-4-express-request-data:
   Run:
      node server.js

  If your system blocks running npm commands (especially on Windows PowerShell),
   run this command first to allow script execution:
      Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
**/ 

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/echo", (req, res) => {
  const { name, age } = req.query;

  if (!name || !age) {
    return res.status(400).json({
      ok: false,
      error: "name & age required",
    });
  }

  res.json({
    ok: true,
    name,
    age,
    msg: `Hello ${name}, you are ${age}`,
  });
});

app.get("/profile/:first/:last", (req, res) => {
  const { first, last } = req.params;

  res.json({
    ok: true,
    fullName: `${first} ${last}`,
  });
});

app.param("userId", (req, res, next, userId) => {
  const num = Number(userId);

  if (!num || num <= 0) {
    return res.status(400).json({
      ok: false,
      error: "userId must be positive number",
    });
  }

  req.userIdNum = num;
  next();
});

app.get("/users/:userId", (req, res) => {
  res.json({
    ok: true,
    userId: req.userIdNum,
  });
});

/* ============================================
 * Start the server
 * ============================================ */
app.listen(3000, () => {
  console.log("API running at http://localhost:3000");
});