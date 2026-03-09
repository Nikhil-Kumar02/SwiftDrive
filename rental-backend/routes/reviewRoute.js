import express from "express";
import { createReview, getCarReviews } from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.get("/:carId", getCarReviews);
reviewRouter.post("/:carId", protect, createReview);

export default reviewRouter;
