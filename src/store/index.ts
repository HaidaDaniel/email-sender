import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import emailReducer from "./slices/emailSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    emails: emailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;