import User from "../models/User.js";

// @desc    Toggle wishlist car
// @route   POST /api/user/wishlist/toggle
// @access  Private
const toggleWishlist = async (req, res) => {
  try {
    const { carId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);

    const isWishlisted = user.wishlist.includes(carId);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== carId);
    } else {
      user.wishlist.push(carId);
    }

    await user.save();
    res.json({ success: true, message: isWishlisted ? "Removed from wishlist" : "Added to wishlist" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Get user wishlist
// @route   GET /api/user/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("wishlist");
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { toggleWishlist, getWishlist };
