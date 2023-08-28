import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { PlaceCard } from "../components/PlaceCard";
import { useSearchContext } from "../context/SearchContext";
import { PlaceProps } from "../types/PlaceTypes";

export const MainPage = () => {
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchResults, setSearchResults } = useSearchContext();

  useEffect(() => {
    setSearchResults([]);
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data);
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
      {isLoading ? (
        <div className="grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-h-full my-20">
          {Array.from({ length: 9 }).map((_, index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : (
        <>
          {places.length > 0 && searchResults.length === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 my-6">
              {places.map((place) => (
                <PlaceCard place={place} key={place._id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
