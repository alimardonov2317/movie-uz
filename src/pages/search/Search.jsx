import React, { useState, useEffect, useRef } from "react";
import { Input, Empty, Spin, ConfigProvider } from "antd";
import { useGetSearchQuery } from "../../redux/api/movie.api";
import { Link, useSearchParams } from "react-router-dom";

const Search = () => {
    const { Search } = Input;
    const [params, setParams] = useSearchParams();
    const query = params.get("q") || "";
    const [auto] = useState(false);
    const [setPercent] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (auto) {
            timerRef.current = setInterval(() => {
                setPercent((prev) => (prev >= 100 ? 0 : prev + 5));
            }, 200);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [auto]);

    const onSearch = (value) => {
        params.set("q", value);
        setParams(params);
    };

    const { data, isLoading } = useGetSearchQuery(
        { include_adult: false, query: query },
        { skip: !query }
    );

    return (
        <div className="container mx-auto max-w-[1308px] text-white p-4">
            <div className="max-w-[400px] mx-auto mt-1.5">
                <ConfigProvider
                    theme={{
                        token: {
                            borderRadius: 15,
                            lineHeight: 3,
                        },
                    }}
                >
                    <Search className="dark:bg-black"
                        placeholder="Search movie"
                        defaultValue={query}
                        onSearch={onSearch}
                        enterButton
                        autoFocus
                    />
                </ConfigProvider>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center mt-10">
                    <Spin size="large" />
                </div>
            )}
            {!isLoading && !data?.total_results && (
                <div className="mt-4 flex justify-center">
                    <Empty description="No movies found" className="text-gray-300" />
                </div>
            )}
            <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
                {!isLoading &&
                    data?.results?.map((movie) => (
                        <div
                            key={movie.id}
                            className="text-black dark:text-white  p-2 rounded-lg transition-transform"
                        >
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    src={import.meta.env.VITE_IMAGE_URL + movie.poster_path}
                                    alt={movie.title}
                                    className="w-full aspect-[2/3] object-cover rounded-md"
                                />
                            </Link>
                            <h3 className="text-xl font-medium line-clamp-1">
                                {movie.title}
                            </h3>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default React.memo(Search);
