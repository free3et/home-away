import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PlaceCard } from "../components/PlaceCard";
import { useSearchContext } from "../context/SearchContext";
import { PlaceProps } from "../types/PlaceTypes";

export const SearchResults = () => {
  const { searchResults, searchTerm, setSearchTerm, setSearchResults } =
    useSearchContext();

  const [, setPlaces] = useState<PlaceProps[]>([]);
  const [redirect, setRedirect] = useState<string | null>(null);

  const backToPlaces = () => {
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data);
        setSearchResults([]);
        setSearchTerm("");
        setRedirect("/");
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <h2 className="my-6 font-semibold text-xl">
        Search Results for "{searchTerm}"
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 my-6">
        {searchResults &&
          searchResults.map((place) => (
            <PlaceCard place={place} key={place._id} />
          ))}
      </div>

      {!searchResults.length && (
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-[1fr_2fr] gap-x-6 my-3 bg-gray-100 rounded-md">
            <div className="flex items-center justify-center bg-gray-300 px-3 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#6b7280"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div className="grow-0 shrink p-3">
              <h2 className="text-xl font-semibold my-2">Nothing was found</h2>
              <p className="text-left flex items-center gap-1 mb-3 text-lg font-semibold">
                for this search
              </p>
              <p className="text-left  mt-2 border-t pt-2 border-gray-300">
                <span className="font-semibold">0$ </span>
                per night
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={backToPlaces}
        className="bg-primary text-white rounded-md py-2 px-4 mt-2 font-semibold"
      >
        Back to places
      </button>
    </>
  );
};
