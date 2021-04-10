import React, { useState, useEffect } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import MovieGridCovers from "./MovieGridCovers";
import InfoChip from "../InfoChip";
import SortBar from "../SortBar/SortBar";
import FullScreenDialog from "../FullScreenDialog";
import Cover from "../Cover";

import { ROUTES } from "../../constants";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "100%",
    height: "100%",
    cursor: "pointer",
    objectFit: "cover",
  },
  thumbGrid: {
    lineHeight: 0,
    columnCount: 3,
    columnGap: "0px",
    [theme.breakpoints.up("xl")]: {
      columnCount: 4,
    },
  },
  gridContainer: {
    paddingTop: "30px",
    paddingBottom: "120px",
  },
  relative: {
    position: "relative",
  },
}));

const MovieGrid = ({
  data,
  movieView,
  history,
  handleRequestSort,
  handleCustomSort,
  sortData,
  resetSort,
  order,
  orderBy,
  customOrderBy,
  actorMovieGrid,
}) => {
  const [activeTab, setActiveTab] = useState("Covers");
  const [showCover, setShowCover] = useState(null);
  const [coverRect, setCoverRect] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    if (!actorMovieGrid) resetSort(movieView);
  }, [movieView]);

  const setTab = (event, value) => {
    setActiveTab(value);
  };

  return (
    <React.Fragment>
      <Tabs value={activeTab} onChange={setTab} indicatorColor="primary">
        <Tab label="Covers" value="Covers" />
        <Tab label="Spines" value="Spines" />
        {<Tab label="Thumbnails" value="Thumbnails" />}
      </Tabs>
      <SortBar
        handleRequestSort={handleRequestSort}
        handleCustomSort={handleCustomSort}
        order={order}
        orderBy={orderBy}
        customOrderBy={customOrderBy}
        movieView
      />
      {showCover && (
        <FullScreenDialog open={showCover} onClose={() => setShowCover(null)}>
          <Cover movie={showCover} coverRect={coverRect} history={history} />
        </FullScreenDialog>
      )}
      {activeTab === "Covers" || activeTab === "Spines" ? (
        <MovieGridCovers
          data={data}
          movieView={movieView}
          history={history}
          sortData={sortData}
          resetSort={resetSort}
          actorMovieGrid={actorMovieGrid}
          activeTab={activeTab}
          coverRect={coverRect}
          setCoverRect={setCoverRect}
        />
      ) : (
        <div className={classNames(classes.gridContainer, classes.thumbGrid)}>
          {data &&
            sortData(data.movies).map((movie) => (
              <div key={movie.MovieID} className={classes.relative}>
                <img
                  onClick={() =>
                    history.push(`${ROUTES.MOVIE}/${movie.MovieID}`)
                  }
                  className={classes.image}
                  src={`http://localhost:8080/images/thumbnails/${movie.MovieName}.jpg?w=650`}
                />
                <InfoChip
                  label={`${movie.MovieName}
                    Year: ${movie.MovieYear}
                    Plays: ${movie.MoviePlays}
                    Date added: ${dayjs(movie.MovieAdded).format(
                      "DD.MM.YYYY"
                    )}`}
                  moveDown
                />
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default MovieGrid;
