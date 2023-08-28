import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AccountNavigation } from "../components/AccountNavigation";
import { Loader } from "../components/Loader";
import { PlaceImages } from "../components/PlaceImages";
import { PlaceProps } from "../types/PlaceTypes";
import { AddPlaceFormPage } from "./AddPlaceFormPage";

export const PlacePageEdit = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user-places")
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <AccountNavigation />

      {action !== "new" && isLoading ? (
        <div className="grid xs:grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-h-full my-20">
          {Array.from({ length: 9 }).map((_, index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="inline-flex gap-1 bg-primary rounded-xl py-2 px-4 mb-4 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
          <div className="mt-4 ">
            {places.length > 0 &&
              places.map(
                (
                  { _id, title, address, photos, description }: PlaceProps,
                  index
                ) => (
                  <Link
                    to={"/account/places/" + _id}
                    key={index}
                    className="flex items-center gap-2 bg-gray-200 rounded-md my-2 cursor-pointer"
                  >
                    {photos?.length > 0 && (
                      <div className="gap-3 flex shrink-0 pl-3">
                        <PlaceImages
                          images={photos}
                          index={Number(0)}
                          title={title}
                          className="object-cover w-44 h-44 cursor-pointer rounded-md"
                        />
                        <PlaceImages
                          images={photos}
                          index={Number(1)}
                          title={title}
                          className="object-cover w-44 h-44 cursor-pointer rounded-md"
                        />
                      </div>
                    )}

                    <div className="grow-0 shrink py-3 px-4 ">
                      <h2 className="text-xl font-semibold mb-3">{title}</h2>
                      <p className="text-left">{description}</p>
                      <p className="text-left flex items-center gap-2 mt-2 font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        {address}
                      </p>
                    </div>
                  </Link>
                )
              )}
          </div>
        </div>
      )}
      {action === "new" && <AddPlaceFormPage />}
    </div>
  );
};
