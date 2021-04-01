import React, { useState, useEffect } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { makeStyles } from "@material-ui/core/styles";
import MuiGrid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import InfoChip from "../Components/InfoChip";
import SortBar from "../Components/SortBar";
import FullScreenDialog from "../Components/FullScreenDialog";
import Cover from "../Components/Cover";

import { ROUTES } from "../constants";
import { getAppWidth } from "../utils";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "100%",
    height: "100%",
    cursor: "pointer",
    objectFit: "cover",
  },
  grow: {
    transition: "all .2s linear",
    "&:hover": {
      transform: "scale(1.2)",
      zIndex: 1,
    },
  },
  firstItem: {
    "&:hover": {
      transform: "scale(1.2) translate(40px)",
    },
  },
  lastItem: {
    "&:hover": {
      transform: "scale(1.2) translate(-40px)",
    },
  },
  rotate: {
    transition: "all .5s linear",
    transform: (props) => `rotateY(${props.rotateCover}deg)`,
  },
  spines: {
    maxWidth: "28px",
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
  flex: {
    display: "flex",
  },
  coverGridItem: {
    maxHeight: "290px",
  },
  relative: {
    position: "relative",
  },
  overflowHidden: {
    overflowX: "hidden",
  },
  blankCover: {
    width: "25px",
    height: "100%",
  },
  lean: {
    transition: "all .05s linear",
    transform: "rotate(-7deg)",
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
  const [movieCoverToRotate, setMovieCoverToRotate] = useState(null);
  const [rotateCover, setRotateCover] = useState(0);
  const [rotationInTransition, setRotationInTransition] = useState(false);

  const classes = useStyles({ rotateCover });

  useEffect(() => {
    if (!actorMovieGrid) resetSort(movieView);
  }, [movieView]);

  const setTab = (event, value) => {
    setActiveTab(value);
  };

  const getImageSrc = (id) => {
    if (activeTab === "Spines") {
      return `http://localhost:8080/images/movie/${id}.jpg?spine=true`;
    } else if (activeTab === "Covers") {
      if (movieCoverToRotate === id) {
        if (rotationInTransition && rotateCover === 180) {
          return `http://localhost:8080/images/movie/${id}.jpg`;
        } else if (!rotationInTransition && rotateCover === 180) {
          return `http://localhost:8080/images/thumbnails/${id}.jpg?w=650`;
        } else if (rotationInTransition && rotateCover === 0) {
          return `http://localhost:8080/images/thumbnails/${id}.jpg?w=650`;
        } else if (!rotationInTransition && rotateCover === 0) {
          return `http://localhost:8080/images/movie/${id}.jpg`;
        }
      } else {
        return `http://localhost:8080/images/movie/${id}.jpg`;
      }
    } else if (activeTab === "Thumbnails") {
      return `http://localhost:8080/images/thumbnails/${id}.jpg?w=650`;
    }
  };

  const handleRotationTransition = () => {
    setRotationInTransition(true);
    const timeout = setTimeout(() => {
      setRotationInTransition(false);
      clearTimeout(timeout);
    }, 1);
  };

  const getGridItemSize = () => {
    if (activeTab === "Spines") return "auto";
    else if (actorMovieGrid) return 3;
    return 2;
  };

  const growAnim = () => {
    if (!actorMovieGrid) return true;
    else if (activeTab === "Spines") return true;
    return false;
  };

  const shouldLean = (index) => {
    if (index > showCover?.index) {
      const rect = document
        ?.getElementById(`Spines${index}`)
        ?.getBoundingClientRect();
      return activeTab === "Spines" && rect?.y - coverRect?.elementY < 100;
    }
    return false;
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
        <MuiGrid
          container
          className={classNames(classes.gridContainer, classes.overflowHidden)}
        >
          {data &&
            sortData(data.movies).map((movie, index) => (
              <MuiGrid
                item
                key={movie.MovieID}
                xs={getGridItemSize()}
                className={classNames(classes.flex, classes.relative, {
                  [classes.coverGridItem]:
                    activeTab === "Covers" && !actorMovieGrid,
                })}
                onClick={(e) => {
                  if (activeTab === "Spines") {
                    const eventRect = e.target.getBoundingClientRect();
                    const eventRectWidth = eventRect.width / 2;
                    const eventRectHeight = eventRect.height / 2;
                    const elementRect = document
                      ?.getElementById(`Spines${index}`)
                      ?.getBoundingClientRect();

                    setShowCover(Object.assign(movie, { index: index }));
                    setCoverRect({
                      // prettier-ignore
                      x: ((eventRect?.x + eventRectWidth) / getAppWidth()) * 2 - 1,
                      // prettier-ignore
                      y: -((eventRect?.y + eventRectHeight) / window.innerHeight) * 2 + 1,
                      elementY: elementRect?.y,
                    });
                  } else {
                    history.push(`${ROUTES.MOVIE}/${movie.MovieID}`);
                  }
                }}
              >
                <div
                  className={classNames({
                    [classes.grow]: growAnim(),
                    [classes.firstItem]:
                      index % 6 === 0 &&
                      activeTab === "Covers" &&
                      !actorMovieGrid,
                    [classes.lastItem]:
                      (index + 1) % 6 === 0 &&
                      activeTab === "Covers" &&
                      !actorMovieGrid,
                  })}
                  onMouseLeave={() => {
                    if (rotateCover === 180) {
                      setRotateCover(0);
                      handleRotationTransition();
                    }
                  }}
                >
                  {showCover?.MovieName === movie.MovieName &&
                  activeTab === "Spines" ? (
                    <div className={classes.blankCover} />
                  ) : (
                    <img
                      id={`Spines${index}`}
                      className={classNames(classes.image, {
                        [classes.spines]: activeTab === "Spines",
                        [classes.lean]: shouldLean(index),
                        [classes.rotate]:
                          movieCoverToRotate === movie.MovieName,
                      })}
                      src={getImageSrc(movie.MovieName)}
                    />
                  )}
                  {activeTab === "Covers" && (
                    <InfoChip
                      label={`${movie.MovieName}
                        Year: ${movie.MovieYear}
                        Plays: ${movie.MoviePlays}
                        Date added: ${dayjs(movie.MovieAdded).format(
                          "DD.MM.YYYY"
                        )}`}
                      onDelete={() => {
                        setMovieCoverToRotate(movie.MovieName);
                        setRotateCover(rotateCover === 180 ? 0 : 180);
                        handleRotationTransition();
                      }}
                      size="medium"
                      moveDown
                      spinner
                    />
                  )}
                </div>
              </MuiGrid>
            ))}
        </MuiGrid>
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
                  src={getImageSrc(movie.MovieName)}
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
