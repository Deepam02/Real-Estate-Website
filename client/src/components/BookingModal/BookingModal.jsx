import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext.js";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", { position: "bottom-right" });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response?.data?.message || "Error"),
    onSettled: () => setOpened(false),
  });

  return (
    <Dialog open={opened} onClose={() => setOpened(false)} fullWidth maxWidth="sm">
      <DialogTitle>Select your date of visit</DialogTitle>
      <DialogContent>
        <div className="flexColCenter" style={{ gap: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={value}
              onChange={setValue}
              disablePast
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpened(false)} color="secondary">
          Cancel
        </Button>
        <Button disabled={!value || isLoading} onClick={() => mutate()} variant="contained" color="primary">
          Book Visit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
