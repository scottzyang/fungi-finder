import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forageName: "",
  journalEntry: "",
  total: "",
  weatherConditions: "",
  parsedData: [],
  savingData: false,
};

export const fungiSlice = createSlice({
  name: "fungi",
  initialState,
  reducers: {
    toggleSavingData: (state) => {
      state.savingData = !state.savingData;
    },
    updateParsedData: (state, action) => {
      state.parsedData = action.payload;
    },
    updateForageName: (state, action) => {
      state.forageName = action.payload;
    },
    updateJournalEntry: (state, action) => {
      state.journalEntry = action.payload;
    },
    updateTotal: (state, action) => {
      state.total = action.payload;
    },
    updateWeatherConditions: (state, action) => {
      state.weatherConditions = action.payload;
    },
  },
});

// export reducer
export default fungiSlice.reducer;

// export actions
export const {
  toggleSavingData,
  updateForageName,
  updateJournalEntry,
  updateParsedData,
  updateTotal,
  updateWeatherConditions,
} = fungiSlice.actions;

// export selectors
export const selectForageName = (state) => state.fungi.forageName;
export const selectJournalEntry = (state) => state.fungi.journalEntry;
export const selectTotal = (state) => state.fungi.total;
export const selectWeatherConditions = (state) => state.fungi.weatherConditions;
export const selectParsedData = (state) => state.fungi.parsedData;
export const selectSavingData = (state) => state.fungi.savingData;
