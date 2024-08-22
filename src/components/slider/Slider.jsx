import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Sone from "./Sone";

// import Loader from "@/components/home/loader/Loader"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
const Slider = ({ data }) => {
  return (
    <div className="review-container bg-slate-500  ">
      {
        data?.length > 0 ? (
          <>
            <h2 className=" subscribe-heading">World Most Search</h2>
            <div className="">
              <Swiper
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  1020: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },

                  1600: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                  1800: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                autoplay={{
                  delay: 2000,
                }}
                navigation
                pagination={{ clickable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
              >
                {data?.map((d, index) => (
                  <>
                    <SwiperSlide>
                      <Sone data={d} />{" "}
                    </SwiperSlide>
                  </>
                ))}
              </Swiper>
            </div>
          </>
        ) : null
        // <Loader />
      }
    </div>
  );
};

export default Slider;
