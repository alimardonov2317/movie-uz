import React, { useEffect } from "react";
import { useGetGenresQuery, useGetMoviesQuery } from "../../redux/api/movie.api";
import { Pagination, Empty, ConfigProvider } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, removeWishlist } from "../../redux/features/favouriteSlice";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import noImage from "../../assets/no-image.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllMovies = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const page = params.get("page") || 1;
  let with_genres = params.get("genres") || "";

  const { data, isLoading } = useGetMoviesQuery({
    page,
    without_genres: "18,36,10749",
    with_genres: with_genres ? with_genres.split("-").join(",") : ""
  });

  const { data: genreData, isLoading: isGenresLoading } = useGetGenresQuery();

  const handleChangePage = (p) => {
    if (p === 1) {
      params.delete("page");
    } else {
      params.set("page", p);
    }
    setParams(params);
    window.scrollTo(0, 0);
  };

  const handleChangeGenre = (id) => {
    let array = with_genres ? with_genres.split("-") : [];

    if (array.includes(id.toString())) {
      array = array.filter((i) => i !== id.toString());
    } else {
      array.push(id.toString());
    }

    if (array.length === 0) {
      params.delete("genres");
      params.delete("page");
    } else {
      params.set("genres", array.join("-"));
      params.set("page", 1);
    }
    setParams(params);
  };

  return (
    <>
      <div id="genreContainer" className="scroll flex gap-2 mb-4 overflow-auto container py-4">
        {isGenresLoading ? (
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} width={100} height={30} style={{ borderRadius: '16px' }} />
          ))
        ) : (
          genreData?.genres?.map((genre) => (
            <div
              onClick={() => handleChangeGenre(genre.id)}
              className={`whitespace-nowrap dark:text-black rounded-2xl px-4 py-0.5 select-none cursor-pointer ${with_genres.includes(genre.id.toString()) ? "bg-[#C61F1F] dark:text-white text-white " : "bg-slate-200"}`}
              key={genre.id}
            >
              {genre.name}
            </div>
          ))
        )}
      </div>

      {!data?.total_results && !isLoading && <Empty />}

      <div className="container grid grid-cols-5 gap-4 mt-[40px] max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
        {isLoading ? (
          Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="rounded-[12px] max-[480px]:mb-9 mb-1 relative max-[480px]:h-[300px]">
              <div className="">
                <Skeleton style={{ borderRadius: '12px', height: '100%' }} className=" max-[480px]:h-[300px]" height={350} />
                <Skeleton className="mt-2" height={20} width={`80%`} />
              </div>
            </div>
          ))
        ) : (
          data?.results?.map((movie) => {
            const isInWishlist = wishlist.some((item) => item.id === movie.id);

            return (
              <div key={movie.id} className="rounded-[12px] max-[480px]:mb-9 mb-1 relative max-[480px]:h-[300px]">
                <Link className="h-[350px] max-[480px]:h-[300px] block bg-gray-400 rounded-[12px]" to={`/movie/${movie.id}`}>
                  <img
                    className="w-full h-full object-cover rounded-[12px]"
                    src={movie.poster_path ? import.meta.env.VITE_IMAGE_URL + movie.poster_path : noImage}
                    alt={movie.title}
                  />
                </Link>

                <button
                  className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1.5"
                  onClick={() =>
                    isInWishlist
                      ? dispatch(removeWishlist(movie.id))
                      : dispatch(addWishlist(movie))
                  }
                >
                  {isInWishlist ? <FaBookmark className="text-white" size={20} /> : <FaRegBookmark size={20} />}
                </button>

                <h3
                  title={movie.title}
                  className="text-xl font-medium line-clamp-1"
                >
                  {movie.title}
                </h3>
              </div>
            );
          })
        )}
      </div>

      <div className="px-3.5 container mx-auto max-w-2xl">
        {!!data?.total_results && (
          <div className="flex items-center justify-center mt-4">

            <ConfigProvider
              theme={{
                token: {
                  colorBgTextHover: 'red',
                  colorPrimaryHover: 'blue',
                },
              }}
            >
              <Pagination
                showSizeChanger={false}
                defaultCurrent={1}
                defaultPageSize={1}
                total={data?.total_pages > 500 ? 500 : data?.total_pages}
                current={page}
                onChange={(page) => handleChangePage(page)}
              />
            </ConfigProvider>
          </div>
        )}
      </div>
    </>
  );
};

export default AllMovies;
