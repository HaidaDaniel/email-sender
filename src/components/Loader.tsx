import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="20vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
