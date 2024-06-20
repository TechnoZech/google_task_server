const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

const axios = require('axios');

router.post("/tasks", async (req, res) => {
	try {
		const { accessToken } = req.body;

		if (!accessToken) {
			return res.status(400).json({ error: "Access token is required" });
		}

		const response = await axios.get(
			"https://tasks.googleapis.com/v1/tasklists",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		const taskLists = response.data.items || [];
		console.log(taskLists)
		res.json(taskLists);
	} catch (error) {
		console.error("Error fetching task lists:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
