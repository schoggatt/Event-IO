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
import { createEvent } from "@/redux/features/event.slice";

export interface ICreateEventModalProps {
  isVisible: boolean;
  toggleVisible: () => void;
}

export default function CreateEventModal(props: ICreateEventModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const user = useAppSelector(userState);
  const dispatch = useDispatch<AppDispatch>();

  // TODO: Need to add form validation.
  function createNewEvent() {
    const event: Event = {
      id: 0,
      name: name,
      description: description,
      startDate: startDate ?? new Date(),
      endDate: endDate,
      location: location,
      createdAt: new Date(),
      updatedAt: new Date(),
      userEvents: [],
    };
    dispatch(createEvent(event));
  }

  function handleChange<T>(
    value: T,
    setter: React.Dispatch<React.SetStateAction<T>>
  ) {
    setter(value);
  }

  function handleSubmit() {
    createNewEvent();
    props.toggleVisible();
  }

  function handleClose() {
    props.toggleVisible();
  }

  return (
    <Modal show={props.isVisible} size="md" popup>
      <Modal.Header>Create Event</Modal.Header>
      <Modal.Body>
        <form className="flex max-w-md flex-col gap-4">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            required
            id="name"
            type="text"
            sizing="md"
            onChange={(event) =>
              handleChange<string>(event.target.value ?? "", setName)
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
            onChange={(event) =>
              handleChange<string>(event.target.value ?? "", setLocation)
            }
          />
          <div className="mb-2 block">
            <Label htmlFor="startDate" value="Start Date" />
          </div>
          <Datepicker
            required
            id="startDate"
            minDate={new Date()}
            onSelectedDateChanged={(event) =>
              handleChange<Date>(new Date(event) ?? "", setStartDate)
            }
          />
          <div className="mb-2 block">
            <Label htmlFor="endDate" value="End Date" />
          </div>
          <Datepicker
            id="endDate"
            minDate={new Date()}
            onSelectedDateChanged={(event) => {
              handleChange<Date>(event ?? "", setEndDate);
            }}
          />
          <div className="mb-2 block">
            <Label htmlFor="description" value="Your message" />
          </div>
          <Textarea
            id="description"
            placeholder="Description"
            rows={4}
            onChange={(event) =>
              handleChange<string>(event.target.value ?? "", setDescription)
            }
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleSubmit}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}
