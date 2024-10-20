// components/Test.js
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { Box, Typography } from "@mui/material"; // Import Typography for text styling
import { useRouter } from 'next/router'; // Import useRouter from Next.js

export default function Test() {
  const router = useRouter(); // Initialize the router
  const [fade, setFade] = useState(false); // State for fade effect
  const [displayedTextIndex, setDisplayedTextIndex] = useState(0); // Index for the displayed text

  // Array of texts to display
  const texts = [
    "เยี่ยม คุณเห็นเหมือนผมแล้วใช่ไหม",
    "งั้นเรามาเริ่มกันเลย"
  ];

  // Function to handle navigation to Page4
  const handleGoToPage4 = () => {
    router.push('/page4'); // Navigate to Page4
  };

  // Effect to handle the timing of text display
  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true); // Start fade out
      const nextIndex = displayedTextIndex + 1;
      setTimeout(() => {
        if (nextIndex < texts.length) {
          setDisplayedTextIndex(nextIndex); // Move to the next text
          setFade(false); // Reset fade for the next text
        } else {
          // If the last text has been displayed, go to Page4
          handleGoToPage4();
        }
      }, 500); // Delay for fade out effect (0.5 seconds)
    }, 2000); // Delay of 2 seconds between texts

    // Cleanup timer if the component unmounts or if the text index changes
    return () => clearTimeout(timer); 
  }, [displayedTextIndex, texts.length]);

  return (
    <Box 
      onClick={handleGoToPage4} 
      sx={{ 
        cursor: 'pointer', 
        textAlign: 'center',
        height: '100vh', // Full height of the viewport
        backgroundImage: 'url("/image/BG2.png")', // Corrected image path
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white', // Optional fallback color to check if the background applies

        // Flexbox styles for centering the text
        display: 'flex', 
        justifyContent: 'center', // Center horizontally
        alignItems: 'center',     // Center vertically
        flexDirection: 'column',  // Stack the text vertically
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          fontFamily: 'FC Knomphing Regular, Noto Sans Thai, sans-serif', // Use your desired font
          color: 'black', 
          fontWeight: 'normal',
          opacity: fade ? 0 : 1, // Change opacity for fade effect
          transition: 'opacity 0.5s ease-in-out', // Smooth transition effect
          mb: 2, // Margin bottom for spacing
        }}
      >
        {texts[displayedTextIndex]} {/* Display text based on the index */}
      </Typography>
    </Box>
  );
}
