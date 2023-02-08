import { useState } from "react";

const IMAGES = [
  "/public/000038250035.jpg",
  "/public/000038260006.jpg",
  "/public/000038260021.jpg",
  "/public/000038260029.jpg",
];

export function Gallery() {
  const [currentImage, setCurrentImage] = useState(0);

  const onRightPress = () => {
    console.log("here");
    if (currentImage === IMAGES.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  const onLeftPress = () => {
    if (currentImage === 0) {
      setCurrentImage(IMAGES.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <div className="flex">
      <button onClick={onLeftPress} className="hover:bg-white/20">
        <ChevronLeft />
      </button>
      <img className="flex-auto min-w-0" src={IMAGES[currentImage]} />
      <button onClick={onRightPress} className="hover:bg-white/20">
        <ChevronRight />
      </button>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
