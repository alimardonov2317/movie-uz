import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeWishlist } from "../../redux/features/favouriteSlice";
import { Link } from "react-router-dom";
import noImage from "../../assets/app-store.svg";
import { Empty } from "antd";
import { FaBookmark } from "react-icons/fa6";

const Saved = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto max-w-[1308px] text-black dark:text-white mt-5">
      {wishlist.length === 0 ? (
        <div className="text-center mt-7">
          <Empty description={<span style={{ color: 'red' }}>No saved movies</span>} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlist.map((movie) => (
            <div key={movie.id} className="relative w-full">
              <Link className="h-[350px] max-[480px]:h-[300px] block bg-gray-400 rounded-[12px]" to={`/movie/${movie.id}`}>
                <img
                  className="w-full h-full object-cover rounded-[12px]"
                  src={movie.poster_path ? import.meta.env.VITE_IMAGE_URL + movie.poster_path : noImage}
                  alt={movie.title}
                />
              </Link>

              <button
                className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2"
                onClick={() => dispatch(removeWishlist(movie.id))}
              >
                <FaBookmark className="text-white" size={18} />
              </button>

              <h3
                title={movie.title}
                className="text-xl font-medium line-clamp-1"
              >
                {movie.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
