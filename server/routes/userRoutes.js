import express from "express";
import { addFavourite, allBookings, allFavourites, bookVisit, cancelBooking, createUser } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register",createUser);
router.post("/bookvisit/:id",bookVisit);
router.post("/allbookings",allBookings);
router.post("/cancelbooking/:id",cancelBooking);
router.post("/addfavourite/:rid",addFavourite);
router.post("/allfavourites",allFavourites);

export {router as userRoute}