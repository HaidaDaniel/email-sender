import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { username, email } = useSelector((state: RootState) => state.auth);

  return (
    <Card
      sx={{
        maxWidth: 700,
        mx: 'auto',
        mb: 3,
        textAlign: 'center',
        boxShadow: 3,
        borderRadius: 3,
        p: 2,
      }}
    >
      <CardContent
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'primary.main',
            color: 'white',
            fontSize: 24,
            mx: 'auto',
            mb: 2,
          }}
        >
          {username.charAt(0).toUpperCase()}
        </Avatar>

        <Typography variant="h5" fontWeight="bold">
          {username}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {email}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{ px: 4, fontWeight: 'bold' }}
            onClick={() => dispatch(logout())}
          >
            LOGOUT
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Profile;
