const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

async function readMoviesData() {
  const filePath = path.join(__dirname, "movies_metadata.json");
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    throw err;
  }
}

// A mock route to return some data.
app.get("/api/movies", async (req, res) => {
  console.log("Received GET request to /api/movies");
  try {
    const movies = await readMoviesData();
    res.json({ data: movies });
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
    res.status(500).json({ error: "Invalid JSON format" });
  }
});
// Route to get a single movie by ID
app.get("/api/movies/:id", async (req, res) => {
  console.log("❇️ Received GET request to /api/movies/:id");

  const { id } = req.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.status(400).json({ error: "Invalid movie ID format" });
  }

  try {
    const movies = await readMoviesData();

    if (!Array.isArray(movies)) {
      throw new Error("Movies data is not an array");
    }

    const movie = movies.find((m) => m.id === numericId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    console.log(movie);
    res.json({ data: movie });
  } catch (err) {
    console.error("Error reading movies:", err.message || err);
    res.status(500).json({ error: "Failed to read movies file" });
  }
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
