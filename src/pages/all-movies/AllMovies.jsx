import React, { useState } from 'react'
import Movies from '../../components/Movies'
import { useGetGenresQuery, useGetMoviesQuery } from '../../redux/api/movie.api'
import { ConfigProvider, Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { Empty } from 'antd';

const AllMovies = () => {

  const [params, setParams] = useSearchParams()

  const page = params.get("page") || 1
  let with_genres = params.get("genres") || ""

  const { data } = useGetMoviesQuery({
    page,
    without_genres: "18,36,10749",
    with_genres: with_genres.split("-").slice(1).join(",")
  })

  const { data: genreData } = useGetGenresQuery({})

  const customTheme = {
    token: {
      colorBgTextHover: '#fff',
      itemLinkBg: '#fff'
    },
  };
  const customThemeColor = {
    token: {
      colorTextDescription: 'red'
    }
  }

  const handleChangePage = p => {
    if (p === 1) {
      params.delete("page")
    } else {
      params.set("page", p)
    }
    setParams(params)
  }

  const handleChangeGenre = id => {
    let array = with_genres.split("-")



    if (array.includes(id.toString())) {
      array = array.filter(i => i != id)
    } else {
      array.push(id)
    }
    params.set("genres", array.join("-"))
    params.set("page", 1)
    setParams(params)
  }
  return (
    <div className='container'>
      <div className='scroll flex gap-2 mb-4 overflow-auto'>
        {
          genreData?.genres?.map((genre) => (
            <div onClick={() => handleChangeGenre(genre.id)} className={`whitespace-nowrap  dark:text-black rounded-2xl px-4 py-0.5 select-none cursor-pointer ${with_genres.includes(genre.id.toString()) ? "bg-[#C61F1F] dark:text-white text-white " : "bg-slate-200"}`} key={genre.id}>{genre.name}</div>
          ))
        }
      </div>
      <ConfigProvider theme={customThemeColor}>
        {
          !data?.total_results && <Empty />
        }
      </ConfigProvider>
      <Movies data={data} />
      {
        !!data?.total_results &&
        <div className='flex justify-center my-5'>
          <ConfigProvider theme={customTheme}>
            <Pagination
              colorText="rgba(0,0,0,0.88)"
              showSizeChanger={false}
              defaultCurrent={1}
              defaultPageSize={1}
              total={data?.total_pages > 500 ? 500 : data?.total_pages}
              current={page}
              onChange={(page) => handleChangePage(page)}
            />
          </ConfigProvider>
        </div>
      }
    </div>

  )
}

export default AllMovies