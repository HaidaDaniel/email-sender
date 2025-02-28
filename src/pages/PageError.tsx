import { Container, Typography, Button, Box } from "@mui/material";

interface PageErrorProps {
  onRetry?: () => void;
}

const PageError = ({ onRetry }: PageErrorProps) => {
    const reloadPage = () => {
        location.reload();
      };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          mt: 5,
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          An unexpected error occurred. Please try again later.
        </Typography>

        {onRetry && (
          <Button variant="contained" color="primary" onClick={reloadPage}>
            Try Again
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default PageError;
