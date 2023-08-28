import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AccountNavigation } from "../components/AccountNavigation";
import { ShowAllPhoto } from "../components/ShowAllPhoto";
import { BookingWidget } from "../components/BookingWidget";
import { PlaceImages } from "../components/PlaceImages";
import { perksArr } from "../components/PerksArr";
import { Loader } from "../components/Loader";

interface PlaceProps {
  _id: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  extraInfo: string;
  checkInTime: string;
  checkOutTime: string;
  perks: string[];
  maxGuests: number;
  price: number;
}

export const PlacePageView = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/places/${id}`)
      .then((response) => {
        setPlace(response.data);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (!place) return <Loader />;

  const {
    _id,
    title,
    address,
    photos,
    description,
    extraInfo,
    perks,
    checkInTime,
    checkOutTime,
    maxGuests,
    price,
  }: PlaceProps = place;

  return (
    <div className="mb-8">
      <AccountNavigation />

      {isLoading ? (
        <div className="grid xs:grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-h-full my-20">
          {Array.from({ length: 9 }).map((_, index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold my-3">{title}</h2>
          <a
            className="text-left underline font-semibold flex gap-2 items-center"
            href={`https://maps.google.com/?q=${address}`}
            target="_blank"
          >
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
          </a>
          <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] mt-6">
              <div onClick={() => setShowAllPhotos(true)}>
                <PlaceImages
                  images={photos}
                  index={Number(0)}
                  title={title}
                  className="object-cover h-96 w-full rounded-xl cursor-pointer"
                />
              </div>
              <div
                className="grid gap-2 relative"
                onClick={() => setShowAllPhotos(true)}
              >
                {photos?.length > 0 && (
                  <PlaceImages
                    images={photos}
                    index={Number(1)}
                    title={title}
                    className="object-cover h-44 w-full rounded-xl cursor-pointer"
                  />
                )}
                <div
                  className="overflow-hidden"
                  onClick={() => setShowAllPhotos(true)}
                >
                  {photos?.length > 0 && (
                    <PlaceImages
                      images={photos}
                      index={Number(2)}
                      title={title}
                      className="object-cover h-48 w-full aspect-square rounded-xl cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute flex gap-2 items-center font-semibold bottom-3 right-3 py-2 px-3 rounded-md shadow-md shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M6 3a3 3 0 00-3 3v1.5a.75.75 0 001.5 0V6A1.5 1.5 0 016 4.5h1.5a.75.75 0 000-1.5H6zM16.5 3a.75.75 0 000 1.5H18A1.5 1.5 0 0119.5 6v1.5a.75.75 0 001.5 0V6a3 3 0 00-3-3h-1.5zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM4.5 16.5a.75.75 0 00-1.5 0V18a3 3 0 003 3h1.5a.75.75 0 000-1.5H6A1.5 1.5 0 014.5 18v-1.5zM21 16.5a.75.75 0 00-1.5 0V18a1.5 1.5 0 01-1.5 1.5h-1.5a.75.75 0 000 1.5H18a3 3 0 003-3v-1.5z" />
              </svg>
              Show more photos
            </button>
          </div>
        </>
      )}
      {showAllPhotos && (
        <ShowAllPhoto
          title={title}
          photos={photos}
          showPhotos={setShowAllPhotos}
        />
      )}
      <div className="my-6 grid grid-cols-[2fr_1fr] sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14">
        <div>
          <h3 className="font-semibold text-xl my-4">About place {title}</h3>
          <p className="text-lg text-left mt-4">{description}</p>
          <table className="text-center mt-4 mx-auto">
            <thead>
              <tr className="border-b">
                <th className="border-r px-4 py-3">Check In Time</th>
                <th className="border-r px-4 py-3">Check Out Time</th>
                <th className="px-4 py-3">Max Guests</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r px-4 py-3">{checkInTime}:00</td>
                <td className="border-r px-4 py-3">{checkOutTime}:00</td>
                <td className="px-4 py-3">{maxGuests}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="font-semibold text-xl my-4">Extra info</h3>
          <p className="text-gray-600 text-md leading-5">{extraInfo}</p>
          <h3 className="font-semibold text-xl my-4">What this place offers</h3>
          <div className="grid grid-cols-3">
            {perks.length > 0 &&
              perks.map((perk) =>
                perksArr.map((perkIcon, index) =>
                  perkIcon.title === perk ? (
                    <div className="flex items-center gap-2 py-1" key={index}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 35 35"
                        strokeWidth="1.25"
                        stroke="black"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={perkIcon.icon}
                        />
                      </svg>
                      <p className="py-2 font-semibold">{perk}</p>
                    </div>
                  ) : null
                )
              )}
          </div>
        </div>
        <BookingWidget price={price} _id={_id} />
      </div>
    </div>
  );
};
