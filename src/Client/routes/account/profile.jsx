import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Loading from "../../Components/Loading";
import NotFound from "../../routes/NotFound";
import InternalServerError from "../../routes/InternalServerError";
import ProfileHeader from "../../Components/ProfilePage/ProfileHeader.jsx";
import AboutMe from "../../Components/ProfilePage/AboutMe.jsx";
import Friends from "../../Components/ProfilePage/Friends.jsx";
import ProfileSettings from "../../Components/ProfilePage/ProfileSettings.jsx";
import { PageLoadingMinHeight } from "../../lib/Loading";
import { getProfile } from "../../lib/User.js";

const AccountProfile = ({ token }) => {
  const [error, setError] = useState(undefined);
  const [profile, setProfile] = useState(undefined);

  const { userId = "undefined" } = useParams();

  useEffect(() => {
    getProfile(userId)
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.log(err);
        setProfile(false);
      });
  }, []);

  if (error === 404) {
    return <NotFound />;
  } else if (error === 500) {
    return <InternalServerError />;
  }

  if (profile === undefined) {
    return (
      <>
        <Loading minHeight={"1000px"} />
      </>
    );
  }

  return (
    <div style={{ backgroundColor: "#F8F7FF" }}>
      {/* Imports default styles and looks */}
      <CssBaseline />

      <main>
        <div>
          {/* Main Container */}
          <Container
            disableGutters
            maxWidth="false"
            sx={{
              bgcolor: "primary.light",
              boxShadow: 12,
              minHeight: PageLoadingMinHeight
            }}
          >
            {/* Header */}
            <ProfileHeader
              token={token}
              profileId={parseInt(userId)}
              joined={profile.joined}
              firstName={profile.firstname}
              lastName={profile.lastname}
              description={profile.description}
              pfpImage={process.env.CLOUDFRONT_URL + profile.icon}
            />

            {/* Profile Content */}
            <Container
              maxWidth="false"
              disableGutters
              sx={{
                bgcolor: "primary.light",
              }}
            >
              <Container
                disableGutters
                maxWidth="lg"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingTop: "1em",
                }}
              >
                {/* Left Content (Friends, About Me) */}
                <Container
                  maxWidth="xs"
                  sx={{
                    margin: "0.4em",
                  }}
                >
                  {/* About Me */}
                  <AboutMe dob={profile.dob} description={profile.description} />

                  {/* Friends */}
                  {/* <Friends friends={profile.friends} /> */}
                </Container>
              </Container>
            </Container>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default AccountProfile;
