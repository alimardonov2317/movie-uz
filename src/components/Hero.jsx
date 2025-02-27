import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, FreeMode, Navigation, Autoplay } from "swiper/modules";
import { useGetMoviesQuery } from "../redux/api/movie.api";
import { Flex, Spin } from 'antd';
import { FaPlay } from "react-icons/fa6";

const Hero = () => {
  const { data, isLoading } = useGetMoviesQuery();

  if (isLoading) {
    return (
      <Flex className="flex justify-center" align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <div className="w-full h-[500px] bg-white text-black flex rounded-[12px] items-center justify-center dark:bg-black dark:text-white">
      {data ? (
        <Swiper
          modules={[Pagination, FreeMode, Navigation, Autoplay]}
          spaceBetween={10}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-full rounded-[12px] "
        >
          {data?.results?.slice(0, 5)?.map((movie) => (
            <SwiperSlide key={movie.id} className="w-[1360px] grid place-items-center h-[800px] relative">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${movie.backdrop_path}`}
                alt={movie.title}
                className="w-[1360px] object-cover rounded-[12px] z-10"
              />
              <div className="absolute bottom-5  text-center w-full  p-4">
                <h3 className="text-2xl font-bold text-white">
                  {movie.title}
                </h3>

                <p className="mb-4 text-sm max-[300px]:text-xs text-white">
                  {movie?.release_date} • {movie?.original_language.toUpperCase()} • IMDB: {movie?.vote_average}


                </p>
                <button className="px-24 mx-auto py-2 cursor-pointer bg-white text-[#C61F1F] font-bold text-1xl flex items-center gap-2.5 rounded mt-5"> <FaPlay className="mt-1 text-2xl" />Watch</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>No movie data available</div>
      )}
    </div>
  );
};

export default Hero;

