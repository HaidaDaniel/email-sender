import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",  minHeight: "100vh" }}>
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;