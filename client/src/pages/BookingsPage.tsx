import axios from "axios";
import { useEffect, useState } from "react";
import { AccountNavigation } from "../components/AccountNavigation";
import { PlaceImages } from "../components/PlaceImages";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";

interface BookingsPageProps {
  _id: string;
  checkIn: string;
  checkOut: string;
  place: { photos: string[]; title: string };
  price: number;
}

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (!bookings) {
    return <Loader />;
  }

  return (
    <div>
      <AccountNavigation />
      {isLoading ? (
        <div className="grid xs:grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-h-full my-20">
          {Array.from({ length: 9 }).map((_, index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 xs:grid-col-2 sm:grid-col-2 grid-cols-2 mt-6">
          {!bookings.length && (
            <h3>You have no places to reserve! Let's add the first one!</h3>
          )}
          {bookings?.length > 0 &&
            bookings.map(
              (
                { _id, checkIn, checkOut, place, price }: BookingsPageProps,
                index
              ) =>
                _id &&
                place && (
                  <Link
                    to={`/account/bookings/${_id}`}
                    className="flex gap-4 bg-gray-200 rounded-xl overflow-hidden"
                    key={index}
                  >
                    <div className="w-48">
                      <PlaceImages
                        images={place?.photos}
                        index={Number(0)}
                        title={place?.title}
                        className="object-cover aspect-square rounded-xl cursor-pointer"
                      />
                    </div>
                    <div className="py-3 pr-3 grow">
                      <h2 className="py-3 text-lg font-semibold">
                        {place?.title}
                      </h2>
                      <div className="border-t border-gray-400 mt-2 py-2">
                        <h3 className="flex gap-2 items-center">
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
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
                          {format(new Date(checkIn), "yyyy-MM-dd")}{" "}
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
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                          </svg>
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
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
                          {format(new Date(checkOut), "yyyy-MM-dd")}
                        </h3>
                      </div>
                      <h3 className="font-semibold flex items-center gap-2 my-2">
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
                            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                          />
                        </svg>
                        Number of nights:{" "}
                        {differenceInCalendarDays(
                          new Date(checkOut),
                          new Date(checkIn)
                        )}
                      </h3>
                      <h3 className="font-semibold flex items-center gap-2 my-2">
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
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                        Total Price: {price}$
                      </h3>
                    </div>
                  </Link>
                )
            )}
        </div>
      )}
    </div>
  );
};
