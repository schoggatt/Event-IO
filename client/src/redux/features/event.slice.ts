import { Event } from "@/app/shared/models/event";
import { createSlice } from "@reduxjs/toolkit";

type EventState = {
  events: Event[];
};

type InitialState = {
  value: EventState;
};

const initialState: InitialState = {
  value: {
    events: [],
  },
};

export const event = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.value.events = action.payload;
    },
  },
});

export const { setEvents } = event.actions;
export default event.reducer;
