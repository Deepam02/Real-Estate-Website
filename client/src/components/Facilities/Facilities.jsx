import { useAuth0 } from "@auth0/auth0-react";
import { Container, TextField, Button, Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const [formValues, setFormValues] = useState({
    bedrooms: propertyDetails.facilities.bedrooms || 0,
    parkings: propertyDetails.facilities.parkings || 0,
    bathrooms: propertyDetails.facilities.bathrooms || 0,
  });

  const [errors, setErrors] = useState({ bedrooms: "", bathrooms: "" });

  const validateForm = () => {
    const newErrors = {};
    newErrors.bedrooms =
      formValues.bedrooms < 1 ? "Must have at least one room" : "";
    newErrors.bathrooms =
      formValues.bathrooms < 1 ? "Must have at least one bathroom" : "";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: Number(e.target.value),
    });
  };

  // Get the logged in user from Auth0 and token from context
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  // Set up the mutation. We modify the mutationFn to accept a payload.
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => createResidency(payload, token),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSuccess: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      // Reset property details. Notice we set userEmail here too (optional)
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  // Update handleSubmit so that it attaches userEmail before mutation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Create an updated payload including the user's email
      const updatedPropertyDetails = {
        ...propertyDetails,
        facilities: { ...formValues },
        userEmail: user?.email, // Ensure this is defined!
      };

      // Optionally update state (if needed elsewhere)
      setPropertyDetails(updatedPropertyDetails);

      // Pass the updated payload to your mutation. Note: Your API expects the payload under "data".
      // If your createResidency function wraps it in { data: payload } already, that's fine.
      mutate(updatedPropertyDetails);
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            required
            label="No of Bedrooms"
            name="bedrooms"
            type="number"
            inputProps={{ min: 0 }}
            value={formValues.bedrooms}
            onChange={handleChange}
            error={!!errors.bedrooms}
            helperText={errors.bedrooms}
          />
          <TextField
            fullWidth
            label="No of Parkings"
            name="parkings"
            type="number"
            inputProps={{ min: 0 }}
            value={formValues.parkings}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            label="No of Bathrooms"
            name="bathrooms"
            type="number"
            inputProps={{ min: 0 }}
            value={formValues.bathrooms}
            onChange={handleChange}
            error={!!errors.bathrooms}
            helperText={errors.bathrooms}
          />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            mt={2}
          >
            <Button variant="outlined" onClick={prevStep}>
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Add Property"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default Facilities;
