import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();

  const validationSchema = Yup.object({
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      country: propertyDetails?.country || "",
      city: propertyDetails?.city || "",
      address: propertyDetails?.address || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setPropertyDetails((prev) => ({ ...prev, ...values }));
      nextStep();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" justifyContent="space-between" gap={3} mt={3} flexDirection={{ xs: "column", md: "row" }}>
        {/* Left Side - Inputs */}
        <Box display="flex" flexDirection="column" flex={1} gap={2}>
          {/* Country Select */}
          <TextField
            fullWidth
            select
            label="Country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          >
            {getAll().map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>

          {/* City Input */}
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />

          {/* Address Input */}
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Box>

        {/* Right Side - Map */}
        <Box flex={1}>
          <Map address={formik.values.address} city={formik.values.city} country={formik.values.country} />
        </Box>
      </Box>

      {/* Submit Button */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" type="submit">
          Next Step
        </Button>
      </Box>
    </form>
  );
};

export default AddLocation;
