import { Event } from "@/app/shared/models/event";
import EventService from "@/app/shared/services/events/event.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseStatus } from "../models/response-status";
import { UserEvent } from "@/app/shared/models/user-event";

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

export const addAttendee = createAsyncThunk(
  "add/attendee",
  async (userEvent: UserEvent) => {
    return await eventService.addAttendee(userEvent);
  }
);

export const removeAttendee = createAsyncThunk(
  "remove/attendee",
  async (userEventId: number) => {
    return await eventService.removeAttendee(userEventId);
  }
);

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

    builder
      .addCase(addAttendee.pending, (state, action) => {
        state.value.status = ResponseStatus.LOADING;
      })
      .addCase(addAttendee.fulfilled, (state, action) => {
        state.value.status = ResponseStatus.SUCCEEDED;
        const oldEvent = state.value.events.find(
          (event) => event.id === action.payload.id
        )!;
        oldEvent.userEvents = action.payload.userEvents;
      })
      .addCase(addAttendee.rejected, (state, action) => {
        state.value.status = ResponseStatus.FAILED;
        state.value.error = action.error.message;
      });

    builder
      .addCase(removeAttendee.pending, (state, action) => {
        state.value.status = ResponseStatus.LOADING;
      })
      .addCase(removeAttendee.fulfilled, (state, action) => {
        state.value.status = ResponseStatus.SUCCEEDED;
        const oldEvent = state.value.events.find(
          (event) => event.id === action.payload.id
        )!;
        oldEvent.userEvents = action.payload.userEvents;
      })
      .addCase(removeAttendee.rejected, (state, action) => {
        state.value.status = ResponseStatus.FAILED;
        state.value.error = action.error.message;
      });
  },
});

// TODO: This is probably incorrect?
export const selectEventsByUserId = (state: EventState, userId: number) =>
  state.events.filter((event) =>
    event.userEvents.some((userEvent) => userEvent.userId === userId)
  );

export const selectEventById = (state: EventState, eventId: number) =>
  state.events.find((event) => event.id === eventId);

export const { setEvents } = event.actions;
export default event.reducer;
