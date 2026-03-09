import express from "express"
import { getCars, getUserData, loginUser, registerUser } from "../controllers/userController.js";
import { getWishlist, toggleWishlist } from "../controllers/wishlistController.js";
import {protect} from "../middleware/auth.js"

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUserData)
userRouter.get('/wishlist', protect, getWishlist)
userRouter.post('/wishlist/toggle', protect, toggleWishlist)
userRouter.get('/cars', getCars)

export default userRouter;