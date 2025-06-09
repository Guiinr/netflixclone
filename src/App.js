import React, { useState, useEffect, use } from "react";
import Tmdb from "./Tmdb";
import MovieRows from "./components/MovieRows";
import "./App.css";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      try {
        let list = await Tmdb.getHomeList();
        setMovieList(list);

        let originals = list.filter(i => i.slug === 'originals'); // Corrigi para 'originals' se for o caso
        if (originals.length > 0) {
          let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
          let chosen = originals[0].items.results[randomChosen];
          let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
          setFeaturedData(chosenInfo);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
  
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    }
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRows key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito pelo Guilherme Ribeiro <br/>
        Direitos de imagem para Netflix <br/>
        Dados retirados do site Themoviedb.org <br/>
      </footer>
    </div>
  )
}