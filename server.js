import express from "express";

const app = express();
const API = "https://gps6cdg7h9.execute-api.eu-central-1.amazonaws.com/prod";

// parse JSON
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// create
app.post("/api/create", async (req, res) => {
  try {
    const r = await fetch(`${API}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// update
app.put("/api/update", async (req, res) => {
  try {

    const r = await fetch(`${API}/update?id=${req.query.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await r.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/list", async (req, res) => {
  try {
    const query = new URLSearchParams(req.query).toString();
    const r = await fetch(`${API}/list${query ? `?${query}` : ""}`);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete
app.delete("/api/delete", async (req, res) => {
  try {

    const r = await fetch(`${API}/delete?id=${req.query.id}`, {
      method: "DELETE"
    });

    const data = await r.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// start server
app.listen(3000, () => {
  console.log("Proxy running on http://localhost:3000");
});