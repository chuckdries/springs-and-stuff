import { useRef, useState } from "react";
import { useResizeObserver } from "@react-aria/utils";
import { useSpring, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const IMAGES = [
  "/public/000038250035.jpg",
  "/public/000038260006.jpg",
  "/public/000038260021.jpg",
  "/public/000038260029.jpg",
];

export function Gallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(200);

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

  const imagePannerSpring = useSpring({
    x: containerWidth - (currentImage + 1) * containerWidth,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useResizeObserver({
    ref: containerRef,
    onResize: () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    },
  });

  const bind = useDrag(({ down, delta: [dx] }) => {
    if (down) {
      const x = imagePannerSpring.x.get() + dx;
      if (Math.abs(x) > (containerWidth * (IMAGES.length - 1)) || x > 0) {
        return;
      }
      imagePannerSpring.x.set(x);
    } else {
      const closestImage = Math.round(
        Math.abs(
          (imagePannerSpring.x.get() + containerWidth) / containerWidth - 1
        )
      );
      if (closestImage === currentImage) {
        imagePannerSpring.x.start(
          containerWidth - (currentImage + 1) * containerWidth
        );
      }
      setCurrentImage(closestImage);
    }
  });

  return (
    <div className="flex">
      <button onClick={onLeftPress} className="hover:bg-white/20">
        <ChevronLeft />
      </button>
      <div
        ref={containerRef}
        style={{ height: containerWidth / 2.7 }}
        className="overflow-hidden flex-auto relative"
      >
        <animated.div
          {...bind()}
          style={imagePannerSpring}
          className="flex min-w-0"
        >
          {IMAGES.map((image) => (
            <img onDragStart={(e) => e.preventDefault()} src={image} />
          ))}
        </animated.div>
      </div>
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
