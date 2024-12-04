"use client";

import React, { useEffect, useState } from "react";
import { KeenSliderInstance, useKeenSlider } from "keen-slider/react";
import ChevronLeft from "@/assets/icons/chevron-left.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";
import { BannerType } from "@/types/banner";

interface Props {
  banners: BannerType[];
}

const Banner = ({ banners }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const [sliderRef, instanceRef] = useKeenSlider({
    animationEnded(slider: KeenSliderInstance) {
      setCurrentSlide(slider.track.details.rel);
    },
    initial: 0,
    loop: true,
  });

  useEffect(() => {
    const new_loaded = [...loaded];
    new_loaded[currentSlide] = true;
    setLoaded(new_loaded);
  }, [currentSlide]);

  return (
    <div className="relative m-[0_auto] aspect-[14/3] h-auto w-full overflow-hidden rounded-lg bg-gray-300 bg-[url('/loading-oval.svg')] bg-center bg-no-repeat shadow">
      <div ref={sliderRef} className="keen-slider h-full w-full">
        {banners.map((image, idx) => (
          <div
            key={image._id}
            className={`keen-slider__slide lazy__slide number-slide${idx + 1}`}
          >
            {loaded[idx] && (
              <img
                alt="서비스 배너"
                className="h-full w-full object-cover"
                src={image.url}
              />
            )}
          </div>
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
