import React, { useState } from "react";
import { TextField, Container, Stack, Button } from "@mui/material";
import { validateString } from "../../utils/common";

const BasicDetails = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [formValues, setFormValues] = useState({
    title: propertyDetails.title || "",
    description: propertyDetails.description || "",
    price: propertyDetails.price || "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
  });

  const validateForm = () => {
    let newErrors = {};
    newErrors.title = validateString(formValues.title);
    newErrors.description = validateString(formValues.description);
    newErrors.price =
      formValues.price < 1000 ? "Must be greater than 999 dollars" : "";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setPropertyDetails((prev) => ({
        ...prev,
        ...formValues,
        price: Number(formValues.price), 
      }));
      nextStep();
    }
  };
  

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            required
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            required
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formValues.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            fullWidth
            required
            label="Price"
            name="price"
            type="number"
            inputProps={{ min: 1000 }}
            value={formValues.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
          />
          <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
            <Button variant="outlined" onClick={prevStep}>
              Back
            </Button>
            <Button type="submit" variant="contained">
              Next Step
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default BasicDetails;
