"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import ChevronLeft from "@/assets/icons/chevron-left.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";
import { BannerType } from "@/types/banner";
import clsx from "clsx";

interface Props {
  banners: BannerType[];
}

const Banner = ({ banners }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    created: () => setLoading(false),
  });

  return (
    <div className="relative m-[0_auto] aspect-[14/3] h-auto w-full overflow-hidden rounded-lg bg-gray-300 bg-[url('/loading-oval.svg')] bg-center bg-no-repeat">
      <div ref={sliderRef} className="keen-slider h-full w-full">
        {banners.map((image) => (
          <img
            key={image._id}
            alt={image.description}
            className={clsx(`keen-slider__slide h-full w-full object-cover`, {
              [`hidden`]: loading,
            })}
            src={image.url}
          />
        ))}
      </div>
      {instanceRef.current && (
        <>
          <button
            className="absolute left-8 top-1/2 translate-y-[-50%]"
            onClick={() => instanceRef.current?.prev()}
          >
            <ChevronLeft className="stroke-gray-500" />
          </button>
          <button
            className="absolute right-8 top-1/2 translate-y-[-50%]"
            onClick={() => instanceRef.current?.next()}
          >
            <ChevronRight className="stroke-gray-500" />
          </button>
        </>
      )}
    </div>
  );
};

export default Banner;
