import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import { withStyles } from "@material-ui/core/styles";

import MovieGrid from "../Components/MovieGrid";

const styles = (theme) => ({
  inputContainer: {
    marginBottom: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  fullWidth: {
    maxWidth: "100%",
  },
  button: {
    color: theme.palette.secondary.main,
  },
  infoContainer: {
    margin: `${theme.spacing(1)}px 0`,
  },
});

const Actor = ({
  data,
  match,
  classes,
  history,
  submitActor,
  handleRequestSort,
  handleCustomSort,
  sortData,
  order,
  orderBy,
  customOrderBy,
}) => {
  useEffect(() => {
    const previousViewSortOrderBy = orderBy;
    const previousViewOrder = order;
    handleRequestSort(null, "MovieYear", "desc");
    return () => {
      handleRequestSort(null, previousViewSortOrderBy, previousViewOrder);
    };
  }, []);

  let actorMovies = {
    movies: [],
  };

  const selectedActor =
    match.params.id && data && data.actors
      ? data.actors.find((item) => item.ActorID.toString() === match.params.id)
      : null;
  actorMovies.movies =
    selectedActor &&
    data.movies.filter((movie) =>
      movie.MovieActors.includes(selectedActor.ActorID)
    );
  const actorYears =
    selectedActor && actorMovies.movies.map((item) => item.MovieYear);
  const actorGenres =
    selectedActor && actorMovies.movies.map((item) => item.MovieGenres);

  return (
    <Formik
      initialValues={
        selectedActor
          ? {
              ActorID: selectedActor.ActorID,
              ActorName: selectedActor.ActorName,
              ActorBirthday: selectedActor.ActorBirthday,
              ActorAdded: selectedActor.ActorAdded,
            }
          : {
              ActorID: "",
              ActorName: "",
              ActorBirthday: "",
              ActorAdded: dayjs(),
            }
      }
      onSubmit={submitActor}
      enableReinitialize
    >
      {({ values, handleChange }) => (
        <Form>
          <Grid container spacing={2} className={classes.inputContainer}>
            <Grid item xs={6}>
              {selectedActor && (
                <img
                  className={classes.fullWidth}
                  src={`http://localhost:8080/images/actor/${selectedActor.ActorName}.jpg`}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Name"
                inputProps={{ name: "ActorName" }}
                fullWidth
                className={classes.input}
                value={values.ActorName}
                component={TextField}
                onChange={handleChange}
              />
              <Field
                label="Birthday"
                inputProps={{ name: "ActorBirthday" }}
                fullWidth
                className={classes.input}
                value={values.ActorBirthday}
                component={TextField}
                onChange={handleChange}
              />
              <div className={classes.infoContainer}>
                <Typography>
                  {selectedActor && `Plays: ${selectedActor.ActorPlays}`}
                </Typography>
                <Typography>
                  {selectedActor && `Movies: ${selectedActor.ActorMovies}`}
                </Typography>
                <Typography>
                  {selectedActor &&
                    `Years: ${uniq(actorYears)
                      .sort()
                      .toString()
                      .replace(/,/g, ", ")}`}
                </Typography>
                <Typography>
                  {selectedActor &&
                    `Genres: ${uniq(flatten(actorGenres))
                      .map(
                        (movieGenre) =>
                          `${
                            data.genres.find(
                              (genre) => genre.GenreID === movieGenre
                            )?.GenreName
                          }`
                      )
                      .toString()
                      .replace(/,/g, ", ")}`}
                </Typography>
                <Typography>
                  {selectedActor &&
                    `Date added: ${dayjs(selectedActor.ActorAdded).format(
                      "DD.MM.YYYY HH:mm:ss"
                    )}`}
                </Typography>
              </div>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
          {selectedActor && (
            <MovieGrid
              data={actorMovies}
              history={history}
              handleRequestSort={handleRequestSort}
              handleCustomSort={handleCustomSort}
              sortData={sortData}
              order={order}
              orderBy={orderBy}
              customOrderBy={customOrderBy}
              movieView
              actorMovieGrid
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default withStyles(styles)(Actor);
