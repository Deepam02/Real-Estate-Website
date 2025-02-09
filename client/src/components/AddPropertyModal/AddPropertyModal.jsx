import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";

const steps = [
  { label: "Location", description: "Enter the property's address and city details." },
  { label: "Images", description: "Upload high-quality images of your property." },
  { label: "Basics", description: "Fill in essential property details like price and description." },
  { label: "Facilities", description: "Mention the available amenities like parking, bedrooms, etc." }
];

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [propertyDetails, setPropertyDetails] = useState({
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

  const nextStep = () => setActive((current) => Math.min(current + 1, steps.length - 1));
  const prevStep = () => setActive((current) => Math.max(current - 1, 0));

  return (
    <Dialog open={opened} onClose={() => setOpened(false)} fullWidth maxWidth="md">
      {/* Modal Title */}
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold" align="center">
          Add Your Property
        </Typography>
      </DialogTitle>

      <DialogContent>
        {/* Stepper UI */}
        <Box sx={{ width: "100%", mb: 3 }}>
          <Stepper activeStep={active} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Description */}
        <Typography variant="subtitle1" align="center" color="textSecondary" sx={{ mb: 2 }}>
          {steps[active].description}
        </Typography>

        {/* Divider for better layout */}
        <Divider sx={{ mb: 3 }} />

        {/* Animated Content Switching */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {active === 0 && (
            <AddLocation
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          )}
          {active === 1 && (
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          )}
          {active === 2 && (
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          )}
          {active === 3 && (
            <Facilities
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setOpened}
              setActiveStep={setActive}
            />
          )}
        </Box>

        {/* Progress Indicator */}
        <Typography variant="body2" align="center" color="textSecondary" sx={{ mt: 2 }}>
          Step {active + 1} of {steps.length}
        </Typography>

        
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyModal;