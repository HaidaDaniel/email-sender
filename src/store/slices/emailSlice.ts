import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmails, sendEmail } from "@/utils/api";
import type { EmailLog, SendEmail } from "@/utils/types";

interface EmailState {
  emails: EmailLog[];
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;
  totalCount: number;
}

const initialState: EmailState = {
  emails: [],
  loading: false,
  error: null,
  page: 0,
  rowsPerPage: 2,
  totalCount: 0,
};

// 🔹 Запрос на получение email'ов с учетом пагинации
export const fetchEmails = createAsyncThunk("emails/fetchEmails", async (_, { getState }) => {
  const state = getState() as { emails: EmailState };
  const { page, rowsPerPage } = state.emails;
  const offset = page * rowsPerPage;

  const response = await getEmails(rowsPerPage, offset);
  return { results: response.results, count: response.count };
});

// 🔹 Запрос на отправку email
export const sendEmailAction = createAsyncThunk("emails/sendEmail", async (emailData: SendEmail, { dispatch }) => {
  await sendEmail(emailData);
  dispatch(fetchEmails());
});

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.emails = action.payload.results;
        state.totalCount = action.payload.count;
        state.loading = false;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch emails";
      });
  },
});

export const { setPage } = emailSlice.actions;
export default emailSlice.reducer;
