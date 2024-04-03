import React, { useState } from "react";
import { Event } from "../models/event";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { userState } from "@/redux/features/auth.slice";
import {
  Button,
  Datepicker,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useDispatch } from "react-redux";
import { deleteEvent, updateEvent } from "@/redux/features/event.slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface IUpdateEventModalProps {
  event: Event;
  isVisible: boolean;
  toggleVisible: () => void;
}

export default function UpdateEventModal(props: IUpdateEventModalProps) {
  const [name, setName] = useState(props.event.name);
  const [location, setLocation] = useState(props.event.location);
  const [startDate, setStartDate] = useState(new Date(props.event.startDate));
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(props.event.endDate)
  );
  const [description, setDescription] = useState(props.event.description);

  const router = useRouter();

  const user = useAppSelector(userState);
  const dispatch = useDispatch<AppDispatch>();

  function updateExistingEvent() {
    const updatedEvent: Event = {
      id: props.event.id,
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate ?? startDate,
      location: location,
      createdAt: props.event.createdAt,
      updatedAt: new Date(),
      userEvents: props.event.userEvents,
      owner: props.event.owner,
    };
    dispatch(updateEvent(updatedEvent));
  }

  async function deleteExistingEvent() {
    await dispatch(deleteEvent(props.event.id));
  }

  function handleChange<T>(
    value: T | undefined,
    setter:
      | React.Dispatch<React.SetStateAction<T>>
      | React.Dispatch<React.SetStateAction<T | undefined>>
  ) {
    if (value) {
      setter(value);
    }
  }

  function handleSubmit() {
    try {
      updateExistingEvent();
      props.toggleVisible();
      toast.success("Event updated successfully");
    } catch (error) {
      toast.error("Failed to update event");
    }
  }

  async function handleDelete() {
    try {
      await deleteExistingEvent();
      props.toggleVisible();
      toast.success("Event deleted successfully");
      router.push("/myevents");
    } catch (error) {
      toast.error("Failed to delete event");
    }
  }

  function handleClose() {
    props.toggleVisible();
  }

  return (
    <Modal show={props.isVisible} size="md" popup onClose={handleClose}>
      <Modal.Header>Update Event</Modal.Header>
      <Modal.Body>
        <form
          id="form"
          className="flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            required
            id="name"
            type="text"
            sizing="md"
            defaultValue={name}
            onChange={(event) =>
              handleChange<string>(event.target.value, setName)
            }
          />
          <div className="mb-2 block">
            <Label htmlFor="location" value="Location" />
          </div>
          <TextInput
            required
            id="location"
            type="text"
            sizing="md"
            defaultValue={location}
            onChange={(event) =>
              handleChange<string>(event.target.value, setLocation)
            }
          />
          <div className="mb-2 block">
            <Label htmlFor="startDate" value="Start Date" />
          </div>
          <Datepicker
            required
            id="startDate"
            minDate={new Date()}
            defaultDate={startDate}
            onSelectedDateChanged={(event) =>
              handleChange<Date>(event, setStartDate)
            }
          />
          <div className="mb-2 block">
            <Label htmlFor="endDate" value="End Date" />
          </div>
          <Datepicker
            id="endDate"
            minDate={startDate}
            defaultDate={endDate}
            onSelectedDateChanged={(event) => {
              handleChange<Date>(event, setEndDate);
            }}
          />
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id="description"
            maxLength={500}
            rows={4}
            defaultValue={description}
            onChange={(event) =>
              handleChange<string>(event.target.value, setDescription)
            }
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={handleClose}>
          Close
        </Button>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
        <Button form="form" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
