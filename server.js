const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_URI, credentials: true }));

// Define a route handler for the default home page
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Define routes
const taskRoutes = require("./routes/tasks");
app.use(taskRoutes);

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
