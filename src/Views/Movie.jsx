import React from "react";
import classNames from "classnames";
import { Formik, Form, Field, FieldArray } from "formik";
import dayjs from "dayjs";
import first from "lodash/first";
import { v4 as uuidv4 } from "uuid";
import copy from "copy-to-clipboard";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { ROUTES, FILES_LOCATION } from "../constants";
import { Close } from "../Components/Icons";
import InfoChip from "../Components/InfoChip";

const ACTOR_IMAGE_HEIGHT = 256;

const styles = (theme) => ({
  container: {
    maxWidth: "1600px",
    margin: "auto",
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  image: {
    width: "100%",
  },
  button: {
    color: theme.palette.secondary.main,
  },
  textButton: {
    color: theme.palette.primary.main,
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  actorImage: {
    maxHeight: `${ACTOR_IMAGE_HEIGHT}px`,
    cursor: "pointer",
  },
  locationText: {
    color: theme.palette.secondary.dark,
  },
  actorGridItem: {
    position: "relative",
  },
  hidden: {
    display: "none",
  },
  pointer: {
    cursor: "pointer",
  },
  select: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: "rgb(168, 73, 107)",
    },
  },
  selectMenu: {
    padding: `9px ${theme.spacing(2)} 8.5px ${theme.spacing(2)}`,
  },
  menuItem: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "&$selected, &$selected:hover": {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: "rgb(168, 73, 107)",
      },
    },
  },
  buttonContainer: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  playsContainer: {
    margin: `${theme.spacing(1)}px 0`,
  },
  movieLocationContainer: {
    display: "flex",
    alignItems: "center",
  },
  thumbnail: {
    maxWidth: "100%",
  },
  selected: {},
});

