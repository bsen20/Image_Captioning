import React, { useState } from "react";
import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import ImageAdd from "./ImageAdd";
import axios from "axios";
import PredictionButton from "./PredictionButton;";

function WorkingComponent({ api }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showBackground, setShowBackground] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [result, setResult] = useState(null);

  const handleImageUpload = (image) => {
    setSelectedImage(image);
    setBackgroundImage(URL.createObjectURL(image));
    setShowBackground(true);
    setResult(null);
  };

  const handlePredictClick = async () => {
    setLoading(true); // Show loading indicator when Predict button is clicked
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await axios.post(api + "/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
      setResult(response.data.caption);
      setShowBackground(false);
      // Do something with the response if needed
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    } finally {
      setLoading(false); // Hide loading indicator when API response is received
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.7)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Grid
        height={500}
        container
        spacing={6}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={2}
            height={350}
            style={{
              borderRadius: 16,
              backgroundImage:
                showBackground && backgroundImage
                  ? `url(${backgroundImage})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <ImageAdd onImageUpload={handleImageUpload} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={2}
            height={350}
            style={{
              borderRadius: 16,
              backgroundImage:
                !showBackground && backgroundImage
                  ? `url(${backgroundImage})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <PredictionButton
              disabled={!selectedImage || loading} // Disable button while loading
              onClick={handlePredictClick}
            />
          </Box>
          {result && ( // Conditionally render result if available
            <Typography
              variant="body1"
              align="center"
              //   mt={2}
              sx={{ fontSize: "1.2rem" }}
            >
              {result}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default WorkingComponent;
