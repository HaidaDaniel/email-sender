import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import type { SendEmail, SendEmailForm } from "@/utils/types";
import type { RootState } from "@/store";
import { emailSchema } from "@/utils/authValidation";
import { sendEmail } from "@/utils/api";
import QuillEditor from "@/components/QuillEditor";

const EmailForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SendEmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const { id } = useSelector((state: RootState) => state.auth);

  const messageValue = watch("message", "");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = async (data: SendEmailForm) => {
    const dataToSend: SendEmail = {
      ...data,
      sender: id,
      message: data.message,
    };

    try {
      await sendEmail(dataToSend);
      setOpenSnackbar(true);
      reset();
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5">Send an Email</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("recipient")}
          label="Recipient"
          fullWidth
          margin="normal"
          error={!!errors.recipient}
          helperText={errors.recipient?.message}
        />

        <TextField
          {...register("subject")}
          label="Subject"
          fullWidth
          margin="normal"
          error={!!errors.subject}
          helperText={errors.subject?.message}
        />

        <QuillEditor
          value={messageValue}
          onChange={(content) => setValue("message", content)}
        />

        {errors.message && (
          <Typography color="error">{errors.message.message}</Typography>
        )}

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Send Email
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Email sent successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmailForm;
