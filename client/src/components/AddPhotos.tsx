import axios from "axios";
import { useState } from "react";
import { InputText } from "./InputText";

interface AddPhotosProps {
  addedPhotos: string[];
  onChange: (value: string[]) => void;
}

export const AddPhotos: React.FC<AddPhotosProps> = ({
  addedPhotos,
  onChange,
}) => {
  const [photoLink, setPhotoLink] = useState<string>("");

  const addPhotoByLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange([...addedPhotos, filename as string]);
    setPhotoLink("");
  };

  const removePhoto = (filename: string) => {
    onChange([...addedPhotos].filter((photo) => photo !== filename));
  };

  const selectAsMainPhoto = (filename: string) => {
    const addedPhotosWithoutSelected = [...addedPhotos].filter(
      (photo) => photo !== filename
    );
    const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    onChange(newAddedPhotos);
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const data = new FormData();

    for (let i = 0; i < files?.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange([...addedPhotos, ...(filenames as string[])]);
      });
  };

  return (
    <>
      <div className="flex items-center">
        <InputText
          label=""
          value={photoLink}
          setValue={setPhotoLink}
          placeholder="Add using a link ....jpg"
        />
        <button
          className="bg-gray-300 rounded-lg p-3 text-sm ml-2"
          onClick={addPhotoByLink}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 sm:grid-cols-2 md:grid-col-4 lg:grid-col-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div key={index} className="h-40 flex relative">
              <img
                src={"http://localhost:4000/uploads/" + link}
                alt=""
                className="relative rounded-md w-full object-cover"
              />
              <button
                onClick={() => removePhoto(link)}
                className="absolute bottom-1 right-2 text-white bg-primary  bg-opacity-50 rounded-full p-1 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                onClick={() => selectAsMainPhoto(link)}
                className="absolute bottom-1 left-2 text-white bg-orange-600  bg-opacity-50 rounded-full p-1 cursor-pointer"
              >
                {link === addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
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
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="h-32 inline-flex gap-2 justify-center cursor-pointer items-center border bg-transparent rounded-lg p-2 text-gray-600 font-bold">
          <input
            type="file"
            className="hidden"
            onChange={uploadPhoto}
            multiple
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};
