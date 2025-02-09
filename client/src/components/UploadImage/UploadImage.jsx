import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Box, Stack } from "@mui/material";
import "./UploadImage.css";

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dojlxd6gy",
        uploadPreset: "hafnwui0",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  return (
    <Box className="uploadWrapper" display="flex" flexDirection="column" alignItems="center">
      {!imageURL ? (
        <Box
          className="uploadZone"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          onClick={() => widgetRef.current?.open()}
          sx={{
            width: "200px",
            height: "200px",
            border: "2px dashed grey",
            borderRadius: "10px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </Box>
      ) : (
        <Box
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
          sx={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <img src={imageURL} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
      )}

      {/* Buttons */}
      <Stack direction="row" spacing={2} mt={3} justifyContent="center">
        <Button variant="outlined" onClick={prevStep}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default UploadImage;
