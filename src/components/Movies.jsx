import React from "react";
import { Link } from "react-router-dom";

const Movies = ({ data, isLoading }) => {

    return (
        <div className=" grid grid-cols-5 gap-4 mt-[40px] max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
            {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <div key={index}
                        className="border border-gray-300 dark:border-gray-800 dark:bg-gray-700 animate-pulse">
                        <div className="h-[400px] bg-gray-400" />
                        <div className="p-1.5">
                            <div className="h-6 bg-gray-500 w-3/4 mb-2" />
                            <div className="h-4 bg-gray-500 w-1/2" />
                        </div>
                    </div>
                ))
                : data?.results?.map((movie) => (
                    <div key={movie.id} className="rounded-[12px]">
                        <Link
                            to={`/movie/${movie.id}`}
                            className="h-[400px] block bg-gray-400 rounded-[12px]">
                            <img
                                className="w-full h-full object-cover rounded-[12px]"
                                src={import.meta.env.VITE_IMAGE_URL + movie.poster_path}
                                alt={movie.title}
                            />
                        </Link>
                        <div className="p-1.5">
                            <h3
                                title={movie.title}
                                className="text-xl font-medium line-clamp-1"
                            >
                                {movie.title}
                            </h3>

                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Movies;
