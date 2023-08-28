import { useEffect, useState } from "react";
import { AddPhotos } from "../components/AddPhotos";
import { InputText } from "../components/InputText";
import { InputNumber } from "../components/InputNumber";
import { SelectPerks } from "../components/SelectPerks";
import { Textarea } from "../components/Textarea";
import axios from "axios";
import { AccountNavigation } from "../components/AccountNavigation";
import { Navigate, useParams } from "react-router-dom";

export const AddPlaceFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [perks, setPerks] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [checkOutTime, setCheckOutTime] = useState<string>("");
  const [maxGuests, setMaxGuests] = useState<number>(1);
  const [price, setPrice] = useState<number>(100);
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    axios.get("/places/" + id).then((response) => {
      const {
        data: {
          title,
          address,
          description,
          photos,
          extraInfo,
          perks,
          checkInTime,
          checkOutTime,
          maxGuests,
          price,
        },
      } = response;
      setTitle(title);
      setDescription(description);
      setAddress(address);
      setAddedPhotos(photos);
      setPerks(perks);
      setExtraInfo(extraInfo);
      setCheckInTime(checkInTime);
      setCheckOutTime(checkOutTime);
      setMaxGuests(maxGuests);
      setPrice(price);
    });
  }, [id]);

  const savePlace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkInTime,
      checkOutTime,
      maxGuests,
      price,
    };

    if (id) {
      // update place
      try {
        if (window.confirm("Are you sure you want to save changes?")) {
          await axios.put(`/places/${id}`, { id, ...placeData });
          setRedirect(true);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    } else {
      // add new place
      try {
        if (window.confirm("Are you sure you want to save changes?")) {
          await axios.post("/places", placeData);
          setRedirect(true);
        }
      } catch (error) {
        console.log("Adding new place failed");
      }
    }
  };

  const deletePlace = async () => {
    if (id) {
      try {
        if (window.confirm("Are you sure you want to delete this place?")) {
          await axios.delete(`/places/${id}`);
          setRedirect(true);
        }
      } catch (error) {
        console.log("Deleting place failed");
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNavigation />
      <form className="max-w-3xl mx-auto " onSubmit={savePlace}>
        <h2 className="text-xl font-semibold">General info</h2>
        <InputText
          label="Title (should be short and catchy as in advertisment"
          value={title}
          setValue={setTitle}
          placeholder="title, for example 'My lovely appartment'"
        />
        <InputText
          label="Address"
          value={address}
          setValue={setAddress}
          placeholder="Address to your place"
        />
        <h2 className="text-md font-semibold">Photos (more = better)</h2>
        <AddPhotos addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <div className="my-4">
          <Textarea
            label="Description of the place"
            value={description}
            setValue={setDescription}
          />
        </div>
        <h2 className="text-md font-semibold">
          Perks (select all of your place)
        </h2>
        <SelectPerks selected={perks} onChange={setPerks} />
        <div className="my-4">
          <Textarea
            label="Extra info (house rules, etc)"
            value={extraInfo}
            setValue={setExtraInfo}
          />
        </div>
        <h2 className="text-xl font-semibold">
          Check in & out times, max guests
        </h2>
        <p className="text-sm text-gray-500  mb-3">
          add check in and out times, remember to have some time window for
          cleaning room beetween guests
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2">
          <InputText
            label="Check in time"
            value={checkInTime}
            setValue={setCheckInTime}
            placeholder="12:00"
          />
          <InputText
            label="Check out time"
            value={checkOutTime}
            setValue={setCheckOutTime}
            placeholder="12:00"
          />
          <InputNumber
            label="Max number of guests"
            value={maxGuests}
            setValue={setMaxGuests}
            placeholder="1"
          />
          <InputNumber
            label="Price per night ($)"
            value={price}
            setValue={setPrice}
            placeholder="1"
          />
        </div>
        <div className="flex gap-3">
          <button className="bg-primary py-2 px-4 rounded-md text-white">
            Save
          </button>
          <button
            onClick={deletePlace}
            className="bg-gray-500 py-2 px-4 rounded-md text-white"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
