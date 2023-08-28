import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";
import { UserContext } from "../context/UserContext";
import { PlaceProps } from "../types/PlaceTypes";
import { InputText } from "./InputText";

export const Header = () => {
  const { user } = useContext(UserContext);
  const { setSearchResults, setSearchTerm, setHasSearched } =
    useSearchContext();

  let [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    axios
      .get("/places", {
        params: { searchQuery },
      })
      .then((response) => {
        if (searchQuery === "") return;

        const filteredPlaces = response.data.filter((place: PlaceProps) =>
          place.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(filteredPlaces);
        setSearchTerm(searchQuery);
        setSearchQuery("");
        setHasSearched(true);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setSearchResults([]);
        setHasSearched(true);
      });
  };

  return (
    <header className="flex justify-between items-center">
      <Link to={"/"} className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-xl">HomeAway</span>
      </Link>
      <div className="flex items-center justify-center w-2/3 gap-2 py-2 px-4">
        <InputText
          label=""
          value={searchQuery}
          setValue={setSearchQuery}
          placeholder="Search by title..."
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Link
          to={"/search-results"}
          className="bg-primary text-white p-1 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Link>
      </div>
      <Link
        to={user ? "/account" : "/login"}
        className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="bg-gray-500 rounded-full text-white p-.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!user && <div>{user?.name}</div>}
      </Link>
    </header>
  );
};
