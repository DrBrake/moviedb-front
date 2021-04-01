import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import last from "lodash/last";
import without from "lodash/without";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import get from "lodash/get";
import compact from "lodash/compact";
import copy from "copy-to-clipboard";
import { GENRE_FILTER_TYPES, FILES_LOCATION } from "./constants";
import AppRouter from "./Components/AppRouter";

const API = "http://localhost:8080";

require("../favicon.ico");

const App = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState([]);
  const [genreFilterType, setGenreFilterType] = useState(
    GENRE_FILTER_TYPES.AND
  );
  const [yearFilter, setYearFilter] = useState(null);
  const [dateAddedFilter, setDateAddedFilter] = useState(null);
  const [studioFilter, setStudioFilter] = useState([]);
  const [searchActorFilter, setSearchActorFilter] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("MovieName");
  const [customOrderBy, setCustomOrderBy] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarError, setSnackbarError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(API);
    if (response?.status === 200) {
      const actorsWithPlays = response.data.actors.map((actor) => {
        const moviesWithActor = response.data.movies.filter((movie) =>
          movie.MovieActors.includes(actor.ActorID)
        );
        let actorPlays = 0;
        moviesWithActor.map((movie) => {
          actorPlays += movie.MoviePlays || 0;
        });
        actor.ActorPlays = actorPlays || 0;
        actor.ActorMovies = moviesWithActor.length || 0;
        actor.ActorAdded = dayjs(actor.ActorAdded);
        return actor;
      });

      const genresWithPlays = response.data.genres.map((genre) => {
        const moviesWithGenre = response.data.movies.filter((movie) =>
          movie.MovieGenres.includes(genre.GenreID)
        );
        let genrePlays = 0;
        moviesWithGenre.map((movie) => {
          genrePlays += movie.MoviePlays || 0;
        });
        genre.GenrePlays = genrePlays || 0;
        genre.GenreMovies = moviesWithGenre.length || 0;
        return genre;
      });

      const fetchedMovies = response.data.movies.map((item) => {
        item.MovieAdded = dayjs(item.MovieAdded);
        return item;
      });

      setMovies(fetchedMovies);
      setActors(actorsWithPlays);
      setGenres(genresWithPlays);
      setGenreFilter([]);
      setYearFilter(null);
      setDateAddedFilter(null);
      setStudioFilter([]);
    } else {
      setSnackbar("Error fetching data", true);
    }
  };

  const submitMovie = async (values) => {
    const response = await axios.post(`${API}/movie`, values);
    if (response?.status === 200) {
      fetchData();
      setSnackbar("Movie saved successfully");
    } else {
      setSnackbar("Error saving data", true);
    }
  };

  const submitActor = async (values) => {
    const response = await axios.post(`${API}/actor`, values);
    if (response?.status === 200) {
      fetchData();
      setSnackbar("Actor saved successfully");
    } else {
      setSnackbar("Error saving data", true);
    }
  };

  const play = async (movieID, movieLocation) => {
    const response = await axios.post(`${API}/play`, { MovieID: movieID });
    if (response?.status === 200) {
      fetchData();
      copy(`${FILES_LOCATION}${movieLocation}`);
      setSnackbar("URL copied to clipboard");
    } else {
      setSnackbar("Error saving data", true);
    }
  };

  const toggleGenreFilter = (GenreID) => {
    if (genreFilter.includes(GenreID)) {
      setGenreFilter(without(genreFilter, GenreID));
    } else setGenreFilter(genreFilter.concat(GenreID));
  };

  const toggleYearFilter = (year) => {
    if (yearFilter === year) setYearFilter(null);
    else setYearFilter(year);
  };

  const toggleDateAddedFilter = (dateAddedYear) => {
    if (dateAddedFilter === dateAddedYear) {
      setDateAddedFilter(null);
    } else setDateAddedFilter(dateAddedYear);
  };

  const toggleStudioFilter = (studio) => {
    if (studioFilter.includes(studio)) {
      setStudioFilter(without(studioFilter, studio));
    } else setStudioFilter(studioFilter.concat(studio));
  };

  const clearFilters = (replaceOptions) => {
    if (replaceOptions?.genreFilter) {
      setGenreFilter(replaceOptions.genreFilter);
    } else setGenreFilter([]);
    if (replaceOptions?.yearFilter) {
      setYearFilter(replaceOptions.yearFilter);
    } else setYearFilter(null);
    if (replaceOptions?.dateAddedFilter) {
      setDateAddedFilter(replaceOptions.dateAddedFilter);
    } else setDateAddedFilter(null);
    if (replaceOptions?.studioFilter) {
      setStudioFilter(replaceOptions?.studioFilter);
    } else setStudioFilter([]);
    setGenreFilterType(GENRE_FILTER_TYPES.AND);
    setSearchActorFilter([]);
  };

  const getData = (skipFilters) => {
    if (!movies && !actors && !genres) return null;
    if (
      skipFilters ||
      (genreFilter.length === 0 &&
        !yearFilter &&
        !dateAddedFilter &&
        searchActorFilter.length === 0)
    ) {
      return {
        movies,
        actors,
        genres,
        genreFilter,
        yearFilter,
        dateAddedFilter,
        studioFilter,
      };
    } else {
      const moviesFiltered = movies
        .filter((item) => {
          if (genreFilterType === GENRE_FILTER_TYPES.AND) {
            if (
              genreFilter.every((genre) => item.MovieGenres.includes(genre))
            ) {
              return item;
            }
          } else if (
            genreFilterType === GENRE_FILTER_TYPES.OR &&
            genreFilter.length > 0
          ) {
            if (genreFilter.some((genre) => item.MovieGenres.includes(genre))) {
              return item;
            }
          } else return item;
        })
        .filter((item) => {
          if (yearFilter) {
            if (item.MovieYear === yearFilter) {
              return item;
            }
          } else return item;
        })
        .filter((item) => {
          if (dateAddedFilter) {
            if (dayjs(item.MovieAdded).year() === dateAddedFilter) {
              return item;
            }
          } else return item;
        })
        .filter((item) => {
          if (studioFilter.length > 0) {
            if (studioFilter.includes(item.MovieStudio)) return item;
          } else return item;
        })
        .filter((item) => {
          if (searchActorFilter.length !== 0) {
            if (
              item.MovieActors.some((actorId) =>
                searchActorFilter.some(
                  (searchActor) => searchActor.ActorID === actorId
                )
              )
            ) {
              return item;
            }
          } else return item;
        });
      const actorsInMovies = uniq(
        flatten(moviesFiltered.map((movie) => movie.MovieActors))
      );
      const actorsFiltered = actors.filter((actor) => {
        if (actorsInMovies.includes(actor.ActorID)) {
          let numOfFilteredMovies = 0;
          let numOfFilteredPlays = 0;
          moviesFiltered.map((item) => {
            if (item.MovieActors.includes(actor.ActorID)) {
              numOfFilteredMovies++;
              numOfFilteredPlays += item.MoviePlays;
            }
          });
          actor.ActorMovies = numOfFilteredMovies;
          actor.ActorPlays = numOfFilteredPlays;
        }
      });
      return {
        movies: moviesFiltered,
        actors: actorsFiltered,
        genres: genres,
        genreFilter: genreFilter,
        yearFilter: yearFilter,
        dateAddedFilter: dateAddedFilter,
        studioFilter: studioFilter,
      };
    }
  };

  const getMovieIDForNewMovie = () => {
    if (movies) {
      const lastID = get(
        last(movies.sort((a, b) => a.MovieID - b.MovieID)),
        "MovieID"
      );
      if (lastID) return lastID + 1;
    }
    const min = Math.ceil(10000);
    const max = Math.floor(100000);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const years = () => {
    return movies ? uniq(movies.map((item) => item.MovieYear)).sort() : [];
  };

  const dateAddedYears = () => {
    return movies
      ? uniq(movies.map((item) => dayjs(item.MovieAdded).year())).sort()
      : [];
  };

  const studios = () => {
    if (movies) {
      const studioArray = without(
        uniq(movies.map((item) => item.MovieStudio).sort()),
        ""
      );
      return studioArray.map((item) => {
        return {
          MovieStudioName: item,
          MovieStudioMovies: movies.filter(
            (movieItem) => movieItem.MovieStudio === item
          ).length,
          MovieStudioPlays: compact(
            movies.map((movieItem) => {
              if (movieItem.MovieStudio === item) return movieItem.MoviePlays;
            })
          ).reduce((acc, current) => acc + current, 0),
        };
      });
    }
    return [];
  };

  const handleRequestSort = (event, property, direction) => {
    setCustomOrderBy("");
    const isAsc = orderBy === property && order === "asc";
    const getDirection = () => {
      if (direction) return direction;
      return isAsc ? "desc" : "asc";
    };
    setOrder(getDirection());
    setOrderBy(property);
  };

  const handleCustomSort = (event) => {
    setCustomOrderBy(event.target.value);
  };

  const sortData = (array, overrideOrderBy) => {
    return array.sort((a, b) => {
      if (a[orderBy] === "") {
        return 1;
      }
      if (b[orderBy] === "") {
        return -1;
      }

      const comparison = () => overrideOrderBy || orderBy;

      if (b[comparison()] < a[comparison()]) {
        return order === "desc" ? -1 : 1;
      }
      if (b[comparison()] > a[comparison()]) {
        return order === "desc" ? 1 : -1;
      }

      if (b.MovieAdded && a.MovieAdded) {
        if (b.MovieAdded < a.MovieAdded) return order === "desc" ? -1 : 1;
        if (b.MovieAdded > a.MovieAdded) return order === "desc" ? 1 : -1;
      }
      return 0;
    });
  };

  const resetSort = (movieView) => {
    handleCustomSort({ target: { value: "" } });
    if (!movieView && orderBy && orderBy.includes("Movie")) {
      handleRequestSort(null, "ActorName", "asc");
    } else if (movieView && orderBy && orderBy.includes("Actor")) {
      handleRequestSort(null, "MovieName", "asc");
    }
  };

  const setSnackbar = (msg, error) => {
    if (error) setSnackbarError(true);
    else setSnackbarError(false);
    setSnackbarMessage(msg);
    setSnackbarOpen(true);
    setTimeout(() => setSnackbarOpen(false), 3000);
  };

  return (
    <AppRouter
      getData={getData}
      toggleGenreFilter={toggleGenreFilter}
      genreFilterType={genreFilterType}
      setGenreFilterType={setGenreFilterType}
      toggleYearFilter={toggleYearFilter}
      toggleDateAddedFilter={toggleDateAddedFilter}
      toggleStudioFilter={toggleStudioFilter}
      searchActorFilter={searchActorFilter}
      setSearchActorFilter={setSearchActorFilter}
      clearFilters={clearFilters}
      years={years}
      dateAddedYears={dateAddedYears}
      studios={studios}
      getMovieIDForNewMovie={getMovieIDForNewMovie}
      handleRequestSort={handleRequestSort}
      handleCustomSort={handleCustomSort}
      sortData={sortData}
      resetSort={resetSort}
      submitMovie={submitMovie}
      submitActor={submitActor}
      play={play}
      setSnackbar={setSnackbar}
      order={order}
      orderBy={orderBy}
      customOrderBy={customOrderBy}
      snackbarOpen={snackbarOpen}
      snackbarMessage={snackbarMessage}
      snackbarError={snackbarError}
    />
  );
};

export default App;
