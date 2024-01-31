import { Event } from "@/app/shared/models/event";
import EventService from "@/app/shared/services/events/event.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create } from "domain";
import { ResponseStatus } from "../models/response-status";
import { RootState } from "../store";

type EventState = {
  events: Event[];
  status: ResponseStatus;
  error?: string | null;
};

type InitialState = {
  value: EventState;
};

const initialState: InitialState = {
  value: {
    events: [],
    status: ResponseStatus.IDLE,
    error: null,
  },
};

const eventService = new EventService();

export const getEvents = createAsyncThunk("events/", async () => {
  return await eventService.getEvents();
});

export const event = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.value.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state, action) => {
        state.value.status = ResponseStatus.LOADING;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.value.status = ResponseStatus.SUCCEEDED;
        state.value.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.value.status = ResponseStatus.FAILED;
        state.value.error = action.error.message;
      });
  },
});

export const selectEventById = (state: EventState, eventId: number) =>
  state.events.find((event) => event.id === eventId);

export const { setEvents } = event.actions;
export default event.reducer;