const Movie = ({
  data,
  classes,
  match,
  history,
  submitMovie,
  play,
  getMovieIDForNewMovie,
  setSnackbar,
}) => {
  const selectedMovie =
    match.params.id && data && data.movies
      ? data.movies.find((item) => item.MovieID.toString() === match.params.id)
      : null;

  const setFileAdded = (e, setFieldValue, locations) => {
    const files = e.target.files;
    if (files) {
      const movieLocations = locations || [];
      for (let i = 0; i < files.length; i++) {
        movieLocations.push(files[i].name);
      }
      setFieldValue("MovieLocation", movieLocations);
    }
  };

  const getActorImage = (movieActor) => {
    const actorName = data.actors.find((actor) => actor.ActorID === movieActor)
      ?.ActorName;
    return (
      <Grid item key={movieActor.ActorID} className={classes.actorGridItem}>
        {actorName && (
          <React.Fragment>
            <img
              src={`http://localhost:8080/images/actor/${actorName}.jpg?h=${ACTOR_IMAGE_HEIGHT}`}
              onClick={() => history.push(`${ROUTES.ACTOR}/${movieActor}`)}
              className={classes.actorImage}
            />
            <InfoChip label={actorName} />
          </React.Fragment>
        )}
      </Grid>
    );
  };

  const getCover = (selectedMovie) => {
    if (selectedMovie) {
      return (
        <img
          src={`http://localhost:8080/images/movie/${selectedMovie.MovieName}.jpg`}
          className={classes.image}
        />
      );
    }
    return null;
  };

  const getThumbnail = (selectedMovie) => {
    if (selectedMovie) {
      return (
        <img
          src={`http://localhost:8080/images/thumbnails/${selectedMovie.MovieName}.jpg`}
          className={classes.thumbnail}
        />
      );
    }
    return null;
  };

  return (
    <Formik
      initialValues={
        selectedMovie
          ? {
              MovieID: selectedMovie.MovieID,
              MovieName: selectedMovie.MovieName,
              MovieStudio: selectedMovie.MovieStudio,
              MovieYear: selectedMovie.MovieYear,
              MovieGenres: selectedMovie.MovieGenres.map(
                (movieGenre) =>
                  `${
                    data.genres.find((genre) => genre.GenreID === movieGenre)
                      ?.GenreName
                  }`
              )
                .toString()
                .replace(/,/g, ", "),
              MovieActors: selectedMovie.MovieActors.map(
                (movieActor) =>
                  `${
                    data.actors.find((actor) => actor.ActorID === movieActor)
                      ?.ActorName
                  }`
              )
                .toString()
                .replace(/,/g, ", "),
              MovieAdded: selectedMovie.MovieAdded,
              MoviePlays: selectedMovie.MoviePlays,
              MovieLocation: selectedMovie.MovieLocation,
            }
          : {
              MovieID: getMovieIDForNewMovie(),
              MovieName: "",
              MovieStudio: "",
              MovieYear: "",
              MovieGenres: "",
              MovieActors: "",
              MovieAdded: dayjs(),
              MoviePlays: 0,
              MovieLocation: [],
            }
      }
      onSubmit={submitMovie}
      enableReinitialize
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {getCover(selectedMovie)}
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Name"
                inputProps={{ name: "MovieName" }}
                fullWidth
                multiline
                className={classes.input}
                component={TextField}
                value={values.MovieName}
                onChange={handleChange}
              />
              <Field
                label="Studio"
                inputProps={{ name: "MovieStudio" }}
                fullWidth
                className={classes.input}
                component={TextField}
                value={values.MovieStudio}
                onChange={handleChange}
              />
              <Field
                label="Year"
                inputProps={{ name: "MovieYear" }}
                fullWidth
                className={classes.input}
                component={TextField}
                value={values.MovieYear}
                onChange={handleChange}
              />
              <Field
                label="Genres"
                inputProps={{ name: "MovieGenres" }}
                fullWidth
                className={classes.input}
                component={TextField}
                value={values.MovieGenres}
                onChange={handleChange}
              />
              <Field
                label="Actors"
                inputProps={{ name: "MovieActors" }}
                fullWidth
                multiline
                className={classes.input}
                component={TextField}
                value={values.MovieActors}
                onChange={handleChange}
              />
              <FieldArray
                name={"MovieLocation"}
                render={(arrayHelpers) =>
                  values.MovieLocation.map((item, index) => (
                    <div
                      className={classes.movieLocationContainer}
                      key={uuidv4()}
                    >
                      <Typography
                        variant="body2"
                        className={classes.locationText}
                      >
                        {item}
                      </Typography>
                      <Close
                        className={classNames(
                          classes.locationText,
                          classes.pointer
                        )}
                        onClick={() => arrayHelpers.remove(index)}
                      />
                    </div>
                  ))
                }
              />
              <div className={classes.playsContainer}>
                <Typography>
                  {selectedMovie && `Plays: ${selectedMovie.MoviePlays}`}
                </Typography>
                <Typography>
                  {selectedMovie &&
                    `Date added: ${dayjs(selectedMovie.MovieAdded).format(
                      "DD.MM.YYYY HH:mm:ss"
                    )}`}
                </Typography>
              </div>
              <div className={classes.buttonContainer}>
                {selectedMovie &&
                  (selectedMovie.MovieLocation.length > 1 ? (
                    <Select
                      variant="filled"
                      renderValue={() => "Play"}
                      displayEmpty
                      className={classNames(
                        classes.select,
                        classes.marginRight
                      )}
                      classes={{
                        icon: classes.button,
                        selectMenu: classes.selectMenu,
                      }}
                    >
                      {selectedMovie.MovieLocation.map((item, index) => (
                        <MenuItem
                          classes={{
                            root: classes.menuItem,
                            selected: classes.selected,
                          }}
                          onClick={() => play(item.MovieID, item.MovieLocation)}
                          key={uuidv4()}
                        >
                          {`Part ${index + 1}`}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      className={classNames(
                        classes.button,
                        classes.marginRight
                      )}
                      onClick={() => {
                        play(
                          selectedMovie.MovieID,
                          first(selectedMovie.MovieLocation)
                        );
                      }}
                    >
                      Play
                    </Button>
                  ))}
                <Button
                  color="primary"
                  variant="contained"
                  className={classNames(classes.button, classes.marginRight)}
                >
                  <label className={classes.pointer}>
                    Add files
                    <input
                      type="file"
                      onChange={(e) =>
                        setFileAdded(e, setFieldValue, values.MovieLocation)
                      }
                      multiple
                      className={classes.hidden}
                      accept="video/*,.iso"
                    />
                  </label>
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classNames(classes.button, classes.marginRight)}
                  type="submit"
                >
                  Save
                </Button>
                {selectedMovie && (
                  <Button
                    color="primary"
                    className={classes.textButton}
                    onClick={() => {
                      copy(`${FILES_LOCATION}${selectedMovie.MovieLocation}`);
                      setSnackbar("URL copied to clipboard");
                    }}
                  >
                    Copy location
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
          <React.Fragment>
            {getThumbnail(selectedMovie)}
            {selectedMovie && (
              <Grid container>
                {selectedMovie.MovieActors.map((movieActor) =>
                  getActorImage(movieActor)
                )}
              </Grid>
            )}
          </React.Fragment>
        </Form>
      )}
    </Formik>
  );
};

export default withStyles(styles)(Movie);
