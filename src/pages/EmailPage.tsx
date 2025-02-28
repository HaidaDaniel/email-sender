import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography } from "@mui/material";
import EmailForm from "@/components/EmailForm";
import EmailTable from "@/components/EmailTable";
import { fetchEmails, setPage } from "@/store/slices/emailSlice";
import type { RootState, AppDispatch } from "@/store";
import Profile from "@/components/Profile";

const EmailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { emails, loading, page, totalCount, rowsPerPage } = useSelector((state: RootState) => state.emails);

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch, page]);

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Email App
      </Typography>
      <Profile />
      <EmailForm />
      <EmailTable
        emails={emails}
        loading={loading}
        page={page}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        onPageChange={(newPage) => dispatch(setPage(newPage))}
      />
    </Container>
  );
};

export default EmailPage;
