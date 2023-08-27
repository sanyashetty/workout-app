import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const response = await axios.get(process.env.ZEN_QUOTES_API_URL);
		res.json(response.data[0].q);
	} catch (error) {
		console.error("Error:", error);
		res
			.status(error.response ? error.response.status : 500)
			.json({ message: "Internal Server Error" });
	}
});

export default router;
