import React, { useEffect } from "react";
import { useGetSingleMovieImagesQuery, useGetSingleMovieQuery, useGetSingleMovieSimilarQuery, } from "../../redux/api/movie.api";
import { useParams } from "react-router-dom";
import Movies from "../../components/Movies";
import { Image } from 'antd';
import { FaImdb } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const Detail = () => {
    const { id } = useParams();
    const { data } = useGetSingleMovieQuery(id);
    const { data: images } = useGetSingleMovieImagesQuery(id);
    const { data: similarData } = useGetSingleMovieSimilarQuery(id);

    useEffect(() => {
        window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
    }, [id]);

    return (
        <div className="container mx-auto">
            <div className="h-[700px] bg-gray-400">
                <img
                    className="w-full h-full object-cover "
                    src={import.meta.env.VITE_IMAGE_URL + data?.backdrop_path}
                    alt=""
                />
            </div>
            <div className="flex gap-3.5 my-10">
                <div className="contents w-[200px]">
                    <img
                        src={`${import.meta.env.VITE_IMAGE_URL}${data?.poster_path}`}
                        alt={data?.title}
                        className="detail__image md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0"
                    />
                </div>
                <div className="">
                    <h1 className="text-3xl my-2.5">{data?.title}</h1>
                    <p className="text-base md:text-lg mb-2">
                        <span className="font-semibold">Release date: </span>
                        {data?.release_date}
                    </p>
                    <p className="text-base md:text-lg mb-2">
                        <span className="font-semibold">Country: </span>
                        {data?.origin_country}
                    </p>
                    <p className="text-base md:text-lg mb-2">
                        <span className="font-semibold">Popularity: </span>
                        {data?.popularity}
                    </p>
                    <p className="text-base md:text-lg mb-4">
                        <span className="font-semibold">Genres: </span>
                        {data?.genres.map((genre) => genre.name).join(", ")}
                    </p>
                    <div className="flex items-center mb-2">
                        <p className="text-base md:text-lg mr-2">
                            <span className="font-semibold">Rating: </span>
                            {data?.vote_average} / 10
                        </p>
                        <FaImdb className="text-[#F3B700] text-3xl" />
                    </div>
                    <p className="text-lg md:text-xl mb-4">
                        <span className="font-semibold">
                            Total accumulated votes:  {data?.vote_count}
                        </span>
                    </p>
                    <button className="px-24 py-4 cursor-pointer bg-white text-[#C61F1F] font-bold text-2xl flex items-center gap-2.5 rounded-2xl mt-5">Watch <FaPlay className="mt-1" /></button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-20">
                {images?.backdrops?.slice(0, 8)?.map((image) => (
                    <Image
                        key={image.file_path}
                        className="w-[300px]"
                        src={import.meta.env.VITE_IMAGE_URL + image.file_path}
                        alt=""
                    />


                ))}
            </div>
            <div>
                <h3 className="text-5xl border-b-4 inline border-[#C61F1F]">Similar</h3>
            </div>

            <div>
                <Movies data={similarData} />
            </div>
        </div>
    );
};

export default Detail;
