"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import clsx from "clsx";
import ChevronLeft from "@/assets/icons/chevron-left.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";

interface Props {
  images: string[];
}

const ReportImages = ({ images }: Props) => {
  if (images.length <= 0) return;

  const [loading, setLoading] = useState<boolean>(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    created: () => setLoading(false),
  });

  return (
    <div className="relative m-[0_auto] aspect-[1/1] h-auto w-full overflow-hidden rounded-lg bg-gray-300 bg-[url('/loading-oval.svg')] bg-center bg-no-repeat">
      <div ref={sliderRef} className="keen-slider h-full w-full">
        {images.map((image, idx) => (
          <img
            key={idx}
            alt="동아리 활동보고서 사진"
            className={clsx(`keen-slider__slide h-full w-full object-cover`, {
              [`hidden`]: loading,
            })}
            src={image}
          />
        ))}
      </div>
      {instanceRef.current && images.length > 1 && (
        <>
          <button
            className="absolute left-8 top-1/2 translate-y-[-50%]"
            onClick={() => instanceRef.current?.prev()}
          >
            <ChevronLeft className="stroke-white drop-shadow-md" />
          </button>
          <button
            className="absolute right-8 top-1/2 translate-y-[-50%]"
            onClick={() => instanceRef.current?.next()}
          >
            <ChevronRight className="stroke-white drop-shadow-md" />
          </button>
        </>
      )}
    </div>
  );
};

export default ReportImages;
