import { Link } from "react-router-dom";
import { PlaceImages } from "./PlaceImages";

interface PlaceCardProps {
  place: {
    _id: string;
    title: string;
    address: string;
    photos: string[];
    price: number;
    description: string;
  };
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const { _id, title, address, photos, price } = place;

  return (
    <>
      <Link
        to={"/places/" + _id}
        key={_id}
        className="bg-gray-100 rounded-md my-2 cursor-pointer"
      >
        <div className="flex  bg-gray-300 shrink-0">
          {photos?.length > 0 && (
            <PlaceImages
              images={photos}
              index={Number(0)}
              className="w-full h-44 object-cover rounded-md"
              title={title}
            />
          )}
        </div>
        <div className="grow-0 shrink p-3">
          <h2 className="text-lg font-semibold my-2">{title}</h2>
          <p className="text-left flex items-center gap-1 mb-3">{address}</p>
          <p className="text-left  mt-2 border-t pt-2 border-gray-300">
            <span className="font-semibold">{price}$ </span>
            per night
          </p>
        </div>
      </Link>
    </>
  );
};
