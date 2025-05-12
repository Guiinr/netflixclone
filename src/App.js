import React, { useState, useEffect } from "react";
import Tmdb from "./Tmdb";
import MovieRows from "./components/MovieRows";

export default () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);


    }
    loadAll();
  }, []);
  return (
    <div className="page">
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRows key={key} title={item.title} items={item.items}/>
        ))}

      </section>

    </div>
  )
}