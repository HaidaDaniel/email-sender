import { Typography } from "@mui/material";
import Profile from "@/components/Profile";
import EmailForm from "@/components/EmailForm";
import EmailTable from "@/components/EmailTable";

const EmailPage = () => {
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Email App
      </Typography>
      <Profile />
      <EmailForm />
      <EmailTable />
    </>
  );
};

export default EmailPage;
