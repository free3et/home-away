interface PlaceImagesProps {
  images: string[];
  index: number;
  className: string | null;
  title: string;
}

export const PlaceImages: React.FC<PlaceImagesProps> = ({
  images,
  index = 0,
  className = null,
  title,
}) => {
  if (!images) return null;

  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      src={"http://localhost:4000/uploads/" + images[index]}
      alt={title}
      className={className}
    />
  );
};
