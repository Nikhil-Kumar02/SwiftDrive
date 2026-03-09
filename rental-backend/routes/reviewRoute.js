import express from "express";
import { createReview, getCarReviews } from "../controllers/reviewController.js";
import authUser from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.get("/:carId", getCarReviews);
reviewRouter.post("/:carId", authUser, createReview);

export default reviewRouter;
