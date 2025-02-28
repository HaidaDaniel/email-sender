import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    TablePagination,
    Container,
    Typography,
  } from "@mui/material";
  import type { EmailLog } from "@/utils/types";
  import Loader from "@/components/Loader";
  
  interface EmailTableProps {
    emails: EmailLog[];
    loading: boolean;
    page: number;
    totalCount: number;
    rowsPerPage: number;
    onPageChange: (newPage: number) => void;
  }
  
  const EmailTable = ({ emails, loading, page, totalCount, rowsPerPage, onPageChange }: EmailTableProps) => {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
          Sent Emails
        </Typography>
  
        {loading ? (
          <Loader />
        ) : (
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
                  onPageChange={(_, newPage) => onPageChange(newPage)}
                />
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Container>
    );
  };
  
  export default EmailTable;
  