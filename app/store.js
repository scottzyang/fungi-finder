import { configureStore } from "@reduxjs/toolkit";
import fungiReducer from "../features/fungiSlice";

export default configureStore({
  reducer: {
    fungi: fungiReducer,
  },
});
