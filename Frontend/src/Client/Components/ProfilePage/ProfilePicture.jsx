import React from 'react'
import Box from "@mui/material/Box";

function ProfilePicture({ imgsrc, width, height, borderRadius }) {

  return (
    <Box sx={{
      width: width,
      height: height,
      margin: 'auto',
      boxShadow: 4,
      borderRadius: borderRadius,
      overflow: 'hidden'
    }}>
      <Box component="img" src={imgsrc} sx={{
        width: '100%',
      }} />
    </Box>
  )
}

export default ProfilePicture