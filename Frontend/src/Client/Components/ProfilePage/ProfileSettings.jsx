import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ProfilePicture from "./ProfilePicture.jsx";
import { useRef } from "react";
import { changeProfilePicture, changeProfileDescription } from "../../lib/User.js";
import { useState } from 'react';

function ProfileSettings({ pfp, currentDescription }) {
  const inputFile = useRef(undefined);
  const [error, setError] = useState(undefined);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [profileImageSource, setProfileImage] = useState(pfp);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = React.useState(currentDescription);

  const handleDescriptionChange = (event) => {
    let newDescription = event.target.value;
    let descriptionLength = newDescription.length;
    if (descriptionLength > 75) { return; }

    setDescription(newDescription);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (selectedFile !== undefined) {
      const formData = new FormData();
      formData.append("uploaded_file", selectedFile);

      changeProfilePicture(formData)
        .then(() => {
          window.location.reload(false);

        })
        .catch((error) => {
          setError(error.message);
        });
    };

    const newDescription = description;

    if (description !== currentDescription) {
      changeProfileDescription({ Description: newDescription })
        .then(() => {
          if ((selectedFile === undefined)) {
            window.location.reload(false);
          }
        }).catch((error) => {
          setError(error.message);
        });
    }

    setOpen(false);
  };

  const handleCancel = () => {
    setProfileImage(pfp);
    setOpen(false);
  };

  const uploadFile = () => {
    inputFile.current.click();
  };

  const handleChange = (e) => {
    const UploadedFile = e.target.files[0];
    if (
      UploadedFile.type !== "image/jpeg" &&
      UploadedFile.type !== "image/png"
    ) {
      return;
    } // Somehow error for the user that its an invalid format
    setSelectedFile(UploadedFile);
    setProfileImage(URL.createObjectURL(UploadedFile));
  };

  return (
    <div>
      <Button type="submit" onClick={handleClickOpen} disableRipple variant="text" sx={{
        maxWidth: '9em',
        color: "white",
        backgroundColor: "#3877c7",
        fontWeight: 'bold',
        bottom: '0.5em',
        right: '1em',
        float: 'right',
        '&:hover': {
          backgroundColor: "#26528a"
        }
      }}>
        Edit Profile {/* TODO: MAKE THIS INTO TOPOGRAPHY */}
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth='md' sx={{
        textAlign: 'center',
      }}>
        <DialogTitle>Change Icon</DialogTitle>

        <DialogContent>
          <ProfilePicture borderRadius="50%" width="9em" height="9em" imgsrc={profileImageSource} />
          <Button onClick={uploadFile}>Change Image</Button>
          <input name="avatar" onChange={handleChange} type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
        </DialogContent>

        <DialogTitle>Change Description</DialogTitle>

        <DialogContent>
          <TextField
            sx={{
              width: '23em'
            }}
            id="outlined-multiline-flexible"
            placeholder="Max 75 chars..."
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileSettings;
