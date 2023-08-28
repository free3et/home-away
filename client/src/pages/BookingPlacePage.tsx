import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookingDates } from "../components/BookingDates";
import { Loader } from "../components/Loader";
import { PlaceImages } from "../components/PlaceImages";

interface BookingProps {
  _id: string;
  place: {
    _id: string;
    title: string;
    address: string;
    photos: string[];
  };
  price: number;
  checkIn: string;
  checkOut: string;
}

export const BookingPlacePage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingProps | null>(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(
          (responseBooking: BookingProps) => responseBooking._id === id
        );
        setBooking(foundBooking);
      });
    }
  }, [id]);

  const deleteBookingById = () => {
    if (id) {
      axios.delete(`/bookings/${id}`).then(() => {
        setBooking(null);
      });
    }
  };

  if (!booking)
    return (
      <>
        <Loader />
      </>
    );

  const {
    place: { _id, title, photos, address },
    price,
    checkIn,
    checkOut,
  } = booking as BookingProps;

  return (
    <Link to={`/places/${_id}`} className="mt-6">
      <div className="tablet-grid flex bg-gray-200 p-5 my-6 rounded-2xl gap-5">
        <div className="tablet-image-container grid grid-cols-3 gap-3 w-2/3 ">
          <PlaceImages
            images={photos}
            index={Number(0)}
            title={title}
            className="object-cover aspect-square rounded-xl cursor-pointer"
          />
          <PlaceImages
            images={photos}
            index={Number(1)}
            title={title}
            className="object-cover aspect-square rounded-xl cursor-pointer"
          />
          <PlaceImages
            images={photos}
            index={Number(2)}
            title={title}
            className="object-cover aspect-square rounded-xl cursor-pointer"
          />
        </div>
        <div className="tablet-info-container flex grow flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-4">
            Your booking information:
          </h2>
          <h2 className="text-2xl pb-3 font-semibold">{title}</h2>
          <h3 className="flex items-center gap-1 text-xl pb-3 font-semibold mb-2">
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
          </h3>

          <BookingDates checkIn={checkIn} checkOut={checkOut} />
          <div className="flex justify-between gap-4">
            <button className="bg-primary py-2 px-4 text-white rounded-xl mt-5 text-center text-lg font-semibold">
              Total price ${price}
            </button>
            <button
              onClick={deleteBookingById}
              className="bg-gray-600 py-2 px-4 text-white rounded-xl mt-5 text-center text-lg font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
