import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Typography,
  TableFooter,
  TablePagination,
  Box,
} from "@mui/material";
import type { EmailLog } from "@/utils/types";
import { getEmails } from "@/utils/api";
import Loader from "@/components/Loader";

const EmailTable = () => {
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 2;

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const offset = page * rowsPerPage;
        const response = await getEmails(rowsPerPage, offset);
        setEmails(response.results);
        setTotalCount(response.count);
      } catch (error) {
        console.error("Error fetching emails", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [page]);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Sent Emails
      </Typography>

      <Box sx={{ position: "relative", minHeight: "100px" }}>
        {loading && (
         
            <Loader />
        )}

        {!loading && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Subject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emails.length > 0 ? (
                emails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell>{email.id}</TableCell>
                    <TableCell>{email.recipient}</TableCell>
                    <TableCell>{email.subject}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No emails found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[rowsPerPage]}
                  count={totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Box>
    </Container>
  );
};

export default EmailTable;
