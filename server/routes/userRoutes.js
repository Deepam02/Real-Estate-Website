import express from "express";
import { addFavourite, allBookings, allFavourites, bookVisit, cancelBooking, createUser } from "../controllers/userControllers.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register",jwtCheck,createUser);
router.post("/bookvisit/:id",jwtCheck,bookVisit);
router.post("/allbookings",allBookings);
router.post("/cancelbooking/:id",jwtCheck,cancelBooking);
router.post("/addfavourite/:rid",jwtCheck,addFavourite);
router.post("/allfavourites/",jwtCheck,allFavourites);

export {router as userRoute}