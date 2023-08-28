import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { InputNumber } from "./InputNumber";
import { InputText } from "./InputText";

interface BookingWidgetProps {
  price: number;
  _id: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ price, _id }) => {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [redirect, setRedirect] = useState<string>("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
    }
  }, [user]);

  let numberOfNights = 1;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    const data = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      surname,
      phone,
      price: numberOfNights * price,
      place: _id,
    };
    const response = await axios.post("/bookings", data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mt-4">
      <div className="bg-gray-200 rounded-lg shadow-md  p-4 ">
        <div className="flex flex-col justify-center items-center ">
          <h2 className="text-xl text-center">
            Price:{" "}
            <span className="font-semibold"> ${price * numberOfNights}</span> /
            per
            {numberOfNights > 0 && (
              <span className="font-semibold"> {numberOfNights} </span>
            )}
            nights
          </h2>
          <button
            onClick={bookThisPlace}
            className="bg-primary max-w-xs px-4 py-2 rounded-md mt-4 mb-2 text-white font-semibold"
          >
            Book this place
          </button>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="my-2 rounded-md p-3 border">
            <label className="font-semibold pl-2">Check-in:</label>
            <input
              type="date"
              className="p-1.5 rounded-lg mt-2 border text-center w-full"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="my-2 rounded-md p-3 border">
            <label className="font-semibold pl-2">Checkout:</label>
            <input
              type="date"
              className="p-1.5 rounded-lg mt-2 border text-center w-full"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <InputNumber
            label="Max guests"
            value={numberOfGuests}
            setValue={setNumberOfGuests}
            placeholder="1"
          />
          <InputText
            label="Your name"
            value={name}
            setValue={setName}
            placeholder="Name"
          />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <InputText
            label="Your surname"
            value={surname}
            setValue={setSurname}
            placeholder="Surname"
          />
          <div className="mt-1 rounded-md">
            <label className="font-semibold">Your mobile:</label>
            <input
              type="tel"
              className="px-4 py-2 rounded-lg mt-2 border w-full"
              value={phone}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
