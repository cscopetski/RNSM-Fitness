import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PageLoadingMinHeight } from "../lib/Loading";

const InternalServerError = () => {
  return (
    <>
      <Container sx={{
        minHeight: PageLoadingMinHeight
      }}>
        <CssBaseline />

        <Typography variant="h1">500</Typography>
        <Typography variant="h1">An internal server error has occured, WE'RE SORRY OH GOD WE'RE SORRY</Typography>
      </Container>
    </>
  );
};

export default InternalServerError;
