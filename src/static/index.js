import { IoIosHome } from "react-icons/io";
import { MdLocalMovies, } from "react-icons/md";
import { FaBookmark, FaRegCircleQuestion } from "react-icons/fa6";

import { FaSearch } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { RiClapperboardLine } from "react-icons/ri";
import { RiMovieLine } from "react-icons/ri";
import { IoBasketballOutline } from "react-icons/io5";
import { RiFileList2Line } from "react-icons/ri";
import { RiShiningLine } from "react-icons/ri";

export const navbarItems = [
  {
    id: 1,
    icon: IoIosHome,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    icon: MdLocalMovies,
    name: "Movie",
    path: "/all-movies",
  },
  {
    id: 3,
    icon: FaBookmark,
    name: "Saved",
    path: "/saved",
  },
  {
    id: 4,
    icon: FaSearch,
    name: "Search",
  },
];

export const FOOTER = [
  {
    id: 1,
    icon: RiFileList2Line,
    title: "Public Offer",
  },
  {
    id: 2,
    icon: RiShiningLine,
    title: "Advertisement",
  },
  {
    id: 3,
    icon: FaRegCircleQuestion,
    title: "F.A.Q",
  },
  {
    id: 4,
    icon: MdPhone,
    title: "Contacts",
  },
];
export const FOOTERCATEGOR = [
  {
    id: 1,
    iconM: RiMovieLine,
    title: "Movie",
  },
  {
    id: 2,
    iconM: RiClapperboardLine,
    title: "Theatre",
  },
  {
    id: 3,
    iconM: RiMovie2Line,
    title: "Concerts",
  },
  {
    id: 4,
    iconM: IoBasketballOutline,
    title: "Sport",
  },
];
