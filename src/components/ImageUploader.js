import React, { useState } from "react";
import { Button, styled, LinearProgress, Container } from "@mui/material";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ImageUploader() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // The selected file is an image file
      setUploading(true);
      // Simulate the upload process
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) {
          progress = 100;
          clearInterval(interval);
          setUploading(false);
        }
        setUploadProgress(progress);
      }, 500);
    } else {
      // Show an error message or handle the invalid file type
      console.log("Please select a valid image file.");
    }
  };

  return (
    <Container>
      <div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AddPhotoAlternateOutlined />}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept="image/*" // Accept only image files
          />
        </Button>
        {uploading && (
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{ marginTop: "10px" }}
          />
        )}
      </div>
    </Container>
  );
}

export default ImageUploader;
