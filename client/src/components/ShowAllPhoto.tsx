import { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Gallery from "react-photo-gallery";

interface ShowPhotos {
  title: string;
  photos: string[];
  showPhotos: (arg: boolean) => void;
}

export const ShowAllPhoto: React.FC<ShowPhotos> = ({
  title,
  photos,
  showPhotos,
}) => {
  const [showSlider, setShowSlider] = useState(false);

  const showPhotoSlider = () => {
    setShowSlider(true);
  };

  const hidePhotoSlider = () => {
    setShowSlider(false);
  };

  const photoGalleryData = photos.map((photo) => ({
    original: `http://localhost:4000/uploads/${photo}`,
    thumbnail: `http://localhost:4000/uploads/${photo}`,
    src: `http://localhost:4000/uploads/${photo}`,
    width: 1,
    height: 1,
  }));

  return (
    <Modal open={true} onClose={() => showPhotos(false)} center>
      <div className="bg-gray-800 p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-6 text-white">
          "{title}" photos
        </h2>
        <div className={showSlider ? "fade-out hidden" : "fade-in block"}>
          <Gallery photos={photoGalleryData} onClick={showPhotoSlider} />
        </div>
        <div className={showSlider ? "fade-in block" : "fade-out hidden"}>
          <ImageGallery
            items={photoGalleryData}
            showBullets={true}
            onClick={hidePhotoSlider}
          />
        </div>
      </div>
    </Modal>
  );
};
