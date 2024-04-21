import React from "react";
import { Button, Grid } from "@mui/material";

function PredictionButton({ disabled, onClick }) {
  const handleClick = () => {
    console.log("Predict button clicked"); // Check if the button click is detected
    if (onClick) {
      onClick(); // Trigger the onClick handler passed from the parent component
    }
  };
  return (
    <Grid item xs={6} style={{ padding: "0 10px" }}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={disabled}
        onClick={handleClick}
      >
        Predict
      </Button>
    </Grid>
  );
}

export default PredictionButton;
