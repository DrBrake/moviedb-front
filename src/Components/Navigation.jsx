import React, { useState } from "react";
import { withRouter } from "react-router";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import Grid from "@material-ui/core/Grid";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import SearchMenuItem from "../Components/SearchMenuItem";
import OverallStats from "../Components/OverallStats";
import {
  Add,
  Movie,
  Actor,
  GridOn,
  List,
  Filter,
  Stats,
  Random,
} from "./Icons";
import { ROUTES, GENRE_FILTER_TYPES } from "../constants";

const styles = (theme) => ({
  container: {
    borderBottom: `1px solid ${theme.palette.secondary.dark}`,
    marginBottom: theme.spacing(1),
  },
  icon: {
    cursor: "pointer",
  },
  verticalDivider: {
    height: theme.spacing(3),
    width: "1px",
    background: theme.palette.secondary.dark,
  },
  input: {
    height: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
  chip: {
    margin: "4px",
  },
  selected: {
    color: theme.palette.secondary.main,
  },
  muiDivider: {
    margin: `${theme.spacing(2)}px 0`,
  },
  doubleBottomMargin: {
    marginBottom: theme.spacing(2),
  },
  actorInput: {
    marginBottom: theme.spacing(2),
    display: "block",
    maxWidth: theme.spacing(25),
  },
  searchButton: {
    color: theme.palette.secondary.main,
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  actorSearchPopper: {
    minWidth: theme.spacing(25),
  },
  actorSearchChip: {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
});

const Navigation = ({
  classes,
  children,
  history,
  location,
  filteredData,
  unFilteredData,
  toggleGenreFilter,
  genreFilterType,
  setGenreFilterType,
  toggleYearFilter,
  toggleDateAddedFilter,
  toggleStudioFilter,
  clearFilters,
  years,
  dateAddedYears,
  studios,
  searchActorFilter,
  setSearchActorFilter,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [actorSearchOpen, setActorSearchOpen] = useState(false);
  const [actorSearchAnchorEl, setactorSearchAnchorEl] = useState(null);
  const [actorSearchValue, setActorSearchValue] = useState("");

  const getMovieRoute = () => {
    if (location.pathname.includes(ROUTES.LIST)) {
      return `${ROUTES.MOVIE}${ROUTES.LIST}`;
    } else if (location.pathname.includes(ROUTES.GRID)) {
      return `${ROUTES.MOVIE}${ROUTES.GRID}`;
    } else {
      return ROUTES.MOVIE;
    }
  };

  const getActorRoute = () => {
    if (location.pathname.includes(ROUTES.LIST)) {
      return `${ROUTES.ACTOR}${ROUTES.LIST}`;
    } else if (location.pathname.includes(ROUTES.GRID)) {
      return `${ROUTES.ACTOR}${ROUTES.GRID}`;
    } else {
      return ROUTES.ACTOR;
    }
  };

  const getListRoute = () => {
    if (location.pathname.includes(ROUTES.LIST)) {
      return location.pathname.includes(ROUTES.MOVIE)
        ? ROUTES.MOVIE
        : ROUTES.ACTOR;
    } else {
      return location.pathname.includes(ROUTES.MOVIE)
        ? `${ROUTES.MOVIE}${ROUTES.LIST}`
        : `${ROUTES.ACTOR}${ROUTES.LIST}`;
    }
  };

  const getGridRoute = () => {
    if (location.pathname.includes(ROUTES.GRID)) {
      return location.pathname.includes(ROUTES.MOVIE)
        ? ROUTES.MOVIE
        : ROUTES.ACTOR;
    } else {
      return location.pathname.includes(ROUTES.MOVIE)
        ? `${ROUTES.MOVIE}${ROUTES.GRID}`
        : `${ROUTES.ACTOR}${ROUTES.GRID}`;
    }
  };

  const getRandomEntry = () => {
    if (filteredData.length > 0) {
      const min = Math.ceil(0);
      const max = location.pathname.includes(ROUTES.ACTOR)
        ? Math.floor(filteredData.actors.length)
        : Math.floor(filteredData.movies.length);
      const rndIndex = Math.floor(Math.random() * (max - min)) + min;
      return location.pathname.includes(ROUTES.ACTOR)
        ? `${ROUTES.ACTOR}/${filteredData.actors[rndIndex].ActorID}`
        : `${ROUTES.MOVIE}/${filteredData.movies[rndIndex].MovieID}`;
    }
  };

  const sortGenres = (filteredData) => {
    return filteredData.sort((a, b) => {
      if (a.GenreName < b.GenreName) return -1;
      else if (a.GenreName > b.GenreName) return 1;
      return 0;
    });
  };

  const searchActors = (searchValue) => {
    return unFilteredData?.actors?.filter((actor) =>
      actor?.ActorName?.toLowerCase()?.includes(
        searchValue?.trim()?.toLowerCase()
      )
    );
  };

  const filterActive =
    filteredData &&
    (filteredData.genreFilter.length !== 0 ||
      filteredData.yearFilter ||
      filteredData.dateAddedFilter ||
      filteredData.studioFilter.length !== 0 ||
      searchActorFilter.length !== 0);

  return (
    <React.Fragment>
      <Grid container wrap="nowrap" spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Add
            className={classes.icon}
            onClick={() =>
              history.push(
                location.pathname.includes(ROUTES.MOVIE)
                  ? ROUTES.MOVIE
                  : ROUTES.ACTOR
              )
            }
          />
        </Grid>
        <Grid item>
          <Movie
            className={classes.icon}
            color={
              location.pathname.includes(ROUTES.MOVIE) ? "primary" : "inherit"
            }
            onClick={() => history.push(getMovieRoute())}
          />
        </Grid>
        <Grid item>
          <Actor
            className={classes.icon}
            color={
              location.pathname.includes(ROUTES.ACTOR) ? "primary" : "inherit"
            }
            onClick={() => history.push(getActorRoute())}
          />
        </Grid>
        <Grid item>
          <div className={classes.verticalDivider} />
        </Grid>
        <Grid item>
          <List
            className={classes.icon}
            color={
              location.pathname.includes(ROUTES.LIST) ? "primary" : "inherit"
            }
            onClick={() => history.push(getListRoute())}
          />
        </Grid>
        <Grid item>
          <GridOn
            className={classes.icon}
            color={
              location.pathname.includes(ROUTES.GRID) ? "primary" : "inherit"
            }
            onClick={() => history.push(getGridRoute())}
          />
        </Grid>
        <Grid item>
          <div className={classes.verticalDivider} />
        </Grid>
        <Grid item>
          <Stats
            className={classes.icon}
            color={
              location.pathname.includes(ROUTES.STATS) ? "primary" : "inherit"
            }
            onClick={() => history.push(ROUTES.STATS)}
          />
        </Grid>
        <Grid item>
          <Random
            className={classes.icon}
            onClick={() => history.push(getRandomEntry())}
          />
        </Grid>
        <Grid item>
          <div className={classes.verticalDivider} />
        </Grid>
        <Grid item>
          <Filter
            aria-describedby="genreFilter"
            className={classes.icon}
            onClick={(e) => {
              setFilterOpen(!filterOpen);
              setFilterAnchorEl(e.currentTarget);
            }}
            color={filterActive ? "primary" : "inherit"}
          />
          <Popper id="genreFilter" open={filterOpen} anchorEl={filterAnchorEl}>
            <ClickAwayListener
              onClickAway={() => {
                setFilterOpen(false);
                setactorSearchAnchorEl(null);
                setActorSearchOpen(false);
              }}
            >
              <Paper elevation={3} className={classes.paper}>
                <OverallStats data={filteredData} showFilteredGenres />
                <Chip
                  key={uuidv4()}
                  label="Clear filters"
                  className={classNames(
                    classes.chip,
                    classes.doubleBottomMargin,
                    {
                      [classes.selected]: filterActive,
                    }
                  )}
                  clickable
                  onClick={() => clearFilters()}
                  color={filterActive ? "primary" : "default"}
                />
                <ClickAwayListener
                  onClickAway={() => {
                    setActorSearchOpen(false);
                  }}
                >
                  <TextField
                    id="actorSearchTextField"
                    value={actorSearchValue}
                    label="Actors"
                    className={classes.actorInput}
                    onFocus={(e) => {
                      if (e.target.value.trim() !== "") {
                        setActorSearchOpen(true);
                        setactorSearchAnchorEl(e.currentTarget);
                      }
                    }}
                    onChange={(e) => {
                      setActorSearchValue(e.target.value);
                      setActorSearchOpen(e.target.value.trim() !== "");
                      setactorSearchAnchorEl(e.currentTarget);
                    }}
                  />
                </ClickAwayListener>
                <Popper
                  id="actorSearch"
                  open={actorSearchOpen}
                  anchorEl={actorSearchAnchorEl}
                  className={classes.actorSearchPopper}
                >
                  <Paper elevation={3} className={classNames(classes.paper)}>
                    {searchActors(actorSearchValue).map((item) => (
                      <SearchMenuItem
                        key={uuidv4()}
                        name={item.ActorName}
                        onClick={() => {
                          if (
                            !searchActorFilter.some(
                              (actor) => actor.ActorID === item.ActorID
                            )
                          ) {
                            setSearchActorFilter(
                              searchActorFilter.concat(item)
                            );
                          }
                        }}
                      />
                    ))}
                  </Paper>
                </Popper>
                <div className={classes.doubleBottomMargin}>
                  {searchActorFilter.map((actor) => (
                    <Chip
                      key={uuidv4()}
                      label={actor.ActorName}
                      color="primary"
                      className={classNames(classes.actorSearchChip)}
                      onDelete={() =>
                        setSearchActorFilter(
                          searchActorFilter.filter(
                            (item) => item.ActorID !== actor.ActorID
                          )
                        )
                      }
                    />
                  ))}
                </div>
                <Typography>Genres</Typography>
                <div>
                  <Chip
                    key={uuidv4()}
                    label="AND"
                    className={classNames(classes.chip, {
                      [classes.selected]:
                        genreFilterType === GENRE_FILTER_TYPES.AND,
                    })}
                    clickable
                    onClick={() => setGenreFilterType(GENRE_FILTER_TYPES.AND)}
                    color={
                      genreFilterType === GENRE_FILTER_TYPES.AND
                        ? "primary"
                        : "default"
                    }
                  />
                  <Chip
                    key={uuidv4()}
                    label="OR"
                    className={classNames(classes.chip, {
                      [classes.selected]:
                        genreFilterType === GENRE_FILTER_TYPES.OR,
                    })}
                    clickable
                    onClick={() => setGenreFilterType(GENRE_FILTER_TYPES.OR)}
                    color={
                      genreFilterType === GENRE_FILTER_TYPES.OR
                        ? "primary"
                        : "default"
                    }
                  />
                </div>
                {filteredData &&
                  sortGenres(filteredData.genres).map((item) => (
                    <Chip
                      key={item.GenreID}
                      label={item.GenreName}
                      className={classNames(classes.chip, {
                        [classes.selected]: filteredData.genreFilter.includes(
                          item.GenreID
                        ),
                      })}
                      clickable
                      onClick={() => toggleGenreFilter(item.GenreID)}
                      color={
                        filteredData.genreFilter.includes(item.GenreID)
                          ? "primary"
                          : "default"
                      }
                    />
                  ))}
                <Divider className={classes.muiDivider} />
                <Typography>Years</Typography>
                {years.map((item) => (
                  <Chip
                    key={uuidv4()}
                    label={item}
                    className={classNames(classes.chip, {
                      [classes.selected]: filteredData.yearFilter === item,
                    })}
                    clickable
                    onClick={() => toggleYearFilter(item)}
                    color={
                      filteredData.yearFilter === item ? "primary" : "default"
                    }
                  />
                ))}
                <Divider className={classes.muiDivider} />
                <Typography>Date added</Typography>
                {dateAddedYears.map((item) => (
                  <Chip
                    key={uuidv4()}
                    label={item}
                    className={classNames(classes.chip, {
                      [classes.selected]: filteredData.dateAddedFilter === item,
                    })}
                    clickable
                    onClick={() => toggleDateAddedFilter(item)}
                    color={
                      filteredData.dateAddedFilter === item
                        ? "primary"
                        : "default"
                    }
                  />
                ))}
                <Divider className={classes.muiDivider} />
                <Typography>Studios</Typography>
                {studios.map((item) => (
                  <Chip
                    key={uuidv4()}
                    label={item.MovieStudioName}
                    className={classNames(classes.chip, {
                      [classes.selected]: filteredData.studioFilter.includes(
                        item.MovieStudioName
                      ),
                    })}
                    clickable
                    onClick={() => toggleStudioFilter(item.MovieStudioName)}
                    color={
                      filteredData.studioFilter.includes(item.MovieStudioName)
                        ? "primary"
                        : "default"
                    }
                  />
                ))}
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Grid>
      </Grid>
      {children}
    </React.Fragment>
  );
};

export default withStyles(styles)(withRouter(Navigation));
