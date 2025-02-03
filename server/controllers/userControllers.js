import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User created successfully",
      user: user,
    });
  } else {
    res.status(201).send({
      message: "User already exists",
    });
  }
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;
  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({
          message: "You have already booked a visit for this residency",
        });
    } else {
        await prisma.user.update({
            where:{email:email},
            data:{
                bookedVisits:{push:{id,date}}
            }
        })
        res.send("Visit booked successfully")
    }
  } catch (err) {
    throw new Error(err);
  }
});

export const allBookings = asyncHandler(async(req,res)=>{
    const  {email} = req.body;
    try {
        const bookings = await prisma.user.findUnique({
            where:{email},
            select:{bookedVisits:true}
        })
        res.status(200).send(bookings);
    } catch (err) {
        throw new Error(err);
    }
})

export const cancelBooking = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {id} = req.params;
    try {
        const user = await prisma.user.findUnique({
            where:{email},
            select:{bookedVisits:true}
        })
        const index = user.bookedVisits.findIndex(visit=>visit.id===id);
        if(index===-1){
            res.status(404).json({message:"booking not found"})
        }
        else{
            user.bookedVisits.splice(index,1);
            await prisma.user.update({
                where:{email},
                data:{
                    bookedVisits:user.bookedVisits
                }
            })
            res.send("Booking cancelled successfully")
        }
    } catch (err) {
        throw new Error(err);        
    }
})

export const addFavourite = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {rid} = req.params;
    try {
        const user = await prisma.user.findUnique({
            where:{email},
        })
        if(user.favResidenciesID.includes(rid)){
            const updatedUser = await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesID:{
                        set: user.favResidenciesID.filter((id)=>id!==rid)
                    }
                }
            });
            res.send({message:"Residency removed from favourites",user:updatedUser})
        }
        else{
            const updatedUser = await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesID:{
                        push:rid,
                    },
                },
            })
            res.status(200).send({message:"Residency added to favourites",user:updatedUser});
        }

    } catch (err) {
        throw new Error(err.message);
    }
})

export const allFavourites = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    try {
        const favourites = await prisma.user.findUnique({
            where:{email},
            select:{favResidenciesID:true}
        })
        res.status(200).send(favourites);
    } catch (err) {
        throw new Error(err.message);
    }
})