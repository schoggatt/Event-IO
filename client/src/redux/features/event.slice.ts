import { Event } from "@/app/shared/models/event";
import EventService from "@/app/shared/services/events/event.service";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { ResponseStatus } from "../models/response-status";
import { UserEvent } from "@/app/shared/models/user-event";
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

export const createEvent = createAsyncThunk(
  "events/create",
  async (event: Event) => {
    return await eventService.createEvent(event);
  }
);

export const updateEvent = createAsyncThunk(
  "events/update",
  async (event: Event) => {
    return await eventService.updateEvent(event);
  }
);

export const getEvents = createAsyncThunk("events/get", async () => {
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
      .addCase(createEvent.pending, (state, action) => {
        state.value.status = ResponseStatus.LOADING;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.value.status = ResponseStatus.SUCCEEDED;
        state.value.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.value.status = ResponseStatus.FAILED;
        state.value.error = action.error.message;
      });

    builder
      .addCase(updateEvent.pending, (state, action) => {
        state.value.status = ResponseStatus.LOADING;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const oldEvent = state.value.events.find(
          (event) => event.id === action.payload.id
        )!;
        oldEvent.name = action.payload.name;
        oldEvent.description = action.payload.description;
        oldEvent.location = action.payload.location;
        oldEvent.startDate = action.payload.startDate;
        oldEvent.endDate = action.payload.endDate;

        state.value.status = ResponseStatus.SUCCEEDED;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.value.status = ResponseStatus.FAILED;
        state.value.error = action.error.message;
      });

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

export const eventSliceState = (state: RootState) => state.eventReducer.value;

export const eventsState = (state: RootState) =>
  state.eventReducer.value.events;

export const selectEventsByUserId = createSelector(
  [eventsState, (state: RootState) => state.authReducer.value.user],
  (events, user) => {
    if (!user) return [];
    return events.filter(
      (event) =>
        event.userEvents.some((userEvent) => userEvent.userId === user.id) ||
        event.owner.id === user.id
    );
  }
);

export const selectEventById = (state: EventState, eventId: number) =>
  state.events.find((event) => event.id === eventId);

export const { setEvents } = event.actions;
export default event.reducer;
