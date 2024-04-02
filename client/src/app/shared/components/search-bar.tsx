"use client";
import { TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";

interface ISearchable {
  name: string;
}

export interface ISearchBarProps<T> {
  allElements: T[];
  setElements: React.Dispatch<React.SetStateAction<T[]>>;
}

export default function SearchBar<T>(props: ISearchBarProps<T>) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let search = event.target.value;
    if (search === "") {
      props.setElements(props.allElements);
    } else {
      const elements = (props.allElements as ISearchable[]).filter(
        (element) => {
          return element.name
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      );
      props.setElements(elements as T[]);
    }
  }

  return (
    <div>
      <form>
        <TextInput
          type="search"
          icon={HiSearch}
          placeholder="Search Events..."
          onChange={(e) => handleChange(e)}
          required
        />
      </form>
    </div>
  );
}
