"use client";
import React, { useEffect } from "react";

interface ISearchable {
  name: string;
}

export interface ISearchBarProps<T> {
  allElements: T[];
  setElements: React.Dispatch<React.SetStateAction<T[]>>;
}

export default function SearchBar<T>(props: ISearchBarProps<T>) {
  const [search, setSearch] = React.useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (search === "") {
      props.setElements(props.allElements);
    }
  }, [search, props]);

  // TODO: probably dont want to get all the cards before this so we can search
  function onSubmit() {
    const elements = (props.allElements as ISearchable[]).filter((element) => {
      return element.name
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    props.setElements(elements as T[]);
  }

  return (
    <div>
      <form>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-300 focus:border-yellow-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-300 dark:focus:border-yellow-300"
            placeholder="Search Events..."
            onChange={(e) => handleChange(e)}
            required
          />
          <button
            type="button"
            className="text-white absolute end-2.5 bottom-2.5 bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-800"
            onClick={() => onSubmit()}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
