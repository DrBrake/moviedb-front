import React from "react";
import { Switch, Router, Redirect } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import { ROUTES } from "../constants";
import { Movie, Actor, List, Grid, Stats } from "../Views";
import Navigation from "./Navigation";
import ScrollToTop from "./ScrollToTop";

const browserHistory = createBrowserHistory();

const styles = (theme) => ({
  snackbar: {
    background: theme.palette.primary.main,
  },
  snackbarError: {
    background: theme.palette.error.main,
  },
});

const AppRouter = ({
  getData,
  toggleGenreFilter,
  genreFilterType,
  setGenreFilterType,
  toggleYearFilter,
  toggleDateAddedFilter,
  toggleStudioFilter,
  searchActorFilter,
  setSearchActorFilter,
  clearFilters,
  years,
  dateAddedYears,
  studios,
  getMovieIDForNewMovie,
  handleRequestSort,
  handleCustomSort,
  sortData,
  resetSort,
  submitMovie,
  submitActor,
  play,
  order,
  orderBy,
  customOrderBy,
  snackbarOpen,
  snackbarMessage,
  snackbarError,
  classes,
  setSnackbar,
}) => {
  return (
    <Router history={browserHistory}>
      <React.Fragment>
        <Navigation
          filteredData={getData()}
          unFilteredData={getData(true)}
          toggleGenreFilter={toggleGenreFilter}
          genreFilterType={genreFilterType}
          setGenreFilterType={setGenreFilterType}
          toggleYearFilter={toggleYearFilter}
          toggleDateAddedFilter={toggleDateAddedFilter}
          toggleStudioFilter={toggleStudioFilter}
          searchActorFilter={searchActorFilter}
          setSearchActorFilter={setSearchActorFilter}
          clearFilters={clearFilters}
          years={years()}
          dateAddedYears={dateAddedYears()}
          studios={studios()}
        />
        <ScrollToTop>
          <Switch>
            <Route exact path={ROUTES.ROOT}>
              <Redirect to={ROUTES.MOVIE} />
            </Route>
            <Route
              exact
              path={ROUTES.MOVIE}
              render={(props) => (
                <Movie
                  data={getData()}
                  submitMovie={submitMovie}
                  getMovieIDForNewMovie={getMovieIDForNewMovie}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${ROUTES.MOVIE}${ROUTES.LIST}`}
              render={(props) => (
                <List
                  data={getData()}
                  movieView
                  handleRequestSort={handleRequestSort}
                  handleCustomSort={handleCustomSort}
                  sortData={sortData}
                  resetSort={resetSort}
                  order={order}
                  orderBy={orderBy}
                  customOrderBy={customOrderBy}
                  searchActorFilter={searchActorFilter}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${ROUTES.MOVIE}${ROUTES.GRID}`}
              render={(props) => (
                <Grid
                  data={getData()}
                  movieView
                  handleRequestSort={handleRequestSort}
                  handleCustomSort={handleCustomSort}
                  sortData={sortData}
                  resetSort={resetSort}
                  order={order}
                  orderBy={orderBy}
                  customOrderBy={customOrderBy}
                  searchActorFilter={searchActorFilter}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${ROUTES.MOVIE}/:id`}
              render={(props) => (
                <Movie
                  data={getData()}
                  submitMovie={submitMovie}
                  play={play}
                  getMovieIDForNewMovie={getMovieIDForNewMovie}
                  setSnackbar={setSnackbar}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.ACTOR}
              render={(props) => (
                <Actor
                  data={getData()}
                  submitActor={submitActor}
                  handleRequestSort={handleRequestSort}
                  handleCustomSort={handleCustomSort}
                  order={order}
                  orderBy={orderBy}
                  customOrderBy={customOrderBy}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${ROUTES.ACTOR}${ROUTES.LIST}`}
              render={(props) => (
                <List
                  data={getData()}
                  movieView={false}
                  handleRequestSort={handleRequestSort}
                  handleCustomSort={handleCustomSort}
                  sortData={sortData}
                  resetSort={resetSort}
                  order={order}
                  orderBy={orderBy}
                  customOrderBy={customOrderBy}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${ROUTES.ACTOR}${ROUTES.GRID}`}
              render={(props) => (
                <Grid
                  data={getData()}
                  movieView={false}
                  handleRequestSort={handleRequestSort}
                  handleCustomSort={handleCustomSort}
                  sortData={sortData}
                  resetSort={resetSort}
                  order={order}
                  orderBy={orderBy}
                  customOrderBy={customOrderBy}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${ROUTES.ACTOR}/:id`}
              render={(props) => (
                <Actor
                  data={getData()}
                  submitActor={submitActor}
                  handleRequestSort={handleRequestSort}
                  handleCustomSort={handleCustomSort}
                  sortData={sortData}
                  order={order}
                  orderBy={orderBy}
                  customOrderBy={customOrderBy}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.STATS}
              render={(props) => (
                <Stats
                  data={getData(true)}
                  clearFilters={clearFilters}
                  years={years()}
                  dateAddedYears={dateAddedYears()}
                  studios={studios()}
                  handleRequestSort={handleRequestSort}
                  sortData={sortData}
                  order={order}
                  orderBy={orderBy}
                  {...props}
                />
              )}
            />
          </Switch>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            ContentProps={{
              classes: {
                root: snackbarError ? classes.snackbarError : classes.snackbar,
              },
            }}
            open={snackbarOpen}
            message={snackbarMessage}
          />
        </ScrollToTop>
      </React.Fragment>
    </Router>
  );
};

export default withStyles(styles)(AppRouter);
