import React from "react";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  stats: {
    fontStyle: "italic",
    color: theme.palette.secondary.dark,
    textAlign: "right",
  },
});

const OverallStats = ({ data, showFilteredGenres, classes }) => {
  const plays =
    data &&
    data.movies
      .map((item) => item.MoviePlays)
      .reduce((acc, current) => acc + current, null);

  const genresFiltered = uniq(
    flatten(data?.movies?.map((movie) => movie.MovieGenres))
  );

  return (
    <Typography className={classes.stats}>
      {`Movies: ${data.movies.length}, Actors: ${data.actors.length}, Genres: ${
        showFilteredGenres ? genresFiltered.length : data.genres.length
      }, Plays: ${plays || 0}`}
    </Typography>
  );
};

export default withStyles(styles)(OverallStats);
