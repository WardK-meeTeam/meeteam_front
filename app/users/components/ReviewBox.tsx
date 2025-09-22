"use client";

import { IoIosStar } from "react-icons/io";
import { useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface Review {
  name: string;
  star: number;
  review: string;
}

interface ReviewBoxProps {
  reviews?: Review[];
}

const ReviewBox = ({ reviews = [] }: ReviewBoxProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const STEP = 365 + 20;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -STEP, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: STEP, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-y-5 my-12">
      <div className="flex items-center gap-x-5">
        <div className="text-[20px] font-extrabold flex justify-center items-center">
          Review
        </div>
        <div className="flex justify-center items-center">
          {reviews.length}개
        </div>
      </div>

      <div className="w-full h-[2px] bg-black"></div>
      {reviews.length > 0 ? (
        <>
          <div
            ref={scrollRef}
            className="w-full flex overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-x-5"
          >
            {reviews.map((review, key) => (
              <div
                key={key}
                className="w-[365px] h-[169px] rounded-[8px] shrink-0 bg-[#F8F8F8]"
              >
                <div className="flex justify-between px-6 pt-5">
                  <div className="text-[#474747] text-[16px] font-bold">
                    {review.name}
                  </div>
                  <div className="flex justify-center items-center gap-x-1">
                    <IoIosStar className="w-[15.3px] h-[14.62px] text-[#00E457]" />
                    <div className="text-[16px] text-[#474747]">
                      {review.star.toFixed(1)}
                    </div>
                  </div>
                </div>
                <div className="m-5 px-1 text-[16px]">{review.review}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-x-3">
            <button
              type="button"
              onClick={scrollLeft}
              className="w-[40px] h-[40px] rounded-[50%] border border-[#CFCFCF] flex justify-center items-center cursor-pointer"
            >
              <IoIosArrowBack className="w-[30px] h-[30px] text-[#CFCFCF] " />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="w-[40px] h-[40px] rounded-[50%] border border-[#CFCFCF] flex justify-center items-center cursor-pointer"
            >
              <IoIosArrowForward className="w-[30px] h-[30px] text-[#CFCFCF] " />
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-[169px] flex justify-center items-center bg-[#F8F8F8] rounded-[8px]">
          <p className="text-[#474747]">아직 받은 리뷰가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewBox;
