import React from 'react'
import ProfilePicture from "./ProfilePicture.jsx";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const defaultPFP = "https://scontent-sea1-1.xx.fbcdn.net/v/t1.6435-9/147824759_10223237187693647_1737574394523222372_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=eiASr3lapI0AX8ektVE&_nc_ht=scontent-sea1-1.xx&oh=00_AT9StO6MoAAE7OKqm4xwwHoI4pVRusVWKEx7IuZ65UcOtQ&oe=62E33D23"

function ProfileFriend() {
  return (
    <Container disableGutters sx={{
        textAlign: 'center'
    }}>
      {/* pfp */}
      <ProfilePicture borderRadius="0px" width="5em" height="5em" imgsrc={defaultPFP}  />
      
      {/* Name */}
      <Typography variant='caption' sx={{
        fontFamily: 'Arial',
        color: '#ffffff'
      }}>
        Ethan Ferrabelo
      </Typography>
    </Container>
  )
}

export default ProfileFriend