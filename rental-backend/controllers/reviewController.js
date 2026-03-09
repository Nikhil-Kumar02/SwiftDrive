import Review from "../models/Review.js";
import Car from "../models/Car.js";

// @desc    Create new review
// @route   POST /api/reviews/:carId
// @access  Private
const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { carId } = req.params;
    const userId = req.userId;

    const car = await Car.findById(carId);

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    const alreadyReviewed = await Review.findOne({
      user: userId,
      car: carId,
    });

    if (alreadyReviewed) {
      return res.json({ success: false, message: "Car already reviewed" });
    }

    const review = await Review.create({
      user: userId,
      car: carId,
      rating: Number(rating),
      comment,
    });

    const reviews = await Review.find({ car: carId });
    car.numReviews = reviews.length;
    car.rating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await car.save();

    res.status(201).json({ success: true, message: "Review added", review });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Get all reviews for a car
// @route   GET /api/reviews/:carId
// @access  Public
const getCarReviews = async (req, res) => {
  try {
    const { carId } = req.params;
    const reviews = await Review.find({ car: carId }).sort({createdAt: -1}).populate("user", "name image");
    res.json({ success: true, reviews });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { createReview, getCarReviews };
